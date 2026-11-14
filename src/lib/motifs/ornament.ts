/** Layering helpers that give flat templates depth: security grounds, dotted
 *  writing lines, double frames with corner pieces, scattered dot fields,
 *  hatching and scalloped or stepped borders. All sizes are in millimetres. */
import type { Ink } from "../color.ts";
import { type GroupNode, type SceneNode, circle, g, path, rect } from "../scene.ts";
import { khatamPath, starPath } from "./geometry.ts";

const f = (v: number) => Math.round(v * 100) / 100;

/** Banknote-style guilloche: pairs of crossing sine waves filling a box. */
export function guilloche(x: number, y: number, w: number, h: number, waves: number, amp: number, period: number): string {
  const d: string[] = [];
  for (let k = 0; k < waves; k++) {
    const y0 = y + (k + 0.5) * (h / waves), phase = k * 0.9;
    for (const sign of [1, -1]) {
      const pts: string[] = [];
      for (let t = 0; t <= w; t += period / 12) pts.push(`${pts.length ? "L" : "M"}${f(x + t)} ${f(y0 + sign * amp * Math.sin((t / period) * 2 * Math.PI + phase))}`);
      d.push(pts.join(" "));
    }
  }
  return d.join(" ");
}

/** A guilloche ground as a ready node. */
export const guillocheNode = (x: number, y: number, w: number, h: number, ink: Ink, o: { waves?: number; amp?: number; period?: number; width?: number; opacity?: number } = {}): SceneNode =>
  path(guilloche(x, y, w, h, o.waves ?? Math.max(3, Math.round(h / 9)), o.amp ?? 1.6, o.period ?? 18), { fill: null, stroke: ink, strokeWidth: o.width ?? 0.18, opacity: o.opacity ?? 0.5 });

/** Concentric guilloche rosette centred on the origin. */
export function rosetteLines(r: number, ink: Ink, o: { rings?: number; lobes?: number; width?: number; opacity?: number } = {}): SceneNode {
  const rings = o.rings ?? 5, lobes = o.lobes ?? 12, d: string[] = [];
  for (let k = 0; k < rings; k++) {
    const r0 = r * (0.45 + (0.55 * k) / Math.max(1, rings - 1)), amp = r * 0.06, pts: string[] = [];
    for (let i = 0; i <= 180; i++) {
      const a = (i / 180) * 2 * Math.PI, rr = r0 + amp * Math.sin(lobes * a + k);
      pts.push(`${i ? "L" : "M"}${f(rr * Math.cos(a))} ${f(rr * Math.sin(a))}`);
    }
    d.push(pts.join(" ") + " Z");
  }
  return path(d.join(" "), { fill: null, stroke: ink, strokeWidth: o.width ?? 0.2, opacity: o.opacity ?? 1 });
}

/** A dotted writing line made of short dashes. */
export function dottedPath(x0: number, x1: number, y: number, step: number, dash: number): string {
  const d: string[] = [];
  for (let x = x0; x + dash <= x1; x += step) d.push(`M${f(x)} ${f(y)} H${f(x + dash)}`);
  return d.join(" ");
}
export const dottedLine = (x0: number, x1: number, y: number, ink: Ink, s = 1): SceneNode =>
  path(dottedPath(x0, x1, y, 1.6 * s, 0.7 * s), { fill: null, stroke: ink, strokeWidth: 0.3 * s });

/** A vertical dashed line. */
export function dashedV(x: number, y0: number, y1: number, ink: Ink, s = 1): SceneNode {
  const d: string[] = [];
  for (let y = y0; y + 1 * s <= y1; y += 2 * s) d.push(`M${f(x)} ${f(y)} V${f(y + 1 * s)}`);
  return path(d.join(" "), { fill: null, stroke: ink, strokeWidth: 0.3 * s });
}

export type CornerStyle = "khatam" | "dot" | "diamond" | "bracket" | "star" | "none";

/** A single corner ornament centred on the origin. */
export function cornerPiece(style: CornerStyle, r: number, ink: Ink, hole: Ink): SceneNode | null {
  switch (style) {
    case "khatam": return g({}, path(khatamPath(r), { fill: ink }), path(khatamPath(r * 0.52), { fill: hole }), circle(0, 0, r * 0.22, { fill: ink }));
    case "dot": return g({}, circle(0, 0, r * 0.7, { fill: ink }), circle(0, 0, r * 0.35, { fill: hole }));
    case "diamond": return g({ rotate: 45 }, rect(-r * 0.6, -r * 0.6, r * 1.2, r * 1.2, { fill: ink }), rect(-r * 0.28, -r * 0.28, r * 0.56, r * 0.56, { fill: hole }));
    case "star": return path(starPath(4, r, r * 0.3), { fill: ink });
    case "bracket": return null;
    default: return null;
  }
}

