"""Minimal Codex logging stub.

This placeholder emulates sending votes or decisions to Codex for
transparent logging. Each call to :func:`log_vote` appends JSON lines to
``codex.log``.
"""
from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path
from typing import Any, Dict

LOG_PATH = Path(__file__).resolve().with_name("codex.log")


def log_vote(vote: Dict[str, Any]) -> None:
    """Append a vote record to :data:`LOG_PATH`."""
    entry = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "vote": vote,
    }
    with LOG_PATH.open("a", encoding="utf-8") as fh:
        fh.write(json.dumps(entry) + "\n")


if __name__ == "__main__":
    sample = {"user": "demo", "scores": {"a1": {"taste": 4}}}
    log_vote(sample)
    print(f"Logged sample vote to {LOG_PATH}")
