/** Food motifs for menus: a shawarma spit, a citrus slice, a manousheh, a
 *  bowl of hummus from above, a fish, an ice cream cone, a fried egg. */
import type { Ink } from "../color.ts";
import { type GroupNode, type SceneNode, circle, g, path, rect } from "../scene.ts";

const f = (v: number) => Math.round(v * 1000) / 1000;

/** A shawarma cone on its spit, origin at the foot of the spit, `h` tall. */
export function shawarmaSpit(h: number, meat: Ink, crust: Ink, steel: Ink): GroupNode {
  const top = -h * 0.9, bot = -h * 0.12, layers: SceneNode[] = [];
  for (let i = 0; i < 14; i++) {
    const t0 = i / 14, y = top + (bot - top) * t0, w0 = h * (0.12 - 0.055 * t0), w1 = h * (0.12 - 0.055 * (t0 + 1 / 14));
    layers.push(path(`M${f(-w0)} ${f(y)} L${f(w0)} ${f(y)} L${f(w1)} ${f(y + (bot - top) / 14)} L${f(-w1)} ${f(y + (bot - top) / 14)} Z`, { fill: i % 2 ? meat : crust }));
  }
  return g({},
    rect(-h * 0.012, -h, h * 0.024, h, { fill: steel }),
    rect(-h * 0.14, top - h * 0.02, h * 0.28, h * 0.02, { fill: steel }),
    rect(-h * 0.08, bot, h * 0.16, h * 0.02, { fill: steel }),
    layers,
    rect(-h * 0.12, -h * 0.02, h * 0.24, h * 0.02, { fill: steel }));
}

/** A citrus slice centred on the origin. */
export function citrusSlice(r: number, rind: Ink, flesh: Ink, pith: Ink, segments = 10): GroupNode {
  const segs = Array.from({ length: segments }, (_, i) => {
    const a0 = (i / segments) * Math.PI * 2 + 0.05, a1 = ((i + 1) / segments) * Math.PI * 2 - 0.05, ri = r * 0.78, rc = r * 0.08;
    return `M${f(Math.cos((a0 + a1) / 2) * rc)} ${f(Math.sin((a0 + a1) / 2) * rc)} L${f(Math.cos(a0) * ri)} ${f(Math.sin(a0) * ri)} A${f(ri)} ${f(ri)} 0 0 1 ${f(Math.cos(a1) * ri)} ${f(Math.sin(a1) * ri)} Z`;
  }).join(" ");
  return g({}, circle(0, 0, r, { fill: rind }), circle(0, 0, r * 0.86, { fill: pith }), path(segs, { fill: flesh }));
}

/** A round manousheh with za'atar and oil, centred on the origin. */
export function manousheh(r: number, dough: Ink, zaatar: Ink, rim: Ink): GroupNode {
  const dots: string[] = [];
  for (let i = 0; i < 140; i++) {
    const a = i * 2.39996, d = Math.sqrt(i / 140) * r * 0.8, x = Math.cos(a) * d, y = Math.sin(a) * d, k = r * (0.018 + (i % 3) * 0.006);
    dots.push(`M${f(x - k)} ${f(y)} a${f(k)} ${f(k)} 0 1 0 ${f(2 * k)} 0 a${f(k)} ${f(k)} 0 1 0 ${f(-2 * k)} 0 Z`);
  }
  return g({}, circle(0, 0, r, { fill: rim }), circle(0, 0, r * 0.88, { fill: dough }), path(dots.join(" "), { fill: zaatar }));
}

