/** Things drawn for the second set of templates: floor tiles, mosaic, fruit,
 *  birds, flowers, doors, candles, seals. All in millimetres; each says where
 *  its origin sits. */
import type { Ink } from "../color.ts";
import { type GroupNode, type SceneNode, circle, g, path, rect } from "../scene.ts";
import { leafPath } from "./plants.ts";
import { scallopPath, starPath } from "./geometry.ts";

const f = (v: number) => Math.round(v * 1000) / 1000;

/** Regular polygon centred on the origin, flat side on top when `flat`. */
export function polygonPath(sides: number, r: number, flat = true): string {
  const off = flat ? Math.PI / sides : 0;
  return Array.from({ length: sides }, (_, i) => {
    const a = off + (i * 2 * Math.PI) / sides - Math.PI / 2;
    return `${i ? "L" : "M"}${f(r * Math.cos(a))} ${f(r * Math.sin(a))}`;
  }).join(" ") + " Z";
}

/** Old cement floor tiles: whole cells only, from the origin, w x h. Each cell
 *  has four quarter-circle petals at its corners, a ring and a centre diamond,
 *  so neighbouring cells join into flowers. */
export function cementTiles(w: number, h: number, cell: number, a: Ink, b: Ink, c: Ink | null = null): GroupNode {
  const cols = Math.max(1, Math.floor(w / cell + 1e-6)), rows = Math.max(1, Math.floor(h / cell + 1e-6));
  const ox = (w - cols * cell) / 2, oy = (h - rows * cell) / 2, r = cell * 0.4, q: string[] = [], d: string[] = [], ring: SceneNode[] = [];
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
    const x = ox + i * cell, y = oy + j * cell, k = cell / 2;
    q.push(`M${f(x)} ${f(y)} L${f(x + r)} ${f(y)} A${f(r)} ${f(r)} 0 0 1 ${f(x)} ${f(y + r)} Z`);
    q.push(`M${f(x + cell)} ${f(y)} L${f(x + cell)} ${f(y + r)} A${f(r)} ${f(r)} 0 0 1 ${f(x + cell - r)} ${f(y)} Z`);
    q.push(`M${f(x + cell)} ${f(y + cell)} L${f(x + cell - r)} ${f(y + cell)} A${f(r)} ${f(r)} 0 0 1 ${f(x + cell)} ${f(y + cell - r)} Z`);
    q.push(`M${f(x)} ${f(y + cell)} L${f(x)} ${f(y + cell - r)} A${f(r)} ${f(r)} 0 0 1 ${f(x + r)} ${f(y + cell)} Z`);
    const s = cell * 0.17;
    d.push(`M${f(x + k)} ${f(y + k - s)} L${f(x + k + s)} ${f(y + k)} L${f(x + k)} ${f(y + k + s)} L${f(x + k - s)} ${f(y + k)} Z`);
    ring.push(circle(x + k, y + k, cell * 0.3, { fill: null, stroke: c ?? b, strokeWidth: cell * 0.035 }));
  }
  return g({}, path(q.join(" "), { fill: a }), path(d.join(" "), { fill: b }), ring,
    path(Array.from({ length: cols + 1 }, (_, i) => `M${f(ox + i * cell)} ${f(oy)} v${f(rows * cell)}`).join(" ") + " " + Array.from({ length: rows + 1 }, (_, j) => `M${f(ox)} ${f(oy + j * cell)} h${f(cols * cell)}`).join(" "), { fill: null, stroke: c ?? b, strokeWidth: cell * 0.02 }));
}

/** A tree in mosaic squares, after the tree of life at Hisham's Palace.
 *  Origin at the foot of the trunk; `size` is the overall height. */