/** Double frame: a heavy outer rule, a hairline inside, and corner pieces. */
export function doubleFrame(x: number, y: number, w: number, h: number, ink: Ink, hole: Ink, o: { gap?: number; heavy?: number; thin?: number; corner?: CornerStyle; r?: number; radius?: number } = {}): GroupNode {
  const gap = o.gap ?? 3, heavy = o.heavy ?? 1, thin = o.thin ?? 0.3, r = o.r ?? gap * 1.3, corner = o.corner ?? "khatam";
  const cx = [x + gap / 2, x + w - gap / 2], cy = [y + gap / 2, y + h - gap / 2];
  const brackets: SceneNode[] = corner === "bracket" ? cx.flatMap((px, i) => cy.map((py, j) => {
    const sx = i ? -1 : 1, sy = j ? -1 : 1, L = r * 2.4;
    return path(`M${f(px + sx * L)} ${f(py)} H${f(px)} V${f(py + sy * L)}`, { fill: null, stroke: ink, strokeWidth: heavy * 1.4 });
  })) : [];
  return g({},
    rect(x, y, w, h, { fill: null, stroke: ink, strokeWidth: heavy, r: o.radius }),
    rect(x + gap, y + gap, w - 2 * gap, h - 2 * gap, { fill: null, stroke: ink, strokeWidth: thin, r: o.radius ? Math.max(0, o.radius - gap) : undefined }),
    brackets,
    corner !== "bracket" ? cx.flatMap(px => cy.map(py => g({ x: px, y: py }, cornerPiece(corner, r, ink, hole)))) : [],
  );
}

/** A soft field of dots on a grid, optionally thinning out toward one side. */
export function dotField(x: number, y: number, w: number, h: number, pitch: number, dot: number, ink: Ink, o: { fade?: "left" | "right" | "up" | "down" | "none"; opacity?: number } = {}): SceneNode {
  const d: string[] = [], fade = o.fade ?? "none";
  for (let j = 0, py = y; py <= y + h; j++, py += pitch) {
    for (let px = x + (j % 2 ? pitch / 2 : 0); px <= x + w; px += pitch) {
      const t = fade === "left" ? (px - x) / w : fade === "right" ? 1 - (px - x) / w : fade === "up" ? (py - y) / h : fade === "down" ? 1 - (py - y) / h : 1;
      const rr = dot * (0.25 + 0.75 * t);
      if (rr > dot * 0.3) d.push(`M${f(px - rr)} ${f(py)} a${f(rr)} ${f(rr)} 0 1 0 ${f(2 * rr)} 0 a${f(rr)} ${f(rr)} 0 1 0 ${f(-2 * rr)} 0 Z`);
    }
  }
  return path(d.join(" "), { fill: ink, opacity: o.opacity ?? 1 });
}

/** Diagonal hatching clipped to a box (lines only run inside it). */
export function hatch(x: number, y: number, w: number, h: number, pitch: number, ink: Ink, width = 0.2, opacity = 1): SceneNode {
  const d: string[] = [];
  for (let k = -h; k < w; k += pitch) {
    const x0 = x + Math.max(k, 0), y0 = y + Math.max(0, -k), len = Math.min(w - Math.max(k, 0), h - Math.max(0, -k));
    if (len > 0) d.push(`M${f(x0)} ${f(y0 + 0)} L${f(x0 + len)} ${f(y0 + len)}`);
  }
  return path(d.join(" "), { fill: null, stroke: ink, strokeWidth: width, opacity });
}

/** A row of small diamonds or dots along a line, as a divider. */
export function beadRule(x0: number, x1: number, y: number, ink: Ink, s = 1, o: { bead?: "diamond" | "dot"; pitch?: number; centre?: boolean } = {}): GroupNode {
  const pitch = (o.pitch ?? 4) * s, n = Math.max(1, Math.floor((x1 - x0) / pitch)), start = x0 + ((x1 - x0) - (n - 1) * pitch) / 2, mid = (x0 + x1) / 2;
  const beads = Array.from({ length: n }, (_, i) => start + i * pitch).map(px => o.bead === "dot"
    ? circle(px, y, 0.45 * s, { fill: ink })
    : path(`M${f(px)} ${f(y - 0.8 * s)} L${f(px + 0.8 * s)} ${f(y)} L${f(px)} ${f(y + 0.8 * s)} L${f(px - 0.8 * s)} ${f(y)} Z`, { fill: ink }));
  return g({}, beads, o.centre ? g({ x: mid, y }, path(khatamPath(2.2 * s), { fill: ink })) : null);
}