/** A shallow bowl of hummus seen from above: the swirl, a pool of oil, chickpeas. */
export function hummusBowl(r: number, bowl: Ink, hummus: Ink, oil: Ink, pea: Ink): GroupNode {
  const swirl = Array.from({ length: 3 }, (_, i) => { const rr = r * (0.28 + i * 0.16); return `M${f(rr)} 0 A${f(rr)} ${f(rr)} 0 1 1 ${f(-rr * 0.7)} ${f(-rr * 0.7)}`; }).join(" ");
  return g({},
    circle(0, 0, r, { fill: bowl }), circle(0, 0, r * 0.84, { fill: hummus }),
    path(swirl, { fill: null, stroke: oil, strokeWidth: r * 0.035, opacity: 0.55 }),
    circle(0, 0, r * 0.2, { fill: oil, opacity: 0.85 }),
    [[0.02, -0.05], [-0.07, 0.04], [0.08, 0.06], [-0.02, 0.1], [0.1, -0.06]].map(([x, y]) => circle(x * r, y * r, r * 0.05, { fill: pea })),
    [[0.5, -0.3], [-0.45, 0.42], [0.36, 0.5]].map(([x, y]) => circle(x * r, y * r, r * 0.035, { fill: oil })));
}

/** A fish facing left, centred on the origin, `w` long. */
export function fish(w: number, body: Ink, fin: Ink, eye: Ink): GroupNode {
  return g({ scale: w },
    path("M0.5 0 L0.34 -0.13 L0.36 0 L0.34 0.13 Z", { fill: fin }),
    path("M-0.5 0 C-0.36 -0.22 0.1 -0.24 0.36 0 C0.1 0.24 -0.36 0.22 -0.5 0 Z", { fill: body }),
    path("M-0.05 -0.17 L0.12 -0.27 L0.16 -0.15 Z", { fill: fin }),
    path("M-0.26 -0.14 C-0.22 -0.05 -0.22 0.05 -0.26 0.14", { fill: null, stroke: fin, strokeWidth: 0.012 }),
    circle(-0.38, -0.03, 0.025, { fill: eye }));
}

/** An ice cream cone with `scoops` balls, origin at the tip, `h` tall. */
export function iceCream(h: number, cone: Ink, grid: Ink, scoops: Ink[]): GroupNode {
  const cw = h * 0.36, ch = h * 0.52, r = cw * 0.56;
  const lattice = [0.2, 0.4, 0.6, 0.8].map(k => `M${f(-cw / 2 * k)} ${f(-ch * k)} L${f(cw / 2 * (1 - k) * 0 + cw / 2)} ${f(-ch)} M${f(cw / 2 * k)} ${f(-ch * k)} L${f(-cw / 2)} ${f(-ch)}`).join(" ");
  return g({},
    scoops.slice().reverse().map((c, i, a) => { const j = a.length - 1 - i; return circle((j % 2 ? 1 : -1) * r * 0.18 * (j > 0 ? 1 : 0), -ch - r * 0.4 - j * r * 1.05, r, { fill: c }); }),
    path(`M0 0 L${f(cw / 2)} ${f(-ch)} L${f(-cw / 2)} ${f(-ch)} Z`, { fill: cone }),
    path(lattice, { fill: null, stroke: grid, strokeWidth: h * 0.008 }),
    rect(-cw * 0.56, -ch - h * 0.03, cw * 1.12, h * 0.05, { fill: cone, r: h * 0.02 }));
}

/** A fried egg seen from above, centred on the origin. */
export function friedEgg(r: number, white: Ink, yolk: Ink): GroupNode {
  return g({}, path(`M${f(r)} 0 C${f(r)} ${f(r * 0.7)} ${f(r * 0.3)} ${f(r * 1.05)} ${f(-r * 0.3)} ${f(r * 0.85)} C${f(-r * 1.1)} ${f(r * 0.6)} ${f(-r * 1.05)} ${f(-r * 0.4)} ${f(-r * 0.5)} ${f(-r * 0.85)} C${f(0)} ${f(-r * 1.15)} ${f(r)} ${f(-r * 0.8)} ${f(r)} 0 Z`, { fill: white }), circle(r * 0.05, -r * 0.05, r * 0.36, { fill: yolk }));
}
