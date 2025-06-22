# Next steps for FudBuddy integration

The front‑end exposes a simple `sendVote` function inside `script.js`.
FudBuddy can call this function or provide suggestions via Waku before
the user votes. See the repository:
https://github.com/M0nkeyFl0wer/fud-buddy

Proposed integration:

1. Run FudBuddy locally to fetch lunch options and send them to Waku.
2. Extend `script.js` to display these options dynamically.
3. Persist votes to Codex using `backend/codex_stub.py` or a real Codex
   instance.
