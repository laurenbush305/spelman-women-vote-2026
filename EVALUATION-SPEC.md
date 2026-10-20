# Evaluation specification · SWV 2026

This is a collection/validation plan, not a dashboard of achieved impact. No campaign totals or engagement counts have been supplied. NAASC's Technology, Data & Impact Committee should own campaign definitions, access and publication decisions; the public site must never expose internal chapter records by default.

## Website engagement (process measures)

| Indicator | Definition / unit | Source and limits |
|---|---|---|
| Resource opens | Activation of a resource link; count by fixed resource ID | Optional `swv:interaction`, action `resource_open`. Not confirmed completion of an outside task. |
| Toolkit week selections | A deliberate week selection; count by week | `toolkit_week`; not readership or outreach performed. Initial automatic display is excluded. |
| Copies | Successful Clipboard API write; count by week and template type | `toolkit_copy`; not a post, email sent, person reached or vote. Denied clipboard attempts are excluded. |
| Graphic opens | Clicks on supplied weekly graphics | `toolkit_asset`; not a completed download or published graphic. |
| Reporting referrals | Activations of individual, chapter-request, event pathways | `report_open`; not a submitted report. Chapter request opens an email client. |

The release emits local CustomEvents with **only `{action, item}`**. No listener persists, aggregates or transmits them. No analytics network calls, storage, cookies, fingerprinting, IDs or search logging are installed. Therefore the current site has no measured engagement totals.

If aggregate collection is later authorized, allowlist action/item combinations at the receiver; reject extra properties. Do not send raw URLs/query text, clipboard text, selected-state histories, identities or voter information. Honor browser privacy preferences; collect daily aggregate counters without identifiers, disable IP/request-body logging where feasible, publish an accurate notice, and delete raw events promptly (proposed maximum 30 days, subject to NAASC policy). Use coarse counts, not cross-site journeys. Do not enable an integration without updating this specification and the privacy notice. A static hub does not need a paid analytics service.

## Campaign impact (reported and validated outcomes)

| Indicator | Operational definition | Authoritative source / validation |
|---|---|---|
| Participating chapters | Distinct recognized chapters with at least one validated campaign activity report in the reporting period | NAASC approved chapter roster + confirmed chapter report records; committee approves inclusion. |
| Chapter participation rate | Participating chapters / eligible chapters in the approved roster × 100 | Same sources; document denominator date and exclusions. Do not use website visits. |
| Activities held | Distinct completed events/activations, by activity type, date and chapter | Verified chapter activity logs and outcome reports; event submission is a plan until completion is confirmed. Deduplicate shared events. |
| Volunteers | Distinct volunteers within a chapter and period | Individual tracker and chapter logs reconciled by an authorized committee. National unique totals require a lawful deduplication method; do not sum chapter totals and call them unique without one. |
| Volunteer hours | Sum of documented hours, with date/type | Individual tracker + validated chapter logs. Resolve overlap before adding; do not count travel or training twice without an agreed rule. |
| Outreach contacts | Documented contact attempts and completed contacts, reported separately | Chapter logs; distinguish repeated contacts from unique people. Social impressions are estimates, separate from direct contacts. |
| Registration assistance | Documented instances of providing registration assistance or referrals | Chapter reports, labeled assistance/referrals; not proof of a completed/accepted registration. No voter record collection on this hub. |
| Reports submitted | Records accepted by the official individual/chapter system | Submission receipts or committee-controlled exports; link clicks and email requests excluded. |
| Chapter reporting completion | Chapters with validated final reports / eligible participating chapters | Confirmed chapter reporting system + roster; deadline and denominator need national confirmation. |
| Qualitative learning | Permission-cleared stories, obstacles and practical improvements | Structured chapter debriefs; retain consent and source context privately. |

No “votes generated,” turnout attribution, candidate preferences, inferred voter participation or estimated election effect will be claimed. Election results and certification stay with official election authorities.

## Collection workflow

1. National committee confirms chapter reporting URL, period, deadline, required fields, eligible roster and definitions. The toolkit's `[DEADLINE]` remains unresolved.
2. Chapter leads maintain aggregate activity logs and permission-cleared supporting evidence in approved private storage. Do not upload ballots, voter identities, government IDs or registration screenshots here.
3. Individuals use the official individual tracker. Chapter officers use the separately confirmed chapter route; avoid double-counting individual contributions inside chapter aggregates.
4. Committee validates reporting period, chapter identity, duplicate events, units and unusual totals; records corrections and provenance before summarizing.
5. Publish only approved aggregate statistics with reporting dates, coverage/missingness, definitions, deduplication limits and explicit estimates. Keep underlying records access-controlled under NAASC retention policy.
6. After November 3, thank participants, reconcile records, track reporting completion and document lessons. Election follow-ups/runoffs must be verified with election authorities rather than assumed complete.

## Practical success checks

Website quality: all 51 state choices useful, exact approved templates copyable, keyboard-accessible workflows, zero serious automated accessibility findings, no broken internal assets, and live deployment verified. Operational success: national confirms the chapter route/deadline and chapter leaders can submit and retrieve receipts. Campaign outcomes require actual validated data. Set numeric targets only after the committee establishes baselines; none are invented here.
