# Audit and launch report

## Initial audit — October 19, 2026

Repository baseline: `0465e69`; clean `main`, tracking `origin/main`. Read all five site files and README before edits. Live site inspected with Playwright/Chrome at 320, 390, 768 and 1440 CSS pixels. No horizontal overflow at these widths. Preserve the plain static architecture, responsive editorial design, search/topic filters, three reporting pathways, skip link and existing hosting.

Findings:
- State selector includes all 51 jurisdictions, but 50 selections show the same generic national directory. Only Georgia has local resource cards. No source labels on cards.
- Toolkit shows only weeks 9–11; captions/emails and assets require leaving the site. Approved source contains weeks 4–12. Generic quick-copy text is not an approved toolkit excerpt.
- The active-week badge is corrected only at page load; no post-election toolkit or transition. Hero/calendar continue promoting the election after it passes.
- Georgia absentee application deadline and voted-ballot receipt deadline missing. Existing SOS general-election URL requires verification/replacement. Registration is permanently labeled passed.
- Chapter reporting correctly uses a request email; preserve it because no authoritative chapter form is confirmed. Event URL resolves to “Chapter Event Submission Form”; individual destination resolves to “GOTV Individual Impact Tracker — NAASC”. Do not submit forms during testing.
- Small card copy, metadata text and filter buttons need mobile readability/touch-target refinement. Test contrast, keyboard behavior, menu Escape and dynamic announcements.
- Missing canonical URL, social image, Twitter metadata, sitemap, robots file, evaluation specification and reusable browser tests. External Google fonts create extra requests.
- No invasive tracking or invented impact totals; preserve this. Add documented optional aggregate interaction instrumentation without automatic data collection.
- README contains obsolete alternate-host instructions and says toolkit cards must be manually updated. Replace with a source/QA/deploy maintenance guide.

The brief supplies baseline overall 7.5/10 and evaluation readiness 5.5/10. Other category assessments and final results will be recorded after testing; qualitative ratings are not Lighthouse measurements or a compliance certification.

## Implementation, verification and launch

In progress. Deployment not yet claimed.

## Implemented production pass

- Kept the original repository, static architecture, blue editorial identity, resource search/topics, useful reporting routes and Render service/build command.
- Added structured official resource records for 50 states + DC; state selection creates eight honest task routes (registration, status, early voting, absentee/mail, ID, sample ballot, polling and local help). National resources have a separate heading. Search/topic filters combine, reset is one action, and empty results explain recovery. Missing topic URLs explicitly open the named election authority.
- Brought all nine approved toolkit weeks (4–12) onto the page, with desktop week navigation, mobile select, objective/actions, 11 exact approved captions, 9 emails, highlighted placeholders, real Drive graphics, accessible copy feedback and manual clipboard fallback. Full original toolkit, press releases and asset-folder access remain. Completed/upcoming/current states are computed. Date-sensitive captions are labeled after their Saturday; a same-day registration warning prevents premature use of the source's “passed” message.
- Added an immediate chapter-task panel and date-driven Election Day/reporting priority; November 4 switches hero/actions to thanks/reporting, archives Georgia's calendar and keeps future election checks with authorities. Open pages update after midnight.
- Verified Georgia dates including October 23 application receipt and November 3 domestic voted-ballot receipt, clearly distinguished from each other; included signature/ID instruction links and military/overseas exception guidance. Georgia dates never become national dates.
- Preserved separate individual/chapter/event reporting, made the unconfirmed chapter link explicit and added a prefilled request (no automatic email). Added a reporting preparation checklist and `EVALUATION-SPEC.md`; no fake metrics or invasive analytics. Optional local-only interaction events have no collector.
- Improved small text, contrast, touch targets, focus, menu Escape/outside-close behavior, dynamic announcements, reduced motion and keyboard use. Added local fonts with licenses, canonical/social metadata, actual social image, robots and sitemap. No third-party requests on page load.
- Added repeatable browser/unit tests, pinned development dependencies, content provenance, link-check evidence, build instructions, maintenance ownership and release/recovery guidance.

## Pre-release tests and measurements

