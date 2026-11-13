/** Landmarks of Palestinian cities, each filling a w x h box at the origin
 *  with the ground along the bottom edge. Flat shapes in one or two inks. */
import type { Ink } from "../color.ts";
import { type GroupNode, type SceneNode, circle, g, path, rect } from "../scene.ts";
import { archPath, crescentPath } from "./geometry.ts";

const f = (v: number) => Math.round(v * 1000) / 1000;
const waves = (w: number, y: number, amp: number, n: number) => `M0 ${f(y)} ` + Array.from({ length: n }, () => `q${f(w / n / 2)} ${f(-amp)} ${f(w / n)} 0`).join(" ");

/** Jaffa: the Ottoman clock tower on the sea front. */
export function jaffaClock(w: number, h: number, stone: Ink, face: Ink, sea: Ink): GroupNode {
  const tw = w * 0.22, x = w / 2 - tw / 2, th = h * 0.86;
  return g({},
    rect(0, h * 0.86, w, h * 0.14, { fill: sea }),
    path(`${waves(w, h * 0.9, h * 0.015, 14)} ${waves(w, h * 0.95, h * 0.015, 14)}`, { fill: null, stroke: face, strokeWidth: h * 0.006 }),
    rect(x, h - th, tw, th - h * 0.14, { fill: stone }),
    rect(x - tw * 0.08, h * 0.42, tw * 1.16, h * 0.02, { fill: stone }), rect(x - tw * 0.08, h * 0.62, tw * 1.16, h * 0.02, { fill: stone }),
    circle(w / 2, h * 0.3, tw * 0.3, { fill: face }), path(`M${f(w / 2)} ${f(h * 0.3)} V${f(h * 0.3 - tw * 0.22)} M${f(w / 2)} ${f(h * 0.3)} L${f(w / 2 + tw * 0.16)} ${f(h * 0.3 + tw * 0.06)}`, { fill: null, stroke: stone, strokeWidth: tw * 0.04 }),
    [0.5, 0.72].map(y => g({ x: x + tw * 0.32, y: h * y }, path(archPath(tw * 0.36, h * 0.08, 0.6), { fill: face }))),
    path(`M${f(x + tw * 0.1)} ${f(h - th)} A${f(tw * 0.4)} ${f(tw * 0.4)} 0 0 1 ${f(x + tw * 0.9)} ${f(h - th)} Z`, { fill: stone }),
    rect(w / 2 - tw * 0.02, h - th - tw * 0.6, tw * 0.04, tw * 0.25, { fill: stone }));
}

/** Haifa: terraced gardens down Mount Carmel to the port and its cranes. */
export function haifaCarmel(w: number, h: number, hill: Ink, garden: Ink, sea: Ink): GroupNode {
  const terraces = Array.from({ length: 9 }, (_, i) => { const y = h * (0.18 + i * 0.07), x = w * (0.1 + i * 0.045); return rect(x, y, w * 0.18, h * 0.025, { fill: garden }); });
  const cranes = [0.7, 0.82].map(x => g({}, rect(w * x, h * 0.55, w * 0.012, h * 0.3, { fill: hill }), path(`M${f(w * x)} ${f(h * 0.55)} L${f(w * (x + 0.12))} ${f(h * 0.58)} L${f(w * (x - 0.04))} ${f(h * 0.58)} Z`, { fill: hill })));
  return g({},
    path(`M0 ${f(h * 0.12)} C${f(w * 0.3)} ${f(h * 0.1)} ${f(w * 0.5)} ${f(h * 0.6)} ${f(w * 0.62)} ${f(h * 0.85)} L0 ${f(h * 0.85)} Z`, { fill: hill }),
    terraces, rect(w * 0.27, h * 0.36, w * 0.06, h * 0.06, { fill: garden }), path(`M${f(w * 0.27)} ${f(h * 0.36)} A${f(w * 0.03)} ${f(w * 0.03)} 0 0 1 ${f(w * 0.33)} ${f(h * 0.36)} Z`, { fill: garden }),
    cranes, rect(0, h * 0.85, w, h * 0.15, { fill: sea }));
}

