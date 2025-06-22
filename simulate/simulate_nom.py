"""Simple simulator for ``lunch_cell.nom`` governance logic.

This reads the Nomos-style JSON file and runs a toy vote simulation to
show how the least polarizing option would be selected.
"""
from __future__ import annotations

import json
import random
from pathlib import Path
from typing import Any, Dict, List

NOM_PATH = Path(__file__).resolve().with_name("lunch_cell.nom")


def load_nom(path: Path = NOM_PATH) -> Dict[str, Any]:
    with path.open("r", encoding="utf-8") as fh:
        return json.load(fh)


def generate_votes(options: List[str], users: List[str]) -> List[Dict[str, Any]]:
    votes = []
    for user in users:
        scores = {}
        for opt in options:
            scores[opt] = {
                "taste": random.randint(1, 5),
                "dietary": random.randint(1, 5),
                "cost": random.randint(1, 5),
                "speed": random.randint(1, 5),
            }
        votes.append({"user": user, "scores": scores})
    return votes


def compute_score(values: List[int]) -> float:
    avg = sum(values) / len(values)
    worst = min(values)
    penalty = (6 - worst) / 5
    return avg * (1 - penalty)


def choose_winner(votes: List[Dict[str, Any]], threshold: float = 3.5) -> str:
    tally: Dict[str, List[int]] = {}
    for vote in votes:
        for opt, categories in vote["scores"].items():
            if opt not in tally:
                tally[opt] = []
            tally[opt].extend(categories.values())
    candidates = {}
    for opt, vals in tally.items():
        avg = sum(vals) / len(vals)
        if avg >= threshold:
            candidates[opt] = compute_score(vals)
    if not candidates:
        return "no winner"
    return max(candidates.items(), key=lambda x: x[1])[0]


def main() -> None:
    nom = load_nom()
    options = [f"a{i}" for i in range(1, 5)]
    users = ["u1", "u2", "u3", "u4"]
    votes = generate_votes(options, users)
    winner = choose_winner(votes)
    print("Votes:")
    print(json.dumps(votes, indent=2))
    print("Winner:", winner)


if __name__ == "__main__":
    main()
