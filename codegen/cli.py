from argparse import ArgumentParser
import typing
import json

from codegen.automata import Endpoint, parser as automata_parser
from codegen.automata.expressions import Expression
from codegen.generator import CodeGenerator
from codegen.utils import logger, role_parser, scribble, nuscr, type_declaration_parser


def parse_arguments(args: typing.List[str]) -> typing.Dict:
    """Prepare command line argument parser and return the parsed arguments
    from the specified 'args'."""

    parser = ArgumentParser()

    parser.add_argument('filename',
                        type=str, help='Path to Scribble protocol')

    parser.add_argument('protocol',
                        type=str, help='Name of protocol')

    parser.add_argument('role',
                        type=str, help='Role to project')

    parser.add_argument('target',
                        choices=['node', 'browser'], help='Code generation target')

    parser.add_argument('-s', '--server',
                        type=str, help='Server role (only applicable for browser targets)')

    parser.add_argument('-o', '--output',
                        type=str, help='Output directory for generation')

    parser.add_argument('--prettify', dest='prettify', action='store_true',
                        help="Used by default. States that tsfmt should be used to lint/reformat the files.")
    parser.add_argument('--no-prettify', dest='prettify', action='store_false',
                        help='States that tsfmt should not be used to lint/reformat the files.')
    parser.set_defaults(prettify=True)

    parsed_args = parser.parse_args(args)
    return vars(parsed_args)


# todo: put in another file
def get_id_and_refinement_exprs_from_edges(current_role: str, browser_edges: typing.Dict) -> typing.Iterable[tuple[str, str]]:
    ref_list = []
    for edge_id, data in browser_edges.items():
        payloads = data["payloads"]
        # Don't look at receives, otherwise every refinement will be doubled
        if len(payloads) == 0 or data["op"] == "?":
            continue
        ident = f"{current_role}>{data['label']}>{data['role']}"
        ref_strs = []
        for p in data["payloads"]:
            r = p["refinement"]
            if len(r) == 0:
                continue
            ref_strs.append("(" + Expression.from_dict(r) + ")")
        ref_str = " && ".join(ref_strs)
        if len(ref_str) > 0:
            ref_list.append((ident, ref_str))
    return ref_list


# todo: put in another file
def get_id_and_rec_exprs_updates_from_edges(current_role: str, browser_edges: typing.Dict) -> typing.Iterable[tuple[str, str, str]]:
    rec_expr_list = []
    for edge_id, data in browser_edges.items():
        rec_expr_updates = data["rec_expr_updates"]
        # Don't look at receives, otherwise every refinement will be doubled
        if not rec_expr_updates or data["op"] == "?":
            continue
        ident = f"{current_role}>{data['label']}>{data['role']}"
        rec_strs = []
        for rec_name, rec_update in rec_expr_updates.items():
            update_str = Expression.from_dict(rec_update)
            rec_strs.append((rec_name, update_str))
        if len(rec_strs) > 1:
            raise Exception(f"Can't update more than one rec expression at a time.")
        rec_name, update_str = rec_strs[0]
        rec_expr_list.append((ident, rec_name, update_str))
    return rec_expr_list


# todo: put in another file
def get_rec_expr_info(rec_expr_info: typing.Dict) -> typing.Iterable[tuple[str, str, str, str]]:
    info_list = []
    for rec_expr_name, info in rec_expr_info.items():
        init = info["init"]
        refinement = info["refinement"]
        refinement_str = ""
        if len(refinement) != 0:
            refinement_str = Expression.from_dict(refinement)
        init_str = Expression.from_dict(init)
        variables = Expression.find_variables_of(init)
        vars_str = ""
        if len(variables) > 0:
            with_varmap = [f"this.varMap.has('{v}')" for v in variables]
            vars_str = " && (" + " && ".join(with_varmap) + ")"
        info_list.append((rec_expr_name, init_str, vars_str, refinement_str))
    return info_list


