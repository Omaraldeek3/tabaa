/** Pantry motifs for product labels: a halved fig, pickled vegetables, a
 *  carob pod, a coffee bean, a sage sprig, an incense burner. */
import type { Ink } from "../color.ts";
import { type GroupNode, circle, g, path, rect } from "../scene.ts";
import { leafPath } from "./plants.ts";

const f = (v: number) => Math.round(v * 1000) / 1000;

/** A fig cut in half, centred on the origin, `h` tall. */
export function figHalf(h: number, skin: Ink, flesh: Ink, seed: Ink): GroupNode {
  const outer = "M0 -0.5 C0.08 -0.5 0.1 -0.42 0.14 -0.34 C0.36 -0.2 0.44 0.08 0.36 0.26 C0.28 0.44 0.12 0.5 0 0.5 C-0.12 0.5 -0.28 0.44 -0.36 0.26 C-0.44 0.08 -0.36 -0.2 -0.14 -0.34 C-0.1 -0.42 -0.08 -0.5 0 -0.5 Z";
  const inner = "M0 -0.36 C0.22 -0.2 0.32 0.06 0.26 0.22 C0.2 0.36 0.1 0.4 0 0.4 C-0.1 0.4 -0.2 0.36 -0.26 0.22 C-0.32 0.06 -0.22 -0.2 0 -0.36 Z";
  const seeds = Array.from({ length: 40 }, (_, i) => { const a = i * 2.4, d = Math.sqrt(i / 40) * 0.2; return circle(Math.cos(a) * d, 0.1 + Math.sin(a) * d * 1.2, 0.012, { fill: seed }); });
  return g({ scale: h }, path(outer, { fill: skin }), path(inner, { fill: flesh }), seeds, rect(-0.015, -0.6, 0.03, 0.12, { fill: skin }));
}

/** A cucumber, a chilli and a carrot side by side, centred on the origin, `w` wide. */
export function pickledVeg(w: number, cucumber: Ink, chilli: Ink, carrot: Ink, top: Ink): GroupNode {
  return g({ scale: w },
    g({ x: -0.3, rotate: -12 }, rect(-0.07, -0.32, 0.14, 0.64, { fill: cucumber, r: 0.07 }), path("M-0.03 -0.2 v0.04 M0.03 -0.05 v0.04 M-0.02 0.1 v0.04", { fill: null, stroke: top, strokeWidth: 0.012 })),
    g({ x: 0.02, rotate: 8 }, path("M0 -0.3 C0.1 -0.28 0.1 0 0.04 0.2 C0 0.32 -0.06 0.34 -0.04 0.2 C-0.02 0 -0.08 -0.28 0 -0.3 Z", { fill: chilli }), path("M0 -0.3 C0 -0.36 0.04 -0.4 0.08 -0.4", { fill: null, stroke: top, strokeWidth: 0.02 })),
    g({ x: 0.3, rotate: 14 }, path("M-0.07 -0.26 L0.07 -0.26 L0 0.32 Z", { fill: carrot }), path("M0 -0.26 l-0.06 -0.12 M0 -0.26 l0 -0.14 M0 -0.26 l0.06 -0.12", { fill: null, stroke: top, strokeWidth: 0.02 })));
}

/** A carob pod curving across the origin, `w` long. */
export function carobPod(w: number, pod: Ink, seam: Ink, bend = 0.18): GroupNode {
  const d = `M-0.5 0 C-0.2 ${-bend} 0.2 ${-bend} 0.5 0 C0.52 0.05 0.48 0.08 0.44 0.07 C0.2 ${0.08 - bend * 0.6} -0.2 ${0.08 - bend * 0.6} -0.48 0.07 C-0.52 0.06 -0.53 0.02 -0.5 0 Z`;
  const bumps = Array.from({ length: 7 }, (_, i) => { const x = -0.36 + i * 0.12; return `M${f(x)} ${f(-bend * 0.9 * (1 - (x / 0.5) ** 2) + 0.02)} v0.05`; }).join(" ");
  return g({ scale: w }, path(d, { fill: pod }), path(bumps, { fill: null, stroke: seam, strokeWidth: 0.008 }));
}

/** A roasted coffee bean, centred on the origin, `h` long, turned by `tilt`. */
export function coffeeBean(h: number, bean: Ink, crease: Ink, tilt = 30): GroupNode {
  return g({ rotate: tilt, scale: h }, path("M0 -0.5 C0.34 -0.5 0.36 0.5 0 0.5 C-0.36 0.5 -0.34 -0.5 0 -0.5 Z", { fill: bean }), path("M0 -0.42 C0.12 -0.2 -0.12 0.2 0 0.42", { fill: null, stroke: crease, strokeWidth: 0.06 }));
}

/** A sprig of sage: a stem with paired soft leaves, origin at the foot, `h` tall. */
export function sageSprig(h: number, leaf: Ink, stem: Ink): GroupNode {
  const pairs = [0.2, 0.38, 0.56, 0.74];
  return g({},
    path(`M0 0 C${f(h * 0.04)} ${f(-h * 0.4)} ${f(-h * 0.03)} ${f(-h * 0.7)} 0 ${f(-h)}`, { fill: null, stroke: stem, strokeWidth: h * 0.012 }),
    pairs.flatMap((k, i) => [-1, 1].map(sx => g({ x: 0, y: -h * k, rotate: sx > 0 ? -35 - i * 4 : 215 + i * 4 }, path(leafPath(h * (0.3 - i * 0.03), h * 0.08), { fill: leaf })))),
    g({ y: -h * 0.92, rotate: -90 }, path(leafPath(h * 0.14, h * 0.05), { fill: leaf })));
}

/** A mabkhara incense burner with smoke, origin at the foot, `h` tall. */
export function incenseBurner(h: number, body: Ink, smoke: Ink): GroupNode {
  return g({ scale: h },
    path("M-0.2 0 L0.2 0 L0.14 -0.08 L0.1 -0.3 L-0.1 -0.3 L-0.14 -0.08 Z", { fill: body }),
    path("M-0.18 -0.3 L0.18 -0.3 L0.22 -0.42 L-0.22 -0.42 Z", { fill: body }),
    path("M-0.12 -0.42 C-0.12 -0.52 0.12 -0.52 0.12 -0.42 Z", { fill: body }),
    path("M0 -0.52 C-0.1 -0.62 0.1 -0.7 0 -0.8 C-0.1 -0.88 0.08 -0.94 0.02 -1 M0.06 -0.54 C0.14 -0.62 0.02 -0.7 0.1 -0.78", { fill: null, stroke: smoke, strokeWidth: 0.025 }),
    [-0.1, 0, 0.1].map(x => rect(x - 0.02, -0.24, 0.04, 0.1, { fill: smoke, opacity: 0.6 })));
}