export function mosaicTree(size: number, leaf: Ink, leaf2: Ink, trunk: Ink, fruit: Ink): GroupNode {
  const n = 25, t = size / n, gap = t * 0.14, cells: Record<string, string[]> = { leaf: [], leaf2: [], trunk: [], fruit: [] };
  const sq = (i: number, j: number) => `M${f((i - n / 2) * t + gap / 2)} ${f(-size + j * t + gap / 2)} h${f(t - gap)} v${f(t - gap)} h${f(gap - t)} Z`;
  const cx = n / 2 - 0.5, cy = 8.5, rx = 11.6, ry = 8.4;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const e = ((i - cx) / rx) ** 2 + ((j - cy) / ry) ** 2;
    if (e <= 1) {
      const hash = (i * 7 + j * 13) % 11;
      cells[hash === 0 && e < 0.8 ? "fruit" : (i + j) % 3 === 0 ? "leaf2" : "leaf"].push(sq(i, j));
    } else if (j > cy && Math.abs(i - cx) <= (j > n - 3 ? 3 : 1)) cells.trunk.push(sq(i, j));
  }
  return g({}, path(cells.leaf.join(" "), { fill: leaf }), path(cells.leaf2.join(" "), { fill: leaf2 }), path(cells.trunk.join(" "), { fill: trunk }), path(cells.fruit.join(" "), { fill: fruit }));
}

/** A pomegranate split open, centred on the origin, `size` wide. */
export function pomegranate(size: number, skin: Ink, seed: Ink, pith: Ink, leaf?: Ink | null): GroupNode {
  const r = size / 2, crown = `M${f(-r * 0.24)} ${f(-r * 0.86)} L${f(-r * 0.3)} ${f(-r * 1.16)} L${f(-r * 0.12)} ${f(-r * 1)} L0 ${f(-r * 1.22)} L${f(r * 0.12)} ${f(-r * 1)} L${f(r * 0.3)} ${f(-r * 1.16)} L${f(r * 0.24)} ${f(-r * 0.86)} Z`;
  const seeds: SceneNode[] = [];
  for (let i = 0; i < 7; i++) for (let j = 0; j < 5; j++) {
    const x = (i - 3) * r * 0.15 + (j % 2) * r * 0.075, y = (j - 2) * r * 0.15 + r * 0.08;
    if ((x / (r * 0.56)) ** 2 + ((y - r * 0.08) / (r * 0.42)) ** 2 <= 1) seeds.push(path(`M${f(x)} ${f(y - r * 0.07)} Q${f(x + r * 0.07)} ${f(y)} ${f(x)} ${f(y + r * 0.07)} Q${f(x - r * 0.07)} ${f(y)} ${f(x)} ${f(y - r * 0.07)} Z`, { fill: seed }));
  }
  return g({},
    leaf ? g({ x: r * 0.1, y: -r * 1.02, rotate: -30 }, path(leafPath(r * 0.8, r * 0.22), { fill: leaf })) : null,
    path(crown, { fill: skin }),
    circle(0, 0, r, { fill: skin }),
    path(`M${f(-r * 0.62)} ${f(r * 0.08)} C${f(-r * 0.6)} ${f(-r * 0.5)} ${f(r * 0.6)} ${f(-r * 0.5)} ${f(r * 0.62)} ${f(r * 0.08)} C${f(r * 0.6)} ${f(r * 0.66)} ${f(-r * 0.6)} ${f(r * 0.66)} ${f(-r * 0.62)} ${f(r * 0.08)} Z`, { fill: pith }),
    seeds,
  );
}

/** A dove in flight facing right, origin at its breast; `size` is the wingspan-ish width. */
export function dove(size: number, ink: Ink, eye?: Ink | null): GroupNode {
  const body = "M-0.5 0.05 C-0.35 -0.08 -0.1 -0.1 0.1 -0.04 C0.2 -0.16 0.34 -0.2 0.42 -0.14 L0.56 -0.13 L0.44 -0.07 C0.42 0.06 0.32 0.16 0.12 0.18 L-0.18 0.2 L-0.5 0.36 L-0.4 0.18 Z";
  const wing = "M-0.12 -0.02 C-0.2 -0.34 -0.4 -0.52 -0.62 -0.58 C-0.42 -0.36 -0.3 -0.16 -0.2 0.06 Z M0.02 -0.04 C0.04 -0.34 -0.06 -0.56 -0.2 -0.7 C-0.12 -0.42 -0.12 -0.2 -0.1 0.02 Z";
  return g({ scale: size },
    path(body, { fill: ink }), path(wing, { fill: ink }),
    eye ? circle(0.36, -0.12, 0.018, { fill: eye }) : null);
}