- Unit tests: **14 passed**, including all week start/end boundaries, pre-campaign, Election Day, post-election, archive and timezone handling.
- Browser acceptance: **253 assertions passed** in installed Chrome, all 51 state selections, individual and combined filters, empty/reset, all captions/emails copied byte-for-byte, manual clipboard fallback, reporting destinations, anchors/unique IDs, metadata assets, mobile menu and keyboard skip link, current-week selection, future dates and midnight rollover.
- Source-fidelity check: all **11 captions and 9 emails** match the approved document after whitespace normalization; wording/placeholders preserved.
- Viewports: **320, 390, 768 and 1440px**, no horizontal overflow. Actual rendered layouts/screenshots inspected. Axe: **zero WCAG 2/2.1/2.2 A/AA-tagged violations** at each width, plus New York/Florida filtered views and expanded Election Day email. Original Axe had six low-contrast labels.
- No browser console/page errors, failing site requests or third-party runtime requests in the smoke run. Important reporting pages and asset links were fetched; forms were not submitted.
- Initial public mobile Lighthouse (13.5.0): **88 Performance / 96 Accessibility / 100 Best Practices / 100 SEO**. FCP/LCP 2.91s, CLS 0.087, TBT 0ms.
- Final local mobile Lighthouse: **96 Performance / 100 Accessibility / 100 Best Practices / 100 SEO**. FCP 1.39s, LCP 2.37s, CLS 0, TBT 30ms. An earlier local run measured Performance 97; ordinary run variation is expected. Final public measurements follow deployment.
- These are lab measurements. Field Core Web Vitals at the 75th percentile and INP are **not available**; TBT is not INP. Automated accessibility checks plus keyboard/layout review do not establish full WCAG conformance or replace physical-device/screen-reader testing.
- Source link checks: 316 initial unique authority/asset URLs, 226 HTTP 200, 88 access/transport-limited, 2 HTTP 404. Replaced the two confirmed broken paths. All 20 supplied graphics + folder returned matching titles/200. Government anti-bot restrictions remain documented, not falsely marked verified.

## Remaining institutional/content dependencies

1. National confirmation of the chapter outcome-reporting URL and submission deadline. Functional request pathway remains; no individual-form substitution.
2. Explicit institutional confirmation of the existing separate Jotform event destination's ownership before broad circulation. It loads as the expected Chapter Event Submission Form; no submission was made.
3. Authorized official institutional mark and digital brand guidance. Temporary pre-existing S treatment remains; no seal imitation.
4. Drone activation video URL (source mentions it without a link).
5. Validated campaign outcome data and committee-owned denominators/deduplication. No invented totals, turnout claims or click-to-vote conversions.
6. Some official election portals limit automated access; verify with the linked election office when required. No unverified deadlines/rules for other states were published.

## Evaluation rubric

Qualitative product-readiness review, not measured Lighthouse scores or an institutional certification. The brief supplied **7.5/10 overall** and **5.5/10 evaluation readiness** before this pass; no other numeric baseline is claimed.

| Category | After implementation (10) | Basis / remaining limit |
|---|---:|---|
| Information architecture / chapter workflow | 9.5 | Current task, direct weekly materials and clear reporting routes |
| Visual design / responsive readability | 9.5 | Existing editorial identity retained; all required viewports checked |
| State directory usefulness | 9.0 | 51 official routes; some topic deep links require office navigation |
| Toolkit usefulness / freshness | 9.5 | Exact approved content, assets, archives and date transitions |
| Accessibility | 9.5 | Zero tagged Axe violations + keyboard review; no full assistive-tech study |
| Content accuracy / provenance | 9.2 | Official sources, clear dates and honest unresolved dependencies |
| Evaluation readiness | 9.0 | Definitions, data ownership and privacy plan; chapter endpoint/data still missing |
| QA / performance / maintainability | 9.5 | Repeatable tests and measured scores; production verification pending below |

Equal-weight implementation assessment: **9.3/10 overall**, up from the supplied 7.5. The remaining institutional dependencies prevent an unqualified claim of the 9.5 target.

## Deployment

Pre-release build and tests passed. Render workspace confirmed by user: `tea-db79n1ad0e5s73fpuv2g`. Existing service is connected to this repo's `main`, `autoDeploy=yes`, trigger `commit`, publish directory `public`. No hosting configuration was changed. Shell push access encountered a stale temporary `gh` credential-helper path; use the connected GitHub integration to publish the same tested tree. Exact release commit, terminal Render status and public verification will be recorded after deployment, not assumed from these local results.
