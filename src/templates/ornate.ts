/** The ornate dress every template wears: a patterned ground, a thick
 *  decorated border with corner pieces, and the template's own design laid
 *  out inside a panel. The design is rendered at the panel's size, so it
 *  re-flows rather than being shrunk, and its text stays real text.
 *  Round stickers and labels get a decorated ring instead of a frame. */
import type { Ink } from "../lib/color.ts";
import { dotRing, khatamPath, leafPath, rays, starPath, tatreezFrame } from "../lib/motifs/index.ts";
import { type SceneNode, circle, circlePath, g, path, rect, scene } from "../lib/scene.ts";
import type { Category, Palette, RenderContext, Template } from "./types.ts";

const f = (v: number) => Math.round(v * 100) / 100;

export type Ground = "stars" | "lattice" | "rosettes" | "scales" | "flowers" | "zellige" | "dots";
export type Border = "tatreez-stars" | "tatreez-chain" | "tatreez-lattice" | "beads" | "arcade" | "scallop" | "rope" | "khatams" | "dentil";
export type Corner = "khatam" | "rosette" | "square" | "flower" | "star";
export type OrnateStyle = { ground: Ground; border: Border; corner: Corner; crest?: boolean; mids?: boolean; weight?: number; sober?: boolean;
  /** The design is drawn in fixed millimetres, so it is scaled into the panel instead of re-flowed. */
  fixed?: boolean };

/** Colours the ornament takes from the template's palette. */
const tones = (p: Palette, sober: boolean) => sober
  ? { tint: p.soft, pattern: p.soft, band: p.ink, bead: p.paper, bead2: p.soft, piece: p.ink, hole: p.paper }
  : { tint: p.accent, pattern: p.accent, band: p.ink, bead: p.accent, bead2: p.accent2, piece: p.accent2, hole: p.paper };

/** Points on a grid (odd rows offset) that pass `keep`. */
function grid(x0: number, y0: number, x1: number, y1: number, pitch: number, keep: (x: number, y: number) => boolean): [number, number][] {
  const out: [number, number][] = [];
  for (let j = 0, y = y0; y <= y1; j++, y += pitch * 0.866) for (let x = x0 + (j % 2 ? pitch / 2 : 0); x <= x1; x += pitch) if (keep(x, y)) out.push([x, y]);
  return out;
}

/** Shapes at each point, merged into one path per colour to keep files small. */
const at = (pts: [number, number][], shape: (x: number, y: number) => string) => pts.map(([x, y]) => shape(x, y)).join(" ");
const khatamAt = (r: number) => (x: number, y: number) => khatamPath(r).replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, a, b) => `${f(Number(a) + x)} ${f(Number(b) + y)}`);
const dotAt = (r: number) => (x: number, y: number) => `M${f(x - r)} ${f(y)}a${f(r)} ${f(r)} 0 1 0 ${f(2 * r)} 0a${f(r)} ${f(r)} 0 1 0 ${f(-2 * r)} 0`;
const diamondAt = (r: number) => (x: number, y: number) => `M${f(x)} ${f(y - r)}L${f(x + r)} ${f(y)}L${f(x)} ${f(y + r)}L${f(x - r)} ${f(y)}Z`;
const ringAt = (r: number, w: number) => (x: number, y: number) => `${dotAt(r)(x, y)} ${dotAt(r - w)(x, y)}`;

