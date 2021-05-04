from abc import ABC
import typing
from dataclasses import dataclass

from codegen.automata.expressions import Expression


class RefinementList():

    @classmethod
    def from_dict(cls, d: typing.Dict) -> typing.Iterable[tuple[str, str]]:
        refinement_list = []
        for ident, refs in d.items():
            # Parentheses to avoid operator precedence issues with &&
            r_str = " && ".join(["(" + Expression.from_dict(r) + ")" for r in refs])
            refinement_list.append((ident, r_str))
        return refinement_list
