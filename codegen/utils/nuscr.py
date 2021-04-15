import os
from pathlib import Path
from re import sub
import subprocess
import typing


def get_graph(filename: str, protocol: str, role: str, server: str = None) -> typing.Tuple[int, str]:
    """Get dot representation of EFSM from νScr.
    Return exit code and command line output."""

    if server is None:
        server = role
    command = ('dune', 'exec', 'nuscr', '--', f'--routed_fsm={role}@{server}@{protocol}', filename)

    completion = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    exit_code = completion.returncode
    output = completion.stderr if exit_code != 0 else completion.stdout

    return exit_code, output.decode('utf-8').strip()

# TODO?
# def get_png(filename: str, protocol: str, role: str) -> int:
#     """Get PNG representation of EFSM from νScr. Return exit code."""
