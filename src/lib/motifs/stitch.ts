/** Tatreez: Palestinian cross-stitch, drawn on a stitch grid. Every pattern
 *  here is an original arrangement in the fallahi manner, generated from a
 *  rule so it stays symmetric at any size. */
import type { Ink } from "../color.ts";
import { type GroupNode, g, path } from "../scene.ts";

/** 0 is bare cloth, 1 the main thread, 2 the second thread. */
export type Stitch = 0 | 1 | 2;
export type StitchFn = (x: number, y: number, cols: number, rows: number) => Stitch;
export type Threads = [Ink, Ink?];

/** Draw a cols x rows grid of stitches into a w x h box at the origin. */
export function stitches(cols: number, rows: number, w: number, h: number, fn: StitchFn, threads: Threads, gap = 0): GroupNode {
  const cw = w / cols, ch = h / rows, inset = (Math.min(cw, ch) * gap) / 2;
  const d: [string[], string[]] = [[], []];
  const f = (v: number) => Math.round(v * 1000) / 1000;
  for (let y = 0; y < rows; y++) {
    let x = 0;
    while (x < cols) {
      const s = fn(x, y, cols, rows);
      if (!s) { x++; continue; }
      let end = x + 1;
      if (!gap) while (end < cols && fn(end, y, cols, rows) === s) end++;
      const x0 = f(x * cw + inset), y0 = f(y * ch + inset), x1 = f(end * cw - inset), y1 = f((y + 1) * ch - inset);
      d[s - 1].push(`M${x0} ${y0} L${x1} ${y0} L${x1} ${y1} L${x0} ${y1} Z`);
      x = end;
    }
  }
  return g({},
    d[0].length ? path(d[0].join(" "), { fill: threads[0] }) : null,
    d[1].length ? path(d[1].join(" "), { fill: threads[1] ?? threads[0] }) : null,
  );
}

const mod = (a: number, n: number) => ((a % n) + n) % n;

/** Square units, each drawn on an odd grid so it has a centre stitch. */
export const units = {
  /** Eight-pointed star: a square laid over a diamond. */
  star: { cells: 13, fn: ((x, y, n) => {
    const c = (n - 1) / 2, dx = Math.abs(x - c), dy = Math.abs(y - c);
    if (dx + dy <= 1) return 2;
    if (Math.max(dx, dy) === 2 && dx + dy <= 3) return 0;
    if (dx + dy === 4 && dx !== 0 && dy !== 0) return 2;
    return (dx <= 4 && dy <= 4) || dx + dy <= 6 ? 1 : 0;
  }) as StitchFn },
  /** Rose: a diamond with a ring of bare cloth and four buds. */
  rose: { cells: 11, fn: ((x, y, n) => {
    const c = (n - 1) / 2, dx = Math.abs(x - c), dy = Math.abs(y - c), s = dx + dy;
    if (s === 0) return 2;
    if (s === 2) return 0;
    if (s <= 3) return 1;
    if (s === 4) return 0;
    if (s === 5) return dx === 0 || dy === 0 ? 2 : 1;
    return dx === 4 && dy === 4 ? 2 : 0;
  }) as StitchFn },
  /** Cypress tree, the saru: stepped tiers on a trunk. */
  cypress: { cells: 15, fn: ((x, y, n) => {
    const c = (n - 1) / 2, dx = Math.abs(x - c);
    const tiers = [0, 0, 1, 1, 2, 1, 2, 3, 2, 3, 4, 3];
    if (y < tiers.length) return dx <= tiers[y] ? (dx === 0 && y > 1 ? 2 : 1) : 0;
    if (y < n - 1) return dx === 0 ? 1 : 0;
    return dx <= 2 ? 1 : 0;
  }) as StitchFn },
  /** A small diamond with a heart stitch, for scattering. */
  diamond: { cells: 7, fn: ((x, y, n) => {
    const c = (n - 1) / 2, s = Math.abs(x - c) + Math.abs(y - c);
    return s === 0 ? 2 : s === 3 ? 1 : s === 1 ? 1 : 0;
  }) as StitchFn },
} as const;
export type UnitName = keyof typeof units;

export function tatreezUnit(name: UnitName, size: number, threads: Threads, gap = 0): GroupNode {
  const u = units[name];
  return stitches(u.cells, u.cells, size, size, u.fn, threads, gap);
}

