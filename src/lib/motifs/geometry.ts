/** Geometric and symbolic motifs: stars, crescents, arches, keffiyeh net, the key. */
import type { Ink } from "../color.ts";
import { type GroupNode, type SceneNode, circle, g, path, rect } from "../scene.ts";

const f = (v: number) => Math.round(v * 1000) / 1000;
const rad = (deg: number) => (deg * Math.PI) / 180;

/** An n-pointed star centred on the origin, first point straight up. */
export function starPath(points: number, outer: number, inner: number): string {
  const out: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 ? inner : outer, a = (i * Math.PI) / points - Math.PI / 2;
    out.push(`${i ? "L" : "M"}${f(r * Math.cos(a))} ${f(r * Math.sin(a))}`);
  }
  return out.join(" ") + " Z";
}

/** The khatam: two squares overlapped into an eight-pointed star. */
export const khatamPath = (r: number) => starPath(8, r, r * 0.7654);

/** A crescent centred on the origin, horns to the right; turn it with a group. */
export function crescentPath(r: number, thickness = 0.42): string {
  const ri = r * (1 - thickness * 0.45), dx = r * thickness;
  const ix = (r * r - ri * ri + dx * dx) / (2 * dx), iy = Math.sqrt(Math.max(0, r * r - ix * ix));
  return `M${f(ix)} ${f(-iy)} A${f(r)} ${f(r)} 0 1 0 ${f(ix)} ${f(iy)} A${f(ri)} ${f(ri)} 0 1 1 ${f(ix)} ${f(-iy)} Z`;
}

export function crescentStar(r: number, ink: Ink, tilt = -25): GroupNode {
  return g({ rotate: tilt }, path(crescentPath(r), { fill: ink }), g({ x: r * 0.42, y: 0, rotate: 18 }, path(starPath(5, r * 0.3, r * 0.12), { fill: ink })));
}

/** Rays round the origin between two radii. */
export function rays(count: number, r0: number, r1: number, ink: Ink, spread = 0.5): SceneNode {
  const d: string[] = [], half = (Math.PI / count) * spread;
  for (let i = 0; i < count; i++) {
    const a = (i * 2 * Math.PI) / count - Math.PI / 2;
    const p = (r: number, t: number) => `${f(r * Math.cos(t))} ${f(r * Math.sin(t))}`;
    d.push(`M${p(r0, a - half * (r0 / r1))} L${p(r1, a - half)} L${p(r1, a + half)} L${p(r0, a + half * (r0 / r1))} Z`);
  }
  return path(d.join(" "), { fill: ink });
}

/** A ring of dots round the origin. */
export function dotRing(r: number, count: number, dot: number, ink: Ink): GroupNode {
  return g({}, Array.from({ length: count }, (_, i) => circle(r * Math.cos((i * 2 * Math.PI) / count), r * Math.sin((i * 2 * Math.PI) / count), dot, { fill: ink })));
}

/** A pointed arch standing in a w x h box at the origin. `sharp` 0.5 is a round arch. */
export function archPath(w: number, h: number, sharp = 0.72): string {
  const R = w * Math.max(0.5, sharp), spring = Math.min(h, Math.sqrt(Math.max(0, R * R - (R - w / 2) * (R - w / 2))));
  return `M0 ${f(h)} L0 ${f(spring)} A${f(R)} ${f(R)} 0 0 1 ${f(w / 2)} 0 A${f(R)} ${f(R)} 0 0 1 ${f(w)} ${f(spring)} L${f(w)} ${f(h)} Z`;
}

/** A row of arches, `count` across a w x h box, drawn as outlines. */
export function arcade(count: number, w: number, h: number, ink: Ink, strokeWidth = 0.4): GroupNode {
  const each = w / count;
  return g({}, Array.from({ length: count }, (_, i) => g({ x: i * each + each * 0.08 }, path(archPath(each * 0.84, h), { fill: null, stroke: ink, strokeWidth }))));
}

/** A panel with an arch cut out of it: outer box w x h, the arch inset by `margin`. */
export function archWindow(w: number, h: number, margin: number, ink: Ink, sharp = 0.72): SceneNode {
  const aw = w - 2 * margin, ah = h - 2 * margin;
  const R = aw * Math.max(0.5, sharp), spring = Math.min(ah, Math.sqrt(Math.max(0, R * R - (R - aw / 2) * (R - aw / 2))));
  const x0 = margin, y0 = margin;
  const hole = `M${f(x0)} ${f(y0 + ah)} L${f(x0)} ${f(y0 + spring)} A${f(R)} ${f(R)} 0 0 1 ${f(x0 + aw / 2)} ${f(y0)} A${f(R)} ${f(R)} 0 0 1 ${f(x0 + aw)} ${f(y0 + spring)} L${f(x0 + aw)} ${f(y0 + ah)} Z`;
  return path(`M0 0 L${f(w)} 0 L${f(w)} ${f(h)} L0 ${f(h)} Z ${hole}`, { fill: ink, evenOdd: true });
}