/** The patterned ground, drawn only where it can be seen. */
function ground(kind: Ground, box: { x0: number; y0: number; x1: number; y1: number }, pitch: number, visible: (x: number, y: number) => boolean, c: ReturnType<typeof tones>, ink: Ink): SceneNode[] {
  const pts = grid(box.x0, box.y0, box.x1, box.y1, pitch, visible), r = pitch * 0.32;
  switch (kind) {
    case "stars": return [path(at(pts, khatamAt(r)), { fill: c.pattern, opacity: 0.6 }), path(at(grid(box.x0 + pitch / 2, box.y0 + pitch * 0.433, box.x1, box.y1, pitch, visible), dotAt(pitch * 0.07)), { fill: ink, opacity: 0.4 })];
    case "lattice": return [path(at(pts, diamondAt(pitch * 0.42)), { fill: null, stroke: c.pattern, strokeWidth: pitch * 0.06, opacity: 0.7 }), path(at(pts, dotAt(pitch * 0.08)), { fill: ink, opacity: 0.45 })];
    case "rosettes": return [path(at(pts, ringAt(r, pitch * 0.07)), { fill: c.pattern, opacity: 0.6, evenOdd: true }), path(at(pts, dotAt(pitch * 0.1)), { fill: ink, opacity: 0.45 })];
    case "scales": return [path(at(pts, (x, y) => `M${f(x - pitch / 2)} ${f(y)}A${f(pitch / 2)} ${f(pitch / 2)} 0 0 0 ${f(x + pitch / 2)} ${f(y)}`), { fill: null, stroke: c.pattern, strokeWidth: pitch * 0.07, opacity: 0.7 }), path(at(pts, dotAt(pitch * 0.07)), { fill: ink, opacity: 0.4 })];
    case "flowers": return [path(at(pts, (x, y) => [0, 90, 180, 270].map(a => { const ra = (a * Math.PI) / 180, dx = Math.cos(ra) * r * 0.55, dy = Math.sin(ra) * r * 0.55; return dotAt(r * 0.42)(x + dx, y + dy); }).join(" ")), { fill: c.pattern, opacity: 0.55 }), path(at(pts, dotAt(r * 0.25)), { fill: ink, opacity: 0.5 })];
    case "zellige": return [path(at(pts, khatamAt(r * 1.05)), { fill: c.pattern, opacity: 0.55 }), path(at(pts, khatamAt(r * 0.5)), { fill: ink, opacity: 0.35 }), path(at(grid(box.x0 + pitch / 2, box.y0 + pitch * 0.433, box.x1, box.y1, pitch, visible), diamondAt(pitch * 0.13)), { fill: c.bead2, opacity: 0.7 })];
    default: return [path(at(pts, dotAt(pitch * 0.16)), { fill: c.pattern, opacity: 0.6 })];
  }
}

/** Places `item` along the four sides of a band, oriented so +y points inward. */
function alongSides(W: number, H: number, e: number, t: number, pitch: number, item: (i: number) => SceneNode | null): SceneNode[] {
  const out: SceneNode[] = [], c = e + t / 2, x0 = e + t, x1 = W - e - t, y0 = e + t, y1 = H - e - t;
  const run = (len: number, pos: (d: number) => [number, number], rot: number) => {
    const n = Math.max(1, Math.round(len / pitch)), step = len / n;
    for (let i = 0; i < n; i++) { const [x, y] = pos((i + 0.5) * step); const node = item(i); if (node) out.push(g({ x, y, rotate: rot }, node)); }
  };
  run(x1 - x0, d => [x0 + d, c], 0);
  run(y1 - y0, d => [W - c, y0 + d], 90);
  run(x1 - x0, d => [x1 - d, H - c], 180);
  run(y1 - y0, d => [c, y1 - d], 270);
  return out;
}

const ringPath = (x: number, y: number, w: number, h: number, t: number) => `M${f(x)} ${f(y)}H${f(x + w)}V${f(y + h)}H${f(x)}Z M${f(x + t)} ${f(y + t)}V${f(y + h - t)}H${f(x + w - t)}V${f(y + t)}Z`;

