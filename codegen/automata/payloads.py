from abc import ABC
import typing
from dataclasses import dataclass, field, InitVar

from codegen.automata.expressions import Expression


@dataclass
class Payload(ABC):
    """A payload in the EFSM. May have refinements."""

    name: str
    sort: str
    refinement: InitVar[typing.Dict]
