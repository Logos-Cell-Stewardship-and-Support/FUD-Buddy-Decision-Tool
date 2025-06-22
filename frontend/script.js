// Basic vote collection and stubbed Waku transmission
// FudBuddy integration could analyze choices here in future.

function collectScores(id) {
  return {
    taste: Number(document.querySelector(`[name="taste_${id}"]`).value),
    dietary: Number(document.querySelector(`[name="dietary_${id}"]`).value),
    cost: Number(document.querySelector(`[name="cost_${id}"]`).value),
    speed: Number(document.querySelector(`[name="speed_${id}"]`).value)
  };
}

async function sendVote(vote) {
  console.log("Simulated vote broadcast", vote);
  // TODO: integrate real Waku light push when available
}

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("voteForm");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const vote = {
      user: document.getElementById("user").value,
      timestamp: new Date().toISOString(),
      scores: {
        a1: collectScores("a1"),
        a2: collectScores("a2")
      }
    };
    await sendVote(vote);
    document.getElementById("results").textContent = JSON.stringify(vote, null, 2);
  });
});
