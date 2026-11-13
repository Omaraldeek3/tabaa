/** Text to outlines. Runs are reordered with bidi-js and shaped with HarfBuzz,
 *  the same approach Harf uses, so Arabic joins and marks come out right and
 *  the print shop needs no fonts. */
import bidiFactory from "bidi-js";
import { getFont, loadFontFile, pickFile } from "./fonts.ts";
import { type Bounds, type Segment, parsePath, segmentsBounds, serialize, transformSegments } from "./pathdata.ts";
import type { TextNode } from "./scene.ts";

type Dir = "rtl" | "ltr";
type Run = { text: string; direction: Dir };
const bidi = bidiFactory();

export const hasArabic = (s: string) => /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/.test(s);

/** Reorder runs, never codepoints inside a run, before shaping. */
export function visualRuns(text: string, direction: Dir = "rtl"): Run[] {
  if (!text) return [];
  const levels = bidi.getEmbeddingLevels(text, direction);
  const runs: (Run & { start: number; end: number })[] = [];
  let start = 0;
  for (let i = 1; i <= text.length; i++) {
    if (i === text.length || levels.levels[i] !== levels.levels[start]) {
      runs.push({ text: text.slice(start, i), direction: levels.levels[start] % 2 ? "rtl" : "ltr", start, end: i - 1 });
      start = i;
    }
  }
  const indices = Array.from({ length: text.length }, (_, i) => i);
  for (const [a, b] of bidi.getReorderSegments(text, levels)) indices.splice(a, b - a + 1, ...indices.slice(a, b + 1).reverse());
  const ids = new Set(indices.map(i => runs.findIndex(r => i >= r.start && i <= r.end)));
  return [...ids].map(i => ({ text: runs[i].text, direction: runs[i].direction }));
}

type Hb = typeof import("harfbuzzjs");
type HbFont = InstanceType<Hb["Font"]>;
let hbPromise: Promise<Hb> | null = null;
const loadHb = () => (hbPromise ??= import("harfbuzzjs").catch(e => { hbPromise = null; throw e; }));

type Loaded = { font: HbFont; upem: number; glyphs: Map<number, Segment[]> };
const loaded = new Map<string, Promise<Loaded>>();

function loadFace(fontId: string, weight: number | undefined): Promise<Loaded> {
  const { file, weight: real } = pickFile(getFont(fontId), weight);
  const key = `${file.path}@${file.variable ? real : 0}`;
  let hit = loaded.get(key);
  if (!hit) {
    hit = (async () => {
      const [hb, bytes] = await Promise.all([loadHb(), loadFontFile(file.path)]);
      const face = new hb.Face(new hb.Blob(new Uint8Array(bytes)));
      const font = new hb.Font(face);
      if (file.variable) font.setVariations([new hb.Variation("wght", real)]);
      return { font, upem: face.upem, glyphs: new Map() };
    })();
    loaded.set(key, hit);
    hit.catch(() => loaded.delete(key));
  }
  return hit;
}

type Placed = { segments: Segment[]; x: number; y: number; scale: number };

/** Shape one run with one font; null when the font lacks a glyph for it. */
async function shapeRun(hb: Hb, face: Loaded, run: Run, tracking: number): Promise<{ glyphs: Placed[]; advance: number } | null> {
  const buffer = new hb.Buffer();
  buffer.addText(run.text);
  buffer.guessSegmentProperties();
  buffer.setDirection(run.direction === "rtl" ? hb.Direction.RTL : hb.Direction.LTR);
  const arabic = hasArabic(run.text);
  if (arabic) buffer.setLanguage("ar");
  hb.shape(face.font, buffer);
  const scale = 1 / face.upem;
  const glyphs: Placed[] = [];
  let cursor = 0;
  for (const glyph of buffer.getGlyphInfosAndPositions()) {
    if (glyph.codepoint === 0) return null;
    let segments = face.glyphs.get(glyph.codepoint);
    if (!segments) {
      const d = face.font.glyphToPath(glyph.codepoint);
      segments = d ? parsePath(d) : [];
      face.glyphs.set(glyph.codepoint, segments);
    }
    if (segments.length) glyphs.push({ segments, x: cursor + (glyph.xOffset || 0) * scale, y: (glyph.yOffset || 0) * scale, scale });
    cursor += (glyph.xAdvance || 0) * scale + (arabic ? 0 : tracking);
  }
  return { glyphs, advance: cursor };
}

export type Outline = { d: string; width: number; size: number; bounds: Bounds | null };

/** Fonts tried, in order, when the chosen one has no glyph for a run. */
const FALLBACKS = ["tajawal", "amiri", "inter"];

/** Outline one line of text in page millimetres, fitted and anchored as the node asks. */
export async function textToPath(node: TextNode): Promise<Outline> {
  const value = node.value.replace(/\s+/g, " ").trim();
  if (!value) return { d: "", width: 0, size: node.size, bounds: null };
  const hb = await loadHb();
  const dir: Dir = node.dir ?? (hasArabic(value) ? "rtl" : "ltr");
  const chain = [node.font, ...FALLBACKS.filter(f => f !== node.font)];
  // Everything below is measured in ems, then scaled once the size is known.
  const placed: Placed[] = [];
  let width = 0;
  for (const run of visualRuns(value, dir)) {
    let shaped: Awaited<ReturnType<typeof shapeRun>> = null;
    for (const fontId of chain) {
      shaped = await shapeRun(hb, await loadFace(fontId, node.weight), run, (node.tracking ?? 0) / node.size);
      if (shaped) break;
    }
    if (!shaped) continue; // no font has it: leave the run out rather than print boxes
    for (const gl of shaped.glyphs) placed.push({ ...gl, x: gl.x + width });
    width += shaped.advance;
  }
  let size = node.size;
  if (node.maxWidth && width * size > node.maxWidth) size = node.maxWidth / width;
  const w = width * size;
  const startAtRight = dir === "rtl";
  const left = node.align === "center" ? node.x - w / 2 : (node.align === "start") === startAtRight ? node.x - w : node.x;
  const all: Segment[] = [];
  for (const gl of placed) {
    const s = gl.scale * size;
    all.push(...transformSegments(gl.segments, [s, 0, 0, -s, left + gl.x * size, node.y - gl.y * size]));
  }
  return { d: serialize(all), width: w, size, bounds: all.length ? segmentsBounds(all) : null };
}
