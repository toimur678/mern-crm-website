const test = require('node:test');
const assert = require('node:assert/strict');
const escapeSearch = require('./escapeSearch');

test('search punctuation is literal and case insensitive', () => {
  for (const name of ['ACME (UK)', 'C++', 'A[B]', 'A.B', 'A*B?', '$100', 'back\\slash']) {
    const expression = new RegExp(escapeSearch(name), 'i');
    assert.ok(expression.test(name.toUpperCase()), name);
    assert.ok(!expression.test('unrelated customer'), name);
  }
});

test('unfinished patterns cannot crash customer search', () => {
  for (const query of ['[', '(', '\\', '*', '(a+)+$', undefined]) {
    assert.doesNotThrow(() => new RegExp(escapeSearch(query), 'i'));
  }
});
