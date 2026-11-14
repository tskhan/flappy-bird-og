// Run with: node --test
const test = require('node:test');
const assert = require('node:assert/strict');
const { parseScores, qualifies, withScore } = require('./scores.js');

test('keeps 10 entries, sorted high to low, and drops the lowest', () => {
  let list = [];
  for (let i = 1; i <= 11; i++) list = withScore(list, { name: 'AAA', score: i });
  assert.equal(list.length, 10);
  assert.deepEqual(list.map(e => e.score), [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
});

test('on a tie the older entry stays ahead', () => {
  const old = { name: 'OLD', score: 5 };
  const list = withScore([old], { name: 'NEW', score: 5 });
  assert.equal(list[0], old);
});

test('qualifies: needs a score above 0 and room or a better score than the 10th', () => {
  const full = Array.from({ length: 10 }, (_, i) => ({ name: 'AAA', score: 10 - i })); // 10..1
  assert.equal(qualifies([], 0), false);
  assert.equal(qualifies([], 1), true);
  assert.equal(qualifies(full, 1), false); // ties the 10th: not enough
  assert.equal(qualifies(full, 2), true);
});

test('parseScores drops bad data and never throws', () => {
  assert.deepEqual(parseScores(null), []);
  assert.deepEqual(parseScores('not json'), []);
  const raw = JSON.stringify([
    { name: 'GOOD', score: 3 }, // name too long
    { name: 'abc', score: 3 }, // lower case
    { name: 'ABC', score: 'x' }, // score not a number
    { name: 'ABC', score: 4 },
    { name: 'XYZ', score: 9 },
  ]);
  assert.deepEqual(parseScores(raw), [{ name: 'XYZ', score: 9 }, { name: 'ABC', score: 4 }]);
});
