/** Rewrites the import list in src/templates/registry.ts from the files on
 *  disk, so adding a template is one file plus `npm run registry`.
 *  Order: by category as listed below, Arabic before English, then by name. */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.join(import.meta.dirname, "..", "src", "templates");
const order = ["wedding", "occasions", "posters", "cards", "menus", "labels", "greetings", "certificates",
  "cities", "tickets", "stickers", "tags", "bookmarks", "calendars", "programmes", "stationery"];
/** Shown first in their section. */
const lead = ["tatreez-frame", "jerusalem-arch", "henna-night", "olive-harvest", "kufi-monogram", "falafel-shop", "olive-oil", "eid-crescent", "tatreez-honor"];

const entries = [];
for (const cat of order) {
  const files = (await readdir(path.join(root, cat))).filter(f => f.endsWith(".ts")).map(f => f.slice(0, -3));
  files.sort((a, b) => (lead.includes(b) - lead.includes(a)) || (lead.indexOf(a) - lead.indexOf(b)) * (lead.includes(a) && lead.includes(b) ? 1 : 0) || (a.startsWith("en-") - b.startsWith("en-")) || a.localeCompare(b));
  for (const f of files) entries.push({ cat, f, name: `${cat}_${f}`.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase()) });
}

const file = path.join(root, "registry.ts");
const src = await readFile(file, "utf8");
const tail = src.slice(src.indexOf("export const getTemplate"));
const head = `/** Every template on the site. The list below is written by scripts/registry.mjs
 *  from the files under src/templates/<category>/; do not edit it by hand. */
${entries.map(e => `import ${e.name} from "./${e.cat}/${e.f}.ts";`).join("\n")}
import type { RenderContext, Template, Values } from "./types.ts";

export const templates: Template[] = [
${entries.map(e => `  ${e.name},`).join("\n")}
];

`;
await writeFile(file, head + tail);
console.log(`registry: ${entries.length} templates`);
