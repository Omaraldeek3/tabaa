/** Shared inks, sizes and small helpers for templates. */
import { type Ink, ink } from "../lib/color.ts";
import { type SceneNode, type TextNode, text } from "../lib/scene.ts";
import type { Palette, RenderContext, Size } from "./types.ts";

/** Press inks. CMYK is set by hand where the plain conversion would print muddy. */
export const inks = {
  paper: ink("#f4ecdc", [0.03, 0.06, 0.14, 0]),
  ivory: ink("#fbf7ee", [0.01, 0.02, 0.07, 0]),
  white: ink("#ffffff", [0, 0, 0, 0]),
  sand: ink("#e3d3b3", [0.1, 0.15, 0.32, 0]),
  black: ink("#1a1816", [0, 0, 0, 1]),
  charcoal: ink("#1b1917", [0.6, 0.55, 0.55, 0.85]),
  red: ink("#b3261e", [0.15, 0.98, 1, 0.08]),
  burgundy: ink("#6e1423", [0.3, 1, 0.75, 0.45]),
  olive: ink("#5b6b2f", [0.6, 0.38, 1, 0.25]),
  oliveDark: ink("#39451c", [0.68, 0.48, 1, 0.5]),
  sage: ink("#a9b388", [0.36, 0.2, 0.52, 0]),
  gold: ink("#c9a24b", [0.2, 0.35, 0.8, 0.04]),
  goldDeep: ink("#a37a23", [0.3, 0.48, 1, 0.12]),
  navy: ink("#1d2f4f", [1, 0.85, 0.4, 0.4]),
  night: ink("#101a30", [1, 0.9, 0.5, 0.65]),
  teal: ink("#1f6f6b", [0.86, 0.38, 0.55, 0.2]),
  sky: ink("#9cc4d8", [0.4, 0.1, 0.1, 0]),
  rose: ink("#c9697a", [0.18, 0.7, 0.38, 0]),
  blush: ink("#f3dcd6", [0.03, 0.15, 0.12, 0]),
  terracotta: ink("#c2562e", [0.18, 0.78, 0.92, 0.05]),
  orange: ink("#e8862a", [0.05, 0.56, 0.92, 0]),
  mustard: ink("#e0b23c", [0.12, 0.3, 0.88, 0]),
  grey: ink("#7d776d", [0, 0, 0.05, 0.6]),
} satisfies Record<string, Ink>;

export const pal = (id: string, ar: string, en: string, paper: Ink, main: Ink, accent: Ink, accent2: Ink, soft: Ink): Palette =>
  ({ id, name: { ar, en }, paper, ink: main, accent, accent2, soft });

const size = (id: string, ar: string, en: string, widthMm: number, heightMm: number): Size => ({ id, label: { ar, en }, widthMm, heightMm });
export const sizes = {
  a3: size("a3", "A3 (٢٩٧×٤٢٠ ملم)", "A3 (297×420 mm)", 297, 420),
  a4: size("a4", "A4 (٢١٠×٢٩٧ ملم)", "A4 (210×297 mm)", 210, 297),
  a4l: size("a4-landscape", "A4 عرضي (٢٩٧×٢١٠ ملم)", "A4 landscape (297×210 mm)", 297, 210),
  a5: size("a5", "A5 (١٤٨×٢١٠ ملم)", "A5 (148×210 mm)", 148, 210),
  a6: size("a6", "A6 (١٠٥×١٤٨ ملم)", "A6 (105×148 mm)", 105, 148),
  a6l: size("a6-landscape", "A6 عرضي (١٤٨×١٠٥ ملم)", "A6 landscape (148×105 mm)", 148, 105),
  invite: size("13x18", "١٣×١٨ سم", "13×18 cm", 130, 180),
  dl: size("dl", "DL (٩٩×٢١٠ ملم)", "DL (99×210 mm)", 99, 210),
  square15: size("15x15", "مربع ١٥×١٥ سم", "Square 15×15 cm", 150, 150),
  square12: size("12x12", "مربع ١٢×١٢ سم", "Square 12×12 cm", 120, 120),
  card: size("85x55", "كرت ٨٥×٥٥ ملم", "Card 85×55 mm", 85, 55),
  card90: size("90x50", "كرت ٩٠×٥٠ ملم", "Card 90×50 mm", 90, 50),
  poster5070: size("50x70", "٥٠×٧٠ سم", "50×70 cm", 500, 700),
  round50: size("round-50", "دائري ٥٠ ملم", "Round 50 mm", 50, 50),
  round70: size("round-70", "دائري ٧٠ ملم", "Round 70 mm", 70, 70),
  round90: size("round-90", "دائري ٩٠ ملم", "Round 90 mm", 90, 90),
  label9060: size("90x60", "ملصق ٩٠×٦٠ ملم", "Label 90×60 mm", 90, 60),
};

