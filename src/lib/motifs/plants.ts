/** Plants of the land: olive, poppy, Jaffa orange, watermelon, wheat. */
import type { Ink } from "../color.ts";
import { type GroupNode, type SceneNode, circle, g, path } from "../scene.ts";

const f = (v: number) => Math.round(v * 1000) / 1000;

/** A pointed leaf from (0,0) to (len,0). */
export const leafPath = (len: number, width: number) => `M0 0 Q${f(len * 0.45)} ${f(-width)} ${f(len)} 0 Q${f(len * 0.45)} ${f(width)} 0 0 Z`;

/** An olive branch from (0,0) running right for `length`, arcing gently upward. */
export function oliveBranch(length: number, leaf: Ink, fruit?: Ink | null, opts: { leaves?: number; bend?: number; olives?: number } = {}): GroupNode {
  const n = opts.leaves ?? 9, bend = (opts.bend ?? 0.16) * length, olives = opts.olives ?? 3;
  const at = (t: number) => ({ x: length * t, y: -4 * bend * t * (1 - t), a: (Math.atan2(-4 * bend * (1 - 2 * t), length) * 180) / Math.PI });
  const ll = length * 0.2, lw = length * 0.034;
  const parts: SceneNode[] = [path(`M0 0 Q${f(length / 2)} ${f(-2 * bend)} ${f(length)} 0`, { fill: null, stroke: leaf, strokeWidth: length * 0.012 })];
  for (let i = 0; i < n; i++) {
    const t = 0.08 + (0.86 * i) / (n - 1), p = at(t), side = i % 2 ? 1 : -1, shrink = 1 - 0.35 * t;
    parts.push(g({ x: p.x, y: p.y, rotate: p.a + side * 38, scale: shrink }, path(leafPath(ll, lw), { fill: leaf })));
  }
  if (fruit) for (let i = 0; i < olives; i++) {
    const p = at(0.25 + (0.5 * i) / Math.max(1, olives - 1)), side = i % 2 ? -1 : 1;
    parts.push(g({ x: p.x, y: p.y + side * length * 0.05, rotate: p.a }, path(`M${f(-length * 0.032)} 0 A${f(length * 0.032)} ${f(length * 0.024)} 0 1 1 ${f(length * 0.032)} 0 A${f(length * 0.032)} ${f(length * 0.024)} 0 1 1 ${f(-length * 0.032)} 0 Z`, { fill: fruit })));
  }
  parts.push(g({ ...at(1), rotate: at(1).a }, path(leafPath(ll * 0.7, lw * 0.8), { fill: leaf })));
  return g({}, parts);
}

/** Two branches curving round a circle of radius r centred on the origin, open at the top. */
export function oliveWreath(r: number, leaf: Ink, fruit?: Ink | null, opts: { leaves?: number; open?: number } = {}): GroupNode {
  const n = opts.leaves ?? 11, open = opts.open ?? 28, ll = r * 0.34, lw = r * 0.058;
  const parts: SceneNode[] = [];
  for (const side of [1, -1]) {
    const from = 90 - 6 * side, sweep = (180 - open) * side; // degrees, starting at the bottom
    const pt = (deg: number) => ({ x: r * Math.cos((deg * Math.PI) / 180), y: r * Math.sin((deg * Math.PI) / 180) });
    const a = pt(from), b = pt(from - sweep);
    parts.push(path(`M${f(a.x)} ${f(a.y)} A${f(r)} ${f(r)} 0 0 ${side === 1 ? 0 : 1} ${f(b.x)} ${f(b.y)}`, { fill: null, stroke: leaf, strokeWidth: r * 0.02 }));
    for (let i = 0; i < n; i++) {
      const deg = from - (sweep * (i + 0.6)) / n, p = pt(deg), tangent = deg - 90 * side, out = i % 2 ? 1 : -1;
      parts.push(g({ x: p.x, y: p.y, rotate: tangent + out * side * 36, scale: 1 - (0.3 * i) / n }, path(leafPath(ll, lw), { fill: leaf })));
      if (fruit && i % 4 === 1) { const q = pt(deg - (sweep * 0.5) / n); parts.push(circle(q.x * 1.07, q.y * 1.07, r * 0.045, { fill: fruit })); }
    }
  }
  return g({}, parts);
}

