/** Motifs for life's occasions: a bowl of wheat, a sheep, a darbuka drum, a
 *  Quran on its stand, a suitcase, a clock, a plane, a nursery mobile. */
import type { Ink } from "../color.ts";
import { type GroupNode, type SceneNode, circle, g, path, rect } from "../scene.ts";
import { crescentPath, starPath } from "./geometry.ts";

const f = (v: number) => Math.round(v * 1000) / 1000;

/** A bowl of boiled wheat (snouneh), origin at the foot of the bowl, `w` wide. */
export function wheatBowl(w: number, bowl: Ink, grain: Ink, topping: Ink, band?: Ink | null): GroupNode {
  const r = w / 2, h = w * 0.36, grains: SceneNode[] = [];
  for (let i = 0; i < 46; i++) {
    const a = (i * 137.5 * Math.PI) / 180, d = Math.sqrt(i / 46), x = Math.cos(a) * d * r * 0.86, y = -h - Math.abs(Math.sin(a)) * d * h * 0.1 - (1 - d) * h * 0.5;
    grains.push(g({ x, y, rotate: (i * 47) % 180 }, path(`M${f(-w * 0.025)} 0 Q0 ${f(-w * 0.018)} ${f(w * 0.025)} 0 Q0 ${f(w * 0.018)} ${f(-w * 0.025)} 0 Z`, { fill: i % 7 === 0 ? topping : grain })));
  }
  return g({},
    path(`M${f(-r)} ${f(-h)} Q${f(-r * 0.2)} ${f(-h * 1.9)} ${f(r)} ${f(-h)} Z`, { fill: grain }), grains,
    path(`M${f(-r)} ${f(-h)} L${f(r)} ${f(-h)} C${f(r * 0.95)} ${f(-h * 0.2)} ${f(r * 0.4)} 0 0 0 C${f(-r * 0.4)} 0 ${f(-r * 0.95)} ${f(-h * 0.2)} ${f(-r)} ${f(-h)} Z`, { fill: bowl }),
    band ? path(`M${f(-r * 0.93)} ${f(-h * 0.72)} L${f(r * 0.93)} ${f(-h * 0.72)}`, { fill: null, stroke: band, strokeWidth: w * 0.02 }) : null,
    rect(-r * 0.3, -h * 0.05, r * 0.6, h * 0.1, { fill: bowl }));
}

/** A woolly sheep facing left, origin at its feet, `w` long. */
export function sheep(w: number, wool: Ink, face: Ink): GroupNode {
  const blobs = [[-0.22, -0.52, 0.2], [0, -0.6, 0.22], [0.22, -0.52, 0.2], [-0.1, -0.38, 0.22], [0.14, -0.38, 0.22], [0.32, -0.42, 0.14], [-0.3, -0.4, 0.15]];
  return g({ scale: w },
    [-0.22, -0.08, 0.12, 0.26].map(x => rect(x - 0.03, -0.24, 0.06, 0.24, { fill: face })),
    blobs.map(([x, y, r]) => circle(x, y, r, { fill: wool })),
    g({ x: -0.42, y: -0.56, rotate: -15 }, path("M-0.12 0 C-0.12 -0.1 0.06 -0.13 0.1 -0.04 C0.13 0.06 0.02 0.14 -0.05 0.12 C-0.1 0.1 -0.12 0.06 -0.12 0 Z", { fill: face }), path("M0.04 -0.08 C0.12 -0.14 0.2 -0.08 0.16 0 C0.12 -0.03 0.08 -0.05 0.04 -0.08 Z", { fill: face })));
}

/** A darbuka drum standing on the origin, `h` tall, with a zigzag band. */
export function darbuka(h: number, body: Ink, skin: Ink, band: Ink): GroupNode {
  const zig = Array.from({ length: 9 }, (_, i) => `${i ? "L" : "M"}${f(-0.28 + i * 0.07)} ${f(i % 2 ? 0.16 : 0.22)}`).join(" ");
  return g({ scale: h, y: -h },
    path("M-0.31 0 C-0.33 0.3 -0.1 0.45 -0.09 0.58 L-0.21 1 L0.21 1 L0.09 0.58 C0.1 0.45 0.33 0.3 0.31 0 Z", { fill: body }),
    path(zig, { fill: null, stroke: band, strokeWidth: 0.03 }),
    path("M-0.2 0.36 L0.2 0.36", { fill: null, stroke: band, strokeWidth: 0.02 }),
    path("M-0.17 0.92 L0.17 0.92", { fill: null, stroke: band, strokeWidth: 0.025 }),
    path("M-0.33 0 A0.33 0.06 0 0 0 0.33 0 A0.33 0.06 0 0 0 -0.33 0 Z", { fill: skin }));
}

/** An open Quran on its wooden stand (rahl), origin at the foot, `w` wide. */
export function quranStand(w: number, wood: Ink, page: Ink, lines: Ink): GroupNode {
  const lineRows = (sx: number) => Array.from({ length: 6 }, (_, i) => `M${f(sx * 0.06)} ${f(-0.66 + i * 0.045 + Math.abs(sx) * 0)} L${f(sx * 0.4)} ${f(-0.7 + i * 0.045)}`).join(" ");
  return g({ scale: w },
    path("M-0.42 0 L0.3 -0.48 L0.36 -0.44 L-0.34 0.02 Z M0.42 0 L-0.3 -0.48 L-0.36 -0.44 L0.34 0.02 Z", { fill: wood }),
    path("M0 -0.42 C-0.15 -0.5 -0.3 -0.52 -0.48 -0.48 L-0.42 -0.86 C-0.26 -0.9 -0.12 -0.86 0 -0.78 Z", { fill: page }),
    path("M0 -0.42 C0.15 -0.5 0.3 -0.52 0.48 -0.48 L0.42 -0.86 C0.26 -0.9 0.12 -0.86 0 -0.78 Z", { fill: page }),
    path(`${lineRows(-1)} ${lineRows(1)}`, { fill: null, stroke: lines, strokeWidth: 0.008 }),
    path("M0 -0.42 L0 -0.78", { fill: null, stroke: lines, strokeWidth: 0.01 }));
}

