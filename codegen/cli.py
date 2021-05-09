from argparse import ArgumentParser
import typing
import json

from codegen.automata import Endpoint, parser as automata_parser
from codegen.generator import CodeGenerator
from codegen.utils import logger, role_parser, scribble, nuscr, type_declaration_parser, pragma_parser


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

    # 'server' flag must be provided if the codegen target is the browser.
    if target == 'browser' and server is None:
        logger.ERROR('target==browser, so the following arguments are required: server')
        return 1

    if target == 'browser' and server == role:
        logger.ERROR('Browser role cannot be the server role.')
        return 1

    missing_pragmas = pragma_parser.find_missing_pragmas(scribble_filename)
    if len(missing_pragmas) != 0:
        logger.ERROR(f"{scribble_filename} was missing the following pragmas: {missing_pragmas}")
        logger.INFO("Try adding them at the top of the file with: (*# CheckDirectedChoiceDisabled, RefinementTypes #*)")
        return 1

    all_roles = role_parser.parse(scribble_filename, protocol)
    other_roles = all_roles - set([role])

    try:
        phase = f'Parse FSM from {scribble_filename}'
        with type_declaration_parser.parse(scribble_filename) as custom_types:
            exit_code, output = nuscr.get_graph(scribble_filename, protocol, role, server)
            if exit_code != 0:
                logger.FAIL(phase)
                logger.ERROR(output)
                logger.INFO("You may need to remove 'module' lines, e.g. 'module Calculator;'.")
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
    froms = output_json["froms"]
    rec_exprs = output_json["rec_exprs"]
    rec_exprs_info = nuscr.get_rec_expr_info(rec_exprs)

    refinement_list = []
    rec_expr_update_list = []
    if server is None:
        refinement_list = nuscr.get_refinement_exprs(role, edges, froms)
        rec_expr_update_list = nuscr.get_rec_exprs_updates(role, edges, froms)
        for other_role in other_roles:
            phase = f'Parse FSM from {scribble_filename} for browser role {other_role}, for its annotations and rec exprs'
            try:
                with type_declaration_parser.parse(scribble_filename) as custom_types:
                    exit_code, browser_output = nuscr.get_graph(scribble_filename, protocol, other_role, server=role)
                    if exit_code != 0:
                        logger.FAIL(phase)
                        logger.ERROR(browser_output)
                        return exit_code
                    browser_output_split = browser_output.split("json:")
                    browser_output_json = json.loads(browser_output_split[1])
                    browser_edges = browser_output_json["edges"]
                    browser_froms = browser_output_json["froms"]
                    refinement_list += nuscr.get_refinement_exprs(other_role, browser_edges, browser_froms)
                    rec_expr_update_list += nuscr.get_rec_exprs_updates(other_role, browser_edges, browser_froms)
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