/** Akka: crenellated sea walls with the dome and minaret behind them. */
export function akkaWalls(w: number, h: number, stone: Ink, dome: Ink, sea: Ink): GroupNode {
  const merlons = Array.from({ length: 18 }, (_, i) => rect(w * (i / 18) + w * 0.01, h * 0.5, w / 18 * 0.6, h * 0.05, { fill: stone }));
  return g({},
    path(`M${f(w * 0.42)} ${f(h * 0.4)} A${f(w * 0.12)} ${f(w * 0.12)} 0 0 1 ${f(w * 0.66)} ${f(h * 0.4)} Z`, { fill: dome }),
    rect(w * 0.42, h * 0.4, w * 0.24, h * 0.12, { fill: dome }),
    rect(w * 0.72, h * 0.12, w * 0.03, h * 0.4, { fill: stone }), path(`M${f(w * 0.715)} ${f(h * 0.12)} L${f(w * 0.735)} ${f(h * 0.04)} L${f(w * 0.755)} ${f(h * 0.12)} Z`, { fill: stone }),
    g({ x: w * 0.735, y: h * 0.015, rotate: -90 }, path(crescentPath(w * 0.012), { fill: stone })),
    merlons, rect(0, h * 0.55, w, h * 0.3, { fill: stone }),
    path(Array.from({ length: 8 }, (_, i) => `M${f(w * (0.06 + i * 0.12))} ${f(h * 0.62)} h${f(w * 0.05)}`).join(" "), { fill: null, stroke: sea, strokeWidth: h * 0.01 }),
    rect(0, h * 0.85, w, h * 0.15, { fill: sea }),
    path(`M0 ${f(h * 0.85)} q${f(w * 0.04)} ${f(-h * 0.06)} ${f(w * 0.08)} 0 q${f(w * 0.04)} ${f(-h * 0.05)} ${f(w * 0.08)} 0`, { fill: sea }));
}

/** Jerusalem: Damascus Gate, a crenellated façade around a pointed arch. */
export function damascusGate(w: number, h: number, stone: Ink, cut: Ink): GroupNode {
  const top = h * 0.2, merl = Array.from({ length: 11 }, (_, i) => path(`M${f(w * (0.06 + i * 0.08))} ${f(top)} v${f(-h * 0.05)} l${f(w * 0.02)} ${f(-h * 0.03)} l${f(w * 0.02)} ${f(h * 0.03)} v${f(h * 0.05)} Z`, { fill: stone }));
  return g({},
    merl, rect(w * 0.04, top, w * 0.92, h - top, { fill: stone }),
    rect(w * 0.04, h * 0.3, w * 0.14, h * 0.7, { fill: cut, opacity: 0.12 }), rect(w * 0.82, h * 0.3, w * 0.14, h * 0.7, { fill: cut, opacity: 0.12 }),
    g({ x: w * 0.36, y: h * 0.42 }, path(archPath(w * 0.28, h * 0.58, 0.72), { fill: cut })),
    g({ x: w * 0.39, y: h * 0.47 }, path(archPath(w * 0.22, h * 0.53, 0.72), { fill: stone, opacity: 0.25 })),
    rect(w * 0.3, h * 0.36, w * 0.4, h * 0.012, { fill: cut }),
    [0.14, 0.82].map(x => g({ x: w * x, y: h * 0.48 }, path(archPath(w * 0.04, h * 0.1, 0.7), { fill: cut }))));
}

/** Hebron: blown-glass vessels and a bunch of grapes. */
export function hebronGlass(w: number, h: number, glass: Ink, glass2: Ink, grape: Ink, leaf: Ink): GroupNode {
  const vase = (x: number, vw: number, vh: number, ink: Ink) => path(`M${f(x - vw * 0.18)} ${f(h - vh)} L${f(x + vw * 0.18)} ${f(h - vh)} L${f(x + vw * 0.14)} ${f(h - vh * 0.75)} C${f(x + vw * 0.6)} ${f(h - vh * 0.6)} ${f(x + vw * 0.55)} ${f(h)} ${f(x)} ${f(h)} C${f(x - vw * 0.55)} ${f(h)} ${f(x - vw * 0.6)} ${f(h - vh * 0.6)} ${f(x - vw * 0.14)} ${f(h - vh * 0.75)} Z`, { fill: ink, opacity: 0.9 });
  const grapes: SceneNode[] = [];
  const rows = [5, 4, 4, 3, 2, 1];
  rows.forEach((n, r) => { for (let i = 0; i < n; i++) grapes.push(circle(w * 0.72 + (i - (n - 1) / 2) * w * 0.05, h * 0.22 + r * w * 0.045, w * 0.026, { fill: grape })); });
  return g({},
    vase(w * 0.22, w * 0.3, h * 0.62, glass), vase(w * 0.45, w * 0.22, h * 0.45, glass2),
    path(`M${f(w * 0.72)} ${f(h * 0.2)} C${f(w * 0.7)} ${f(h * 0.12)} ${f(w * 0.75)} ${f(h * 0.08)} ${f(w * 0.8)} ${f(h * 0.06)}`, { fill: null, stroke: leaf, strokeWidth: w * 0.012 }),
    path(`M${f(w * 0.76)} ${f(h * 0.16)} c${f(w * 0.08)} ${f(-h * 0.08)} ${f(w * 0.16)} ${f(-h * 0.02)} ${f(w * 0.14)} ${f(h * 0.06)} c${f(-w * 0.06)} ${f(h * 0.02)} ${f(-w * 0.1)} ${f(-h * 0.02)} ${f(-w * 0.14)} ${f(-h * 0.06)} Z`, { fill: leaf }),
    grapes);
}

