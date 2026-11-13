import { arcade, starPath } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, line, more, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "wedding-save-the-date",
  category: "wedding",
  lang: "ar",
  title: { ar: "بطاقة «احفظوا التاريخ»", en: "Save the date card" },
  note: { ar: "بطاقة عرضية صغيرة تسبق الدعوة: التاريخ بأرقام كبيرة فوق صف أقواس، والاسمان على الجانب.", en: "A small landscape card sent before the invitation: the date in large numerals over a row of arches, names at the side." },
  tags: ["زفاف", "احفظوا التاريخ", "موعد", "أقواس", "save the date", "wedding"],
  sizes: [sizes.a6l, more.a5l],
  palettes: [
    pal("clay", "فخّار", "Clay", inks.terracotta, inks.ivory, inks.ivory, inks.mustard, inks.burgundy),
    pal("olive", "زيتون", "Olive", inks.oliveDark, inks.ivory, inks.ivory, inks.mustard, inks.olive),
    pal("stone", "حجر", "Stone", inks.paper, inks.black, inks.black, inks.terracotta, inks.sand),
  ],
  fonts: ["lalezar", "kufam", "rakkas", "reemkufi"],
  fields: [
    { id: "kicker", kind: "text", label: { ar: "العنوان", en: "Heading" }, sample: "احفظوا التاريخ", maxLength: 24 },
    { id: "date", kind: "text", label: { ar: "التاريخ بالأرقام", en: "Date in numerals" }, sample: "٢٤ . ٠٧ . ٢٠٢٧", maxLength: 18 },
    { id: "names", kind: "text", label: { ar: "الاسمان", en: "Names" }, sample: "سامر و ميس", maxLength: 30 },
    { id: "place", kind: "text", label: { ar: "المدينة", en: "City" }, sample: "رام الله" },
    { id: "note", kind: "text", label: { ar: "ملاحظة", en: "Note" }, sample: "الدعوة تصلكم قريباً" },
  ],
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 148, 105), m = 12 * s, max = W - 2 * m, arcH = H * 0.3;
    return scene(W, H, p.paper,
      g({ x: -b, y: H - arcH, opacity: 0.9 }, rect(0, arcH * 0.5, W + 2 * b, arcH * 0.5 + b, { fill: p.soft }), arcade(9, W + 2 * b, arcH + b, p.accent2, 0.5 * s)),
      g({ x: m + 4 * s, y: m + 4 * s }, path(starPath(8, 4 * s, 1.9 * s), { fill: p.accent2 })),
      line(val(ctx, "kicker"), W - m, m + 7 * s, 7.4 * s, { font: "tajawal", weight: 800, fill: p.accent2, align: "start", maxWidth: max - 14 * s }),
      line(val(ctx, "date"), cx, H * 0.5, 27 * s, { font: ctx.font, weight: 800, fill: p.ink, maxWidth: max }),
      rect(m, H * 0.56, max, 0.5 * s, { fill: p.ink }),
      line(val(ctx, "names"), W - m, H * 0.67, 8.5 * s, { font: "tajawal", weight: 800, fill: p.ink, align: "start", maxWidth: max * 0.58 }),
      line(val(ctx, "place"), m, H * 0.67, 6 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "end", maxWidth: max * 0.36 }),
      line(val(ctx, "note"), cx, H - 9 * s, 4.6 * s, { font: "tajawal", weight: 700, fill: p.soft === inks.sand ? inks.black : inks.ivory, maxWidth: max }),
    );
  },
};
export default t;