/** The decorated border band, `t` thick, `e` in from the trim. */
function border(kind: Border, W: number, H: number, e: number, t: number, c: ReturnType<typeof tones>, p: Palette): SceneNode[] {
  const band = (fill: Ink) => path(ringPath(e, e, W - 2 * e, H - 2 * e, t), { fill, evenOdd: true });
  const rules = (ink: Ink, k = 0.14) => [path(ringPath(e + t * k, e + t * k, W - 2 * e - 2 * t * k, H - 2 * e - 2 * t * k, t * 0.05), { fill: ink, evenOdd: true }), path(ringPath(e + t * (1 - k) - t * 0.05, e + t * (1 - k) - t * 0.05, W - 2 * e - 2 * t * (1 - k) + t * 0.1, H - 2 * e - 2 * t * (1 - k) + t * 0.1, t * 0.05), { fill: ink, evenOdd: true })];
  const stitched = (style: "stars" | "chain" | "lattice") => [band(c.hole), g({ x: e, y: e }, tatreezFrame(W - 2 * e, H - 2 * e, t, [c.band, c.piece], { style }))];
  switch (kind) {
    case "tatreez-stars": return stitched("stars");
    case "tatreez-chain": return stitched("chain");
    case "tatreez-lattice": return stitched("lattice");
    case "beads": return [band(c.band), ...rules(c.hole), ...alongSides(W, H, e, t, t * 0.62, i => path(i % 3 === 1 ? khatamPath(t * 0.2) : diamondAt(t * 0.17)(0, 0), { fill: i % 3 === 1 ? c.bead2 : c.bead }))];
    case "arcade": return [band(c.band), ...alongSides(W, H, e, t, t * 0.85, () => g({},
      path(`M${f(-t * 0.32)} ${f(t * 0.36)}V${f(-t * 0.02)}A${f(t * 0.32)} ${f(t * 0.32)} 0 0 1 ${f(t * 0.32)} ${f(-t * 0.02)}V${f(t * 0.36)}Z`, { fill: c.hole }),
      path(`M${f(-t * 0.18)} ${f(t * 0.36)}V${f(0.04 * t)}A${f(t * 0.18)} ${f(t * 0.18)} 0 0 1 ${f(t * 0.18)} ${f(0.04 * t)}V${f(t * 0.36)}Z`, { fill: c.bead }),
      circle(0, -t * 0.4, t * 0.06, { fill: c.bead2 })))];
    case "scallop": return [band(c.band), ...alongSides(W, H, e, t, t * 0.7, () => g({}, path(`M${f(-t * 0.35)} ${f(t * 0.5)}A${f(t * 0.35)} ${f(t * 0.3)} 0 0 0 ${f(t * 0.35)} ${f(t * 0.5)}Z`, { fill: c.bead2 }), circle(0, -t * 0.12, t * 0.12, { fill: c.bead }), circle(0, -t * 0.12, t * 0.05, { fill: c.hole })))];
    case "rope": return [band(c.band), ...rules(c.bead2, 0.1), ...alongSides(W, H, e, t, t * 0.45, i => path(`M${f(-t * 0.3)} ${f(t * 0.34)}L${f(t * 0.02)} ${f(-t * 0.34)}L${f(t * 0.22)} ${f(-t * 0.34)}L${f(-t * 0.1)} ${f(t * 0.34)}Z`, { fill: i % 2 ? c.bead : c.hole }))];
    case "khatams": return [band(c.band), ...rules(c.bead2, 0.1), ...alongSides(W, H, e, t, t * 0.95, i => g({}, path(khatamPath(t * 0.3), { fill: i % 2 ? c.bead2 : c.bead }), circle(0, 0, t * 0.09, { fill: c.hole })))];
    case "dentil": return [band(c.hole), ...alongSides(W, H, e, t, t * 0.42, i => g({}, rect(-t * 0.19, -t * 0.45, t * 0.38, t * 0.42, { fill: i % 2 ? c.band : c.bead2 }), rect(-t * 0.19, t * 0.03, t * 0.38, t * 0.42, { fill: i % 2 ? c.bead : c.band }))), path(ringPath(e, e, W - 2 * e, H - 2 * e, t), { fill: null, stroke: c.band, strokeWidth: t * 0.06 })];
  }
  return [band(p.ink)];
}

