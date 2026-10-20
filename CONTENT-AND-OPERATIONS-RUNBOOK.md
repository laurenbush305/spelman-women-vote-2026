# Content and operations runbook

Last reviewed: October 20, 2026.

This file is the repeatable checklist for maintaining the **public** NAASC Spelman Women Vote chapter hub. The public site does not synchronize with private email, Notion or the operational partnerships dashboard. A responsible editor must reconcile those sources and explicitly approve each publication.

## Source ownership

| Information | Working source | Public release gate |
| --- | --- | --- |
| Partner contacts, negotiations, decisions, follow-ups | Private NAASC Partnerships Dashboard plus source email/Notion note | **Never expose** inbox contents, contact details, contract terms, internal shortages or unpublished requests in the public hub |
| State voting rules and dates | Official state election authorities, federal agencies | Verify authority, date, geographic applicability and link. Never infer missing dates |
| National campaign captions/emails | Approved NAASC 2026 toolkit | Match source exactly, preserve placeholders, flag expired text |
| Partner resources and graphics | Provider's explicitly public toolkits or approved assets | Confirm license/permission, links, category and organization-specific URL |
| Formal partnerships, co-branded pages and logos | Signed/approved organizational agreement | Written authorized approval **before** claiming partnership or publishing a logo |
| Student events and campus rides | Campus Engagement official communication | Publish only confirmed event facts, label **Spelman campus only**, and retire dated promotions afterwards |
| Campaign impact | Official NAASC reporting channels | Never invent counts or use public website clicks as verified votes/registrations |

## Five-step close-the-loop sequence

For every meaningful email reply, meeting note or change:

1. **Read the whole thread and recent Notion note.** Check whether outreach, scheduling or approvals were **already completed**, and use later explicit decisions to supersede older proposals.
2. **Record one current status.** Use plain terms: Draft, Sent, In progress, Waiting on other party, Review, Decision, Available to share, or Complete. Describe the operational fact; never manufacture a promise or outcome.
3. **Assign one next handoff.** Say what must happen, who has responsibility, what is needed from whom, and the next event or deadline. Avoid reassigning a campus-owned survey or program task to Partnerships.
4. **Update the private dashboard and corresponding detail row.** Keep the dashboard readable and make source receipts accessible privately. Record the actual outbound send only **after** a send receipt; a saved draft is not sent.
5. **Evaluate public-facing impact.** Update public site only if the information is approved and appropriate to share. Verify the deployment and link behavior separately from committing code.

The **Next Actions** sheet is the simple current work queue; **All Partnerships** is the detail layer. The private spreadsheet cannot automatically update this public repository.

## Locked visual identity

The approved public visual reference is the user's October 20, 2026 Spelman Women Vote banner showing the NAASC seal and the `EDUCATE · ENGAGE · EMPOWER` campaign artwork on the official royal-blue background (`#124489`). A self-hosted, proportionate copy is stored at `public/assets/brand/spelman-women-vote-2026.webp`; the uploaded preview measures 320 × 180 pixels. Do not invent monograms, redraw typography, alter the seal, replace the banner with synthetic graphics, stretch the raster beyond what remains readable, or change the homepage visual treatment while doing content-only maintenance. For a larger hero, first obtain a higher-resolution approved original. Compare the phone layout against this source before any visual release. Official reference: https://www.naasc.org/gotv.

## Publish gates

- [ ] Public facts are supported by an email from an authorized organizer, a public provider resource, or an official election authority.
- [ ] Source date, state/campus scope, owner and current status are distinguishable from unconfirmed intentions.
- [ ] No partner-only county staffing updates, student survey responses, email addresses, private draft text, private MOU language or internal contact notes appear in this public repository.
- [ ] Signed approval is verified before switching the custom VOTE411 URL. Until then, the public VOTE411 guide stays active.
- [ ] Time-limited campus announcements carry a beginning/end visibility window and a fallback contact when links are inaccessible.
- [ ] Official toolkit wording stays untouched unless an updated approved source supersedes it.
- [ ] Run available unit/browser checks, inspect mobile sizes, links and empty/error states.
- [ ] Push to `main` and **independently verify Render deploy + live output**. Prior pushes have not consistently triggered auto-deploy; a GitHub commit is not proof of a public launch.
- [ ] Reconcile the dashboard's release row and any pending leadership review request with what is actually live.

## After Election Day

The hub's existing date logic transitions on November 4 to thank-you/reporting tasks. Keep the chapter-reporting link in request mode until NAASC confirms the authorized group form and deadline. Archive one-off event promotions and confirm any longer-term partnership offers before reusing them.

**This is a manual governance process, not an automatic Gmail/Notion synchronization service.** 
