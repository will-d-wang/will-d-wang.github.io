<!-- markdownlint-disable-file MD025 MD041 -->

# AGENTS.md

Guidance for AI agents (and humans) working in this repo. Imported by `CLAUDE.md`.

## What this is

Personal website / portfolio for Will D. Wang — Nextra 4 (docs theme) on Next.js 16 (App Router), React 19, Tailwind v4, TypeScript. Statically exported (`output: "export"` in `next.config`) and deployed to GitHub Pages.

## Toolchain (pinned — use pnpm, not npm/yarn)

- Node 24 (`.nvmrc`); pnpm 11 via the `packageManager` field in `package.json`.
- `pnpm-workspace.yaml` must approve every native postinstall build (currently `sharp`, `unrs-resolver`). If `pnpm install`/`run` reports ignored build scripts, the husky pre-commit hook and the Next 16 build fail. Add new native deps to `onlyBuiltDependencies` there.

## Commands

- `pnpm dev` — dev server at <http://localhost:3000>.
- `pnpm build` — runs `check:icons` (prebuild) → `next build` → `pagefind` (postbuild); static output in `out/`.
- `pnpm check:icons` — validates every icon name used in the data resolves in the registry.
- Typecheck without pnpm's deps-check: `./node_modules/.bin/tsc --noEmit`.

## Architecture

- Home page is `content/index.mdx`, composed of section components in `components/about/`.
- The About page is **data-driven** via `components/about/data.ts`: `SOCIAL_LINKS`, `CURRENT_STATUS`, `TIMELINE_ENTRIES` (experience/education), and `PROJECTS`. The "current focuses" icon row (`CURRENT_PRIORITY`) lives in `components/about/CareerJourneySection.tsx`. Types are in `components/about/types.ts`.
- Icons: `components/Icon.tsx` holds `ICON_DATA` (tech/company/school) plus aliases. Every icon and organization name used in the data MUST have a registry entry, or it silently renders nothing (console warning). The `check:icons` prebuild guard (`scripts/check-icons.mjs`) fails the build on unregistered names. Assets live under `public/icons/{tech,company,social}/`.
- Navigation (top menu + docs sub-items) is in `app/_meta.global.tsx` (`DOCS_ITEMS`). Site metadata and Person JSON-LD are in `app/layout.tsx`.
- `/docs/projects` renders `ProjectsSection` (the portfolio). Root `docs/` (e.g. `PORTFOLIO_ROADMAP.md`) is internal and NOT published — published pages live under `content/`.

## Conventions

- Never push directly to `main`. Branch as `{first}{lastinitial}-{mmdd}--{brief-feature}` (e.g. `willw-0815--seo-metadata`).
- PRs: use a `chore:` prefix for config-only changes; include an "AI coding brief" section (original request / manual interventions / retro).
- Verify runtime changes by driving the app (dev server + fetch), not just by typechecking.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
