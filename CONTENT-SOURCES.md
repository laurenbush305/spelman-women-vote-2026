# Content provenance and verification

Reviewed October 19, 2026 (America/New_York); execution clock confirmed October 20 UTC, still October 19 locally. Check election authorities again as dates approach. This record distinguishes source verification from network reachability.

## Campaign and toolkit

- Official NAASC campaign: https://www.naasc.org/gotv — confirms nonpartisan purpose, individual tracker destination and `gotv@naasc.org`. Its chapter pathway currently says resources are coming soon; no public chapter outcome form was confirmed.
- Approved source document: https://docs.google.com/document/d/1uzZdXtZW6-VGRcDTm_c-iu8brSy98C6sugkfA1qkRqU/edit?usp=sharing — fetched through connected Google Drive and public HTML export. Weeks 4–12, actions, captions and emails were extracted; message wording and placeholders are preserved. Only the “This week:”/“Today:” label is removed from the displayed action paragraph, since the interface already labels the week.
- Asset folder: https://drive.google.com/drive/folders/1tgsMBSS35WhBrxZ95u8IwD92EoxlEbcN — returned “Toolkit Assets - Google Drive”. All 20 file links in the document returned matching PNG file titles and HTTP 200. Official graphics remain at the supplied Drive URLs; none were recreated.
- Week 9's approved graphics say last day/last chance, though its caption concerns October 24. The UI preserves those links and warns to save last-day graphics for the verified deadline. Saturday captions get a dated/archived warning after their stated Saturday; the October 5 “registration has passed” message gets a same-day caution. Earlier weeks are archived, not erased or silently rewritten.
- Original toolkit retains longer letters, press releases and three anytime graphics. The drone video is mentioned but has no actual source URL; the UI explains this missing dependency.

## State election directory

All 50 states and DC were retrieved from the U.S. Election Assistance Commission's state-specific source listings:
https://www.eac.gov/voters/register-and-vote-in-your-state

Each record in `public/data/states.js` stores the exact EAC query URL, official office, available task-specific links, review date and automated access limitations. The EAC warns that summaries must be checked with state/local officials. We extract links, not its potentially stale deadlines. No state voting rules or dates are inferred.

316 unique election/asset URLs were checked initially: 226 returned 200, 75 returned 403, 7 returned 302 responses not completed by the checker, 2 returned 405, 4 were unconfirmed because of transport/timeouts, and 2 returned 404. The full public-source evidence is in `qa/source-link-checks.json`. A 403/405/timeout is an **unconfirmed automated check**, not a successful content review or an assertion of a broken voter portal. Cards whose routes were access-limited say so. The federal source-listing link remains available with every state selection.

Two confirmed broken paths were replaced: Florida registration `/home` → official registration guidance, and Iowa's former voter information index → current Iowa election/voter pages. Successful redirects were normalized to their final HTTPS URLs. Missing topic links visibly route to the named election authority; they are not presented as customized rules.

Additional primary sources independently opened for direct topic access:

- New York early voting: https://elections.ny.gov/early-voting
- New York voter rights/identification: https://elections.ny.gov/know-your-rights
- Florida registration: https://dos.fl.gov/elections/for-voters/voter-registration/register-to-vote-or-update-your-information/
- Florida early voting: https://dos.fl.gov/elections/for-voters/voting/early-voting-and-secure-ballot-intake-stations/
- Florida mail ballots: https://dos.fl.gov/elections/for-voters/voting/vote-by-mail/
- Florida Election Day/ID: https://dos.fl.gov/elections/for-voters/voting/election-day-voting/
- Florida county offices: https://dos.elections.myflorida.com/supervisors/
- Iowa elections: https://sos.iowa.gov/elections-voting
- Iowa registration: https://sos.iowa.gov/voters/voter-registration
- Iowa ID: https://sos.iowa.gov/voters/voter-id-faq

Sample ballots and identification for other jurisdictions may need the election authority's menu or local office. The interface explicitly labels that fallback rather than inventing a deep link.

## Georgia calendar

Primary sources:

