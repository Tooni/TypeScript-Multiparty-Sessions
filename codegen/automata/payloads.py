from abc import ABC
import typing
from dataclasses import dataclass, field, InitVar

from codegen.automata.expressions import Expression


@dataclass
class Payload(ABC):
    """A payload in the EFSM. May have refinements."""

    name: str
    sort: str
    refinement: InitVar[dict]
    refinement_type: str = field(init=False)

    def __post_init__(self, refinement_dict):
        # probably can delete
        self.refinement_type = Expression.from_dict(refinement_dict)