/** The keffiyeh's fishnet over a w x h box at the origin. */
export function keffiyeh(w: number, h: number, cell: number, ink: Ink, weight = 0.18): GroupNode {
  const lines: string[] = [], knots: string[] = [], k = cell * weight * 1.5;
  const clip = (x0: number, y0: number, x1: number, y1: number) => {
    // Liang-Barsky against the box.
    let t0 = 0, t1 = 1; const dx = x1 - x0, dy = y1 - y0;
    for (const [p, q] of [[-dx, x0], [dx, w - x0], [-dy, y0], [dy, h - y0]]) {
      if (p === 0) { if (q < 0) return; continue; }
      const t = q / p;
      if (p < 0) { if (t > t1) return; t0 = Math.max(t0, t); } else { if (t < t0) return; t1 = Math.min(t1, t); }
    }
    if (t1 - t0 > 1e-6) lines.push(`M${f(x0 + t0 * dx)} ${f(y0 + t0 * dy)} L${f(x0 + t1 * dx)} ${f(y0 + t1 * dy)}`);
  };
  const span = w + h;
  for (let c = -h; c <= w; c += cell) clip(c, 0, c + span, span);          // falling diagonals
  for (let c = 0; c <= span; c += cell) clip(c, 0, c - span, span);        // rising diagonals
  for (let y = 0; y <= h + 1e-6; y += cell / 2) {
    const shift = Math.round(y / (cell / 2)) % 2 ? cell / 2 : 0;
    for (let x = shift; x <= w + 1e-6; x += cell) if (x >= k && x <= w - k && y >= k && y <= h - k)
      knots.push(`M${f(x)} ${f(y - k)} L${f(x + k)} ${f(y)} L${f(x)} ${f(y + k)} L${f(x - k)} ${f(y)} Z`);
  }
  return g({}, path(lines.join(" "), { fill: null, stroke: ink, strokeWidth: cell * weight }), knots.length ? path(knots.join(" "), { fill: ink }) : null);
}

/** The key of return, lying along +x from the origin, `length` long. */
export function key(length: number, ink: Ink): GroupNode {
  const r = length * 0.16, t = length * 0.045;
  const bow = `M${f(r)} ${f(-r)} A${f(r)} ${f(r)} 0 1 0 ${f(r)} ${f(r)} A${f(r)} ${f(r)} 0 1 0 ${f(r)} ${f(-r)} Z M${f(r)} ${f(-r * 0.5)} A${f(r * 0.5)} ${f(r * 0.5)} 0 1 1 ${f(r)} ${f(r * 0.5)} A${f(r * 0.5)} ${f(r * 0.5)} 0 1 1 ${f(r)} ${f(-r * 0.5)} Z`;
  return g({},
    path(bow, { fill: ink, evenOdd: true }),
    rect(2 * r - t * 0.3, -t / 2, length - 2 * r + t * 0.3, t, { fill: ink }),
    rect(length * 0.5, -t * 1.1, t * 0.6, t * 2.2, { fill: ink }),
    rect(length - t * 3.6, t / 2 - 0.01, t * 1.1, length * 0.11, { fill: ink }),
    rect(length - t * 1.6, t / 2 - 0.01, t * 1.1, length * 0.15, { fill: ink }),
  );
}

/** Two wedding rings, linked, centred on the origin, `size` wide overall. */
export function rings(size: number, ink: Ink): GroupNode {
  const r = size * 0.3, sw = size * 0.045;
  return g({}, circle(-r * 0.62, 0, r, { fill: null, stroke: ink, strokeWidth: sw }), circle(r * 0.62, 0, r, { fill: null, stroke: ink, strokeWidth: sw }));
}

