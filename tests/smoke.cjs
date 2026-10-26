const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const base = process.env.SMOKE_URL || 'http://127.0.0.1:4173';
const output = process.env.SMOKE_OUTPUT || 'test-results';
fs.mkdirSync(output, { recursive: true });
let checks = 0;
function ok(value, message) { assert.ok(value, message); checks++; }
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  const context = await browser.newContext({ timezoneId: 'America/New_York', permissions: ['clipboard-read', 'clipboard-write'], reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [], failures = [], offsite = [], accessibility = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('response', response => { if (response.status() >= 400) failures.push([response.status(), response.url()]); });
  page.on('requestfailed', request => failures.push(request.url()));
  page.on('request', request => { if (new URL(request.url()).origin !== new URL(base).origin) offsite.push(request.url()); });
  await page.clock.install({ time: new Date('2026-10-19T16:00:00-04:00') });
  await page.goto(base, { waitUntil: 'networkidle' });
  ok(await page.title() === 'Spelman Women Vote | 2026 Chapter Resource Hub', 'page title');
  for (const asset of ['robots.txt','sitemap.xml','assets/social-card.png','favicon.svg']) {
    const response = await page.request.get(new URL(asset, base).href);
    ok(response.ok(), 'public metadata asset '+asset);
  }
  ok(await page.locator('link[rel=canonical]').getAttribute('href') === 'https://spelman-women-vote-2026.onrender.com/', 'canonical production URL');
  ok(await page.evaluate(() => { const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);return new Set(ids).size===ids.length; }), 'unique element IDs');
  ok(await page.locator('#state option').count() === 52, 'all 51 state choices plus national');
  ok(await page.locator('#week-title').textContent() === 'Keep Early Voting Going', 'October 19 current week');
  ok(await page.locator('#resource-grid a[href="https://www.vote411.org/naasc"]').count() === 1, 'custom NAASC VOTE411 partner page is active');
  ok(await page.locator('#resource-grid a[href="https://www.powerthepolls.org/naasc"]').count() === 1, 'dedicated NAASC recruitment route');
  await page.click('[data-category=pollworkers]');
  ok(await page.locator('#resource-grid .resource-card').count() === 3, 'separate recruitment filter');
  ok(await page.locator('.recruitment-graphic').count() === 2, 'two original public recruitment graphics');
  for (const link of await page.locator('.graphic-download').all())
    ok((await link.getAttribute('href')).startsWith('https://drive.google.com/uc?export=download&id='), 'original download bypasses CDN recompression');
  for (const img of await page.locator('.recruitment-graphic').all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(el => el.decode());
    ok(await img.evaluate(el => el.naturalWidth > 0 && el.alt.length > 30), 'graphic loads with descriptive alternative text');
  }
  ok((await page.locator('#resource-grid').textContent()).includes('To find where to cast your own ballot'), 'worker and voter tasks distinguished');
  await page.selectOption('#state','GA'); await page.click('[data-category=voting]');
  ok(await page.locator('#resource-grid .recruitment-graphic').count() === 0, 'voter options exclude recruitment');
  ok(await page.getByRole('heading',{name:'Georgia: Polling places and hours',exact:true}).isVisible(), 'official polling-place tool retained');
  await page.click('#reset');
  const states = await page.evaluate(() => SWV_STATES.map(s => ({ code: s.code, name: s.name })));
  for (const state of states) {
    await page.selectOption('#state', state.code);
    ok(await page.locator('[data-scope=state]').count() === 8, state.name + ' has eight state tasks');
    ok((await page.locator('#state-context').textContent()).includes(state.name), state.name + ' heading');
    ok((await page.locator('[data-scope=state] a').first().getAttribute('href')).startsWith('https://'), state.name + ' secure authority');
  }
  for (const state of ['NY', 'FL']) {
    await page.selectOption('#state', state); await page.fill('#query', 'mail'); await page.click('[data-category=voting]');
    ok(await page.locator('[data-scope=state]').count() === 1, state + ' combined topic and keyword');
    ok((await page.locator('[data-scope=state] h3').textContent()).includes('Absentee and mail'), state + ' relevant mail result');
    await page.click('#reset');
  }
  await page.fill('#query', 'no-such-resource-zzzz');
  ok(await page.locator('.empty').isVisible(), 'helpful empty state');
  await page.locator('.empty button').click();
  ok(await page.inputValue('#state') === '' && await page.inputValue('#query') === '', 'reset clears all filters');
  const internals = await page.locator('a[href^="#"]').evaluateAll(links => links.map(a => a.getAttribute('href')).filter(h => !document.getElementById(h.slice(1))));
  ok(internals.length === 0, 'all internal anchors resolve');
  ok(await page.locator('[data-report=chapter-request]').getAttribute('href').then(v => v.startsWith('mailto:gotv@naasc.org')), 'chapter pathway requests correct link');
  ok(await page.locator('[data-report=individual]').getAttribute('href').then(v => v === 'https://www.naasc.org/form-gotv-individual-impact-tracker'), 'individual destination');
  ok(await page.locator('[data-report=event]').getAttribute('href').then(v => v === 'https://form.jotform.com/262627910635056'), 'event destination');
  await page.evaluate(() => { window.testEvents = []; window.addEventListener('swv:interaction', e => window.testEvents.push(e.detail)); });
  for (const width of [320,390,768,1440]) {
    await page.setViewportSize({width,height:900});
    ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no overflow at ' + width);
    if (width <= 800) {
      await page.click('#menu'); ok(await page.getAttribute('#menu','aria-expanded') === 'true', 'mobile menu opens at '+width);
      ok(await page.locator('#nav a').first().evaluate(el=>el===document.activeElement),'mobile menu moves focus to first link');
      await page.keyboard.press('Escape'); ok(await page.getAttribute('#menu','aria-expanded') === 'false', 'Escape closes menu');
      await page.click('#menu'); await page.locator('#nav a[href="#toolkit"]').click();
      ok(await page.getAttribute('#menu','aria-expanded') === 'false', 'mobile anchor closes menu');
      await page.selectOption('#week-select','9');
    } else await page.locator('.week-choice').filter({hasText:'Week 9 ·'}).click();
    await page.addScriptTag({path: require.resolve('axe-core/axe.min.js')});
    let axe = await page.evaluate(() => window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}));
    accessibility.push({width,violations:axe.violations});
    fs.writeFileSync(path.join(output, 'axe-'+width+'.json'),JSON.stringify(axe,null,2));
    ok(axe.violations.length === 0, 'axe at '+width+': '+axe.violations.map(v=>v.id).join(','));
    await page.evaluate(() => scrollTo(0,0));
    await page.screenshot({path:path.join(output,'page-'+width+'.png'),fullPage:true});
    await page.locator('#toolkit').scrollIntoViewIfNeeded();
    await page.screenshot({path:path.join(output,'toolkit-'+width+'.png')});
  }
  await page.setViewportSize({width:390,height:844});
  for (let number=4;number<=12;number++) {
    await page.selectOption('#week-select',String(number));
    const expected=await page.evaluate(n=>SWV_TOOLKIT.weeks.find(w=>w.number===n),number);
    ok(await page.locator('#week-title').textContent() === expected.title, 'week '+number+' detail');
    const buttons=page.locator('#week-detail .template-block button');
    for(let i=0;i<expected.captions.length;i++) {
      await buttons.nth(i).click();
      ok(await page.evaluate(()=>navigator.clipboard.readText()) === expected.captions[i].text, 'exact approved caption copied week '+number);
    }
    await page.locator('.email-template summary').click();
    await page.locator('.email-template button').click();
    ok(await page.evaluate(()=>navigator.clipboard.readText()) === expected.email, 'exact approved email copied week '+number);
  }
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(new Error('test denied'))}}));
  await page.locator('#week-detail .template-block button').first().click();
  ok(await page.locator('textarea.manual-copy').isVisible(), 'manual clipboard fallback');
  ok((await page.locator('#toast').textContent()).includes('manual'), 'copy failure announced');
  const events = await page.evaluate(()=>window.testEvents);
  ok(events.some(e=>e.action==='toolkit_copy') && events.every(e=>Object.keys(e).sort().join(',')==='action,item'), 'minimal privacy event schema');
  for (const state of ['NY','FL']) {
    await page.selectOption('#state',state);
    const axe=await page.evaluate(()=>window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}));
    ok(axe.violations.length===0,'state '+state+' accessibility');
  }
  await page.selectOption('#week-select','11');await page.locator('.email-template summary').click();
  const expandedAxe=await page.evaluate(()=>window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}));
  ok(expandedAxe.violations.length===0,'expanded Election Day email accessibility');
  // Returning to current work from an archived week.
  await page.selectOption('#week-select','4'); await page.click('#current-week-button');
  ok(await page.locator('#week-title').textContent() === 'Keep Early Voting Going','return to current week');
  for (const [date,title,phase] of [
    ['2026-09-01','Rally Your Chapter','outreach'],['2026-10-26','Final Countdown','outreach'],['2026-11-03','Election Day','election'],['2026-11-04','Thank & Report','reporting'],['2026-11-14','Thank & Report','reporting'],['2027-01-01','Thank & Report','reporting']]) {
    const p=await context.newPage(); await p.clock.install({time:new Date(date+'T12:00:00-05:00')}); await p.goto(base);
    ok(await p.locator('#week-title').textContent()===title,'date '+date+' week');
    ok(await p.locator('body').getAttribute('data-phase')===phase,'date '+date+' phase');
    if(phase==='reporting') {
      ok(await p.locator('#hero-primary').getAttribute('href')==='#report','post-election reporting CTA');
      ok((await p.locator('#calendar-title').textContent()).includes('archive'),'post-election dates archived');
    }
    await p.close();
  }
  const midnight=await context.newPage(); await midnight.clock.install({time:new Date('2026-11-03T23:59:30-05:00')});await midnight.goto(base);
  await midnight.clock.fastForward(65000);
  ok(await midnight.locator('body').getAttribute('data-phase')==='reporting','open page updates after midnight');await midnight.close();
  const dated=await context.newPage(); await dated.clock.install({time:new Date('2026-10-25T12:00:00-04:00')});await dated.goto(base);
  ok((await dated.locator('#week-detail .archive-note').textContent()).includes('Saturday'),'expired Saturday caption is labeled');await dated.close();
  // Keyboard skip link and visible focus.
  await page.goto(base);await page.keyboard.press('Tab');ok(await page.locator('.skip').evaluate(el=>el===document.activeElement),'skip link first in tab order');
  await page.keyboard.press('Enter');ok(await page.evaluate(()=>location.hash==='#main'),'skip link reaches main');
  ok(errors.length===0,'no console/page errors: '+errors.join('; '));
  ok(failures.length===0,'no failing site requests: '+JSON.stringify(failures));
  ok(offsite.length===0,'no third-party runtime requests: '+offsite.join('; '));
  const result={url:base,checks,errors,failures,thirdPartyRequests:offsite,axe:accessibility.map(a=>({width:a.width,violations:a.violations.length})),testedAt:new Date().toISOString()};
  fs.writeFileSync(path.join(output,'smoke-results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
  await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