/** A field's value as trimmed text (empty for lists and missing fields). */
export function val(ctx: RenderContext, id: string): string {
  const v = ctx.values[id];
  return typeof v === "string" ? v.trim() : "";
}

export function rows(ctx: RenderContext, id: string, max: number): string[][] {
  const v = ctx.values[id];
  return Array.isArray(v) ? v.filter(r => r.some(c => c?.trim())).slice(0, max) : [];
}

export const linesOf = (value: string, max: number) => value.split(/\r?\n/).map(l => l.trim()).filter(Boolean).slice(0, max);

type TextOpts = Partial<Omit<TextNode, "type" | "value" | "x" | "y" | "size">> & { fill: Ink };

/** A line of text that must stay in the safe area. Centred unless told otherwise. */
export const line = (value: string, x: number, y: number, size: number, o: TextOpts & { font: string }): SceneNode | null =>
  value ? text(value, { align: "center", safe: true, ...o, x, y, size }) : null;

/** Several lines stacked downward from y. */
export function stack(lines: string[], x: number, y: number, size: number, leading: number, o: TextOpts & { font: string }): SceneNode[] {
  return lines.map((l, i) => line(l, x, y + i * leading, size, o)).filter((n): n is SceneNode => !!n);
}

Object.assign(sizes, {
  cardV: { id: "55x85", label: { ar: "كرت طولي ٥٥×٨٥ ملم", en: "Tall card 55×85 mm" }, widthMm: 55, heightMm: 85 },
  a5l: { id: "a5-landscape", label: { ar: "A5 عرضي (٢١٠×١٤٨ ملم)", en: "A5 landscape (210×148 mm)" }, widthMm: 210, heightMm: 148 },
  sq60: { id: "60x60", label: { ar: "مربع ٦٠×٦٠ ملم", en: "Square 60×60 mm" }, widthMm: 60, heightMm: 60 },
  label10070: { id: "100x70", label: { ar: "ملصق ١٠٠×٧٠ ملم", en: "Label 100×70 mm" }, widthMm: 100, heightMm: 70 },
});
/** Sizes added after the first set; same shape as `sizes`. */
export const more = sizes as typeof sizes & Record<"cardV" | "a5l" | "sq60" | "label10070", Size>;

/** The numbers every layout starts from: page, palette, bleed overdraw, and
 *  a scale against the size the design was drawn at. */
export function dims(ctx: RenderContext, baseW: number, baseH: number) {
  const { widthMm: W, heightMm: H } = ctx.size, u = W / baseW, v = H / baseH;
  return { W, H, p: ctx.palette, b: ctx.bleedMm + 1, u, v, s: Math.min(u, v), cx: W / 2 };
}

/** Several fields on one line, skipping the empty ones. */
export const joined = (ctx: RenderContext, ids: string[], sep = "  ·  ") => ids.map(id => val(ctx, id)).filter(Boolean).join(sep);

/** A price list: name at nameX, price at priceX, a dotted rule under each row. */
export function priceList(ctx: RenderContext, id: string, o: { nameX: number; priceX: number; top: number; pitch: number; size: number; max: number; ink: Ink; priceInk: Ink; rule: Ink; font?: string; priceFont?: string }): SceneNode[] {
  const out: (SceneNode | null)[] = [], lo = Math.min(o.nameX, o.priceX), w = Math.abs(o.nameX - o.priceX), dot = o.size * 0.09;
  rows(ctx, id, o.max).forEach(([name = "", price = ""], i) => {
    const y = o.top + i * o.pitch;
    out.push(line(name, o.nameX, y, o.size, { font: o.font ?? "tajawal", weight: 700, fill: o.ink, align: "start", maxWidth: w * 0.74 }));
    out.push(line(price, o.priceX, y, o.size * 1.08, { font: o.priceFont ?? o.font ?? "tajawal", weight: 800, fill: o.priceInk, align: "end", maxWidth: w * 0.22 }));
    const d = Array.from({ length: Math.floor(w / (dot * 3)) }, (_, k) => `M${lo + k * dot * 3} ${y + o.size * 0.42} h${dot} v${dot * 0.6} h${-dot} Z`).join(" ");
    if (d) out.push({ type: "path", d, fill: o.rule });
  });
  return out.filter((n): n is SceneNode => !!n);
}
