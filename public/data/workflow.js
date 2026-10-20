/* Pure date logic, shared by the browser and the regression tests. */
(function (root) {
  'use strict';
  function dateKey(date = new Date(), timeZone) {
    const parts = new Intl.DateTimeFormat('en-US', {
      year: 'numeric', month: '2-digit', day: '2-digit', ...(timeZone ? { timeZone } : {})
    }).formatToParts(date);
    const value = type => parts.find(part => part.type === type).value;
    return `${value('year')}-${value('month')}-${value('day')}`;
  }
  function status(week, today) {
    return today < week.start ? 'Upcoming' : today > week.end ? 'Completed' : 'Current week';
  }
  function currentWeek(weeks, today) {
    return weeks.find(week => today >= week.start && today <= week.end)
      || weeks.find(week => today < week.start) || weeks[weeks.length - 1];
  }
  function phase(today) {
    return today > '2026-11-03' ? 'reporting' : today === '2026-11-03' ? 'election' : 'outreach';
  }
  const api = { dateKey, status, currentWeek, phase };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SWV_WORKFLOW = api;
})(typeof window === 'undefined' ? globalThis : window);
