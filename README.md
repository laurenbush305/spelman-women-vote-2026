# Spelman Women Vote 2026 · Chapter Resource Hub

Live: **https://spelman-women-vote-2026.onrender.com/**

A plain HTML/CSS/JavaScript site for NAASC chapter leaders. No runtime packages, database, voter-record collection, third-party font requests or analytics service. Search and filters stay on the device.

## Verified release

Source commit `f088fc0a7698bb55b23672902a4fed52033cedb4` is live on the existing Render service (October 19, 2026). Production acceptance: 253 browser assertions and 14 unit tests passed; mobile Lighthouse 95 Performance / 100 Accessibility / 100 Best Practices / 100 SEO. See `AUDIT-AND-LAUNCH-REPORT.md` and `qa/` for evidence and limits.

**Operational dependency:** Auto-deploy is configured on, but this push produced no automatic deploy event after waiting. The verified release was deployed with a cache-cleared API request on the same service. Confirm/repair the Git-provider webhook connection in an authenticated Render session before relying on the next push to deploy itself. The connected tools cannot repair that connection, and the available dashboard browser is signed out. Do not change hosting or silently treat a push as deployment success.

## Hosting and release

- Repository: https://github.com/laurenbush305/spelman-women-vote-2026
- Existing Render static service: `srv-dbb932gm7kps73ekc830`
- Dashboard: https://dashboard.render.com/static/srv-dbb932gm7kps73ekc830
- Branch: `main`; automatic deploy on commit; publish directory: `public`.
- Existing Render build command: `mkdir -p public && cp index.html styles.css app.js favicon.svg public/`.

The four original page files remain at the repository root. **Supporting data, fonts, social image, sitemap and robots file are versioned inside `public/`** so the existing build command includes them without changing the service. Do not delete or ignore all of `public/`. Only the four generated copies are ignored. `sh scripts/build.sh` mirrors the production build and checks required assets. Serve `public/`, not the repository root. Do not introduce another hosting pipeline.

## Local preview

```sh
sh scripts/build.sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory public
```

Open http://127.0.0.1:4173. Node is needed only for tests.

## Tests

Use Node 22+ and install the pinned **development-only** packages with `pnpm install --frozen-lockfile`. Then:

```sh
pnpm exec playwright install chromium
pnpm run test:unit
# With the static server running in a second terminal:
pnpm run test:smoke
```

To use installed Chrome instead of downloading Chromium:

```sh
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" pnpm run test:smoke
```

For deployed acceptance testing, set `SMOKE_URL=https://spelman-women-vote-2026.onrender.com/`. The smoke test exercises all states, filters, all approved copy text, mobile navigation, clipboard denial, internal anchors, keyboard focus, date boundaries, live midnight rollover, request/console failures and Axe at 320/390/768/1440 pixels. Results and screenshots go to ignored `test-results/` (override with `SMOKE_OUTPUT`). No forms are submitted. It tests clipboard writes in the isolated test browser.

Measure mobile Lighthouse rather than assuming a score:

```sh
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" pnpm exec lighthouse http://127.0.0.1:4173 --output=json --output-path=test-results/lighthouse.json --chrome-flags="--headless --no-sandbox"
```

Review layout screenshots, keyboard behavior and content in addition to automated scores. Emulated viewports are not physical-device or assistive-technology user testing.

## Content maintenance

- `public/data/states.js`: 50 states + DC, official election links, EAC provenance, source-review date, automated-check limitations and additional verified links. Each selected state gets eight task routes. Where a topic URL is unavailable, the card explicitly opens the authority's website. No inferred voting rules or deadlines.
- `public/data/resources.js`: national nonpartisan resources. Keep national and state-specific scope separate.
- `public/data/toolkit.js`: approved weeks 4–12, actions, exact captions/emails, real Drive assets and source document. Do not edit approved message text without an updated approved source. Preserve `[BRACKETS]` and conditional lines.
- `public/data/workflow.js`: date functions shared with tests. Week selection follows the visitor's local calendar. Georgia deadline labels follow America/New_York. The open page refreshes date-dependent content every minute and on focus. November 4 changes the priority to reporting and thank-you materials; after November 13 the thank-you material remains explicitly archived.
- `index.html`: curated Georgia calendar, stable reporting/help links and page metadata. Confirm any election-date change against official state sources and update its review date.
- `styles.css`: existing editorial brand foundation plus accessibility and workflow refinements.
- `public/assets/fonts/`: locally hosted DM Sans / DM Serif Display Latin fonts; SIL Open Font License notices included.
- `scripts/social-card.html`: reproducible typographic social-preview source. Capture it at 1200×630 after fonts load to update `public/assets/social-card.png`. This is a site preview, not an approved campaign graphic or institutional logo.

