# Food Cell

Food Cell is a prototype demonstrating how the Logos stack can enable
decentralised lunch planning. Votes are cast on multiple attributes and
the least polarising option wins. This repo contains a small browser
front‑end, a simulator for the Nomos procedure and a placeholder for
Codex logging.

## Layout

```
frontend/   HTML, JS and CSS for submitting votes
simulate/   `lunch_cell.nom` definition and a Python simulator
backend/    `codex_stub.py` minimal logging stub
```

## Running locally

Open `frontend/index.html` in a browser to try the voting form. Votes are
printed to the console. The page can be served from any static server,
e.g. `python3 -m http.server`.

### Simulate the Nomos logic

```
python3 simulate/simulate_nom.py
```

This loads `simulate/lunch_cell.nom`, generates random votes and prints
the chosen winner.

## Files

- `frontend/script.js` – gathers slider scores and would push them over
  Waku. FudBuddy integration can hook in here to suggest options.
- `frontend/waku_listener.js` – stubbed aggregator for incoming votes.
- `backend/codex_stub.py` – placeholder for Codex logging.
- `simulate/lunch_cell.nom` – JSON representation of the procedure.

## Logos stack

- [Waku](https://waku.org) – p2p messaging
- [Nomos](https://github.com/status-im/nomos) – on-chain governance
- [Codex](https://github.com/status-im/codex) – transparent rule engine

## Credits

Prototype by [@M0nkeyFl0wer](https://github.com/M0nkeyFl0wer).
