'use strict';
(() => {
  const states = window.SWV_STATES, toolkit = window.SWV_TOOLKIT, workflow = window.SWV_WORKFLOW;
  const $ = id => document.getElementById(id);
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const external = (label, href, className) => {
    const a = make('a', className, label + ' ↗');
    a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', label + ' (opens in a new tab)');
    return a;
  };
  if (!states || !toolkit || !workflow || !window.SWV_RESOURCES) {
    $('resource-grid').textContent = 'The directory could not load. Use Vote.gov or the official toolkit links below, or reload this page.';
    return;
  }
  // Integration point only: no storage, network request, identity or search text.
  function interaction(action, item) {
    window.dispatchEvent(new CustomEvent('swv:interaction', { detail: { action, item } }));
  }
  let toastTimer;
  function announce(message) {
    clearTimeout(toastTimer);
    $('toast').textContent = message; $('toast').classList.add('show');
    toastTimer = setTimeout(() => $('toast').classList.remove('show'), 5000);
  }
  const stateSelect = $('state'), queryInput = $('query');
  let category = 'all';
  const filterButtons = [...document.querySelectorAll('[data-category]')];
  states.forEach(state => {
    const option = make('option', '', state.name); option.value = state.code; stateSelect.append(option);
  });
  function stateResources(state) {
    const links = state.links, office = links['State Election Office Website'];
    const routes = [
      ['registration', 'Register or update registration', 'Register to Vote', 'Find eligibility, registration methods and deadlines. Check whether registration for this election is still available.', 'register address name update deadline'],
      ['registration', 'Check registration status', 'Check Your Registration', 'Confirm your own record on the official voter portal. Enter personal details only on the election authority’s site.', 'status registered check'],
      ['voting', 'Early in-person voting', 'earlyVoting', 'Check whether early in-person voting is offered, and confirm dates, locations and hours with your election office.', 'advance early sites hours weekend'],
      ['voting', 'Absentee and mail ballots', 'Absentee/ Mail and/or Early Voting', 'Confirm eligibility, application methods, request and return deadlines. These are separate deadlines.', 'absentee mail ballot request return drop box'],
      ['voting', 'Voter identification requirements', 'voterID', 'Confirm the accepted identification and any alternatives before you go to vote.', 'voter id identification requirements bring'],
      ['registration', 'Sample ballot', 'sampleBallot', 'Ask your election office for the sample ballot for your address and election. Ballots can vary by district.', 'sample ballot preview district'],
      ['voting', 'Polling places and hours', 'In-Person Voting Location Lookup', 'Confirm your assigned Election Day location and hours. Early voting sites can be different.', 'poll precinct place location hours election day'],
      ['support', 'Local election help and access', 'Local Election Office Directory', 'Contact your election officials about accessibility, ballot questions or voting assistance.', 'accessible disability assistance help office']
    ];
    return routes.map(([topic, title, key, desc, keywords], index) => {
      const direct = links[key];
      return { id: state.code + '-' + index, title: state.name + ': ' + title,
        category: topic, tag: state.name, state: state.code, keywords,
        desc: desc + (direct ? '' : ' This topic opens the election authority’s website; use its voter information menu or contact the office.'),
        url: direct || office, source: 'Official election authority',
        reviewed: state.reviewed, fallback: !direct, unconfirmed: state.unconfirmedLinks?.includes(direct ? key : 'State Election Office Website') };
    });
  }
  function resourceCard(resource) {
    const article = make('article', 'resource-card'); article.dataset.scope = resource.state ? 'state' : 'national';
    const link = external(resource.fallback ? 'Find this topic with the election office' : 'Open ' + resource.title, resource.url);
    link.textContent = resource.cta ? resource.cta + ' ↗' : resource.fallback ? 'Find on the election website ↗' : resource.state ? 'Open official voter tool ↗' : 'Open resource ↗';
    link.addEventListener('click', () => interaction('resource_open', resource.id || resource.title));
    article.append(make('span', 'pill', resource.tag), make('h3', '', resource.title), make('p', '', resource.desc), make('p', 'source-label', resource.source));
    if (resource.image) {
      const img = make('img', 'recruitment-graphic');
      img.src = resource.image.src; img.alt = resource.image.alt;
      img.width = resource.image.width; img.height = resource.image.height;
      img.loading = 'lazy'; img.decoding = 'async'; article.append(img);
      // Original downloads bypass the hosting CDN's automatic JPEG recompression.
      const download = external('Download original recruitment graphic (JPG)', resource.image.downloadUrl, 'graphic-download');
      article.append(download);
    }
    if (resource.reviewed) article.append(make('p', 'source-date', 'Source listing reviewed Oct 19, 2026' + (resource.unconfirmed ? ' · automated access limited' : '')));
    article.append(link); return article;
  }
  function renderResources() {
    const state = states.find(item => item.code === stateSelect.value);
    const search = queryInput.value.toLocaleLowerCase().trim();
    const match = r => (category === 'all' || r.category === category) && (!search || [r.title, r.desc, r.keywords, r.tag, r.source].join(' ').toLocaleLowerCase().includes(search));
    const local = state ? stateResources(state).filter(match) : [];
    const national = window.SWV_RESOURCES.map(r => r.id === 'vote411-guide'
      ? { ...r, url: workflow.vote411Url(window.SWV_PARTNERS?.vote411, r.url) } : r)
      .filter(r => !['pollworkers','chapter'].includes(r.category) && r.id !== 'campus-vote-project-spelman')
      .filter(match), nodes = [];
    if (state) {
      $('state-context').classList.add('visible');
      $('state-context').replaceChildren(make('h3', '', state.name + ' voter information'),
        make('p', '', 'Official tools for the state where you are registered. We link to election authorities; we do not infer local rules or publish unverified deadlines.'),
        external('Open ' + state.name + ' election authority', state.links['State Election Office Website']),
        document.createTextNode(' · '), external('View the federal source listing', state.source));
      if (local.length) nodes.push(make('h3', 'resource-group-label', state.name + ' · official election information'), ...local.map(resourceCard));
    } else { $('state-context').classList.remove('visible'); $('state-context').replaceChildren(); }
    if (national.length) nodes.push(make('h3', 'resource-group-label', 'National voter help'), ...national.map(resourceCard));
    if (!local.length && !national.length) {
      const empty = make('div', 'empty');
      empty.append(make('h3', '', 'No matching resources'), make('p', '', 'Try “mail”, “ID” or “polling”, choose another topic, or clear all filters.'));
      const reset = make('button', 'button button-outline', 'Clear all filters'); reset.type = 'button';
      reset.addEventListener('click', resetResources); empty.append(reset); nodes.push(empty);
    } else if (state && !local.length) nodes.unshift(make('p', 'resource-group-label', 'No ' + state.name + ' resources match these filters. Clear filters to see the state tools.'));
    $('resource-grid').replaceChildren(...nodes);
    $('result-count').textContent = state ? `${local.length} ${state.name} + ${national.length} national resources` : `${national.length} national resources`;
    const gaSection = $('georgia-dates');
    if (gaSection) gaSection.hidden = state?.code !== 'GA';
  }
  function resetResources() {
    stateSelect.value = ''; queryInput.value = ''; category = 'all';
    filterButtons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.category === 'all')));
    renderResources(); stateSelect.focus();
  }
  stateSelect.addEventListener('change', renderResources); queryInput.addEventListener('input', renderResources);
  filterButtons.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.category; filterButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button))); renderResources();
  }));
  $('reset').addEventListener('click', resetResources);
  const menu = $('menu'), nav = $('nav');
  function setMenu(open) {
    nav.classList.toggle('open', open); menu.textContent = open ? '✕' : '☰';
    menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true'; setMenu(open);
    if (open) nav.querySelector('a').focus();
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header') && menu.getAttribute('aria-expanded') === 'true') setMenu(false); });
  matchMedia('(min-width: 801px)').addEventListener('change', () => setMenu(false));

  // Keep the hub short: one major work area open at a time.
  const collapsibleSpecs = [
    ['resources', '.section-header', 'More voter information', 'Search state-by-state and national voter-help tools'],
    ['georgia-dates', '.calendar-heading', 'Georgia dates', 'Key 2026 Georgia election dates and official sources'],
    ['toolkit', '.section-header', 'Chapter toolkit', 'Current-week actions, approved copy and graphics'],
    ['report', '.section-header', 'Report impact', 'Use the correct individual, chapter or event route']
  ];
  const collapsibles = new Map();
  function setSectionExpanded(id, expanded, scroll = false) {
    const entry = collapsibles.get(id); if (!entry) return;
    if (expanded) {
      collapsibles.forEach((other, otherId) => {
        if (otherId !== id) {
          other.section.classList.add('is-collapsed');
          other.button.setAttribute('aria-expanded', 'false');
          other.body.hidden = true;
          other.button.querySelector('.section-toggle-state').textContent = 'Open';
        }
      });
    }
    entry.section.classList.toggle('is-collapsed', !expanded);
    entry.body.hidden = !expanded;
    entry.button.setAttribute('aria-expanded', String(expanded));
    entry.button.querySelector('.section-toggle-state').textContent = expanded ? 'Close' : 'Open';
    if (expanded && scroll) entry.section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  collapsibleSpecs.forEach(([id, headerSelector, label, hint]) => {
    const section = $(id); if (!section) return;
    const container = section.querySelector('.wrap') || section;
    const header = container.querySelector(headerSelector); if (!header) return;
    const body = make('div', 'section-collapsible-body'); body.id = id + '-body';
    while (header.nextSibling) body.append(header.nextSibling);
    const button = make('button', 'section-toggle'); button.type = 'button';
    button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-controls', body.id);
    button.innerHTML = '<span><strong>' + label + '</strong><small>' + hint + '</small></span><span class="section-toggle-state">Open</span>';
    container.append(button, body);
    section.classList.add('collapsible-section', 'is-collapsed'); body.hidden = true;
    collapsibles.set(id, { section, button, body });
    button.addEventListener('click', () => setSectionExpanded(id, button.getAttribute('aria-expanded') !== 'true'));
  });
  function openHashSection(hash, scroll = false) {
    const id = String(hash || '').replace('#','');
    const target = document.getElementById(id);
    const sectionId = collapsibles.has(id) ? id : target?.closest('.collapsible-section')?.id;
    if (sectionId) setSectionExpanded(sectionId, true, scroll);
  }
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => openHashSection(link.getAttribute('href'))));
  window.addEventListener('hashchange', () => openHashSection(location.hash));
  openHashSection(location.hash);

  let today = workflow.dateKey(), chosenWeek = workflow.currentWeek(toolkit.weeks, today).number, manualWeek = false;
  function highlightedText(text) {
    const fragment = document.createDocumentFragment();
    text.split(/(\[[^\]]+\])/g).forEach(part => fragment.append(part.startsWith('[') ? make('mark', '', part) : document.createTextNode(part)));
    return fragment;
  }
  function copyBlock(label, text, weekNumber) {
    const box = make('section', 'template-block'), heading = make('div', 'template-heading');
    const button = make('button', 'button button-outline', 'Copy ' + label.toLowerCase()); button.type = 'button';
    const content = make('div', 'template-text'); content.append(highlightedText(text));
    heading.append(make('h4', '', label), button); box.append(heading, content);
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(text);
        announce(label + ' copied. Replace every [BRACKETED] placeholder before sharing.');
        interaction('toolkit_copy', 'week-' + weekNumber + '-' + label.toLowerCase().replaceAll(' ', '-'));
      } catch {
        let field = box.querySelector('textarea');
        if (!field) {
          const label = make('label', 'manual-copy-label', 'Copy manually — select this text and use your device’s Copy command.');
          field = make('textarea', 'manual-copy'); field.readOnly = true; field.value = text; field.rows = 7; label.append(field); box.append(label);
        }
        field.focus(); field.select(); announce('Clipboard access unavailable. Text selected for manual copying.');
      }
    });
    return box;
  }
  function selectWeek(number, focus = false) {
    const retainFocus = document.activeElement?.closest('#week-list');
    chosenWeek = number; manualWeek = true; renderToolkit();
    if (retainFocus) document.querySelector('.week-choice[aria-pressed=true]').focus({ preventScroll: true }); interaction('toolkit_week', 'week-' + number);
    if (focus) $('week-title').focus({ preventScroll: true });
  }
  function renderToolkit() {
    const week = toolkit.weeks.find(item => item.number === chosenWeek), list = $('week-list'), select = $('week-select');
    list.replaceChildren(); select.replaceChildren();
    toolkit.weeks.forEach(item => {
      const status = workflow.status(item, today), option = make('option', '', `Week ${item.number} · ${item.period} · ${status}`);
      option.value = item.number; option.selected = item.number === chosenWeek; select.append(option);
      const button = make('button', 'week-choice'); button.type = 'button';
      button.setAttribute('aria-pressed', String(item.number === chosenWeek));
      if (status === 'Current week') button.setAttribute('aria-current', 'date');
      button.append(make('span', 'week-choice-meta', `Week ${item.number} · ${item.period}`), make('span', 'week-choice-title', item.title), make('span', 'week-status', status));
      button.addEventListener('click', () => selectWeek(item.number)); list.append(button);
    });
    const detail = $('week-detail'); detail.replaceChildren();
    const h3 = make('h3', '', week.title); h3.id = 'week-title'; h3.tabIndex = -1;
    detail.append(make('p', 'kicker', `Week ${week.number} · ${week.period} · ${workflow.status(week, today)}`), h3);
    if (workflow.status(week, today) === 'Completed') detail.append(make('p', 'archive-note', week.number === 12 && workflow.phase(today) === 'reporting' ? 'Archived campaign message — review dates before reuse. Reporting and documentation remain available below.' : 'Archived week — these messages refer to past dates. Use the current week for today’s work.'));
    detail.append(make('h4', '', 'Chapter actions'), make('p', 'week-action', week.action.replace(/^(This week|Today):\s*/, '')));
    const assets = make('div', 'asset-links');
    week.assets.forEach(asset => { const a = external(asset.label, asset.url, 'asset-link'); a.addEventListener('click', () => interaction('toolkit_asset', 'week-' + week.number)); assets.append(a); });
    detail.append(make('h4', '', 'Approved graphics'), assets);
    if (week.number === 9) detail.append(make('p', 'fine-print', 'The source toolkit pairs this week with last-day graphics. Save those graphics for the verified last day of early voting (October 30 in Georgia).'));
    if (week.number === 7) detail.append(make('p', 'fine-print', 'The toolkit says the drone video will be shared by national. A verified video link has not been supplied; request it from NAASC.'));
    const expiredCaption = (week.number === 8 && today > '2026-10-17') || (week.number === 9 && today > '2026-10-24');
    if (expiredCaption) detail.append(make('p', 'archive-note', 'The Saturday named in this approved caption has passed. This caption is retained for the archive; use verified current dates for any new outreach.'));
    if (week.number === 6 && today === '2026-10-05') detail.append(make('p', 'archive-note', 'Georgia’s registration deadline is today. The approved message below says it has passed; save that message until after October 5.'));
    week.captions.forEach(caption => detail.append(copyBlock(expiredCaption ? 'Archived ' + caption.label.toLowerCase() : caption.label, caption.text, week.number)));
    const email = make('details', 'email-template'); email.append(make('summary', '', 'Chapter email · read and copy'), copyBlock('Email', week.email, week.number)); detail.append(email);
    $('week-announcement').textContent = `Showing week ${week.number}: ${week.title}. ${workflow.status(week, today)}.`;
  }
  $('week-select').addEventListener('change', event => selectWeek(Number(event.target.value)));
  $('current-week-button').addEventListener('click', () => selectWeek(workflow.currentWeek(toolkit.weeks, today).number, true));
  $('current-week-link').addEventListener('click', () => selectWeek(workflow.currentWeek(toolkit.weeks, today).number));
  $('hero-secondary').addEventListener('click', () => {
    if ($('hero-secondary').getAttribute('href') === '#toolkit') selectWeek(workflow.currentWeek(toolkit.weeks, today).number);
  });
  function updateCampaign() {
    const nextToday = workflow.dateKey(), changed = today !== nextToday; today = nextToday;
    const phase = workflow.phase(today), current = workflow.currentWeek(toolkit.weeks, today);
    document.body.dataset.phase = phase;
    $('now-label').textContent = phase === 'reporting' ? 'AFTER THE ELECTION · THANK & REPORT' : 'YOUR NEXT CHAPTER TASK · ' + current.period.toUpperCase();
    $('now-title').textContent = phase === 'reporting' ? 'Thank your people. Document the work.' : current.title;
    $('now-action').textContent = phase === 'reporting' ? 'Gather chapter activities, volunteer contributions and permission-cleared stories. Report individual activity, request the chapter reporting link and follow your election office for any further elections.' : current.action.replace(/^(This week|Today):\s*/, '');
    $('current-week-link').textContent = phase === 'reporting' ? 'Get thank-you materials ↓' : 'Open week ' + current.number + ' materials ↓';
    $('current-week-button').textContent = phase === 'reporting' ? 'Show thank & report' : 'Show current week';
    $('hero-primary').href = phase === 'reporting' ? '#report' : '#voter-tools';
    $('hero-primary').textContent = phase === 'reporting' ? 'Report campaign activity ↓' : 'I need voting help ↓';
    $('hero-secondary').href = phase === 'reporting' ? '#toolkit' : '#organizer-tools';
    $('hero-secondary').textContent = phase === 'reporting' ? 'Get thank-you materials ↓' : 'I’m helping others vote ↓';
    // Campaign artwork is the approved static NAASC graphic; do not rewrite it dynamically.
    $('calendar-title').textContent = phase === 'reporting' ? 'Georgia · 2026 election archive' : 'Georgia, at a glance';
    const gaToday = workflow.dateKey(new Date(), 'America/New_York');
    // Campus-only event is shown in its published 2026 window, then automatically retired.
    const campusAction = $('campus-oct27');
    if (campusAction) campusAction.hidden = gaToday < '2026-10-18' || gaToday > '2026-10-27';
    document.querySelectorAll('[data-deadline]').forEach(node => { node.textContent = gaToday > node.dataset.deadline ? 'Passed' : 'Upcoming deadline'; });
    $('early-status').textContent = gaToday > '2026-10-30' ? 'Ended' : gaToday < '2026-10-13' ? 'Upcoming' : 'Open · confirm local hours';
    if (changed && !manualWeek) chosenWeek = current.number;
    if (changed) renderToolkit();
  }
  document.querySelectorAll('[data-report]').forEach(link => link.addEventListener('click', () => interaction('report_open', link.dataset.report)));
  document.addEventListener('visibilitychange', () => { if (!document.hidden) updateCampaign(); });
  window.addEventListener('focus', updateCampaign); setInterval(updateCampaign, 60000);
  renderResources(); renderToolkit(); updateCampaign();
})();
