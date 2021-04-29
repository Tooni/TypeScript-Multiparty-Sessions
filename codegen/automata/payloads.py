from abc import ABC
import typing
from dataclasses import dataclass


@dataclass
class Payload(ABC):
    """A payload in the EFSM. May have refinements."""

    name: str
    sort: str
    # might want to be Typing.dict["Refinement"] or something
    refinement: dict
