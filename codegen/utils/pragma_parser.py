from contextlib import contextmanager
from dataclasses import dataclass
import re
from pathlib import Path
import typing

_REQUIRED_PRAGMAS = set(("CheckDirectedChoiceDisabled", "RefinementTypes"))


def find_missing_pragmas(filename: str) -> typing.Iterable[str]:
    content = Path(filename).read_text()

    pattern = re.compile(fr'\(\*\#(?P<pragmas>.*?)\#\*\)')
    matcher = re.search(pattern, content)
    if not matcher:
        raise ValueError(f'Cannot find any pragmas')
    unparsed_pragmas = matcher.groupdict()['pragmas']
    pragmas = set(pragma.strip() for pragma in unparsed_pragmas.split(','))

    return _REQUIRED_PRAGMAS.difference(pragmas)
