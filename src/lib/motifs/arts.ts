/** Motifs for posters: an oud, a line of dabke dancers, a blood drop and a
 *  heartbeat, a broom, a microphone, a flag. */
import type { Ink } from "../color.ts";
import { type GroupNode, circle, g, path, rect } from "../scene.ts";

const f = (v: number) => Math.round(v * 1000) / 1000;

/** An oud lying at `tilt` degrees, centred on its body, `h` long overall. */
export function oud(h: number, body: Ink, wood: Ink, rose: Ink, tilt = -32): GroupNode {
  return g({ rotate: tilt, scale: h },
    rect(-0.03, -0.78, 0.06, 0.48, { fill: wood }),
    path("M-0.03 -0.78 L0.03 -0.78 L0.1 -0.96 L0.04 -0.98 Z", { fill: wood }),
    [0, 1, 2, 3].map(i => rect(0.035 + i * 0.012, -0.84 - i * 0.032, 0.05, 0.012, { fill: wood })),
    path("M0 -0.32 C0.26 -0.32 0.36 -0.02 0.3 0.16 C0.24 0.34 0.1 0.42 0 0.42 C-0.1 0.42 -0.24 0.34 -0.3 0.16 C-0.36 -0.02 -0.26 -0.32 0 -0.32 Z", { fill: body }),
    path("M-0.24 -0.1 C-0.1 -0.2 0.1 -0.2 0.24 -0.1", { fill: null, stroke: wood, strokeWidth: 0.008, opacity: 0.5 }),
    circle(0, -0.02, 0.07, { fill: rose }), circle(0, -0.02, 0.09, { fill: null, stroke: rose, strokeWidth: 0.008 }),
    rect(-0.09, 0.22, 0.18, 0.035, { fill: wood }),
    path([-0.02, -0.007, 0.007, 0.02].map(x => `M${x} -0.76 L${f(x * 1.6)} 0.23`).join(" "), { fill: null, stroke: rose, strokeWidth: 0.003 }));
}

/** `n` dabke dancers holding hands, from the origin rightwards over `w`, `h` tall, standing on y = 0. */
export function dabkeLine(n: number, w: number, h: number, ink: Ink, sash?: Ink | null): GroupNode {
  const step = w / n, hands: string[] = [];
  const figs = Array.from({ length: n }, (_, i) => {
    const x = step * (i + 0.5), kick = i % 2 === 0, lw = h * 0.035;
    hands.push(`${i ? "L" : "M"}${f(x - step * 0.5)} ${f(-h * 0.64)} L${f(x)} ${f(-h * 0.78)}`);
    if (i === n - 1) hands.push(`L${f(x + step * 0.5)} ${f(-h * 0.64)}`);
    return g({},
      circle(x, -h * 0.9, h * 0.065, { fill: ink }),
      path(`M${f(x - h * 0.08)} ${f(-h * 0.8)} L${f(x + h * 0.08)} ${f(-h * 0.8)} L${f(x + h * 0.13)} ${f(-h * 0.3)} L${f(x - h * 0.13)} ${f(-h * 0.3)} Z`, { fill: ink }),
      sash ? rect(x - h * 0.1, -h * 0.58, h * 0.2, h * 0.04, { fill: sash }) : null,
      path(`M${f(x - h * 0.05)} ${f(-h * 0.3)} L${f(x - h * 0.06)} 0 M${f(x + h * 0.05)} ${f(-h * 0.3)} ${kick ? `L${f(x + h * 0.2)} ${f(-h * 0.08)}` : `L${f(x + h * 0.06)} 0`}`, { fill: null, stroke: ink, strokeWidth: lw }),
    );
  });
  return g({}, path(hands.join(" "), { fill: null, stroke: ink, strokeWidth: h * 0.03 }), figs);
}