/** A suitcase with travel stickers, origin at its foot, `w` wide. */
export function suitcase(w: number, shell: Ink, strap: Ink, sticker: Ink, sticker2: Ink): GroupNode {
  const h = w * 0.72;
  return g({},
    path(`M${f(-w * 0.16)} ${f(-h)} V${f(-h - w * 0.1)} H${f(w * 0.16)} V${f(-h)}`, { fill: null, stroke: strap, strokeWidth: w * 0.035 }),
    rect(-w / 2, -h, w, h * 0.94, { fill: shell, r: w * 0.07 }),
    rect(-w * 0.3, -h * 0.06, w * 0.08, h * 0.06, { fill: strap }), rect(w * 0.22, -h * 0.06, w * 0.08, h * 0.06, { fill: strap }),
    [-0.25, 0.25].map(x => rect(x * w - w * 0.03, -h, w * 0.06, h * 0.94, { fill: strap })),
    circle(-w * 0.04, -h * 0.62, w * 0.11, { fill: sticker }), rect(w * 0.02, -h * 0.4, w * 0.18, w * 0.11, { fill: sticker2, r: w * 0.01 }),
    g({ x: -w * 0.36, y: -h * 0.32, rotate: -12 }, rect(-w * 0.08, -w * 0.05, w * 0.16, w * 0.1, { fill: sticker2, r: w * 0.01 })));
}

/** A clock face centred on the origin showing `hour`:`minute`. */
export function clockFace(r: number, face: Ink, ink: Ink, hand: Ink, hour = 10, minute = 10): GroupNode {
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const a = (i * Math.PI) / 30, l = i % 5 ? 0.05 : 0.12, w = i % 5 ? 0.008 : 0.025;
    return `M${f(Math.sin(a) * r * 0.9)} ${f(-Math.cos(a) * r * 0.9)} L${f(Math.sin(a) * r * (0.9 - l))} ${f(-Math.cos(a) * r * (0.9 - l))}` + (w ? "" : "");
  });
  const handPath = (deg: number, len: number, wd: number) => { const a = (deg * Math.PI) / 180, s = Math.sin(a), c = -Math.cos(a), nx = -c * wd, ny = s * wd; return `M${f(nx)} ${f(ny)} L${f(s * len)} ${f(c * len)} L${f(-nx)} ${f(-ny)} Z`; };
  return g({},
    circle(0, 0, r, { fill: face, stroke: ink, strokeWidth: r * 0.06 }),
    path(ticks.filter((_, i) => i % 5 === 0).join(" "), { fill: null, stroke: ink, strokeWidth: r * 0.04 }),
    path(ticks.filter((_, i) => i % 5 !== 0).join(" "), { fill: null, stroke: ink, strokeWidth: r * 0.012 }),
    path(handPath((hour % 12) * 30 + minute / 2, r * 0.5, r * 0.04), { fill: ink }),
    path(handPath(minute * 6, r * 0.74, r * 0.028), { fill: hand }),
    circle(0, 0, r * 0.05, { fill: hand }));
}

/** A plane seen from above, nose to the right, centred on the origin, `w` long. */
export function plane(w: number, ink: Ink): GroupNode {
  return g({ scale: w }, path("M0.5 0 C0.5 -0.03 0.45 -0.04 0.38 -0.04 L0.1 -0.04 L-0.12 -0.42 L-0.2 -0.42 L-0.06 -0.04 L-0.34 -0.04 L-0.42 -0.16 L-0.48 -0.16 L-0.43 0 L-0.48 0.16 L-0.42 0.16 L-0.34 0.04 L-0.06 0.04 L-0.2 0.42 L-0.12 0.42 L0.1 0.04 L0.38 0.04 C0.45 0.04 0.5 0.03 0.5 0 Z", { fill: ink }));
}

/** A nursery mobile hanging from the origin: a bar and five charms. */
export function nurseryMobile(w: number, bar: Ink, a: Ink, b: Ink, c: Ink): GroupNode {
  const charms = [[-0.42, 0.42, "star", a], [-0.21, 0.62, "moon", b], [0, 0.36, "cloud", c], [0.21, 0.6, "star", b], [0.42, 0.44, "moon", a]] as const;
  return g({ scale: w },
    path("M-0.46 0.12 Q0 -0.02 0.46 0.12", { fill: null, stroke: bar, strokeWidth: 0.012 }),
    path("M0 -0.1 L0 0.05", { fill: null, stroke: bar, strokeWidth: 0.008 }),
    charms.map(([x, y, kind, ink]) => g({},
      path(`M${x} ${f(0.12 - 0.07 * (1 - Math.abs(x) / 0.46) * 2)} L${x} ${f(y - 0.05)}`, { fill: null, stroke: bar, strokeWidth: 0.005 }),
      g({ x, y }, kind === "star" ? path(starPath(5, 0.07, 0.03), { fill: ink }) : kind === "moon" ? g({ rotate: 200 }, path(crescentPath(0.065, 0.5), { fill: ink }))
        : g({}, circle(-0.04, 0.01, 0.04, { fill: ink }), circle(0.01, -0.02, 0.05, { fill: ink }), circle(0.05, 0.015, 0.035, { fill: ink }), rect(-0.08, 0.01, 0.16, 0.04, { fill: ink, r: 0.02 }))))));
}