/** A corner piece `t` across centred on the origin. */
function cornerPiece(kind: Corner, t: number, c: ReturnType<typeof tones>): SceneNode {
  switch (kind) {
    case "khatam": return g({}, rect(-t / 2, -t / 2, t, t, { fill: c.piece }), path(khatamPath(t * 0.42), { fill: c.hole }), path(khatamPath(t * 0.24), { fill: c.band }), circle(0, 0, t * 0.08, { fill: c.hole }));
    case "rosette": return g({}, rect(-t / 2, -t / 2, t, t, { fill: c.band }), circle(0, 0, t * 0.44, { fill: c.piece }), dotRing(t * 0.33, 12, t * 0.04, c.hole), circle(0, 0, t * 0.16, { fill: c.hole }));
    case "square": return g({}, rect(-t / 2, -t / 2, t, t, { fill: c.band }), g({ rotate: 45 }, rect(-t * 0.3, -t * 0.3, t * 0.6, t * 0.6, { fill: c.piece }), rect(-t * 0.16, -t * 0.16, t * 0.32, t * 0.32, { fill: c.hole })));
    case "flower": return g({}, rect(-t / 2, -t / 2, t, t, { fill: c.band }), Array.from({ length: 8 }, (_, i) => g({ rotate: i * 45 }, path(leafPath(t * 0.44, t * 0.13), { fill: i % 2 ? c.bead : c.piece }))), circle(0, 0, t * 0.1, { fill: c.hole }));
    case "star": return g({}, rect(-t / 2, -t / 2, t, t, { fill: c.band }), path(starPath(8, t * 0.48, t * 0.22), { fill: c.piece }), circle(0, 0, t * 0.12, { fill: c.hole }));
  }
}

/** Frame metrics for a page: border thickness `t`, outer strip `e`, panel inset `P`. */
export function frameMetrics(W: number, H: number, weight = 1) {
  const t = Math.min(W, H) * 0.055 * weight, e = t * 0.35, gap = t * 0.45;
  return { t, e, gap, P: e + t + gap };
}

/** Draws the ornate dress for a rectangular page around `inner`. */
function rectFrame(ctx: RenderContext, st: OrnateStyle, draw: (ctx: RenderContext) => ReturnType<Template["render"]>) {
  const { widthMm: W, heightMm: H } = ctx.size, p = ctx.palette, b = ctx.bleedMm + 1, c = tones(p, !!st.sober);
  const { t, e, P } = frameMetrics(W, H, st.weight);
  const pw = W - 2 * P, ph = H - 2 * P;
  let design: SceneNode;
  if (st.fixed) {
    // Drawn in fixed millimetres: render at full size and scale the whole page into the panel.
    const full = draw(ctx), k = Math.min(pw / W, ph / H);
    design = g({ x: P + (pw - W * k) / 2, y: P + (ph - H * k) / 2, scale: k }, rect(0, 0, W, H, { fill: full.background }), full.children);
  } else {
    // Drawn at the panel's own size, with almost no bleed: the panel rule covers the seam.
    const inner = draw({ ...ctx, size: { ...ctx.size, widthMm: pw, heightMm: ph }, bleedMm: -0.8 });
    design = g({ x: P, y: P }, rect(0, 0, pw, ph, { fill: inner.background }), inner.children);
  }
  const pitch = t * 0.6, edge = (x: number, y: number) => Math.min(x, y, W - x, H - y);
  const visible = (x: number, y: number) => { const d = edge(x, y); return d < e + pitch * 0.3 || (d > e + t - pitch * 0.3 && d < P - pitch * 0.4); };
  const cc = e + t / 2, rule = Math.max(0.5, t * 0.09);
  // Everything outside the panel: an opaque mat hides whatever the design lets run past its edges.
  const mat = `M${f(-b - 2)} ${f(-b - 2)}H${f(W + b + 2)}V${f(H + b + 2)}H${f(-b - 2)}Z M${f(P)} ${f(P)}V${f(P + ph)}H${f(P + pw)}V${f(P)}Z`;
  return scene(W, H, p.paper,
    design,
    path(mat, { fill: p.paper, evenOdd: true }),
    path(mat, { fill: c.tint, opacity: st.sober ? 0.12 : 0.28, evenOdd: true }),
    ground(st.ground, { x0: -b, y0: -b, x1: W + b, y1: H + b }, pitch, visible, c, p.ink),
    // Panel edge: a heavy rule over the seam and a hairline just inside it.
    path(ringPath(P - rule / 2, P - rule / 2, pw + rule, ph + rule, rule), { fill: c.band, evenOdd: true }),
    rect(P + rule * 1.4, P + rule * 1.4, pw - rule * 2.8, ph - rule * 2.8, { fill: null, stroke: c.piece, strokeWidth: rule * 0.3 }),
    border(st.border, W, H, e, t, c, p),
    [[cc, cc], [W - cc, cc], [W - cc, H - cc], [cc, H - cc]].map(([x, y]) => g({ x, y }, cornerPiece(st.corner, t * 1.08, c))),
    st.mids ? [[W / 2, H - cc], [cc, H / 2], [W - cc, H / 2]].map(([x, y]) => g({ x, y }, circle(0, 0, t * 0.62, { fill: c.hole }), circle(0, 0, t * 0.62, { fill: null, stroke: c.band, strokeWidth: t * 0.06 }), path(khatamPath(t * 0.4), { fill: c.piece }), circle(0, 0, t * 0.1, { fill: c.hole }))) : null,
    st.crest ? g({ x: W / 2, y: cc }, rays(28, t * 0.8, t * 1.2, c.piece, 0.5), circle(0, 0, t * 0.85, { fill: c.band }), dotRing(t * 0.68, 22, t * 0.035, c.bead), path(khatamPath(t * 0.45), { fill: c.piece }), circle(0, 0, t * 0.14, { fill: c.hole })) : null,
  );
}