/** A drop centred near the origin, `h` tall (tip at -0.6h). */
export const dropPath = (h: number) => {
  const k = h / 1.7;
  return `M0 ${f(-k)} C${f(0.15 * k)} ${f(-0.7 * k)} ${f(0.55 * k)} ${f(-0.3 * k)} ${f(0.55 * k)} ${f(0.15 * k)} C${f(0.55 * k)} ${f(0.5 * k)} ${f(0.3 * k)} ${f(0.7 * k)} 0 ${f(0.7 * k)} C${f(-0.3 * k)} ${f(0.7 * k)} ${f(-0.55 * k)} ${f(0.5 * k)} ${f(-0.55 * k)} ${f(0.15 * k)} C${f(-0.55 * k)} ${f(-0.3 * k)} ${f(-0.15 * k)} ${f(-0.7 * k)} 0 ${f(-k)} Z`;
};

/** A heartbeat trace from the origin to x = w, amplitude `a`. */
export function heartbeat(w: number, a: number): string {
  const p = [[0, 0], [0.34, 0], [0.38, -0.12], [0.42, 0], [0.47, 0], [0.5, 0.25], [0.55, -1], [0.6, 0.45], [0.64, 0], [0.7, 0], [0.75, -0.2], [0.8, 0], [1, 0]];
  return p.map(([x, y], i) => `${i ? "L" : "M"}${f(x * w)} ${f(y * a)}`).join(" ");
}

/** A broom leaning at `tilt`, origin at the bristle tips, `h` long. */
export function broom(h: number, handle: Ink, straw: Ink, band: Ink, tilt = 24): GroupNode {
  return g({ rotate: tilt, scale: h },
    rect(-0.018, -1, 0.036, 0.7, { fill: handle }),
    path("M-0.07 -0.32 L0.07 -0.32 L0.17 0 L-0.17 0 Z", { fill: straw }),
    rect(-0.08, -0.3, 0.16, 0.03, { fill: band }), rect(-0.1, -0.2, 0.2, 0.025, { fill: band }),
    path(Array.from({ length: 9 }, (_, i) => `M${f(-0.12 + i * 0.03)} -0.16 L${f(-0.15 + i * 0.0375)} 0`).join(" "), { fill: null, stroke: band, strokeWidth: 0.004 }));
}

/** A stage microphone on a stand, origin at the foot, `h` tall. */
export function microphone(h: number, ink: Ink, grille: Ink): GroupNode {
  return g({ scale: h },
    path("M-0.16 0 L0.16 0 L0.02 -0.05 L-0.02 -0.05 Z", { fill: ink }),
    rect(-0.012, -0.62, 0.024, 0.58, { fill: ink }),
    rect(-0.07, -0.98, 0.14, 0.3, { fill: ink, r: 0.07 }),
    path(Array.from({ length: 5 }, (_, i) => `M-0.055 ${f(-0.94 + i * 0.045)} L0.055 ${f(-0.94 + i * 0.045)}`).join(" "), { fill: null, stroke: grille, strokeWidth: 0.008 }),
    path("M-0.1 -0.8 C-0.1 -0.6 0.1 -0.6 0.1 -0.8", { fill: null, stroke: ink, strokeWidth: 0.02 }));
}

/** A small pennant flag on a pole, origin at the foot. */
export function flag(h: number, pole: Ink, cloth: Ink, check?: Ink | null): GroupNode {
  const cw = h * 0.5, ch = h * 0.32, cells = 4, rows = 3, sq: string[] = [];
  if (check) for (let i = 0; i < cells; i++) for (let j = 0; j < rows; j++) if ((i + j) % 2) sq.push(`M${f(i * cw / cells)} ${f(-h + j * ch / rows)} h${f(cw / cells)} v${f(ch / rows)} h${f(-cw / cells)} Z`);
  return g({}, rect(-h * 0.015, -h, h * 0.03, h, { fill: pole }), rect(0, -h, cw, ch, { fill: cloth }), check ? path(sq.join(" "), { fill: check }) : null);
}
