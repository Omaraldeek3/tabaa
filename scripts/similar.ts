/** Writes src/templates/similar.json: for every template, the closest other
 *  templates by CLIP image embedding of its thumbnail. Run after `npm run thumbs`
 *  whenever templates change (`npm run similar`). Embeddings are cached in
 *  .models/embeds.json by a hash of the thumbnail, so only changed ones rerun. */
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { AutoProcessor, CLIPVisionModelWithProjection, RawImage, env } from "@huggingface/transformers";
import { Resvg } from "@resvg/resvg-js";
import { templates } from "../src/templates/registry.ts";

const root = path.join(import.meta.dirname, "..");
const MODEL = "Xenova/clip-vit-base-patch32";
env.cacheDir = path.join(root, ".models");
const cacheFile = path.join(root, ".models", "embeds.json");
const cache: Record<string, number[]> = existsSync(cacheFile) ? JSON.parse(await readFile(cacheFile, "utf8")) : {};

const processor = await AutoProcessor.from_pretrained(MODEL);
const vision = await CLIPVisionModelWithProjection.from_pretrained(MODEL, { dtype: "q8" });

function unit(v: Float32Array): number[] {
  let s = 0;
  for (const x of v) s += x * x;
  const n = Math.sqrt(s) || 1;
  return Array.from(v, x => x / n);
}

async function embed(svg: string): Promise<number[]> {
  // Fit the sheet in a white 224 px square, the size CLIP looks at.
  const png = new Resvg(svg, { fitTo: { mode: "width", value: 224 }, background: "#ffffff" }).render().asPng();
  const image = await RawImage.fromBlob(new Blob([new Uint8Array(png)], { type: "image/png" }));
  const { image_embeds } = await vision(await processor(image));
  return unit(image_embeds.data as Float32Array);
}

const vectors = new Map<string, number[]>();
let fresh = 0;
for (const t of templates) {
  const svg = await readFile(path.join(root, "public", "thumbs", `${t.id}.svg`), "utf8");
  const key = createHash("sha1").update(svg).digest("hex");
  if (!cache[key]) { cache[key] = await embed(svg); fresh++; }
  vectors.set(t.id, cache[key]);
}
const used = new Set(templates.map(t => t.id));
await writeFile(cacheFile, JSON.stringify(Object.fromEntries(Object.entries(cache).filter(([, v]) => [...vectors.values()].includes(v)))));

const dot = (a: number[], b: number[]) => a.reduce((s, x, i) => s + x * b[i], 0);
// CLIP alone ranks a loud greeting next to a business card, so the row a
// visitor sees also leans a little on shared category and tags.
const jaccard = (a: string[], b: string[]) => { const s = new Set(a); const n = b.filter(x => s.has(x)).length; return n / (a.length + b.length - n || 1); };
const round = (x: number) => Math.round(x * 1000) / 1000;
const near: Record<string, string[]> = {};
const top: [string, string, number][] = [];
for (const a of templates) {
  const scored = templates.filter(b => b.id !== a.id).map(b => {
    const clip = dot(vectors.get(a.id)!, vectors.get(b.id)!);
    if (a.id < b.id) top.push([a.id, b.id, round(clip)]);
    return { id: b.id, rank: clip + (a.category === b.category ? 0.03 : 0) + 0.06 * jaccard(a.tags, b.tags) };
  });
  near[a.id] = scored.sort((x, y) => y.rank - x.rank).slice(0, 8).map(x => x.id);
}
top.sort((x, y) => y[2] - x[2]);
const ids = templates.map(t => t.id).sort();
await writeFile(path.join(root, "src", "templates", "similar.json"), JSON.stringify({ ids, closest: top.slice(0, 20), near }) + "\n");
console.log(`similar: ${used.size} templates, ${fresh} embedded now. Closest pairs:`);
for (const [a, b, s] of top.slice(0, 10)) console.log(`  ${s.toFixed(3)}  ${a}  ~  ${b}`);
