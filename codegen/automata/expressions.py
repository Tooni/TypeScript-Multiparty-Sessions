from abc import ABC
import typing
from dataclasses import dataclass


@dataclass
class Binop():
    # The operators used by NuScr's binary refinements.
    op: typing.Literal["+", "-", "=", "<>", "<", ">", "<=", ">=", "&&", "||"]
    e1: typing.Union[typing.Union['Unop', 'Binop'], str]
    e2: typing.Union[typing.Union['Unop', 'Binop'], str]


@dataclass
class Unop():
    # The operators used by NuScr's unary refinements.
    op: typing.Literal["-", "not "]
    e: typing.Union[typing.Union['Unop', 'Binop'], str]


class Expression():
    """An expression in the EFSM -- usually a refinement type"""

    @classmethod
    def find_variables_of(cls, e: typing.Union[typing.Dict, str]) -> typing.Iterable[str]:
        if isinstance(e, str):
            if e.isnumeric() or e.startswith("'"):
                return []
            return [e]

        if isinstance(e, dict):
            if "e1" in e and "e2" in e and "binop" in e:
                with_dups = cls.find_variables_of(e["e1"]) + cls.find_variables_of(e["e2"])
                no_dups = list(dict.fromkeys(with_dups))
                return no_dups
            if "e" in e and "unop" in e:
                return cls.find_variables_of(e["e"])

        raise Exception(f"Incorrectly formatted .json for finding the variables in an expression.")


    @classmethod
    def from_dict(cls, e: typing.Union[typing.Dict, str]) -> str:
        if isinstance(e, str):
            if e.isnumeric() or e.startswith("'"):
                return e
            else:
                return f"this.varMap.get('{e}')"

        def get_ts_op(op):
            if op == "<>":
                return "!=="
            elif op == "=":
                return "==="
            elif op == "not ":
                return "!"
            return op

        if isinstance(e, dict):
            if "e1" in e and "e2" in e and "binop" in e:
                e1 = e["e1"]
                e2 = e["e2"]
                op = e["binop"]
                return f"{cls.from_dict(e1)} {get_ts_op(op)} {cls.from_dict(e2)}"
            if "e" in e and "unop" in e:
                e1 = e["e"]
                op = e["unop"]
                return f"{get_ts_op(op)}({cls.from_dict(e1)})"

        raise Exception(f"Incorrectly formatted .json for expression's string construction.")
