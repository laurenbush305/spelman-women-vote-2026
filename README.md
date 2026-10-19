# Spelman Women Vote · 2026 Chapter Resource Hub

A lightweight, mobile-first, static site for NAASC chapter resources. Plain HTML/CSS/JS. No build step, API key, database, tracking script, or fragile external data endpoint required.

## Live site

- **Website:** https://spelman-women-vote-2026.onrender.com
- **Hosting:** Render static site (service `spelman-women-vote-2026`), connected to GitHub `main`, auto-deploy enabled.
- **Hosting dashboard:** https://dashboard.render.com/static/srv-dbb932gm7kps73ekc830
- **Source:** https://github.com/laurenbush305/spelman-women-vote-2026
- **First successful deployment:** October 19, 2026. Render reported `live` status.
- **QA:** JavaScript syntax, required local files, hash links and unique IDs validated. Manual mobile-browser testing still recommended.

## Deploy

- **Vercel:** Create a new project and import these files or connect a GitHub repository containing this folder. Set Framework Preset to **Other**; no build command required; output directory is the project root.
- **GitHub Pages:** The source now lives at https://github.com/laurenbush305/spelman-women-vote-2026. In **Settings → Pages → Build and deployment**, select **Deploy from a branch**, choose `main` and `/(root)`, then click **Save**. The site is not live until GitHub confirms the Pages deployment.
- **Other static hosts:** Upload the files to any host that supports an `index.html` home page.

## Source-of-truth decisions

- 2026 campaign: https://www.naasc.org/gotv
- 2026 chapter toolkit: https://docs.google.com/document/d/1uzZdXtZW6-VGRcDTm_c-iu8brSy98C6sugkfA1qkRqU/edit?usp=sharing
- NAASC individual impact form: https://www.naasc.org/form-gotv-individual-impact-tracker
- Chapter group reporting: use the private group-reporting link distributed by NAASC; request via gotv@naasc.org if missing.
- Event submissions: https://form.jotform.com/262627910635056
- State-specific dates: don't extrapolate Georgia's dates to other states. Users are referred to government election offices.

## Content updates

Edit `RESOURCES` in `app.js` to add/remove tools. Edit `STATES` if needed. Update the dated toolkit-week cards in `index.html` for future election cycles. Do not publish 2024 caption materials as current 2026 graphics. All claims and links should be verified with the relevant source before publication.

## Accessibility and privacy

Includes skip link, visible keyboard focus, labeled controls, live results count, reduced-motion support, mobile navigation with expanded state, accessible external-link labels, and a clipboard fallback. No personal data is collected.

The decorative S icon is *not* the official NAASC seal. If replacing with official NAASC artwork, obtain the approved asset/permission and follow NAASC's digital brand guide.

## Deployment status (October 19, 2026)

The five source files have been committed to `laurenbush305/spelman-women-vote-2026` on `main`. Automated Vercel import was blocked by HTTP 403 permissions, so the project was instead published on Render. Render confirmed that the deployment is live, with automatic GitHub main-branch deployments enabled. Manual mobile browser and external-link QA is recommended before broad circulation.