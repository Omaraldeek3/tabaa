import { beadRule, dotField, khatamPath, scallopEdge } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "tags-gift-tag",
  category: "tags",
  lang: "ar",
  title: { ar: "بطاقة هدية معلّقة بخيط", en: "Hanging gift tag with string" },
  note: { ar: "بطاقة هدية طولية بثقب في أعلاها وخيط ملفوف، وخطوط «إلى» و«من» للكتابة باليد، وشرائط مائلة في أسفلها كورق التغليف.", en: "A tall gift tag with a hole at the top and a looped string, lines for to and from in handwriting, and slanted stripes at the foot like wrapping paper." },
  tags: ["بطاقة هدية", "هدية", "تاغ", "إلى", "من", "gift tag"],
  sizes: [more.tag, more.tagS],
  palettes: [
    pal("red", "أحمر", "Red", inks.ivory, inks.black, inks.red, inks.olive, inks.sand),
    pal("kraft", "كرافت", "Kraft", inks.sand, inks.black, inks.navy, inks.red, inks.ivory),
    pal("green", "أخضر", "Green", inks.oliveDark, inks.ivory, inks.mustard, inks.red, inks.olive),
  ],
  fonts: ["marhey", "arefruqaa", "lalezar"],
  fields: [
    tf("title", "العبارة", "Words", "هدية صغيرة", 14),
    tf("to", "إلى", "To", ""),
    tf("from", "من", "From", ""),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, u, cx } = dims(ctx, 55, 90), s = u, sy = H - 22 * s;
    const stripes = Array.from({ length: 14 }, (_, i) => `M${-b + i * 7 * s - 20 * s} ${H + b} L${-b + i * 7 * s} ${sy} l${3.5 * s} 0 L${-b + i * 7 * s - 16.5 * s} ${H + b} Z`).join(" ");
    const fill = (label: string, v: string, y: number) => [rect(6 * s, y, W - 12 * s, 0.25 * s, { fill: p.ink }), line(label, W - 6 * s, y - 1 * s, 3 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", safe: false }), line(v, W - 14 * s, y - 1.2 * s, 4 * s, { font: ctx.font, fill: p.ink, align: "start", maxWidth: W - 24 * s })];
    return scene(W, H, p.paper,
      dotField(0, 0, W, sy, 3 * s, 0.35 * s, p.soft, { fade: "down", opacity: 0.35 }),
      rect(-b, sy, W + 2 * b, H - sy + b, { fill: p.accent }), path(stripes, { fill: p.accent2 }),
      circle(cx, 8 * s, 3 * s, { fill: null, stroke: p.ink, strokeWidth: 0.5 * s }), circle(cx, 8 * s, 1.8 * s, { fill: inks.white }),
      path(`M${cx} ${8 * s - 1.8 * s} C${cx - 6 * s} ${-2 * s} ${cx + 10 * s} ${-6 * s} ${cx + 14 * s} ${-b - 2}`, { fill: null, stroke: p.accent, strokeWidth: 0.7 * s }),
      line(val(ctx, "title"), cx, 25 * s, 7.4 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 12 * s }),
      fill("إلى:", val(ctx, "to"), 42 * s), fill("من:", val(ctx, "from"), 54 * s),
      scallopEdge(-b, sy, W + 2 * b, 1.6 * s, p.paper, -1),
      beadRule(4 * s, W - 4 * s, sy - 3 * s, p.accent, s, { bead: "diamond", pitch: 3, centre: true }),
      [[4, 4], [W / s - 4, 4]].map(([x, y]) => g({ x: x * s, y: y * s }, path(khatamPath(1.6 * s), { fill: p.accent }))),
    );
  },
};
export default t;