- SOS calendar landing page: https://sos.ga.gov/page/election-calendar-and-events
- Full 2026 SOS calendar: https://sos.ga.gov/sites/default/files/forms/2026%20Elections%20Calendar_0.pdf — pages 1, 15–16 (one-based).
- State election guide: https://georgia.gov/georgia-election-guide
- Absentee process, eligibility, application/signature/ID and return instructions: https://georgia.gov/vote-absentee-ballot
- Election Day hours and standard absentee receipt: https://georgia.gov/events/2026-11-03/election-day-general-election
- ID guidance: https://sos.ga.gov/page/georgia-voter-identification-requirements
- Military/overseas exceptions: https://www.fvap.gov/georgia

Verified for the November general election: registration October 5; advance voting October 13–30; required Saturdays October 17 and 24; absentee application receipt October 23; Election Day November 3, 7 a.m.–7 p.m.; standard domestic voted-ballot receipt by 7 p.m. November 3. Registered Georgia voters need no excuse for absentee voting. Application receipt and ballot receipt are distinct; mailing on the deadline does not satisfy receipt. All dates are labeled **Georgia only**, and county hours/locations remain with the county authority. Military/overseas voters are directed to the applicable exception guidance.

## Reporting and help

- Individual form: https://www.naasc.org/form-gotv-individual-impact-tracker — HTTP 200, correct title; official campaign page links it; includes the embedded tracker. No test submissions made.
- Events: https://form.jotform.com/262627910635056 — HTTP 200, title “Chapter Event Submission Form”, fields include chapter/region, event details and flyer. This existing project destination was retained after verifying its purpose. Public campaign page did not independently establish ownership of this separate form; national confirmation remains recommended before broad circulation.
- Chapter outcomes: no authoritative public URL located. `mailto:gotv@naasc.org` prepares a request for the link and deadline; opening it does not submit a report and the site does not send email.
- Voting support: https://866ourvote.org/ confirms nonpartisan Election Protection. Existing telephone route is retained.

## Branding and data

Temporary S monogram retained with explicit README disclosure. No official seals, endorsements, fabricated graphics, impact totals, or performance dashboards were created. The new social preview is a typographic **resource-hub preview**, not an official campaign asset. No campaign participation dataset was supplied. Website interactions cannot substantiate votes, registrations or campaign outcomes.

## Public partner recruitment reconciliation · October 19, 2026

- Dedicated signup: https://www.powerthepolls.org/naasc — HTTP 200 and a rendered signup form whose consent names the National Alumnae Association of Spelman College, Inc. (NAASC). No form submitted. Replaces the generic recruitment destination.
- Public graphic provenance: Power the Polls / Civic Alliance, *Employee Engagement Through Poll Working* (2025), pp. 14–15: https://45615907.fs1.hubspotusercontent-na1.net/hubfs/45615907/Employee%20Engagement%20Through%20Poll%20Working%20%282025%29.pdf . The toolkit describes its materials as evergreen. Only the undated “Help your neighbors vote” and “Don’t just vote, serve” recruitment artwork is included. No 2025 event dates or statistics are carried into 2026 copy.
- Verified original public graphic links: https://drive.google.com/file/d/13wgzVMfePpOg4Vp02aNfA-jma4iiVjtf/view and https://drive.google.com/file/d/1HKagOdcMj8LL1Xq_m75wskqWmxix4u-V/view — both returned HTTP 200 image/jpeg and were visually inspected. The repository retains the original bytes with descriptive alt text. The hosting CDN recompresses JPEG previews; download buttons therefore use the public Drive attachment endpoints to deliver unmodified artwork. Include NAASC’s dedicated signup when sharing these images.
- Public graphics and NAASC signup were approved for outreach in the internal Partnerships review. Private correspondence, county staffing inventories, source identifiers and tracked recipient URLs are maintained separately and are excluded from this public repository and build. Staffing status is not used to infer voter polling locations.
- **VOTE411 custom NAASC page launched October 26, 2026:** https://www.vote411.org/naasc . Juliette Boberg, Director of Corporate and Organizational Partnerships at the League of Women Voters of the US, delivered the live page to Lauren after the signed agreement and official NAASC logo packet were received. The custom route is now enabled in `public/data/partners.js`; prior documentation saying the route was pending is superseded. Source receipt: Lauren's October 26 League email (Gmail message 1a179f16c954cd60).
