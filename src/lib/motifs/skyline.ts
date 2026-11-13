/** The Old City of Jerusalem as a flat silhouette. */
import type { Ink } from "../color.ts";
import { type GroupNode, type SceneNode, circle, g, path, rect } from "../scene.ts";
import { archPath, crescentPath } from "./geometry.ts";

const f = (v: number) => Math.round(v * 1000) / 1000;

/** Fills a w x h box at the origin, ground along the bottom edge.
 *  `dome` colours the Dome of the Rock; `cut` is the paper colour for windows. */
export function jerusalem(w: number, h: number, ink: Ink, dome: Ink, cut: Ink): GroupNode {
  const parts: SceneNode[] = [];
  const box = (x: number, bw: number, bh: number) => parts.push(rect(x * w, h - bh * h, bw * w, bh * h + 0.01, { fill: ink }));
  const cap = (x: number, bw: number, bh: number, rise = 0.5) => parts.push(path(`M${f(x * w)} ${f(h - bh * h)} A${f((bw * w) / 2)} ${f(bw * w * rise)} 0 0 1 ${f((x + bw) * w)} ${f(h - bh * h)} Z`, { fill: ink }));
  const windowAt = (x: number, y: number, ww: number, wh: number) => parts.push(g({ x: x * w, y: h - y * h }, path(archPath(ww * w, wh * h, 0.6), { fill: cut })));

  // Houses stepping up the hill, each with a small dome or a flat roof.
  const houses: [number, number, number, boolean][] = [
    [0.0, 0.09, 0.3, true], [0.08, 0.07, 0.4, false], [0.14, 0.08, 0.34, true], [0.25, 0.07, 0.42, false], [0.31, 0.06, 0.36, true],
    [0.62, 0.07, 0.38, true], [0.68, 0.08, 0.44, false], [0.75, 0.06, 0.33, true], [0.86, 0.07, 0.41, false], [0.92, 0.08, 0.31, true],
  ];
  for (const [x, bw, bh, domed] of houses) {
    box(x, bw, bh);
    if (domed) cap(x + bw * 0.15, bw * 0.7, bh);
    windowAt(x + bw * 0.38, bh - 0.06, bw * 0.24, 0.07);
  }

  // Two minarets.
  for (const x of [0.215, 0.815]) {
    box(x, 0.022, 0.78);
    parts.push(rect((x - 0.008) * w, h - 0.62 * h, 0.038 * w, 0.025 * h, { fill: ink }));
    parts.push(path(`M${f((x - 0.002) * w)} ${f(h - 0.78 * h)} L${f((x + 0.011) * w)} ${f(h - 0.9 * h)} L${f((x + 0.024) * w)} ${f(h - 0.78 * h)} Z`, { fill: ink }));
    parts.push(g({ x: (x + 0.011) * w, y: h - 0.93 * h, rotate: -90 }, path(crescentPath(0.012 * w), { fill: ink })));
  }

  // The Dome of the Rock: octagon, drum, dome, finial.
  box(0.39, 0.22, 0.36);
  for (let i = 0; i < 5; i++) windowAt(0.405 + i * 0.041, 0.3, 0.026, 0.13);
  box(0.44, 0.12, 0.5);
  const cx = 0.5 * w, top = h - 0.5 * h, r = 0.068 * w;
  parts.push(path(`M${f(cx - r)} ${f(top)} C${f(cx - r)} ${f(top - r * 1.25)} ${f(cx - r * 0.35)} ${f(top - r * 1.45)} ${f(cx)} ${f(top - r * 1.62)} C${f(cx + r * 0.35)} ${f(top - r * 1.45)} ${f(cx + r)} ${f(top - r * 1.25)} ${f(cx + r)} ${f(top)} Z`, { fill: dome }));
  parts.push(rect(cx - 0.0025 * w, top - r * 1.95, 0.005 * w, r * 0.4, { fill: dome }));
  parts.push(g({ x: cx, y: top - r * 2.08, rotate: -90 }, path(crescentPath(0.011 * w), { fill: dome })));

  // The wall in front, with its teeth and a gate.
  parts.push(rect(0, h - 0.17 * h, w, 0.17 * h + 0.01, { fill: ink }));
  const teeth = Math.round(w / (0.03 * w)), tw = w / teeth;
  parts.push(path(Array.from({ length: Math.ceil(teeth / 2) }, (_, i) => `M${f(i * 2 * tw)} ${f(h - 0.2 * h)} L${f(i * 2 * tw + tw)} ${f(h - 0.2 * h)} L${f(i * 2 * tw + tw)} ${f(h - 0.165 * h)} L${f(i * 2 * tw)} ${f(h - 0.165 * h)} Z`).join(" "), { fill: ink }));
  parts.push(g({ x: 0.47 * w, y: h - 0.13 * h }, path(archPath(0.06 * w, 0.13 * h + 0.01, 0.62), { fill: cut })));
  parts.push(circle(0.5 * w, h - 0.06 * h, 0.004 * w, { fill: ink }));
  return g({}, parts);
}