/** A Ramadan lantern hanging from the origin, `height` tall. */
export function lantern(height: number, ink: Ink, glow: Ink): GroupNode {
  const h = height, w = h * 0.42;
  return g({},
    path(`M0 0 L0 ${f(h * 0.1)}`, { fill: null, stroke: ink, strokeWidth: h * 0.012 }),
    circle(0, h * 0.115, h * 0.03, { fill: null, stroke: ink, strokeWidth: h * 0.014 }),
    path(`M0 ${f(h * 0.14)} C${f(w * 0.5)} ${f(h * 0.16)} ${f(w * 0.42)} ${f(h * 0.27)} ${f(w * 0.5)} ${f(h * 0.3)} L${f(-w * 0.5)} ${f(h * 0.3)} C${f(-w * 0.42)} ${f(h * 0.27)} ${f(-w * 0.5)} ${f(h * 0.16)} 0 ${f(h * 0.14)} Z`, { fill: ink }),
    path(`M${f(-w * 0.42)} ${f(h * 0.32)} L${f(w * 0.42)} ${f(h * 0.32)} L${f(w * 0.56)} ${f(h * 0.52)} L${f(w * 0.36)} ${f(h * 0.8)} L${f(-w * 0.36)} ${f(h * 0.8)} L${f(-w * 0.56)} ${f(h * 0.52)} Z`, { fill: glow }),
    path(`M${f(-w * 0.42)} ${f(h * 0.32)} L${f(-w * 0.56)} ${f(h * 0.52)} L${f(-w * 0.36)} ${f(h * 0.8)} M${f(w * 0.42)} ${f(h * 0.32)} L${f(w * 0.56)} ${f(h * 0.52)} L${f(w * 0.36)} ${f(h * 0.8)} M${f(-w * 0.14)} ${f(h * 0.32)} L${f(-w * 0.19)} ${f(h * 0.52)} L${f(-w * 0.12)} ${f(h * 0.8)} M${f(w * 0.14)} ${f(h * 0.32)} L${f(w * 0.19)} ${f(h * 0.52)} L${f(w * 0.12)} ${f(h * 0.8)} M${f(-w * 0.56)} ${f(h * 0.52)} L${f(w * 0.56)} ${f(h * 0.52)}`, { fill: null, stroke: ink, strokeWidth: h * 0.014 }),
    rect(-w * 0.5, h * 0.295, w, h * 0.035, { fill: ink }),
    path(`M${f(-w * 0.42)} ${f(h * 0.8)} L${f(w * 0.42)} ${f(h * 0.8)} L${f(w * 0.28)} ${f(h * 0.9)} L${f(-w * 0.28)} ${f(h * 0.9)} Z`, { fill: ink }),
    path(starPath(4, h * 0.05, h * 0.02), { fill: ink }) && g({ y: h * 0.955 }, path(starPath(4, h * 0.045, h * 0.018), { fill: ink })),
  );
}

/** A scalloped disc centred on the origin: a seal or label edge. */
export function scallopPath(r: number, bumps: number, depth = 0.06): string {
  const out: string[] = [], br = (Math.PI * r) / bumps;
  for (let i = 0; i < bumps; i++) {
    const a0 = (i * 2 * Math.PI) / bumps, a1 = ((i + 1) * 2 * Math.PI) / bumps;
    if (!i) out.push(`M${f(r * Math.cos(a0))} ${f(r * Math.sin(a0))}`);
    out.push(`A${f(br * (1 + depth))} ${f(br * (1 + depth))} 0 0 1 ${f(r * Math.cos(a1))} ${f(r * Math.sin(a1))}`);
  }
  return out.join(" ") + " Z";
}

/** A ribbon banner centred on the origin, w wide and h tall, with folded tails. */
export function ribbon(w: number, h: number, ink: Ink, shade: Ink): GroupNode {
  const tail = h * 0.9, drop = h * 0.28;
  const end = (s: number) => `M${f(s * (w / 2 - tail * 0.5))} ${f(-h / 2 + drop)} L${f(s * (w / 2 + tail))} ${f(-h / 2 + drop)} L${f(s * (w / 2 + tail * 0.55))} ${f(drop)} L${f(s * (w / 2 + tail))} ${f(h / 2 + drop)} L${f(s * (w / 2 - tail * 0.5))} ${f(h / 2 + drop)} Z`;
  const fold = (s: number) => `M${f(s * (w / 2))} ${f(h / 2)} L${f(s * (w / 2 - tail * 0.5))} ${f(h / 2 + drop)} L${f(s * (w / 2 - tail * 0.5))} ${f(h / 2)} Z`;
  return g({}, path(`${end(1)} ${end(-1)}`, { fill: shade }), rect(-w / 2, -h / 2, w, h, { fill: ink }), path(`${fold(1)} ${fold(-1)}`, { fill: shade, opacity: 0.6 }));
}

export { rad };
