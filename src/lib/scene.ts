/** The scene model every template draws with. Units are millimetres; the
 *  origin is the top-left corner of the trim box, so bleed is negative space. */
import type { Ink } from "./color.ts";
import { type Bounds, type Matrix, identity, multiply, parsePath, rotate, scale, segmentsBounds, serialize, transformSegments, translate } from "./pathdata.ts";

export type Transform = { x?: number; y?: number; rotate?: number; scale?: number; scaleX?: number; scaleY?: number };
export type Paint = { fill?: Ink | null; stroke?: Ink | null; strokeWidth?: number; opacity?: number };
export type PathNode = { type: "path"; d: string; evenOdd?: boolean } & Paint;
export type RectNode = { type: "rect"; x: number; y: number; w: number; h: number; r?: number } & Paint;
export type CircleNode = { type: "circle"; cx: number; cy: number; r: number } & Paint;
export type TextNode = {
  type: "text";
  value: string;
  font: string;
  weight?: number;
  /** Font size in mm. */
  size: number;
  /** Anchor point; y is the baseline. */
  x: number;
  y: number;
  /** start is the right edge for rtl text and the left edge for ltr. */
  align: "start" | "center" | "end";
  dir?: "rtl" | "ltr";
  /** Shrink the size until the line is no wider than this. */
  maxWidth?: number;
  /** Extra space between glyph clusters, in mm. Ignored for Arabic. */
  tracking?: number;
  /** Must stay inside the safe area; the registry test checks it. */
  safe?: boolean;
} & Paint;
export type GroupNode = { type: "group"; children: SceneNode[]; opacity?: number } & Transform;
export type SceneNode = PathNode | RectNode | CircleNode | TextNode | GroupNode;
export type Scene = { widthMm: number; heightMm: number; background: Ink; children: SceneNode[] };

type Child = SceneNode | null | undefined | false | Child[];
const tidy = (children: Child[]): SceneNode[] => (children.flat(Infinity as 1) as (SceneNode | null | undefined | false)[]).filter(Boolean) as SceneNode[];

export const g = (t: Transform & { opacity?: number }, ...children: Child[]): GroupNode => ({ type: "group", ...t, children: tidy(children) });
export const path = (d: string, paint: Paint & { evenOdd?: boolean } = {}): PathNode => ({ type: "path", d, ...paint });
export const rect = (x: number, y: number, w: number, h: number, paint: Paint & { r?: number } = {}): RectNode => ({ type: "rect", x, y, w, h, ...paint });
export const circle = (cx: number, cy: number, r: number, paint: Paint = {}): CircleNode => ({ type: "circle", cx, cy, r, ...paint });
export const text = (value: string, opts: Omit<TextNode, "type" | "value">): TextNode => ({ type: "text", value, ...opts });
export const scene = (widthMm: number, heightMm: number, background: Ink, ...children: Child[]): Scene => ({ widthMm, heightMm, background, children: tidy(children) });

const K = 0.5522847498;

export function rectPath(x: number, y: number, w: number, h: number, r = 0): string {
  r = Math.max(0, Math.min(r, w / 2, h / 2));
  if (!r) return `M${x} ${y} L${x + w} ${y} L${x + w} ${y + h} L${x} ${y + h} Z`;
  const k = r * (1 - K);
  return [
    `M${x + r} ${y}`, `L${x + w - r} ${y}`, `C${x + w - k} ${y} ${x + w} ${y + k} ${x + w} ${y + r}`,
    `L${x + w} ${y + h - r}`, `C${x + w} ${y + h - k} ${x + w - k} ${y + h} ${x + w - r} ${y + h}`,
    `L${x + r} ${y + h}`, `C${x + k} ${y + h} ${x} ${y + h - k} ${x} ${y + h - r}`,
    `L${x} ${y + r}`, `C${x} ${y + k} ${x + k} ${y} ${x + r} ${y}`, "Z",
  ].join(" ");
}

export function circlePath(cx: number, cy: number, r: number): string {
  const k = r * K;
  return `M${cx + r} ${cy} C${cx + r} ${cy + k} ${cx + k} ${cy + r} ${cx} ${cy + r} C${cx - k} ${cy + r} ${cx - r} ${cy + k} ${cx - r} ${cy} C${cx - r} ${cy - k} ${cx - k} ${cy - r} ${cx} ${cy - r} C${cx + k} ${cy - r} ${cx + r} ${cy - k} ${cx + r} ${cy} Z`;
}

export function groupMatrix(t: Transform): Matrix {
  let m = translate(t.x ?? 0, t.y ?? 0);
  if (t.rotate) m = multiply(m, rotate(t.rotate));
  const sx = t.scaleX ?? t.scale ?? 1, sy = t.scaleY ?? t.scale ?? 1;
  if (sx !== 1 || sy !== 1) m = multiply(m, scale(sx, sy));
  return m;
}

/** One drawable outline in page millimetres, all transforms applied. */
export type FlatShape = { d: string; fill: Ink | null; stroke: Ink | null; strokeWidth: number; opacity: number; evenOdd: boolean; bounds: Bounds };

export function flattenNodes(nodes: SceneNode[], m: Matrix = identity, opacity = 1, out: FlatShape[] = []): FlatShape[] {
  for (const node of nodes) {
    if (node.type === "group") { flattenNodes(node.children, multiply(m, groupMatrix(node)), opacity * (node.opacity ?? 1), out); continue; }
    if (node.type === "text") throw new Error("Scene still has text; run resolveScene before flattening.");
    const d = node.type === "path" ? node.d : node.type === "rect" ? rectPath(node.x, node.y, node.w, node.h, node.r) : circlePath(node.cx, node.cy, node.r);
    const fill = node.fill === undefined ? null : node.fill, stroke = node.stroke ?? null;
    if (!fill && !stroke) continue;
    const segments = transformSegments(parsePath(d), m);
    if (!segments.length) continue;
    const grow = Math.sqrt(Math.abs(m[0] * m[3] - m[1] * m[2]));
    out.push({
      d: serialize(segments), fill, stroke, strokeWidth: stroke ? (node.strokeWidth ?? 0.25) * grow : 0,
      opacity: opacity * (node.opacity ?? 1), evenOdd: node.type === "path" && !!node.evenOdd, bounds: segmentsBounds(segments),
    });
  }
  return out;
}

export const flatten = (s: Scene): FlatShape[] => flattenNodes(s.children);

export function nodesBounds(nodes: SceneNode[]): Bounds {
  const b = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
  for (const s of flattenNodes(nodes)) {
    const half = s.strokeWidth / 2;
    b.minX = Math.min(b.minX, s.bounds.minX - half); b.minY = Math.min(b.minY, s.bounds.minY - half);
    b.maxX = Math.max(b.maxX, s.bounds.maxX + half); b.maxY = Math.max(b.maxY, s.bounds.maxY + half);
  }
  return b;
}

/** Visit every node, depth first. */
export function walk(nodes: SceneNode[], visit: (node: SceneNode) => void): void {
  for (const node of nodes) { visit(node); if (node.type === "group") walk(node.children, visit); }
}
