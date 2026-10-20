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
  // Keep the public guide until the organization has completed every launch gate.
  function vote411Url(config, fallback = 'https://www.vote411.org') {
    if (!config || config.enabled !== true || config.onboardingComplete !== true
      || config.organizationApproved !== true || config.brandingApproved !== true
      || !/^\d{4}-\d{2}-\d{2}$/.test(config.verifiedAt || '')) return fallback;
    try {
      const url = new URL(config.url);
      return url.protocol === 'https:' && ['vote411.org', 'www.vote411.org'].includes(url.hostname)
        && !url.username && !url.password && !url.port ? url.href : fallback;
    } catch { return fallback; }
  }
  const api = { dateKey, status, currentWeek, phase, vote411Url };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SWV_WORKFLOW = api;
})(typeof window === 'undefined' ? globalThis : window);