/** Nablus: the city in the valley between Gerizim and Ebal, a stack of soap in front. */
export function nablusValley(w: number, h: number, hill: Ink, hill2: Ink, town: Ink, soap: Ink): GroupNode {
  const houses = Array.from({ length: 14 }, (_, i) => rect(w * (0.25 + i * 0.035), h * (0.6 - ((i * 5) % 7) * 0.012), w * 0.03, h * 0.12, { fill: town }));
  const bars = [[0.06, 0.88], [0.17, 0.88], [0.115, 0.8]].map(([x, y]) => g({}, rect(w * x, h * y, w * 0.1, h * 0.08, { fill: soap }), rect(w * x + w * 0.015, h * y + h * 0.02, w * 0.07, h * 0.04, { fill: null, stroke: town, strokeWidth: w * 0.004 })));
  return g({},
    path(`M0 ${f(h * 0.7)} C${f(w * 0.1)} ${f(h * 0.2)} ${f(w * 0.3)} ${f(h * 0.18)} ${f(w * 0.48)} ${f(h * 0.66)} Z`, { fill: hill }),
    path(`M${f(w * 0.42)} ${f(h * 0.66)} C${f(w * 0.6)} ${f(h * 0.12)} ${f(w * 0.85)} ${f(h * 0.1)} ${f(w)} ${f(h * 0.62)} L${f(w)} ${f(h * 0.7)} Z`, { fill: hill2 }),
    houses, rect(0, h * 0.7, w, h * 0.3, { fill: hill2 }), bars);
}

/** Gaza: fishing boats with lateen sails on the sea under a low sun. */
export function gazaBoats(w: number, h: number, sun: Ink, sail: Ink, hull: Ink, sea: Ink): GroupNode {
  const boat = (x: number, k: number) => g({ x: w * x, y: h * 0.72 }, path(`M${f(-w * 0.1 * k)} 0 L${f(w * 0.1 * k)} 0 L${f(w * 0.07 * k)} ${f(h * 0.05 * k)} L${f(-w * 0.08 * k)} ${f(h * 0.05 * k)} Z`, { fill: hull }), rect(-w * 0.004, -h * 0.34 * k, w * 0.008, h * 0.34 * k, { fill: hull }), path(`M${f(-w * 0.004)} ${f(-h * 0.33 * k)} L${f(w * 0.1 * k)} ${f(-h * 0.04 * k)} L${f(-w * 0.004)} ${f(-h * 0.04 * k)} Z`, { fill: sail }));
  return g({}, circle(w * 0.3, h * 0.66, w * 0.16, { fill: sun }), rect(0, h * 0.72, w, h * 0.28, { fill: sea }), boat(0.58, 1), boat(0.8, 0.7), boat(0.15, 0.55),
    path(`${waves(w, h * 0.82, h * 0.012, 16)} ${waves(w, h * 0.9, h * 0.012, 16)}`, { fill: null, stroke: sun, strokeWidth: h * 0.005, opacity: 0.7 }));
}