/** A five-petal jasmine flower centred on the origin, turned like a pinwheel. */
export function jasmine(size: number, petal: Ink, heart: Ink, turn = 0, edge: Ink | null = null): GroupNode {
  const r = size / 2;
  return g({ rotate: turn },
    Array.from({ length: 5 }, (_, i) => g({ rotate: i * 72 - 90, x: 0, y: 0 }, g({ x: r * 0.08, y: r * 0.06, rotate: 8 }, path(leafPath(r, r * 0.34), { fill: petal, stroke: edge, strokeWidth: size * 0.025 })))),
    circle(0, 0, r * 0.13, { fill: heart }));
}

/** An old studded wooden door with an arched head, standing in a w x h box at the origin. */
export function studdedDoor(w: number, h: number, wood: Ink, stud: Ink, frame: Ink): GroupNode {
  const r = w / 2, studs: SceneNode[] = [], cols = 5, rows = Math.max(4, Math.round((h - r) / (w / cols)));
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
    const x = w * (0.12 + (0.76 * i) / (cols - 1)), y = r * 0.9 + (h - r * 1.1) * (j / (rows - 1));
    studs.push(circle(x, y, w * 0.022, { fill: stud }));
  }
  const arch = `M0 ${f(h)} L0 ${f(r)} A${f(r)} ${f(r)} 0 0 1 ${f(w)} ${f(r)} L${f(w)} ${f(h)} Z`;
  return g({},
    path(arch, { fill: wood }),
    path(`M${f(w / 2)} ${f(0)} V${f(h)}`, { fill: null, stroke: frame, strokeWidth: w * 0.012 }),
    path(Array.from({ length: 3 }, (_, i) => `M${f(w * (i + 1) / 4 + (i === 1 ? w * 0.001 : 0))} ${f(r * (i === 1 ? 0.02 : 0.15))} V${f(h)}`).join(" "), { fill: null, stroke: frame, strokeWidth: w * 0.005, opacity: 0.6 }),
    path(arch, { fill: null, stroke: frame, strokeWidth: w * 0.03 }),
    studs,
    circle(w * 0.5, h * 0.56, w * 0.07, { fill: null, stroke: stud, strokeWidth: w * 0.018 }),
    circle(w * 0.5, h * 0.56 - w * 0.07, w * 0.02, { fill: stud }));
}

/** A candle standing on the origin, `height` tall with its flame. */
export function candle(height: number, wax: Ink, flame: Ink, glow?: Ink | null): GroupNode {
  const w = height * 0.14, fh = height * 0.2, body = height - fh * 1.1;
  return g({},
    glow ? circle(0, -body - fh * 0.5, fh * 1.3, { fill: glow, opacity: 0.22 }) : null,
    rect(-w / 2, -body, w, body, { fill: wax }),
    path(`M0 ${f(-body - fh * 1.05)} C${f(w * 0.55)} ${f(-body - fh * 0.5)} ${f(w * 0.45)} ${f(-body - fh * 0.05)} 0 ${f(-body - fh * 0.05)} C${f(-w * 0.45)} ${f(-body - fh * 0.05)} ${f(-w * 0.55)} ${f(-body - fh * 0.5)} 0 ${f(-body - fh * 1.05)} Z`, { fill: flame }));
}

/** A wax seal centred on the origin: a wavy blob and a ring for initials. */
export function waxSeal(r: number, wax: Ink, ring: Ink): GroupNode {
  return g({}, path(scallopPath(r, 14, 0.07), { fill: wax }), circle(0, 0, r * 0.74, { fill: null, stroke: ring, strokeWidth: r * 0.05 }),
    g({ y: -r * 0.6 }, path(starPath(4, r * 0.08, r * 0.03), { fill: ring })), g({ y: r * 0.6 }, path(starPath(4, r * 0.08, r * 0.03), { fill: ring })));
}

