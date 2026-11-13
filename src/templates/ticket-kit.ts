/** Pieces every ticket shares: the perforated tear line and its notches. */
import type { Ink } from "../lib/color.ts";
import { type SceneNode, circle, path, rect } from "../lib/scene.ts";

/** A dotted tear line at x from top to bottom, with a half-round notch at each end. */
export function tearLine(x: number, H: number, ink: Ink, notch: Ink, s: number): SceneNode[] {
  const dots = Array.from({ length: Math.floor(H / (2.4 * s)) }, (_, i) => `M${x} ${1.6 * s + i * 2.4 * s} v${1.2 * s}`).join(" ");
  return [path(dots, { fill: null, stroke: ink, strokeWidth: 0.35 * s }), circle(x, 0, 3 * s, { fill: notch }), circle(x, H, 3 * s, { fill: notch })];
}

/** A barcode of `n` bars between x0 and x1, h tall, from a seed string so it stays put. */
export function barcode(x0: number, y: number, w: number, h: number, seed: string, ink: Ink): SceneNode[] {
  let k = 7;
  for (const c of seed) k = (k * 31 + c.charCodeAt(0)) % 9973;
  const out: SceneNode[] = [];
  let x = x0;
  while (x < x0 + w) {
    k = (k * 1103 + 12345) % 9973;
    const bw = (1 + (k % 3)) * w * 0.006, gap = (1 + ((k >> 2) % 3)) * w * 0.006;
    if (x + bw > x0 + w) break;
    out.push(rect(x, y, bw, h, { fill: ink }));
    x += bw + gap;
  }
  return out;
}
