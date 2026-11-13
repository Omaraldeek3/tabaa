import { leafPath, orange } from "../../lib/motifs/index.ts";
import { type SceneNode, g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "wedding-orange-grove",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف ببرتقال يافا", en: "Jaffa orange wedding invitation" },
  note: { ar: "دعوة مبهجة: عناقيد برتقال وأوراق تتدلّى من الزاويتين، وألوان بيّارات الساحل.", en: "A cheerful invitation: oranges and leaves hang from both top corners in the colours of the coastal groves." },
  tags: ["زفاف", "عرس", "برتقال", "يافا", "بيارة", "صيف", "wedding", "orange"],
  sizes: [sizes.a5, sizes.invite, sizes.square15],
  palettes: [
    pal("jaffa", "يافا", "Jaffa", inks.ivory, inks.oliveDark, inks.orange, inks.olive, inks.terracotta),
    pal("sea", "بحر", "Sea", inks.sky, inks.navy, inks.orange, inks.teal, inks.navy),
    pal("dusk", "غروب", "Dusk", inks.navy, inks.ivory, inks.orange, inks.sage, inks.mustard),
  ],
  fonts: ["rakkas", "arefruqaa", "lalezar", "amiri"],
  fields: [
    { id: "invite", kind: "text", label: { ar: "نص الدعوة", en: "Invitation line" }, sample: "شاركونا أحلى أيام العمر" },
    { id: "groom", kind: "text", label: { ar: "العريس", en: "Groom" }, sample: "إياد", maxLength: 18 },
    { id: "bride", kind: "text", label: { ar: "العروس", en: "Bride" }, sample: "لانا", maxLength: 18 },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "الجمعة ٢٧ آب ٢٠٢٧" },
    { id: "time", kind: "text", label: { ar: "الوقت", en: "Time" }, sample: "السادسة والنصف مساءً" },
    { id: "venue", kind: "text", label: { ar: "المكان", en: "Venue" }, sample: "بيّارة العائلة، قلقيلية" },
    { id: "closing", kind: "text", label: { ar: "الختام", en: "Closing" }, sample: "وجودكم يزيد الفرح فرحاً" },
  ],
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 148, 210), max = W - 34 * s, top = 66 * s, y = (k: number) => top + (H - top) * k;
    const cluster = (flip: number): SceneNode => g({ x: flip > 0 ? 0 : W, y: 0, scaleX: flip },
      [[58, 20, 20], [30, 58, 70], [6, 66, 95], [60, 6, -10], [52, 40, 45]].map(([x, yy, a]) => g({ x: x * s, y: yy * s, rotate: a }, path(leafPath(15 * s, 3.4 * s), { fill: p.accent2 }))),
      [[20, 18, 24], [44, 12, 19], [14, 44, 20], [38, 36, 16]].map(([x, yy, d]) => g({ x: x * s, y: yy * s }, orange(d * s, p.accent, p.accent2, inks.ivory))));
    const names = p.soft === inks.navy ? inks.navy : p.accent;
    return scene(W, H, p.paper,
      cluster(1), cluster(-1),
      line(val(ctx, "invite"), cx, y(0.14), 5.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "groom"), cx, y(0.32), 21 * s, { font: ctx.font, weight: 700, fill: names, maxWidth: max }),
      g({ x: cx, y: y(0.39) }, orange(7 * s, p.accent, p.accent2, null)),
      line(val(ctx, "bride"), cx, y(0.55), 21 * s, { font: ctx.font, weight: 700, fill: names, maxWidth: max }),
      rect(cx - 15 * s, y(0.61), 30 * s, 0.35 * s, { fill: p.accent2 }),
      line(val(ctx, "date"), cx, y(0.7), 6.6 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, y(0.77), 5.2 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "closing"), cx, y(0.87), 4.6 * s, { font: "amiri", weight: 700, fill: p.accent2, maxWidth: max }),
    );
  },
};
export default t;
