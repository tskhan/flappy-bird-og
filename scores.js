// Pure high-score helpers. Loaded by index.html as plain globals and by scores.test.js via require().
const MAX_SCORES = 10;

// Turn the raw localStorage string into a clean, sorted top-10 list. Bad data is dropped.
function parseScores(raw) {
  try {
    const a = JSON.parse(raw);
    return (Array.isArray(a) ? a : [])
      .filter(s => s && /^[A-Z]{3}$/.test(s.name) && Number.isFinite(s.score))
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_SCORES);
  } catch { return []; }
}

// A score gets in if it is above 0 and the table has room or it beats the lowest entry.
const qualifies = (list, s) => s > 0 && (list.length < MAX_SCORES || s > list[MAX_SCORES - 1].score);

// New list with the entry added. The sort is stable, so on a tie the older entry stays ahead.
const withScore = (list, entry) => [...list, entry].sort((a, b) => b.score - a.score).slice(0, MAX_SCORES);

if (typeof module !== 'undefined') module.exports = { parseScores, qualifies, withScore };
