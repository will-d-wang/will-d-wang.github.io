# Portfolio Improvement Roadmap

Tracking the improvements from the portfolio audit of the About/home page.
Status legend: `[x]` shipped · `[ ]` pending.

## Shipped

- [x] **Toolchain upgrade** — Next 16.3.1, React 19.2.8, pnpm 11.21.0 pinned, Node 24 (`.nvmrc`), CI aligned. _(PR #2)_
- [x] **About-page audit fixes** _(PR #3)_
  - [x] `CURRENT_PRIORITY` ("current focuses") refreshed to the current stack
  - [x] Page `description` updated to the current role
  - [x] komarev view-counter handle → `will-d-wang`
  - [x] Added the missing **Apache Spark** icon registry entry
  - [x] `scripts/check-icons.mjs` guard (runs on `prebuild`) so unregistered icon names fail the build
  - [x] Timeline inline styles → CSS classes; dropped duplicate stack text
  - [x] Icon links open in a new tab; self-hosted GitHub/LinkedIn icons
- [x] **Projects section** — `ProjectsSection` at `/docs/projects` under the Documentation menu, with HP Anyware, LeTP, and Ericsson SSR IP-OS. _(PR #4)_
- [x] **SEO** — full page `metadata` (title/description/OpenGraph/Twitter/canonical/icons) + Person JSON-LD structured data. _(PR #5)_
- [x] **Hero value-proposition** — homepage leads with an H1 name + one-line positioning lede. _(PR #6)_
- [x] **Availability banner** — added SF(US) to the available locations. _(PR #7)_
- [x] **Featured blog posts** — "From the Blog" section on the homepage linking to selected posts.
- [x] **Dedicated OpenGraph image** — generated 1200×630 card via `app/opengraph-image.tsx`; per-page titles/descriptions (fixed the `big_data` placeholder description).
- [x] **Blog articles** — rewrote `big_data` (Data Engineering) and `d3` (D3 for Data & Visual Analytics) into full, professional articles; removed broken Docusaurus-era references.

## Pending — needs owner input

- [ ] **Contact CTA + résumé download** — add a primary "Contact" CTA and a one-click résumé (PDF). _Needs: public email + résumé PDF (or link)._
- [ ] **Quantify impact** — convert experience/project bullets from activity-first to outcome-first with numbers (deploy time, scale, cost, reliability). _Needs: real metrics; won't fabricate._
- [ ] **Custom domain** — move from `will-d-wang.github.io` to a custom domain (e.g. `willwang.dev`). _Needs: owned domain, then a `CNAME` file + DNS records._

## Notes

- All tech-icon names used in timeline/projects must exist in `components/Icon.tsx`; the `check:icons` prebuild guard enforces this.
- `pnpm-workspace.yaml` must approve every native build (`sharp`, `unrs-resolver`) or the husky pre-commit hook / build fail under pnpm 11.
