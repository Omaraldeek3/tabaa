/** SVG path data: parse to absolute M/L/C/Q/Z, transform, measure, serialise. */
export type Matrix = [number, number, number, number, number, number];
export type Segment =
  | { c: "M" | "L"; p: [number, number] }
  | { c: "Q"; p: [number, number, number, number] }
  | { c: "C"; p: [number, number, number, number, number, number] }
  | { c: "Z"; p: [] };

export const identity: Matrix = [1, 0, 0, 1, 0, 0];
export const translate = (x: number, y: number): Matrix => [1, 0, 0, 1, x, y];
export const scale = (sx: number, sy = sx): Matrix => [sx, 0, 0, sy, 0, 0];
export function rotate(deg: number): Matrix {
  const r = (deg * Math.PI) / 180, cos = Math.cos(r), sin = Math.sin(r);
  return [cos, sin, -sin, cos, 0, 0];
}
/** a then b in drawing terms: the result applies b first, then a (a · b). */
export function multiply(a: Matrix, b: Matrix): Matrix {
  return [
    a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1],
    a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3],
    a[0] * b[4] + a[2] * b[5] + a[4], a[1] * b[4] + a[3] * b[5] + a[5],
  ];
}
export const apply = (m: Matrix, x: number, y: number): [number, number] => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];

const ARITY: Record<string, number> = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };

function tokenize(d: string): (string | number)[] {
  const out: (string | number)[] = [];
  const re = /([MLHVCSQTAZmlhvcsqtaz])|(-?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(d))) out.push(m[1] ?? Number(m[2]));
  return out;
}