/** Round pieces: the design in a circle, ringed by a decorated band. */
function roundFrame(ctx: RenderContext, st: OrnateStyle, draw: (ctx: RenderContext) => ReturnType<Template["render"]>) {
  const { widthMm: W, heightMm: H } = ctx.size, p = ctx.palette, b = ctx.bleedMm + 1, c = tones(p, !!st.sober);
  const R = W / 2, t = W * 0.075 * (st.weight ?? 1), rp = R - 1.2 * t, d = 2 * rp, mid = rp + t * 0.62;
  const inner = draw({ ...ctx, size: { ...ctx.size, widthMm: d, heightMm: d }, bleedMm: -0.8 });
  const n = Math.max(12, Math.round((2 * Math.PI * mid) / (t * 0.9)));
  const around = (k: number, node: (i: number) => SceneNode) => Array.from({ length: k }, (_, i) => { const a = (i / k) * 2 * Math.PI - Math.PI / 2; return g({ x: R + mid * Math.cos(a), y: R + mid * Math.sin(a), rotate: (a * 180) / Math.PI + 90 }, node(i)); });
  const beads: Record<Border, (i: number) => SceneNode> = {
    "tatreez-stars": i => path(i % 2 ? khatamPath(t * 0.3) : diamondAt(t * 0.18)(0, 0), { fill: i % 2 ? c.bead2 : c.bead }),
    "tatreez-chain": i => path(diamondAt(t * (i % 2 ? 0.28 : 0.14))(0, 0), { fill: i % 2 ? c.bead : c.bead2 }),
    "tatreez-lattice": i => g({}, path(diamondAt(t * 0.26)(0, 0), { fill: c.bead }), path(diamondAt(t * 0.1)(0, 0), { fill: i % 2 ? c.hole : c.bead2 })),
    beads: i => circle(0, 0, t * (i % 2 ? 0.16 : 0.09), { fill: i % 2 ? c.bead : c.bead2 }),
    arcade: () => path(`M${f(-t * 0.22)} ${f(t * 0.3)}V${f(0)}A${f(t * 0.22)} ${f(t * 0.22)} 0 0 1 ${f(t * 0.22)} 0V${f(t * 0.3)}Z`, { fill: c.bead }),
    scallop: () => g({}, circle(0, 0, t * 0.2, { fill: c.bead }), circle(0, 0, t * 0.08, { fill: c.hole })),
    rope: i => path(`M${f(-t * 0.2)} ${f(t * 0.3)}L${f(0)} ${f(-t * 0.3)}L${f(t * 0.14)} ${f(-t * 0.3)}L${f(-t * 0.06)} ${f(t * 0.3)}Z`, { fill: i % 2 ? c.bead : c.hole }),
    khatams: i => path(khatamPath(t * 0.26), { fill: i % 2 ? c.bead2 : c.bead }),
    dentil: i => rect(-t * 0.16, -t * 0.22, t * 0.32, t * 0.44, { fill: i % 2 ? c.bead : c.bead2 }),
  };
  return scene(W, H, p.paper,
    g({ x: R - rp, y: R - rp }, rect(0, 0, d, d, { fill: inner.background }), inner.children),
    // An opaque band from the panel's edge out past the trim hides the square corners.
    path(`M${-b - 2} ${-b - 2}H${W + b + 2}V${H + b + 2}H${-b - 2}Z ${circlePath(R, R, rp)}`, { fill: c.band, evenOdd: true }),
    circle(R, R, rp + t * 0.12, { fill: null, stroke: c.piece, strokeWidth: t * 0.08 }),
    circle(R, R, R - t * 0.12, { fill: null, stroke: c.bead, strokeWidth: t * 0.05 }),
    around(n, beads[st.border]),
    st.crest ? around(4, () => g({}, circle(0, 0, t * 0.42, { fill: c.hole }), path(khatamPath(t * 0.3), { fill: c.piece }))) : null,
  );
}

