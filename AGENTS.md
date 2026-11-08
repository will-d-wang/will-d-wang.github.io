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

## Test plan

- Use Node 24 and pnpm 11. Run `pnpm build`; require the icon check, TypeScript check, static export, and Pagefind indexing to finish successfully.
- Start `pnpm dev` and fetch `/` plus every changed route. Require HTTP 200 and check that the response contains the expected page content. For shared navigation or layout changes, also fetch `/docs/projects` and a blog page.
- Serve the production export with `python3 -m http.server 3001 --directory out`. Fetch `/` and the corresponding `.html` file for each changed route (for example, `/docs/projects.html`); require HTTP 200 and expected content. Fetch a referenced `/_next/static/` asset and `/_pagefind/pagefind.js` to confirm static assets are served.
- For visual changes, open the served page in a browser and check the affected section at desktop and mobile widths. Stop the local servers after testing.

## Architecture

- Home page is `content/index.mdx`, composed of section components in `components/about/`.
- The About page is **data-driven** via `components/about/data.ts`: `SOCIAL_LINKS`, `CURRENT_STATUS`, `TIMELINE_ENTRIES` (experience/education), and `PROJECTS`. The "current focuses" icon row (`CURRENT_PRIORITY`) lives in `components/about/CareerJourneySection.tsx`. Types are in `components/about/types.ts`.
- Icons: `components/Icon.tsx` holds `ICON_DATA` (tech/company/school) plus aliases. Every icon and organization name used in the data MUST have a registry entry, or it silently renders nothing (console warning). The `check:icons` prebuild guard (`scripts/check-icons.mjs`) fails the build on unregistered names. Assets live under `public/icons/{tech,company,social}/`.
- Navigation (top menu + docs sub-items) is in `app/_meta.global.tsx` (`DOCS_ITEMS`). Site metadata and Person JSON-LD are in `app/layout.tsx`.
- `/docs/projects` renders `ProjectsSection` (the portfolio). Root `docs/` (e.g. `PORTFOLIO_ROADMAP.md`) is internal and NOT published — published pages live under `content/`.

## Conventions

- Commit completed changes and push directly to `main`. Create a feature branch or PR only when explicitly requested.
- Use a `chore:` prefix for config-only commits.
- Before every commit and before pushing to `main`, test the change locally and confirm it works. For runtime changes, drive the app (dev server + fetch), not just by typechecking; follow the test plan above.
- Keep the visual presentation polished for Staff and Principal Engineer audiences: prioritize clear hierarchy, restraint, consistency, and generous whitespace; use concrete outcomes and evidence to make technical impact easy to scan.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## graphify

This project has a local code graph at graphify-out/. The initial index covers code, not MDX or other documents.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:

- For code structure questions, when graphify-out/graph.json exists, run `graphify query "<question>"` before broad source search. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. Follow graph results with targeted source reads when needed.
- For MDX content questions, use targeted text search until a semantic document index has been built. The code-only graph does not cover MDX.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- The generated graphify-out/ directory is ignored by Git and should stay local.
