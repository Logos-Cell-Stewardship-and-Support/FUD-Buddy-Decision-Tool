```js
// frontend/script.js
let waku;

async function initWaku() {
  waku = await Waku.create({ bootstrap: true });
  console.log("Waku ready");
  await listenForResults();
}

async function sendVoteMessage(data) {
  const json = JSON.stringify(data);
  const encoder = new TextEncoder();
  const payload = encoder.encode(json);

  await waku.lightPush.push({
    topic: "/lunchcell/votes/1/chat",
    payload,
  });

  console.log("Vote sent:", data);
}

async function listenForResults() {
  await waku.relay.subscribe(msg => {
    const decoder = new TextDecoder();
    const payload = decoder.decode(msg.payload);
    const data = JSON.parse(payload);

    if (msg.contentTopic === "/lunchcell/result/1") {
      document.getElementById("results").innerText = "Winner: " + data.winner;
    }
  });
}

window.addEventListener("load", initWaku);

document.getElementById('voteForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const options = ['#f1', '#f2'];
  const user = 'anon_' + Math.floor(Math.random() * 10000);
  let scores = [];

  for (const id of options) {
    scores.push({
      user,
      optionId: id,
      taste: +document.querySelector(`[name="taste_${id}"]`).value,
      dietary: +document.querySelector(`[name="dietary_${id}"]`).value,
      cost: +document.querySelector(`[name="cost_${id}"]`).value,
      speed: +document.querySelector(`[name="speed_${id}"]`).value,
    });
  }

  await sendVoteMessage(scores);
  document.getElementById("results").innerText = "✅ Vote broadcasted!";
});
```