/** Wraps a template so every render wears its ornate style. */
export function ornate(t: Template, st: OrnateStyle): Template {
  const draw = t.render.bind(t);
  return { ...t, render: ctx => (t.shape === "round" ? roundFrame : rectFrame)(ctx, st, draw) };
}

const grounds: Ground[] = ["stars", "lattice", "rosettes", "scales", "flowers", "zellige", "dots"];
const borders: Border[] = ["tatreez-stars", "beads", "arcade", "khatams", "tatreez-chain", "scallop", "tatreez-lattice", "dentil"];
const corners: Corner[] = ["khatam", "rosette", "flower", "square", "star"];

/** Border weight by category: big posters and letter paper keep more room inside. */
const weightOf: Partial<Record<Category, number>> = { posters: 0.8, cities: 0.75, calendars: 0.7, stationery: 0.6, cards: 0.85, labels: 0.9, tickets: 0.85, stickers: 1, bookmarks: 1.1, tags: 1 };

/** Hand-picked styles where the rotation put two similar designs in similar dress. */
const overrides: Record<string, Partial<OrnateStyle>> = {
  "wedding-star-lattice": { ground: "flowers", border: "arcade", corner: "rosette", crest: false },
};

/** Designs written in fixed millimetres for one size. */
const fixed = new Set(["certificates-tatreez-honor", "certificates-en-achievement"]);

/** Sober dress for notices of death and condolence. */
const sober = new Set(["occasions-naaweh", "occasions-condolence-thanks"]);

/** A style for every template, varied by its place in its category so neighbours differ. */
export function styleFor(t: Template, indexInCategory: number): OrnateStyle {
  const i = indexInCategory, catSeed = [...t.category].reduce((a, ch) => a + ch.charCodeAt(0), 0);
  return {
    ground: grounds[(i + catSeed) % grounds.length],
    border: borders[(i * 2 + catSeed) % borders.length],
    corner: corners[(i + Math.floor(i / corners.length) + catSeed) % corners.length],
    crest: (i + catSeed) % 3 === 0,
    mids: (i + catSeed) % 2 === 1,
    weight: weightOf[t.category] ?? 1,
    sober: sober.has(t.id),
    fixed: fixed.has(t.id),
    ...overrides[t.id],
  };
}

/** Dresses a whole list, choosing each template's style from its place in its category. */
export function dressAll(list: Template[]): Template[] {
  const seen: Partial<Record<Category, number>> = {};
  return list.map(t => { const i = seen[t.category] ?? 0; seen[t.category] = i + 1; return ornate(t, styleFor(t, i)); });
}
