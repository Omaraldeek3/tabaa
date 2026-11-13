/** Scene to SVG markup: the live preview and the SVG export. */
import type { Ink } from "./color.ts";
import { getFont } from "./fonts.ts";
import type { Paint, Scene, SceneNode } from "./scene.ts";
import { hasArabic } from "./text.ts";

export type PrintOptions = { bleedMm: number; cropMarks: boolean };
export type SvgOptions = Partial<PrintOptions> & { showSafe?: boolean; safeMm?: number; showTrim?: boolean; idPrefix?: string };

/** Space outside the trim box: bleed, plus room for crop marks when they are on. */
export const MARK_GAP = 1, MARK_LENGTH = 4, MARK_ROOM = 6;
export const pageMargin = (o: PrintOptions) => (o.cropMarks ? o.bleedMm + MARK_ROOM : o.bleedMm);

const n = (v: number) => { const s = (Math.round(v * 1000) / 1000).toString(); return s === "-0" ? "0" : s; };
export const escapeXml = (s: string) => s.replace(/[<>&"']/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[c]!);

function paintAttrs(p: Paint, defaultFill: Ink | null = null): string {
  const fill = p.fill === undefined ? defaultFill : p.fill;
  let out = ` fill="${fill ? fill.hex : "none"}"`;
  if (p.stroke) out += ` stroke="${p.stroke.hex}" stroke-width="${n(p.strokeWidth ?? 0.25)}"`;
  if (p.opacity !== undefined && p.opacity !== 1) out += ` opacity="${n(p.opacity)}"`;
  return out;
}

function emit(node: SceneNode): string {
  switch (node.type) {
    case "group": {
      const t: string[] = [];
      if (node.x || node.y) t.push(`translate(${n(node.x ?? 0)} ${n(node.y ?? 0)})`);
      if (node.rotate) t.push(`rotate(${n(node.rotate)})`);
      const sx = node.scaleX ?? node.scale ?? 1, sy = node.scaleY ?? node.scale ?? 1;
      if (sx !== 1 || sy !== 1) t.push(`scale(${n(sx)} ${n(sy)})`);
      const op = node.opacity !== undefined && node.opacity !== 1 ? ` opacity="${n(node.opacity)}"` : "";
      return `<g${t.length ? ` transform="${t.join(" ")}"` : ""}${op}>${node.children.map(emit).join("")}</g>`;
    }
    case "path": return `<path d="${node.d}"${node.evenOdd ? ' fill-rule="evenodd"' : ""}${paintAttrs(node)}/>`;
    case "rect": return `<rect x="${n(node.x)}" y="${n(node.y)}" width="${n(node.w)}" height="${n(node.h)}"${node.r ? ` rx="${n(node.r)}"` : ""}${paintAttrs(node)}/>`;
    case "circle": return `<circle cx="${n(node.cx)}" cy="${n(node.cy)}" r="${n(node.r)}"${paintAttrs(node)}/>`;
    case "text": {
      // Only the quick preview reaches here; exports are outlined first.
      const value = node.value.replace(/\s+/g, " ").trim();
      if (!value) return "";
      const dir = node.dir ?? (hasArabic(value) ? "rtl" : "ltr");
      const anchor = node.align === "center" ? "middle" : node.align;
      const family = getFont(node.font).family;
      return `<text x="${n(node.x)}" y="${n(node.y)}" font-family="'${family}', 'Tajawal', sans-serif" font-size="${n(node.size)}" font-weight="${node.weight ?? 400}" direction="${dir}" text-anchor="${anchor}"${paintAttrs(node)}>${escapeXml(value)}</text>`;
    }
  }
}

function cropMarks(w: number, h: number, bleed: number): string {
  const a = bleed + MARK_GAP, b = a + MARK_LENGTH, lines: string[] = [];
  for (const x of [0, w]) for (const [y0, y1] of [[-a, -b], [h + a, h + b]]) lines.push(`M${n(x)} ${n(y0)} L${n(x)} ${n(y1)}`);
  for (const y of [0, h]) for (const [x0, x1] of [[-a, -b], [w + a, w + b]]) lines.push(`M${n(x0)} ${n(y)} L${n(x1)} ${n(y)}`);
  return `<path d="${lines.join(" ")}" fill="none" stroke="#000000" stroke-width="0.09"/>`;
}

export function renderSvg(scene: Scene, opts: SvgOptions = {}): string {
  const print: PrintOptions = { bleedMm: opts.bleedMm ?? 0, cropMarks: opts.cropMarks ?? false };
  const { widthMm: w, heightMm: h } = scene, bleed = print.bleedMm, m = pageMargin(print);
  const clip = `${opts.idPrefix ?? "tb"}-bleed`;
  const body = scene.children.map(emit).join("");
  const guides: string[] = [];
  if (opts.showTrim && bleed > 0) guides.push(`<rect x="0" y="0" width="${n(w)}" height="${n(h)}" fill="none" stroke="#e5007e" stroke-width="0.2"/>`);
  if (opts.showSafe && opts.safeMm) guides.push(`<rect x="${n(opts.safeMm)}" y="${n(opts.safeMm)}" width="${n(w - 2 * opts.safeMm)}" height="${n(h - 2 * opts.safeMm)}" fill="none" stroke="#00a0e3" stroke-width="0.2" stroke-dasharray="1.2 1.2"/>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${n(w + 2 * m)}mm" height="${n(h + 2 * m)}mm" viewBox="${n(-m)} ${n(-m)} ${n(w + 2 * m)} ${n(h + 2 * m)}">`
    + `<defs><clipPath id="${clip}"><rect x="${n(-bleed)}" y="${n(-bleed)}" width="${n(w + 2 * bleed)}" height="${n(h + 2 * bleed)}"/></clipPath></defs>`
    + `<g clip-path="url(#${clip})"><rect x="${n(-bleed)}" y="${n(-bleed)}" width="${n(w + 2 * bleed)}" height="${n(h + 2 * bleed)}" fill="${scene.background.hex}"/>${body}</g>`
    + (print.cropMarks ? cropMarks(w, h, bleed) : "") + guides.join("") + `</svg>`;
}