/** Bethlehem: three bells under the arches of a belfry. */
export function bethlehemBells(w: number, h: number, stone: Ink, bell: Ink, cut: Ink): GroupNode {
  const bw = w * 0.22, bellAt = (x: number) => g({ x: w * x, y: h * 0.42 }, rect(-w * 0.004, -h * 0.08, w * 0.008, h * 0.06, { fill: bell }), path(`M${f(-bw * 0.32)} ${f(h * 0.12)} C${f(-bw * 0.32)} 0 ${f(-bw * 0.2)} ${f(-h * 0.04)} 0 ${f(-h * 0.04)} C${f(bw * 0.2)} ${f(-h * 0.04)} ${f(bw * 0.32)} 0 ${f(bw * 0.32)} ${f(h * 0.12)} L${f(bw * 0.4)} ${f(h * 0.15)} L${f(-bw * 0.4)} ${f(h * 0.15)} Z`, { fill: bell }), circle(0, h * 0.17, w * 0.012, { fill: bell }));
  return g({},
    rect(w * 0.08, h * 0.2, w * 0.84, h * 0.8, { fill: stone }), path(`M${f(w * 0.05)} ${f(h * 0.2)} L${f(w / 2)} ${f(h * 0.04)} L${f(w * 0.95)} ${f(h * 0.2)} Z`, { fill: stone }),
    rect(w * 0.49, -h * 0.04, w * 0.02, h * 0.1, { fill: stone }), rect(w * 0.47, -h * 0.01, w * 0.06, h * 0.014, { fill: stone }),
    [0.14, 0.39, 0.64].map(x => g({ x: w * x, y: h * 0.28 }, path(archPath(w * 0.22, h * 0.36, 0.5), { fill: cut }))),
    [0.25, 0.5, 0.75].map(bellAt),
    g({ x: w * 0.44, y: h * 0.8 }, path(archPath(w * 0.12, h * 0.2, 0.5), { fill: cut })));
}

/** Nazareth: the Basilica of the Annunciation with its lantern cone. */
export function nazarethBasilica(w: number, h: number, stone: Ink, cone: Ink, cut: Ink): GroupNode {
  return g({},
    rect(w * 0.1, h * 0.55, w * 0.8, h * 0.45, { fill: stone }),
    rect(w * 0.3, h * 0.42, w * 0.4, h * 0.13, { fill: stone }),
    path(`M${f(w * 0.3)} ${f(h * 0.42)} L${f(w * 0.46)} ${f(h * 0.08)} L${f(w * 0.54)} ${f(h * 0.08)} L${f(w * 0.7)} ${f(h * 0.42)} Z`, { fill: cone }),
    path(Array.from({ length: 5 }, (_, i) => `M${f(w * (0.34 + i * 0.08))} ${f(h * 0.42)} L${f(w * (0.47 + i * 0.015))} ${f(h * 0.1)}`).join(" "), { fill: null, stroke: stone, strokeWidth: w * 0.004 }),
    rect(w * 0.47, h * 0.02, w * 0.06, h * 0.06, { fill: cone }), rect(w * 0.495, -h * 0.03, w * 0.01, h * 0.05, { fill: cone }),
    Array.from({ length: 7 }, (_, i) => g({ x: w * (0.15 + i * 0.1), y: h * 0.64 }, path(archPath(w * 0.05, h * 0.16, 0.5), { fill: cut }))));
}

/** Ramallah: Al-Manara column among stone houses with red roofs on the hills. */
export function ramallahManara(w: number, h: number, stone: Ink, roof: Ink, hill: Ink): GroupNode {
  const houses = [[0.04, 0.5, 0.14], [0.2, 0.56, 0.12], [0.66, 0.52, 0.14], [0.82, 0.58, 0.13]].map(([x, y, bw]) => g({}, rect(w * x, h * y, w * bw, h * (0.86 - y), { fill: stone }), path(`M${f(w * (x - 0.01))} ${f(h * y)} L${f(w * (x + bw / 2))} ${f(h * (y - 0.07))} L${f(w * (x + bw + 0.01))} ${f(h * y)} Z`, { fill: roof })));
  return g({},
    path(`M0 ${f(h * 0.6)} C${f(w * 0.3)} ${f(h * 0.4)} ${f(w * 0.7)} ${f(h * 0.45)} ${f(w)} ${f(h * 0.55)} L${f(w)} ${f(h)} L0 ${f(h)} Z`, { fill: hill }),
    houses,
    rect(w * 0.47, h * 0.14, w * 0.06, h * 0.72, { fill: stone }),
    rect(w * 0.44, h * 0.12, w * 0.12, h * 0.03, { fill: stone }), circle(w / 2, h * 0.08, w * 0.035, { fill: roof }),
    rect(w * 0.38, h * 0.82, w * 0.24, h * 0.06, { fill: stone }),
    [0.4, 0.6].map(x => g({ x: w * x, y: h * 0.82 }, path(`M${f(-w * 0.04)} 0 L${f(-w * 0.03)} ${f(-h * 0.05)} L${f(w * 0.02)} ${f(-h * 0.07)} L${f(w * 0.04)} 0 Z`, { fill: roof }))),
    rect(0, h * 0.86, w, h * 0.14, { fill: hill }));
}

