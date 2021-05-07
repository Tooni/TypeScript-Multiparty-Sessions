import os
from pathlib import Path
from re import sub
import subprocess
import typing

from codegen.automata.expressions import Expression


def get_graph(filename: str, protocol: str, role: str, server: str = None) -> typing.Tuple[int, str]:
    """Get dot representation of EFSM from νScr.
    Return exit code and command line output."""

    if server is None:
        server = role
    command = ('dune', 'exec', 'nuscr', '--', filename, f'--routed_fsm={role}@{server}@{protocol}')

    completion = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    exit_code = completion.returncode
    output = completion.stderr if exit_code != 0 else completion.stdout

    return exit_code, output.decode('utf-8').strip()


def get_refinement_exprs(current_role: str, edges: typing.Dict, froms: typing.Dict) -> typing.Iterable[tuple[str, str]]:
    """From νScr's output's .json's edges, get the given role's refinements.
    Returns a list of the refinements and the edges' IDs for the server runtime."""

    ref_list = []
    for edge_id, data in edges.items():
        from_state = froms[edge_id]
        payloads = data["payloads"]
        # Don't look at receives, otherwise every refinement will be doubled
        if len(payloads) == 0 or data["op"] == "?":
            continue
        payload_names = []
        ref_strs = []
        for p in data["payloads"]:
            r = p["refinement"]
            payload_names.append(p["name"])
            if len(r) == 0:
                continue
            ref_strs.append("(" + Expression.from_dict(r) + ")")
        ref_str = " && ".join(ref_strs)
        ident = f"{current_role}>{data['label']}>{','.join(payload_names)}>{from_state}>{data['role']}"
        if len(ref_str) > 0:
            ref_list.append((ident, ref_str))
    return ref_list


def get_rec_exprs_updates(current_role: str, edges: typing.Dict, froms: typing.Dict) -> typing.Iterable[tuple[str, str, str]]:
    """From νScr's output's .json's edges, get the recursive expression updates of a given role.
    Returns a list of the edges' IDs (for the server runtime),
    the expression being updated, and the way it is updated."""

    rec_expr_list = []
    for edge_id, data in edges.items():
        from_state = froms[edge_id]
        rec_expr_updates = data["rec_expr_updates"]
        # Don't look at receives, otherwise every refinement will be doubled
        if not rec_expr_updates or data["op"] == "?":
            continue
        rec_strs = []
        payload_names = []
        for p in data["payloads"]:
            payload_names.append(p["name"])
        for rec_name, rec_update in rec_expr_updates.items():
            update_str = Expression.from_dict(rec_update)
            rec_strs.append((rec_name, update_str))
        if len(rec_strs) > 1:
            raise Exception(f"Can't update more than one rec expression at a time.")
        ident = f"{current_role}>{data['label']}>{','.join(payload_names)}>{from_state}>{data['role']}"
        rec_name, update_str = rec_strs[0]
        rec_expr_list.append((ident, rec_name, update_str))
    return rec_expr_list


def get_rec_expr_info(rec_expr_info: typing.Dict) -> typing.Iterable[tuple[str, str, str, str]]:
    """Parse the recursive expression metadata of νScr's output's .json.
    Returns a list of the expression names, initialisations, variables involved, and refinements"""

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

# TODO?
# def get_png(filename: str, protocol: str, role: str) -> int:
#     """Get PNG representation of EFSM from νScr. Return exit code."""
