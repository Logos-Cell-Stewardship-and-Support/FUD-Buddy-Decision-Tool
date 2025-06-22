/**
 * Minimal placeholder Waku listener using @waku/sdk.
 * Aggregates votes and prints best option. Real networking is not
 * enabled in this stub.
 */

function computePolityScore(scores) {
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const worst = Math.min(...scores);
  const penalty = (6 - worst) / 5;
  return +(avg * (1 - penalty)).toFixed(2);
}

function aggregateVotes(voteData) {
  const results = {};
  for (const vote of voteData) {
    for (const [meal, values] of Object.entries(vote.scores)) {
      if (!results[meal]) results[meal] = [];
      results[meal].push(Object.values(values));
    }
  }
  const final = {};
  for (const [meal, lists] of Object.entries(results)) {
    const flat = lists.reduce((acc, arr) => arr.map((v, i) => (acc[i] || 0) + v), []);
    const avgPerCat = flat.map(v => v / lists.length);
    final[meal] = computePolityScore(avgPerCat);
  }
  return final;
}

function simulate(messages) {
  const results = aggregateVotes(messages);
  const best = Object.entries(results).sort((a, b) => b[1] - a[1])[0];
  console.log("Current results:", results);
  if (best) console.log("Leading:", best[0], "score", best[1]);
}

module.exports = { simulate };