/** Safad: a hilltop town stacked round a cone of a hill, blue doors. */
export function safadHill(w: number, h: number, hill: Ink, house: Ink, door: Ink): GroupNode {
  const out: SceneNode[] = [];
  const rows = [[0.22, 6], [0.36, 5], [0.5, 4], [0.64, 3]];
  rows.forEach(([y, n], r) => { for (let i = 0; i < n; i++) { const span = 0.7 - r * 0.15, x = 0.5 - span / 2 + (i + 0.5) * span / n; out.push(rect(w * (x - 0.045), h * (1 - y) - h * 0.1, w * 0.09, h * 0.1, { fill: house })); out.push(g({ x: w * (x - 0.012), y: h * (1 - y) - h * 0.06 }, path(archPath(w * 0.024, h * 0.06, 0.5), { fill: door }))); } });
  return g({}, path(`M0 ${f(h)} C${f(w * 0.25)} ${f(h * 0.6)} ${f(w * 0.38)} ${f(h * 0.25)} ${f(w / 2)} ${f(h * 0.24)} C${f(w * 0.62)} ${f(h * 0.25)} ${f(w * 0.75)} ${f(h * 0.6)} ${f(w)} ${f(h)} Z`, { fill: hill }), out,
    rect(w * 0.47, h * 0.12, w * 0.06, h * 0.14, { fill: house }), path(`M${f(w * 0.47)} ${f(h * 0.12)} A${f(w * 0.03)} ${f(w * 0.03)} 0 0 1 ${f(w * 0.53)} ${f(h * 0.12)} Z`, { fill: house }));
}

/** Tiberias: the lake held between hills, a boat and a palm on the shore. */
export function tiberiasLake(w: number, h: number, hill: Ink, lake: Ink, palm: Ink): GroupNode {
  const fronds = Array.from({ length: 7 }, (_, i) => { const a = -160 + i * 23; return g({ x: w * 0.14, y: h * 0.42, rotate: a }, path(`M0 0 Q${f(w * 0.06)} ${f(-h * 0.03)} ${f(w * 0.12)} ${f(h * 0.02)} Q${f(w * 0.06)} 0 0 0 Z`, { fill: palm })); });
  return g({},
    path(`M0 ${f(h * 0.45)} C${f(w * 0.2)} ${f(h * 0.25)} ${f(w * 0.45)} ${f(h * 0.3)} ${f(w * 0.6)} ${f(h * 0.42)} C${f(w * 0.75)} ${f(h * 0.22)} ${f(w * 0.9)} ${f(h * 0.28)} ${f(w)} ${f(h * 0.4)} L${f(w)} ${f(h * 0.55)} L0 ${f(h * 0.55)} Z`, { fill: hill }),
    rect(0, h * 0.55, w, h * 0.45, { fill: lake }),
    path(`${waves(w, h * 0.68, h * 0.01, 12)} ${waves(w, h * 0.8, h * 0.01, 12)}`, { fill: null, stroke: hill, strokeWidth: h * 0.004, opacity: 0.5 }),
    g({ x: w * 0.62, y: h * 0.66 }, path(`M${f(-w * 0.06)} 0 L${f(w * 0.06)} 0 L${f(w * 0.045)} ${f(h * 0.025)} L${f(-w * 0.045)} ${f(h * 0.025)} Z`, { fill: palm }), path(`M0 0 L0 ${f(-h * 0.1)} L${f(w * 0.05)} 0 Z`, { fill: hill })),
    path(`M${f(w * 0.14)} ${f(h * 0.62)} C${f(w * 0.13)} ${f(h * 0.55)} ${f(w * 0.15)} ${f(h * 0.48)} ${f(w * 0.14)} ${f(h * 0.42)}`, { fill: null, stroke: palm, strokeWidth: w * 0.014 }),
    fronds);
}
