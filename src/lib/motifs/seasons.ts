/** Motifs for greetings: a stitched heart, an apple and pencil, a cup of tea,
 *  the star over Bethlehem, a bundle of candles, the Kaaba, fireworks. */
import type { Ink } from "../color.ts";
import { type GroupNode, type SceneNode, circle, g, path, rect } from "../scene.ts";
import { leafPath } from "./plants.ts";
import { type StitchFn, stitches } from "./stitch.ts";

const f = (v: number) => Math.round(v * 1000) / 1000;

/** A heart worked in cross-stitch, `w` wide, from the origin. */
export function stitchedHeart(w: number, threads: [Ink, Ink?]): GroupNode {
  const n = 21;
  const fn: StitchFn = (x, y) => {
    const u = (x - 10) / 9, v = -(y - 8.5) / 9, h = (u * u + v * v - 1) ** 3 - u * u * v ** 3;
    if (h > 0) return 0;
    const inner = (u * u * 1.4 + v * v * 1.4 - 1) ** 3 - u * u * 1.4 * (v * 1.18) ** 3;
    return inner > 0 ? 1 : (x + y) % 4 === 0 ? 2 : 0;
  };
  return stitches(n, n, w, w, fn, threads);
}

/** A red apple with a leaf, centred on the origin, `r` its radius. */
export function apple(r: number, skin: Ink, leaf: Ink, stem: Ink): GroupNode {
  return g({},
    path(`M0 ${f(-r * 0.7)} C${f(r * 0.5)} ${f(-r * 1.1)} ${f(r * 1.15)} ${f(-r * 0.6)} ${f(r)} ${f(r * 0.2)} C${f(r * 0.9)} ${f(r * 0.9)} ${f(r * 0.3)} ${f(r * 1.05)} 0 ${f(r * 0.85)} C${f(-r * 0.3)} ${f(r * 1.05)} ${f(-r * 0.9)} ${f(r * 0.9)} ${f(-r)} ${f(r * 0.2)} C${f(-r * 1.15)} ${f(-r * 0.6)} ${f(-r * 0.5)} ${f(-r * 1.1)} 0 ${f(-r * 0.7)} Z`, { fill: skin }),
    rect(-r * 0.04, -r * 1.05, r * 0.08, r * 0.4, { fill: stem }),
    g({ x: r * 0.04, y: -r * 0.92, rotate: -30 }, path(leafPath(r * 0.6, r * 0.2), { fill: leaf })));
}

/** A cup with steam, origin at its foot, `w` wide. */
export function teaCup(w: number, cup: Ink, tea: Ink, steam: Ink, leaf?: Ink | null): GroupNode {
  const h = w * 0.7;
  return g({},
    path(`M${f(-w / 2)} ${f(-h)} L${f(w / 2)} ${f(-h)} L${f(w * 0.38)} 0 L${f(-w * 0.38)} 0 Z`, { fill: cup }),
    path(`M${f(w * 0.45)} ${f(-h * 0.8)} c${f(w * 0.25)} 0 ${f(w * 0.25)} ${f(h * 0.5)} ${f(-w * 0.02)} ${f(h * 0.55)}`, { fill: null, stroke: cup, strokeWidth: w * 0.06 }),
    rect(-w * 0.46, -h, w * 0.92, w * 0.06, { fill: tea }),
    leaf ? g({ x: -w * 0.1, y: -h - w * 0.02, rotate: -20 }, path(leafPath(w * 0.3, w * 0.09), { fill: leaf })) : null,
    path([-0.18, 0.04, 0.24].map(k => `M${f(w * k)} ${f(-h - w * 0.1)} c${f(-w * 0.1)} ${f(-w * 0.12)} ${f(w * 0.1)} ${f(-w * 0.2)} 0 ${f(-w * 0.34)}`).join(" "), { fill: null, stroke: steam, strokeWidth: w * 0.03 }),
    rect(-w * 0.55, -w * 0.02, w * 1.1, w * 0.04, { fill: cup, r: w * 0.02 }));
}

/** The star over Bethlehem: eight short rays and one long tail, centred on the origin. */
export function bethlehemStar(r: number, ink: Ink): GroupNode {
  const ray = (a: number, len: number, wd: number) => { const c = Math.cos(a), s = Math.sin(a); return `M${f(-s * wd)} ${f(c * wd)} L${f(c * len)} ${f(s * len)} L${f(s * wd)} ${f(-c * wd)} Z`; };
  const d = Array.from({ length: 8 }, (_, i) => ray((i * Math.PI) / 4 - Math.PI / 2, i % 2 ? r * 0.55 : r, r * 0.09)).join(" ") + " " + ray(Math.PI / 2, r * 3.2, r * 0.07);
  return g({}, path(d, { fill: ink }), circle(0, 0, r * 0.16, { fill: ink }));
}

