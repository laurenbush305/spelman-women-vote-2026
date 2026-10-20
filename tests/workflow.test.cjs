const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const workflow = require('../public/data/workflow.js');
const context = { window: {} };
for (const file of ['states.js', 'toolkit.js', 'resources.js']) vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../public/data/', file), 'utf8'), context);
const weeks = context.window.SWV_TOOLKIT.weeks;
const states = context.window.SWV_STATES;
test('51 distinct jurisdictions, official directory provenance and secure destinations', () => {
  assert.equal(states.length, 51); assert.equal(new Set(states.map(s => s.code)).size, 51);
  for (const state of states) {
    assert.match(state.source, /^https:\/\/www.eac.gov\//);
    assert.ok(state.links['State Election Office Website']);
    for (const url of Object.values(state.links)) assert.match(url, /^https:\/\//);
  }
});
test('all approved weeks retained with actions, copy and real asset links', () => {
  assert.deepEqual(Array.from(weeks, w => w.number), [4,5,6,7,8,9,10,11,12]);
  for (const week of weeks) {
    assert.ok(week.action.length > 50); assert.match(week.email, /^Subject:/);
    assert.match(week.email, /\[CHAPTER NAME\]/);
    assert.ok(week.assets.length > 0);
    for (const a of week.assets) assert.match(a.url, /^https:\/\/drive.google.com\/file\/d\//);
  }
  assert.equal(weeks.find(w => w.number === 11).captions.length, 3);
});
test('campaign phase before, during and after election day', () => {
  for (const [date, expected] of [['2026-09-01','outreach'],['2026-11-02','outreach'],['2026-11-03','election'],['2026-11-04','reporting'],['2027-01-01','reporting']]) assert.equal(workflow.phase(date), expected);
});
for (const week of weeks) test(`week ${week.number} uses inclusive boundaries`, () => {
  assert.equal(workflow.currentWeek(weeks, week.start).number, week.number);
  assert.equal(workflow.currentWeek(weeks, week.end).number, week.number);
  assert.equal(workflow.status(week, week.start), 'Current week');
  assert.equal(workflow.status(week, '2026-09-01'), 'Upcoming');
  assert.equal(workflow.status(week, '2027-01-01'), 'Completed');
});
test('before kickoff selects upcoming week; after archive selects thank/report', () => {
  assert.equal(workflow.currentWeek(weeks, '2026-09-01').number, 4);
  assert.equal(workflow.currentWeek(weeks, '2026-11-14').number, 12);
});
test('Georgia date uses Eastern time independent of visitor timezone', () => {
  const date = new Date('2026-11-04T02:00:00Z');
  assert.equal(workflow.dateKey(date, 'America/New_York'), '2026-11-03');
  assert.equal(workflow.dateKey(date, 'Asia/Tokyo'), '2026-11-04');
});
