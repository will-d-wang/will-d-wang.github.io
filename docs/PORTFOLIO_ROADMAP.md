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
- [x] **SEO** — full page `metadata` (title/description/OpenGraph/Twitter/canonical/icons) + Person JSON-LD structured data. _(branch `willw-0815--seo-metadata`)_

## Pending — safe to implement (no extra input needed)

- [ ] **Hero value-proposition** — lead the homepage with a one-line positioning headline (e.g. "Platform / DevOps Engineer building reliable CI/CD & cloud infra on GCP + Kubernetes") instead of opening on the avatar + "Welcome!".
- [ ] **Featured blog posts** — surface existing `content/blog` posts on the homepage for thought-leadership signal.
- [ ] **Per-page OpenGraph polish** — a dedicated 1200×630 OG image (current OG uses the 320×320 avatar) and per-page titles/descriptions.

## Pending — needs owner input

- [ ] **Contact CTA + résumé download** — add a primary "Contact" CTA and a one-click résumé (PDF). _Needs: public email + résumé PDF (or link)._
- [ ] **Quantify impact** — convert experience/project bullets from activity-first to outcome-first with numbers (deploy time, scale, cost, reliability). _Needs: real metrics; won't fabricate._
- [ ] **Custom domain** — move from `will-d-wang.github.io` to a custom domain (e.g. `willwang.dev`) for a more senior presence. _Needs: owned domain, then a `CNAME` file + DNS records._

## Notes

- All tech-icon names used in timeline/projects must exist in `components/Icon.tsx`; the `check:icons` prebuild guard enforces this.
- `pnpm-workspace.yaml` must approve every native build (`sharp`, `unrs-resolver`) or the husky pre-commit hook / build fail under pnpm 11.
