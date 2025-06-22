LunchCell
=========

**LunchCell** is a micro-governance experiment for collaborative lunch decisions using decentralized voting logic, powered by Codex rules and Waku messaging.

---

🍱 **Purpose**
- Make group lunch decisions that are **least polarizing** and reflect shared satisfaction
- Combine **local suggestions** (via FUD Buddy agent) with **multi-criteria voting**
- Run logic locally or on-chain (Nomos-compatible)

---

📦 **Current Stack**
- `simulate/`: Python logic for Codex/Polity scoring (offline/local)
- `frontend/`: Mobile-friendly web UI for submitting scores
- `waku/`: Waku-based messaging for real-time vote exchange
- `codex/lunchcell.nom`: Governance logic in Codex format (Nomos-compatible)

---

🗺️ **Roadmap**

| Stage | Feature | Status |
|-------|---------|--------|
| 0     | Local Polity voting simulation | ✅ Done
| 1     | Frontend UX w/ mobile sliders | ✅ Done
| 2     | Real-time pub/sub via Waku | ✅ Done
| 3     | AI meal recs via FUD Buddy | 🔜 Next
| 4     | Role-gating via Ordinal or social token | 🔜 Planning
| 5     | Full Codex + Nomos appchain version | 🧠 R&D


---

💡 **Governance Logic (Polity)**
- Options are scored on: `taste`, `dietary`, `cost`, `speed`
- Winner is the **least polarizing** (highest minimum score) among options with quorum
- Average score must exceed satisfaction threshold (3.5/5)
- Includes veto/exit option before execution

---

🔗 **Waku Topics**
- `/lunchcell/mock/options`: FUD Buddy sends restaurant choices
- `/lunchcell/votes`: Users broadcast Polity votes
- `/lunchcell/result`: System posts winner for display/checkout

---

📱 **Mobile UX Goals**
- One-tap slider inputs for each criteria per restaurant
- Clear vote submission CTA
- Auto-scroll to results on submit
- Optional: live updates as group consensus emerges



---

👨‍🍳 Built by @M0nkeyFl0wer • Inspired by Codex, Nomos, and Waku under the Logos stack