/** Old Bethlehem rooftops: domes, flat roofs and a bell tower across `w`, standing on y = 0. */
export function bethlehemTown(w: number, h: number, ink: Ink): GroupNode {
  const blocks: SceneNode[] = [], spec = [[0, 0.5, 0.32], [0.12, 0.62, 0.22], [0.26, 0.42, 0.26], [0.38, 0.95, 0.07], [0.45, 0.55, 0.2], [0.62, 0.7, 0.18], [0.78, 0.48, 0.24]];
  for (const [x, hh, ww] of spec) {
    blocks.push(rect(x * w, -hh * h, ww * w + 0.5, hh * h, { fill: ink }));
    if (ww > 0.1 && hh < 0.65) { const r = ww * w * 0.32; blocks.push(path(`M${f(x * w + ww * w / 2 - r)} ${f(-hh * h)} A${f(r)} ${f(r)} 0 0 1 ${f(x * w + ww * w / 2 + r)} ${f(-hh * h)} Z`, { fill: ink })); }
    if (ww < 0.1) blocks.push(rect(x * w + ww * w * 0.42, -hh * h - h * 0.12, ww * w * 0.16, h * 0.12, { fill: ink }), rect(x * w + ww * w * 0.2, -hh * h - h * 0.08, ww * w * 0.6, h * 0.03, { fill: ink }));
  }
  return g({}, blocks);
}

/** A fan of thin candles bound together, origin at the binding, `h` tall. */
export function candleBundle(h: number, n: number, wax: Ink, flame: Ink, band: Ink): GroupNode {
  const out: SceneNode[] = [];
  for (let i = 0; i < n; i++) {
    const a = ((i - (n - 1) / 2) / n) * 40, len = h * (0.8 + ((i * 7) % 5) * 0.04);
    out.push(g({ rotate: a }, rect(-h * 0.012, -len, h * 0.024, len + h * 0.25, { fill: wax }), path(`M0 ${f(-len - h * 0.08)} C${f(h * 0.03)} ${f(-len - h * 0.04)} ${f(h * 0.02)} ${f(-len)} 0 ${f(-len)} C${f(-h * 0.02)} ${f(-len)} ${f(-h * 0.03)} ${f(-len - h * 0.04)} 0 ${f(-len - h * 0.08)} Z`, { fill: flame })));
  }
  return g({}, out, rect(-h * 0.1, -h * 0.03, h * 0.2, h * 0.06, { fill: band }));
}

/** The Kaaba in two-point view with its gold band, origin at the foot of the near corner. */
export function kaaba(w: number, cloth: Ink, gold: Ink, edge: Ink): GroupNode {
  const h = w * 0.62, d = w * 0.22;
  const left = `M0 0 L${f(-w * 0.5)} ${f(-d)} L${f(-w * 0.5)} ${f(-d - h)} L0 ${f(-h)} Z`, right = `M0 0 L${f(w * 0.5)} ${f(-d)} L${f(w * 0.5)} ${f(-d - h)} L0 ${f(-h)} Z`;
  const top = `M0 ${f(-h)} L${f(-w * 0.5)} ${f(-d - h)} L0 ${f(-2 * d - h)} L${f(w * 0.5)} ${f(-d - h)} Z`;
  const bandY = h * 0.72, bh = h * 0.08;
  return g({},
    path(left, { fill: cloth }), path(right, { fill: cloth, opacity: 0.85 }), path(top, { fill: edge }),
    path(`M0 ${f(-bandY)} L${f(-w * 0.5)} ${f(-d - bandY)} L${f(-w * 0.5)} ${f(-d - bandY - bh)} L0 ${f(-bandY - bh)} L${f(w * 0.5)} ${f(-d - bandY - bh)} L${f(w * 0.5)} ${f(-d - bandY)} Z`, { fill: gold }),
    rect(w * 0.12, -h * 0.5 - d * 0.6, w * 0.1, h * 0.3, { fill: gold, opacity: 0.9 }));
}