/** Ornamental divider: two hairlines flanking a centre khatam and dots. */
export function flourishRule(cx: number, y: number, w: number, ink: Ink, s = 1): GroupNode {
  return g({},
    rect(cx - w / 2, y - 0.15 * s, w / 2 - 5 * s, 0.3 * s, { fill: ink }),
    rect(cx + 5 * s, y - 0.15 * s, w / 2 - 5 * s, 0.3 * s, { fill: ink }),
    circle(cx - 3.6 * s, y, 0.6 * s, { fill: ink }), circle(cx + 3.6 * s, y, 0.6 * s, { fill: ink }),
    g({ x: cx, y }, path(khatamPath(2 * s), { fill: ink })),
    circle(cx - w / 2, y, 0.7 * s, { fill: ink }), circle(cx + w / 2, y, 0.7 * s, { fill: ink }),
  );
}

/** A scalloped edge along the top or bottom of a band, bumps facing out. */
export function scallopEdge(x: number, y: number, w: number, r: number, ink: Ink, dir: 1 | -1 = 1): SceneNode {
  const n = Math.max(1, Math.round(w / (2 * r))), rr = w / n / 2, d = [`M${f(x)} ${f(y)}`];
  for (let i = 0; i < n; i++) d.push(`A${f(rr)} ${f(rr)} 0 0 ${dir > 0 ? 1 : 0} ${f(x + (i + 1) * 2 * rr)} ${f(y)}`);
  return path(d.join(" ") + " Z", { fill: ink });
}

/** A stepped (crenellated) edge, like a tatreez border or old city wall. */
export function stepEdge(x: number, y: number, w: number, step: number, ink: Ink, dir: 1 | -1 = 1): SceneNode {
  const n = Math.max(1, Math.round(w / (2 * step))), u = w / n / 2, d = [`M${f(x)} ${f(y)}`];
  for (let i = 0; i < n; i++) {
    const x0 = x + i * 2 * u;
    d.push(`V${f(y - dir * step)} H${f(x0 + u)} V${f(y)} H${f(x0 + 2 * u)}`);
  }
  return path(d.join(" ") + " Z", { fill: ink });
}

/** A circular stamp outline: two rings and a dotted ring between. */
export function stampRing(r: number, ink: Ink, s = 1): GroupNode {
  return g({},
    circle(0, 0, r, { fill: null, stroke: ink, strokeWidth: 0.35 * s }),
    circle(0, 0, r * 0.86, { fill: null, stroke: ink, strokeWidth: 0.2 * s }),
    Array.from({ length: 36 }, (_, i) => circle(r * 0.93 * Math.cos((i * Math.PI) / 18), r * 0.93 * Math.sin((i * Math.PI) / 18), 0.25 * s, { fill: ink })),
  );
}

/** Sunburst of thin lines from the origin, for poster backgrounds. */
export function burstLines(count: number, r0: number, r1: number, ink: Ink, width = 0.3, opacity = 1): SceneNode {
  const d: string[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i * 2 * Math.PI) / count;
    d.push(`M${f(r0 * Math.cos(a))} ${f(r0 * Math.sin(a))} L${f(r1 * Math.cos(a))} ${f(r1 * Math.sin(a))}`);
  }
  return path(d.join(" "), { fill: null, stroke: ink, strokeWidth: width, opacity });
}

/** Concentric rings, for halos and target-like grounds. */
export function ringsNode(r0: number, r1: number, count: number, ink: Ink, width = 0.25, opacity = 1): SceneNode {
  return g({ opacity }, Array.from({ length: count }, (_, i) => circle(0, 0, r0 + ((r1 - r0) * i) / Math.max(1, count - 1), { fill: null, stroke: ink, strokeWidth: width })));
}

/** Wavy line across, for water and ribbons. */
export function waveLine(x: number, y: number, w: number, amp: number, period: number, ink: Ink, width = 0.4): SceneNode {
  const pts: string[] = [];
  for (let t = 0; t <= w; t += period / 16) pts.push(`${pts.length ? "L" : "M"}${f(x + t)} ${f(y + amp * Math.sin((t / period) * 2 * Math.PI))}`);
  return path(pts.join(" "), { fill: null, stroke: ink, strokeWidth: width });
}

/** Tiled khatam stars: a quiet geometric ground. */
export function starTile(x: number, y: number, w: number, h: number, pitch: number, r: number, ink: Ink, opacity = 1): SceneNode {
  const d: string[] = [];
  for (let j = 0, py = y; py <= y + h; j++, py += pitch) for (let px = x + (j % 2 ? pitch / 2 : 0); px <= x + w; px += pitch) {
    const k = khatamPath(r).replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, a, b) => `${f(Number(a) + px)} ${f(Number(b) + py)}`);
    d.push(k);
  }
  return path(d.join(" "), { fill: ink, opacity });
}