/** A poppy, shaqa'iq al-nu'man, about `size` across, centred on the origin. */
export function poppy(size: number, petal: Ink, heart: Ink, opts: { stem?: Ink | null; stemLength?: number } = {}): GroupNode {
  const r = size / 2, parts: SceneNode[] = [];
  if (opts.stem) {
    const len = opts.stemLength ?? size * 1.4;
    parts.push(path(`M0 ${f(r * 0.3)} Q${f(r * 0.5)} ${f(len * 0.5)} ${f(-r * 0.15)} ${f(len)}`, { fill: null, stroke: opts.stem, strokeWidth: size * 0.045 }));
    parts.push(g({ x: r * 0.22, y: len * 0.6, rotate: 150 }, path(leafPath(size * 0.55, size * 0.1), { fill: opts.stem })));
  }
  // Five round petals; where they overlap the colour deepens, which reads as folds.
  for (let i = 0; i < 5; i++) { const a = (i * 2 * Math.PI) / 5 - Math.PI / 2; parts.push(circle(Math.cos(a) * r * 0.48, Math.sin(a) * r * 0.48, r * 0.52, { fill: petal, opacity: 0.86 })); }
  parts.push(circle(0, 0, r * 0.5, { fill: petal }));
  parts.push(circle(0, 0, r * 0.2, { fill: heart }));
  for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4; parts.push(circle(Math.cos(a) * r * 0.3, Math.sin(a) * r * 0.3, r * 0.035, { fill: heart })); }
  return g({}, parts);
}

/** A Jaffa orange with its leaf, `size` across, centred on the origin. */
export function orange(size: number, fruit: Ink, leaf: Ink, shine?: Ink | null): GroupNode {
  const r = size / 2;
  return g({},
    circle(0, 0, r, { fill: fruit }),
    shine ? path(`M${f(-r * 0.62)} ${f(-r * 0.2)} A${f(r * 0.66)} ${f(r * 0.66)} 0 0 1 ${f(-r * 0.2)} ${f(-r * 0.62)}`, { fill: null, stroke: shine, strokeWidth: r * 0.09, opacity: 0.7 }) : null,
    path(`M0 ${f(-r * 0.96)} L0 ${f(-r * 1.18)}`, { fill: null, stroke: leaf, strokeWidth: r * 0.09 }),
    g({ x: 0, y: -r * 1.1, rotate: -28 }, path(leafPath(r * 0.9, r * 0.2), { fill: leaf })),
    circle(0, r * 0.86, r * 0.045, { fill: leaf, opacity: 0.6 }),
  );
}

/** A slice of watermelon: half disc, flat edge up, `size` wide, centred on the flat edge. */
export function watermelon(size: number, flesh: Ink, rind: Ink, pith: Ink, seed: Ink): GroupNode {
  const r = size / 2, half = (k: number) => `M${f(-r * k)} 0 A${f(r * k)} ${f(r * k)} 0 0 0 ${f(r * k)} 0 Z`;
  const seeds: SceneNode[] = [];
  for (const [x, y] of [[-0.5, 0.22], [-0.18, 0.2], [0.18, 0.2], [0.5, 0.22], [-0.32, 0.5], [0, 0.48], [0.32, 0.5]])
    seeds.push(g({ x: x * r, y: y * r, rotate: x * -40 }, path(`M0 ${f(-r * 0.06)} Q${f(r * 0.045)} 0 0 ${f(r * 0.06)} Q${f(-r * 0.045)} 0 0 ${f(-r * 0.06)} Z`, { fill: seed })));
  return g({}, path(half(1), { fill: rind }), path(half(0.88), { fill: pith }), path(half(0.8), { fill: flesh }), seeds);
}

/** An ear of wheat standing on the origin, `height` tall. */
export function wheat(height: number, ink: Ink): GroupNode {
  const parts: SceneNode[] = [path(`M0 0 L0 ${f(-height)}`, { fill: null, stroke: ink, strokeWidth: height * 0.02 })];
  const grain = leafPath(height * 0.16, height * 0.04);
  for (let i = 0; i < 6; i++) for (const s of [1, -1])
    parts.push(g({ x: 0, y: -height * (0.45 + i * 0.09), rotate: s === 1 ? -55 : -125 }, path(grain, { fill: ink })));
  parts.push(g({ x: 0, y: -height * 0.97, rotate: -90 }, path(grain, { fill: ink })));
  return g({}, parts);
}
