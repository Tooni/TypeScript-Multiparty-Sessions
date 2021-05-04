from dataclasses import dataclass
import typing

from codegen.automata.efsm import EFSM
from codegen.utils.type_declaration_parser import DataType


@dataclass
class Endpoint:
    protocol: str
    role: str
    other_roles: typing.Iterable[str]
    mandatory_roles: typing.Iterable[str]
    refinements: typing.Iterable[tuple[str, str]]
    rec_expr_updates: typing.Iterable[tuple[str, str, str]]
    rec_exprs: typing.Iterable[tuple[str, str, str, str]]
    server: str
    efsm: EFSM
    types: typing.Iterable[DataType]
