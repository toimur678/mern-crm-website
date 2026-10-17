const test = require('node:test');
const assert = require('node:assert/strict');
const { parseDashboardQuery, monthWindow, mergeMonthlyTotals } = require('./aggregation');

test('dashboard accepts supported periods, normalizes currency, and rejects malformed query input', () => {
  assert.deepEqual(parseDashboardQuery(), { currency: 'USD', period: 6 });
  assert.deepEqual(parseDashboardQuery({ currency: 'eur', period: '12' }), { currency: 'EUR', period: 12 });
  for (const query of [
    { currency: '' }, { currency: 'US' }, { currency: { $ne: 'USD' } },
    { currency: ['USD', 'EUR'] }, { period: '1' }, { period: '6.5' },
    { period: 'NaN' }, { period: ['6'] }, { period: { $gt: 0 } },
  ]) assert.equal(typeof parseDashboardQuery(query).error, 'string');
});

test('month window stays chronological across years and ends at the current instant', () => {
  const now = new Date('2026-02-28T23:30:00.000Z');
  const window = monthWindow(6, now);
  assert.equal(window.start.toISOString(), '2025-09-01T00:00:00.000Z');
  assert.equal(window.end.toISOString(), now.toISOString());
  assert.deepEqual(window.months.map((item) => item.month), [
    '2025-09', '2025-10', '2025-11', '2025-12', '2026-01', '2026-02',
  ]);
  assert.equal(monthWindow(12, new Date('2024-02-29T12:00:00Z')).months.length, 12);
});

test('monthly totals join by month rather than database order and fill missing months with zero', () => {
  const { months } = monthWindow(6, new Date('2026-03-10T12:00:00Z'));
  const merged = mergeMonthlyTotals(months,
    [{ _id: '2026-03', total: 129.50 }, { _id: '2025-11', total: 800 }],
    [{ _id: '2026-01', total: 75 }, { _id: '2025-11', total: 250.25 }]
  );
  assert.deepEqual(merged.find((item) => item.month === '2025-11'), { month: '2025-11', invoiced: 800, collected: 250.25 });
  assert.deepEqual(merged.find((item) => item.month === '2026-01'), { month: '2026-01', invoiced: 0, collected: 75 });
  assert.deepEqual(merged.find((item) => item.month === '2025-10'), { month: '2025-10', invoiced: 0, collected: 0 });
  assert.ok(months.every((item) => item.invoiced === 0 && item.collected === 0));
  assert.deepEqual(mergeMonthlyTotals(months), months);
});
