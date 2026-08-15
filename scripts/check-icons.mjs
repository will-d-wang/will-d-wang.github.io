// Guards against silent icon gaps: every organization / tech-icon name used in
// the timeline data (and the "current focuses" row) must have a matching entry
// in the Icon registry, otherwise Icon.tsx just console.warns and renders
// nothing. Run via `pnpm check:icons` (also wired as a `prebuild` step).
//
// ponytail: text-scan heuristic, not a real TS import — Icon.tsx pulls in
// next/image so it can't be imported outside Next. Upgrade path: extract the
// pure registry into its own module and import it here instead of regexing.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

const iconSrc = read("components/Icon.tsx");
const dataSrc = read("components/about/data.ts");
const journalSrc = read("components/about/CareerJourneySection.tsx");

// --- Collect every name the registry can resolve (keys + aliases), lowercased.
const valid = new Set();
// 4-space-indented object keys: registry entries (`Name: {`) and alias LHS
// (`alias: "Canonical"`). Quoted or bare.
for (const m of iconSrc.matchAll(/^ {4}(?:"([^"]+)"|([\w.+#/-]+)):\s*[{"]/gm)) {
  valid.add((m[1] ?? m[2]).toLowerCase());
}
// Alias RHS canonical targets (`alias: "Canonical"`).
for (const m of iconSrc.matchAll(/^ {4}(?:"[^"]+"|[\w.+#/-]+):\s*"([^"]+)"/gm)) {
  valid.add(m[1].toLowerCase());
}

// --- Collect every name that must resolve.
const used = new Map(); // name -> source label
const add = (name, where) => {
  if (name && !used.has(name)) used.set(name, where);
};

// Organizations in the timeline.
for (const m of dataSrc.matchAll(/organization:\s*"([^"]+)"/g)) {
  add(m[1], "data.ts organization");
}
// Tech icons in `icons: [ ... ]` arrays (NOT tech_stacks, which are text).
for (const block of dataSrc.matchAll(/(?:^|\s)icons:\s*\[([\s\S]*?)\]/g)) {
  for (const s of block[1].matchAll(/"([^"]+)"/g)) add(s[1], "data.ts icons");
}
// The "current focuses" icon row.
const priority = journalSrc.match(/CURRENT_PRIORITY\s*=\s*\[([\s\S]*?)\]/);
if (priority) {
  for (const s of priority[1].matchAll(/"([^"]+)"/g)) {
    add(s[1], "CURRENT_PRIORITY");
  }
}

// --- Report.
const missing = [...used].filter(([name]) => !valid.has(name.toLowerCase()));
if (missing.length) {
  console.error("❌ Icon names with no registry entry in components/Icon.tsx:");
  for (const [name, where] of missing) console.error(`   - "${name}" (${where})`);
  console.error(
    "\nAdd an ICON_DATA entry (and an asset under public/icons/) for each.",
  );
  process.exit(1);
}
console.log(`✅ All ${used.size} icon names resolve to a registry entry.`);