Review official election links frequently during the campaign, especially on deadline days. Check both destination status and meaning; HTTP 200 alone is not content verification. Some government portals block automated checks. Retain the federal source route and flag uncertainty; never treat a blocked request as proof that a page is broken. See `CONTENT-SOURCES.md` and `qa/source-link-checks.json`.

## Reporting and privacy

- Individual: https://www.naasc.org/form-gotv-individual-impact-tracker
- Chapter URL/deadline: unconfirmed. Keep the clearly labeled request email to **gotv@naasc.org**; never substitute the individual tracker.
- Events: https://form.jotform.com/262627910635056 — Chapter Event Submission Form; event listings do not establish campaign outcomes.
- Toolkit help: Marketing & PR lead listed in the approved document, **sommer@pocketpr.net**.

`EVALUATION-SPEC.md` defines website engagement separately from campaign impact. The browser emits optional `swv:interaction` events containing only an action and a fixed resource/week identifier. No listener stores or sends them in this release; there are no engagement totals to report. Enabling collection requires a deliberate privacy-reviewed implementation, matching notice and retention policy. Never forward query strings, clipboard content, voter details or identities to analytics.

## Safe release checklist

1. Check `git status` and pull/reconcile `main` before editing; preserve unrelated changes.
2. Verify source content and links. Run build, unit, browser and accessibility checks.
3. Commit descriptive changes and push to existing `main`.
4. In Render, locate the deploy for that exact commit and wait for **live**.
5. Run the smoke suite against the public URL; inspect newly added data/font/image requests. Run public Lighthouse and record actual results.
6. Update `AUDIT-AND-LAUNCH-REPORT.md` with commit/deploy evidence. A documentation-only follow-up may use `[skip render]` as supported by Render; distinguish it from the deployed site commit.

If a regression requires recovery, revert the affected change with a new commit and let the same service deploy it. Avoid force-pushing or changing auto-deploy settings. The original baseline is `0465e69` (initial live Render artifact was `509f82e`).

## Institutional dependencies

The S monogram is the pre-existing temporary mark, not a Spelman/NAASC seal. An authorized institutional mark and digital brand guidance remain to be supplied. The chapter reporting URL and national deadline, drone video link, and validated campaign totals are still institutional dependencies. No fake totals or replacement official graphics are published.

## Partner resources and future VOTE411 activation

Poll-worker opportunities have a dedicated topic and heading, separate from voter polling-place tools. The two original Power the Polls graphics are lazy-loaded local JPGs with download links; share them with `https://www.powerthepolls.org/naasc`. Preserve original artwork and provenance in `CONTENT-SOURCES.md`.

`public/data/partners.js` is the single future VOTE411 integration point. The current public VOTE411 guide remains active. After authorized staff complete onboarding and approve the organization/branding assets, obtain and verify the issued HTTPS VOTE411 URL. Set `url`, the three approval/completion flags, `verifiedAt` (YYYY-MM-DD), and `enabled: true` together in a reviewed release. Do not invent a slug, infer approval, or substitute a pending page. `workflow.vote411Url` requires every gate and an exact `vote411.org`/`www.vote411.org` HTTPS hostname; otherwise it retains the public guide. Update the allowlist only with independently verified official hosting evidence if a different official hostname is issued.

The private Partnerships portal and its dated staffing inventory are maintained in private Drive outside this repository. Never upload partner correspondence, county recruitment status, private source IDs, tracked links, or the private portal into source, public assets, screenshots or QA output. Public recruitment does not establish local vacancies or polling-place closure.
