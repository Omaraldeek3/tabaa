/** Writes public/thumbs/<id>.svg for every template, text already outlined,
 *  so the library never loads the shaping engine. Runs before dev and build. */
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { parsePath } from "../src/lib/pathdata.ts";
import { renderSvg } from "../src/lib/render-svg.ts";
import { resolveScene } from "../src/lib/resolve.ts";
import { defaultContext, templates } from "../src/templates/registry.ts";
import { useDiskFonts } from "../tests/setup.ts";

useDiskFonts();
const dir = path.join(import.meta.dirname, "..", "public", "thumbs");
await mkdir(dir, { recursive: true });
const keep = new Set(templates.map(t => `${t.id}.svg`));
for (const file of await readdir(dir)) if (!keep.has(file)) await rm(path.join(dir, file));

/** Tenths of a millimetre, written as short as SVG allows: "0.5" -> ".5". */
const tenth = (v: number) => Math.round(v * 10);
const num = (k: number) => { const s = (k / 10).toString(); return s.replace(/^(-?)0\./, "$1."); };
/** Joins numbers, letting a minus sign stand in for the space. */
const join = (ns: string[]) => ns.reduce((out, n, i) => out + (i && !n.startsWith("-") ? " " : "") + n, "");

/** Rewrites path data with relative commands on a 0.1 mm grid, which is
 *  invisible at card size and cuts the dense ornament to well under half.
 *  Arcs are kept as written (parsePath would turn them into longer curves). */
function compactArcs(d: string): string {
  const tokens = d.match(/[a-zA-Z]|-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?/g) ?? [];
  let i = 0, cmd = "", cx = 0, cy = 0, sx = 0, sy = 0;
  const out: string[] = [], n = () => Number(tokens[i++]);
  while (i < tokens.length) {
    if (/[a-zA-Z]/.test(tokens[i])) cmd = tokens[i++];
    const rel = cmd === cmd.toLowerCase(), C = cmd.toUpperCase();
    const pt = (x: number, y: number) => (rel ? [cx + tenth(x), cy + tenth(y)] : [tenth(x), tenth(y)]);
    if (C === "Z") { out.push("z"); cx = sx; cy = sy; continue; }
    if (C === "M" || C === "L") {
      const [x, y] = pt(n(), n());
      out.push((C === "M" ? "m" : "l") + join([num(x - cx), num(y - cy)]));
      cx = x; cy = y; if (C === "M") { sx = x; sy = y; cmd = rel ? "l" : "L"; }
    }
    else if (C === "A") {
      const rx = tenth(n()), ry = tenth(n()), rot = n(), large = n(), sweep = n(), [x, y] = pt(n(), n());
      out.push("a" + join([num(rx), num(ry), String(Math.round(rot)), String(large), String(sweep), num(x - cx), num(y - cy)]));
      cx = x; cy = y;
    } else return d.replace(/(\d+\.\d)\d+/g, "$1");
  }
  return out.join("");
}

function compact(d: string): string {
  if (/[aA]/.test(d)) return /^[\sMmLlAaZz\d.,e-]*$/.test(d) ? compactArcs(d) : d.replace(/(\d+\.\d)\d+/g, "$1");
  let cx = 0, cy = 0, sx = 0, sy = 0;
  const out: string[] = [];
  for (const s of parsePath(d)) {
    if (s.c === "Z") { out.push("z"); cx = sx; cy = sy; continue; }
    const p = (s.p as number[]).map(tenth), rel: number[] = [];
    for (let i = 0; i < p.length; i += 2) rel.push(p[i] - cx, p[i + 1] - cy);
    const ex = p[p.length - 2], ey = p[p.length - 1];
    if (s.c === "M") { out.push("m" + join(rel.map(num))); sx = ex; sy = ey; }
    else if (s.c === "L") out.push(rel[1] === 0 ? "h" + num(rel[0]) : rel[0] === 0 ? "v" + num(rel[1]) : "l" + join(rel.map(num)));
    else out.push(s.c.toLowerCase() + join(rel.map(num)));
    cx = ex; cy = ey;
  }
  return out.join("");
}

let bytes = 0;
for (const t of templates) {
  const resolved = await resolveScene(t.render(defaultContext(t, { bleedMm: 0 })));
  // Two decimals is plenty at thumbnail size for everything outside path data.
  const svg = renderSvg(resolved, { idPrefix: t.id })
    .replace(/ d="([^"]*)"/g, (_, d: string) => ` d="${compact(d)}"`)
    .replace(/(\d+\.\d{2})\d+/g, "$1");
  bytes += svg.length;
  await writeFile(path.join(dir, `${t.id}.svg`), svg);
}
console.log(`thumbs: ${templates.length} files, ${(bytes / 1024).toFixed(0)} KB`);
