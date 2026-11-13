/** Writes public/thumbs/<id>.svg for every template, text already outlined,
 *  so the library never loads the shaping engine. Runs before dev and build. */
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderSvg } from "../src/lib/render-svg.ts";
import { resolveScene } from "../src/lib/resolve.ts";
import { defaultContext, templates } from "../src/templates/registry.ts";
import { useDiskFonts } from "../tests/setup.ts";

useDiskFonts();
const dir = path.join(import.meta.dirname, "..", "public", "thumbs");
await mkdir(dir, { recursive: true });
const keep = new Set(templates.map(t => `${t.id}.svg`));
for (const file of await readdir(dir)) if (!keep.has(file)) await rm(path.join(dir, file));

let bytes = 0;
for (const t of templates) {
  const resolved = await resolveScene(t.render(defaultContext(t, { bleedMm: 0 })));
  // Two decimals is plenty at thumbnail size and roughly halves the file.
  const svg = renderSvg(resolved, { idPrefix: t.id }).replace(/(\d+\.\d{2})\d+/g, "$1");
  bytes += svg.length;
  await writeFile(path.join(dir, `${t.id}.svg`), svg);
}
console.log(`thumbs: ${templates.length} files, ${(bytes / 1024).toFixed(0)} KB`);