/** A firework burst centred on the origin: rays of dots. */
export function firework(r: number, ink: Ink, rays = 14): GroupNode {
  const dots: SceneNode[] = [];
  for (let i = 0; i < rays; i++) for (let k = 1; k <= 4; k++) {
    const a = (i / rays) * Math.PI * 2, d = r * (0.25 + k * 0.19);
    dots.push(circle(Math.cos(a) * d, Math.sin(a) * d, r * (0.035 - k * 0.004), { fill: ink }));
  }
  return g({}, dots, circle(0, 0, r * 0.08, { fill: ink }));
}

/** A trophy cup with handles on a stepped base, origin at the foot, `h` tall. */
export function trophy(h: number, metal: Ink, base: Ink): GroupNode {
  return g({ scale: h },
    rect(-0.26, -0.1, 0.52, 0.1, { fill: base }), rect(-0.18, -0.18, 0.36, 0.08, { fill: base }),
    rect(-0.04, -0.4, 0.08, 0.22, { fill: metal }),
    path("M-0.32 -1 L0.32 -1 C0.32 -0.6 0.16 -0.42 0 -0.42 C-0.16 -0.42 -0.32 -0.6 -0.32 -1 Z", { fill: metal }),
    path("M-0.31 -0.92 C-0.48 -0.92 -0.5 -0.7 -0.24 -0.6 M0.31 -0.92 C0.48 -0.92 0.5 -0.7 0.24 -0.6", { fill: null, stroke: metal, strokeWidth: 0.04 }),
    path("M0 -0.88 L0.03 -0.8 L0.11 -0.8 L0.05 -0.75 L0.07 -0.67 L0 -0.72 L-0.07 -0.67 L-0.05 -0.75 L-0.11 -0.8 L-0.03 -0.8 Z", { fill: base }));
}

/** A shield of honour (dir'), centred at its top middle, `w` wide. */
export const shieldPath = (w: number) => `M${f(-w / 2)} 0 H${f(w / 2)} V${f(w * 0.55)} C${f(w / 2)} ${f(w * 0.95)} ${f(w * 0.15)} ${f(w * 1.1)} 0 ${f(w * 1.2)} C${f(-w * 0.15)} ${f(w * 1.1)} ${f(-w / 2)} ${f(w * 0.95)} ${f(-w / 2)} ${f(w * 0.55)} Z`;

/** A rosette medal with two ribbon tails, centred on the disc, `r` its radius. */
export function rosette(r: number, disc: Ink, ribbon: Ink, ring: Ink): GroupNode {
  const petals = Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; return circle(Math.cos(a) * r * 0.9, Math.sin(a) * r * 0.9, r * 0.28, { fill: ribbon }); });
  return g({},
    path(`M${f(-r * 0.5)} ${f(r * 0.5)} L${f(-r * 0.75)} ${f(r * 2)} L${f(-r * 0.45)} ${f(r * 1.8)} L${f(-r * 0.2)} ${f(r * 2.05)} L0 ${f(r * 0.6)} Z M${f(r * 0.5)} ${f(r * 0.5)} L${f(r * 0.75)} ${f(r * 2)} L${f(r * 0.45)} ${f(r * 1.8)} L${f(r * 0.2)} ${f(r * 2.05)} L0 ${f(r * 0.6)} Z`, { fill: ribbon }),
    petals, circle(0, 0, r * 0.85, { fill: disc }), circle(0, 0, r * 0.68, { fill: null, stroke: ring, strokeWidth: r * 0.05 }));
}

/** Raised open hands side by side, standing on y = 0, `w` wide. */
export function raisedHands(w: number, n: number, inks: Ink[]): GroupNode {
  const step = w / n;
  return g({}, Array.from({ length: n }, (_, i) => {
    const x = step * (i + 0.5), hh = step * (1.3 + ((i * 3) % 4) * 0.12), pw = step * 0.5, c = inks[i % inks.length];
    const fingers = [-0.36, -0.12, 0.12, 0.36].map((k, j) => rect(x + k * pw - pw * 0.09, -hh - [0.2, 0.32, 0.3, 0.18][j] * pw, pw * 0.18, pw * 0.6, { fill: c, r: pw * 0.09 }));
    return g({}, rect(x - pw * 0.22, -hh * 0.55, pw * 0.44, hh * 0.55, { fill: c }), rect(x - pw / 2, -hh, pw, hh * 0.5, { fill: c, r: pw * 0.18 }), fingers,
      g({ x: x - pw * 0.48, y: -hh * 0.7, rotate: -40 }, rect(-pw * 0.09, -pw * 0.4, pw * 0.18, pw * 0.45, { fill: c, r: pw * 0.09 })));
  }));
}