/** Repeating bands, `rows` stitches tall. */
export const bands = {
  /** Two zigzags crossing into a chain of diamonds. */
  chain: { rows: 7, fn: ((x, y, _c, rows) => {
    const span = rows - 1, t = Math.abs(mod(x, 2 * span) - span);
    if (y === t) return 1;
    if (y === span - t) return 1;
    return y === span / 2 && mod(x, span) === span / 2 ? 2 : 0;
  }) as StitchFn },
  /** A single stepped zigzag between two rules. */
  zigzag: { rows: 7, fn: ((x, y, _c, rows) => {
    if (y === 0 || y === rows - 1) return 1;
    const span = rows - 5, t = Math.abs(mod(x, 2 * span) - span) + 2;
    return y === t ? 2 : 0;
  }) as StitchFn },
  /** Little trees side by side. */
  trees: { rows: 7, fn: ((x, y, _c, rows) => {
    if (y === rows - 1) return 1;
    const dx = Math.abs(mod(x, 6) - 2);
    if (mod(x, 6) === 5) return 0;
    if (y >= 4) return dx === 0 ? 1 : 0;
    return dx <= y - 0 && dx <= 2 && y >= 0 && y <= 3 && dx <= [0, 1, 2, 1][y] ? (dx === 0 ? 2 : 1) : 0;
  }) as StitchFn },
  /** Diagonal lattice. */
  lattice: { rows: 5, fn: ((x, y) => (mod(x + y, 4) === 0 || mod(x - y, 4) === 0 ? 1 : mod(x, 4) === 2 && y === 2 ? 2 : 0)) as StitchFn },
  /** A plain row of alternating stitches, for thin rules. */
  dots: { rows: 1, fn: ((x) => (mod(x, 2) === 0 ? 1 : 0)) as StitchFn },
} as const;
export type BandName = keyof typeof bands;

/** A horizontal band `length` long and `height` tall, starting at the origin. */
export function tatreezBand(name: BandName, length: number, height: number, threads: Threads, gap = 0): GroupNode {
  const b = bands[name], cell = height / b.rows;
  let cols = Math.max(1, Math.round(length / cell));
  // Close the repeat cleanly: chain and zigzag look best ending on a full period.
  const period = name === "chain" ? b.rows - 1 : name === "zigzag" ? 2 * (b.rows - 5) : name === "trees" ? 6 : name === "lattice" ? 4 : 2;
  cols = Math.max(period + 1, Math.round((cols - 1) / period) * period + 1);
  return stitches(cols, b.rows, length, height, b.fn, threads, gap);
}

/** A full frame of stitches around a w x h box, `depth` stitches deep,
 *  mirrored in both axes so all four corners match. */
export function tatreezFrame(w: number, h: number, band: number, threads: Threads, opts: { depth?: number; gap?: number; style?: "lattice" | "chain" | "stars" } = {}): GroupNode {
  const depth = opts.depth ?? 7, style = opts.style ?? "lattice", cell = band / depth;
  // Odd counts keep a centre stitch on each side.
  const odd = (v: number) => { const r = Math.max(2 * depth + 1, Math.round(v)); return r % 2 ? r : r + 1; };
  const cols = odd(w / cell), rows = odd(h / cell);
  const fn: StitchFn = (x, y) => {
    const mx = Math.min(x, cols - 1 - x), my = Math.min(y, rows - 1 - y), d = Math.min(mx, my);
    if (d >= depth) return 0;
    if (d === 0 || d === depth - 1) return 1;
    if (d === 1 || d === depth - 2) return 0;
    const u = mx + my, v = mx - my;
    if (style === "lattice") return mod(u, 6) === 0 || mod(v, 6) === 0 ? 1 : mod(u, 6) === 3 && mod(v, 6) === 3 ? 2 : 0;
    if (style === "chain") { const t = Math.max(mx, my), mid = (depth - 1) / 2, k = Math.abs(mod(t, 4) - 2); return Math.abs(d - mid) === k ? 1 : d === mid && mod(t, 4) === 2 ? 2 : 0; }
    const t = Math.max(mx, my), mid = (depth - 1) / 2, a = Math.abs(mod(t, 6) - 3), b = Math.abs(d - mid);
    return a + b <= 1 ? 2 : a + b === 2 || (a === b && a <= 1) ? 1 : 0;
  };
  return stitches(cols, rows, w, h, fn, threads, opts.gap ?? 0);
}