def main(args: typing.List[str]) -> int:
    """Main entry point, return exit code."""

    parsed_args = parse_arguments(args)

    target = parsed_args['target']
    server = parsed_args['server']
    role = parsed_args['role']
    protocol = parsed_args['protocol']
    output_dir = parsed_args['output']
    scribble_filename = parsed_args['filename']
    prettify = parsed_args['prettify']

    if target == 'browser' and server is None:
        # 'server' flag must be provided if the codegen target is the browser.

        logger.ERROR('target==browser, so the following arguments are required: server')
        return 1

    if target == 'browser' and server == role:
        # 'server' flag must be provided if the codegen target is the browser.

        logger.ERROR('Browser role cannot be the server role.')
        return 1

    all_roles = role_parser.parse(parsed_args['filename'], parsed_args['protocol'])
    other_roles = all_roles - set([parsed_args['role']])
    custom_types = type_declaration_parser.parse(scribble_filename)

    try:
        phase = f'Parse FSM from {scribble_filename}'
        with type_declaration_parser.parse(scribble_filename) as custom_types:
            exit_code, output = nuscr.get_graph(scribble_filename, protocol, role, server)
            if exit_code != 0:
                logger.FAIL(phase)
                logger.ERROR(output)
                return exit_code
            logger.SUCCESS(phase)
    except (OSError, ValueError) as error:
        logger.ERROR(error)
        return 1

    output_split = output.split("json:")
    output_json = json.loads(output_split[1])
    dot = output_split[0]

    mandatory_roles = output_json["mandatory"]
    optional_roles = output_json["optional"]

    if server is None:
        mandatory_roles.remove(role)
    else:
        mandatory_roles.remove(server)

    edges = output_json["edges"]
    rec_exprs = output_json["rec_exprs"]
    rec_exprs_info = get_rec_expr_info(rec_exprs)

    refinement_list = []
    rec_expr_update_list = []
    if server is None:
        refinement_list = get_id_and_refinement_exprs_from_edges(role, edges)
        rec_expr_update_list = get_id_and_rec_exprs_updates_from_edges(role, edges)
        for other_role in other_roles:
            phase = f'Parse FSM from {scribble_filename} for browser role {other_role}, for its annotations and rec exprs'
            try:
                with type_declaration_parser.parse(scribble_filename) as custom_types:
                    exit_code, browser_output = nuscr.get_graph(scribble_filename, protocol, other_role, server)
                    if exit_code != 0:
                        logger.FAIL(phase)
                        logger.ERROR(browser_output)
                        return exit_code
                    browser_output_split = browser_output.split("json:")
                    browser_output_json = json.loads(browser_output_split[1])
                    browser_edges = browser_output_json["edges"]
                    refinement_list += get_id_and_refinement_exprs_from_edges(other_role, browser_edges)
                    rec_expr_update_list += get_id_and_rec_exprs_updates_from_edges(other_role, browser_edges)
                    logger.SUCCESS(phase)
            except (OSError, ValueError) as error:
                logger.ERROR(error)
                return 1

    phase = f'Parse endpoint IR from Scribble output'
    try:
        efsm = automata_parser.from_data(dot, edges)
        logger.SUCCESS(phase)
    except ValueError as error:
        logger.FAIL(phase)
        logger.ERROR(error)
        return 1

    endpoint = Endpoint(protocol=protocol,
                        role=role,
                        other_roles=other_roles,
                        mandatory_roles=mandatory_roles,
                        refinements=refinement_list,
                        rec_expr_updates=rec_expr_update_list,
                        rec_exprs=rec_exprs_info,
                        server=server,
                        efsm=efsm,
                        types=custom_types)

    codegen = CodeGenerator(target=target, output_dir=output_dir)
    phase = f'Generate all {target} artifacts in {codegen.output_dir}'
    try:
        exit_code = codegen.generate(endpoint, prettify)
        if exit_code != 0:
            logger.FAIL(phase)
        else:
            logger.SUCCESS(phase)

        return exit_code
    except Exception as error:
        logger.FAIL(phase)
        logger.ERROR(error)
        return 1
