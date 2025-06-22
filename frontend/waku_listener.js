import asyncio
import json
from datetime import datetime
from typing import Dict

from pywaku import WakuRelay, WakuMessage

# --- Polity Scoring ---
def compute_polity_score(scores):
    avg = sum(scores) / len(scores)
    worst = min(scores)
    penalty = (6 - worst) / 5
    adjusted = avg * (1 - penalty)
    return round(adjusted, 2)

# --- Aggregator ---
def aggregate_votes(vote_data: Dict[str, list]) -> Dict[str, float]:
    all_scores = {}
    for user_scores in vote_data.values():
        for meal_id, scores in user_scores.items():
            if meal_id not in all_scores:
                all_scores[meal_id] = []
            all_scores[meal_id].append(scores)

    results = {}
    for meal_id, meal_scores in all_scores.items():
        flat = [sum(x) / len(x) for x in zip(*meal_scores)]
        polity = compute_polity_score(flat)
        results[meal_id] = polity

    return results

# --- Waku Vote Listener ---
class LunchVoteCollector:
    def __init__(self):
        self.votes = {}

    async def handle_vote(self, message: WakuMessage):
        try:
            payload = json.loads(message.payload.decode("utf-8"))
            print(f"📥 Received vote from {payload['user']}")
            self.votes[payload['user']] = payload['scores']

            results = aggregate_votes(self.votes)
            best = max(results.items(), key=lambda x: x[1])
            print("\n--- Current Results ---")
            for meal, score in results.items():
                print(f"{meal}: {score}/5 Polity Score")
            print(f"\n🍽️ Leading: {best[0]} with {best[1]}/5\n")

        except Exception as e:
            print("⚠️ Error parsing message:", e)

    async def run(self):
        relay = WakuRelay()
        await relay.start()
        print("🔌 Listening to /lunchcell/2025-06-21/ethcc/json")

        await relay.subscribe("/lunchcell/2025-06-21/ethcc/json", self.handle_vote)
        await asyncio.Event().wait()

if __name__ == "__main__":
    collector = LunchVoteCollector()
    asyncio.run(collector.run())