/** Endpoint arc to cubic segments (SVG implementation notes, F.6). */
function arcToCubics(x1: number, y1: number, rx: number, ry: number, phiDeg: number, large: number, sweep: number, x2: number, y2: number): Segment[] {
  if (rx === 0 || ry === 0) return [{ c: "L", p: [x2, y2] }];
  rx = Math.abs(rx); ry = Math.abs(ry);
  const phi = (phiDeg * Math.PI) / 180, cos = Math.cos(phi), sin = Math.sin(phi);
  const dx = (x1 - x2) / 2, dy = (y1 - y2) / 2;
  const x1p = cos * dx + sin * dy, y1p = -sin * dx + cos * dy;
  const lambda = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
  if (lambda > 1) { const s = Math.sqrt(lambda); rx *= s; ry *= s; }
  const num = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p;
  const den = rx * rx * y1p * y1p + ry * ry * x1p * x1p;
  const coef = (large !== sweep ? 1 : -1) * Math.sqrt(Math.max(0, num / den));
  const cxp = (coef * rx * y1p) / ry, cyp = (-coef * ry * x1p) / rx;
  const cx = cos * cxp - sin * cyp + (x1 + x2) / 2, cy = sin * cxp + cos * cyp + (y1 + y2) / 2;
  const angle = (ux: number, uy: number, vx: number, vy: number) => {
    const a = Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
    return a;
  };
  const t1 = angle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
  let dt = angle((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry);
  if (!sweep && dt > 0) dt -= 2 * Math.PI;
  if (sweep && dt < 0) dt += 2 * Math.PI;
  const n = Math.max(1, Math.ceil(Math.abs(dt) / (Math.PI / 2) - 1e-9));
  const step = dt / n, k = (4 / 3) * Math.tan(step / 4);
  const point = (t: number): [number, number, number, number] => {
    const ct = Math.cos(t), st = Math.sin(t);
    return [
      cx + rx * cos * ct - ry * sin * st, cy + rx * sin * ct + ry * cos * st,
      -rx * cos * st - ry * sin * ct, -rx * sin * st + ry * cos * ct,
    ];
  };
  const out: Segment[] = [];
  for (let i = 0; i < n; i++) {
    const a = point(t1 + i * step), b = point(t1 + (i + 1) * step);
    out.push({ c: "C", p: [a[0] + k * a[2], a[1] + k * a[3], b[0] - k * b[2], b[1] - k * b[3], b[0], b[1]] });
  }
  return out;
}

export function parsePath(d: string): Segment[] {
  const t = tokenize(d);
  const out: Segment[] = [];
  let i = 0, cmd = "", x = 0, y = 0, sx = 0, sy = 0, px = 0, py = 0, prev = "";
  while (i < t.length) {
    if (typeof t[i] === "string") cmd = t[i++] as string;
    else if (!cmd) throw new Error("Path data must start with a command");
    else if (cmd === "M") cmd = "L"; else if (cmd === "m") cmd = "l";
    const up = cmd.toUpperCase(), rel = cmd !== up, n = ARITY[up];
    if (n === undefined) throw new Error(`Unknown path command ${cmd}`);
    const a = t.slice(i, i + n) as number[];
    if (a.length < n || a.some(v => typeof v !== "number")) throw new Error(`Bad arguments for ${cmd}`);
    i += n;
    const ox = rel ? x : 0, oy = rel ? y : 0;
    switch (up) {
      case "M": x = a[0] + ox; y = a[1] + oy; sx = x; sy = y; out.push({ c: "M", p: [x, y] }); break;
      case "L": x = a[0] + ox; y = a[1] + oy; out.push({ c: "L", p: [x, y] }); break;
      case "H": x = a[0] + ox; out.push({ c: "L", p: [x, y] }); break;
      case "V": y = a[0] + oy; out.push({ c: "L", p: [x, y] }); break;
      case "C": out.push({ c: "C", p: [a[0] + ox, a[1] + oy, a[2] + ox, a[3] + oy, a[4] + ox, a[5] + oy] }); px = a[2] + ox; py = a[3] + oy; x = a[4] + ox; y = a[5] + oy; break;
      case "S": {
        const c1x = prev === "C" || prev === "S" ? 2 * x - px : x, c1y = prev === "C" || prev === "S" ? 2 * y - py : y;
        out.push({ c: "C", p: [c1x, c1y, a[0] + ox, a[1] + oy, a[2] + ox, a[3] + oy] }); px = a[0] + ox; py = a[1] + oy; x = a[2] + ox; y = a[3] + oy; break;
      }
      case "Q": out.push({ c: "Q", p: [a[0] + ox, a[1] + oy, a[2] + ox, a[3] + oy] }); px = a[0] + ox; py = a[1] + oy; x = a[2] + ox; y = a[3] + oy; break;
      case "T": {
        px = prev === "Q" || prev === "T" ? 2 * x - px : x; py = prev === "Q" || prev === "T" ? 2 * y - py : y;
        out.push({ c: "Q", p: [px, py, a[0] + ox, a[1] + oy] }); x = a[0] + ox; y = a[1] + oy; break;
      }
      case "A": {
        const ex = a[5] + ox, ey = a[6] + oy;
        out.push(...arcToCubics(x, y, a[0], a[1], a[2], a[3], a[4], ex, ey)); x = ex; y = ey; break;
      }
      case "Z": out.push({ c: "Z", p: [] }); x = sx; y = sy; break;
    }
    prev = up;
  }
  return out;
}

const fmt = (n: number) => { const s = (Math.round(n * 1000) / 1000).toString(); return s === "-0" ? "0" : s; };

export function serialize(segments: Segment[]): string {
  return segments.map(s => (s.c === "Z" ? "Z" : `${s.c}${(s.p as number[]).map(fmt).join(" ")}`)).join(" ");
}

export function transformSegments(segments: Segment[], m: Matrix): Segment[] {
  return segments.map(s => {
    const p: number[] = [];
    for (let i = 0; i < s.p.length; i += 2) p.push(...apply(m, s.p[i], s.p[i + 1]));
    return { c: s.c, p } as Segment;
  });
}

export function transformPath(d: string, m: Matrix): string {
  return serialize(transformSegments(parsePath(d), m));
}

function extrema(p0: number, p1: number, p2: number, p3: number): number[] {
  const a = -p0 + 3 * p1 - 3 * p2 + p3, b = 2 * (p0 - 2 * p1 + p2), c = p1 - p0;
  const ts: number[] = [];
  if (Math.abs(a) < 1e-12) { if (Math.abs(b) > 1e-12) ts.push(-c / b); }
  else { const disc = b * b - 4 * a * c; if (disc >= 0) { const r = Math.sqrt(disc); ts.push((-b + r) / (2 * a), (-b - r) / (2 * a)); } }
  return ts.filter(t => t > 0 && t < 1).map(t => { const u = 1 - t; return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3; });
}

export type Bounds = { minX: number; minY: number; maxX: number; maxY: number };

export function segmentsBounds(segments: Segment[]): Bounds {
  const b = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
  const add = (x: number, y: number) => { b.minX = Math.min(b.minX, x); b.maxX = Math.max(b.maxX, x); b.minY = Math.min(b.minY, y); b.maxY = Math.max(b.maxY, y); };
  let x = 0, y = 0;
  for (const s of segments) {
    if (s.c === "Z") continue;
    let c: number[];
    if (s.c === "Q") { const [qx, qy, ex, ey] = s.p; c = [x + (2 / 3) * (qx - x), y + (2 / 3) * (qy - y), ex + (2 / 3) * (qx - ex), ey + (2 / 3) * (qy - ey), ex, ey]; }
    else if (s.c === "C") c = s.p;
    else { add(s.p[0], s.p[1]); x = s.p[0]; y = s.p[1]; continue; }
    for (const v of extrema(x, c[0], c[2], c[4])) add(v, y);
    for (const v of extrema(y, c[1], c[3], c[5])) add(x, v);
    // Extremes are independent per axis; adding them paired with the start point only widens to the true box.
    add(c[4], c[5]);
    x = c[4]; y = c[5];
  }
  return b;
}

export const pathBounds = (d: string): Bounds => segmentsBounds(parsePath(d));
