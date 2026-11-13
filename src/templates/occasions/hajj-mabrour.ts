import { archWindow, crescentPath, khatamPath, tatreezBand } from "../../lib/motifs/index.ts";
import { g, path, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "occasions-hajj-mabrour",
  category: "occasions",
  lang: "ar",
  title: { ar: "بطاقة حجّ مبرور", en: "Hajj mabrour card" },
  note: { ar: "تهنئة بعودة الحاج أو دعوة لاستقباله: نافذة قوس خضراء بهلال، كزينة أبواب الحجّاج.", en: "A welcome-home card for a returning pilgrim: a green arch window with a crescent, like the decorated doors of hajjis." },
  tags: ["حج", "عمرة", "حاج", "مبرور", "استقبال", "hajj", "umrah"],
  sizes: [sizes.a6, sizes.a5, sizes.dl],
  palettes: [
    pal("green", "أخضر", "Green", inks.olive, inks.oliveDark, inks.ivory, inks.goldDeep, inks.gold),
    pal("teal", "فيروزي", "Teal", inks.teal, inks.navy, inks.ivory, inks.goldDeep, inks.mustard),
    pal("stone", "حجر", "Stone", inks.sand, inks.black, inks.paper, inks.terracotta, inks.black),
  ],
  fonts: ["arefruqaa", "amiri", "rakkas", "reemkufi"],
  fields: [
    { id: "title", kind: "text", label: { ar: "التهنئة", en: "Greeting" }, sample: "حجّاً مبروراً", maxLength: 20 },
    { id: "subtitle", kind: "text", label: { ar: "تتمة", en: "Second line" }, sample: "وسعياً مشكوراً وذنباً مغفوراً" },
    { id: "name", kind: "text", label: { ar: "اسم الحاج", en: "Pilgrim" }, sample: "الحاج أبو أحمد", maxLength: 30 },
    { id: "message", kind: "text", label: { ar: "الرسالة", en: "Message" }, sample: "نستقبل المهنّئين في ديوان العائلة" },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "الجمعة بعد صلاة العصر" },
    { id: "from", kind: "text", label: { ar: "من", en: "From" }, sample: "أبناؤه وأحفاده" },
  ],
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 105, 148), m = 13 * s, max = W - 2 * m - 14 * s, top = H * 0.3, y = (k: number) => top + (H - top - m) * k;
    return scene(W, H, p.accent,
      g({ x: -b, y: -b }, archWindow(W + 2 * b, H + 2 * b, m + b, p.paper, 0.62)),
      g({ x: m + b * 0 + 2 * s, y: H - m - 7 * s }, tatreezBand("chain", W - 2 * m - 4 * s, 4 * s, [p.accent2, p.ink])),
      g({ x: cx, y: top * 0.72, rotate: -90 }, path(crescentPath(7 * s, 0.5), { fill: p.accent2 })),
      g({ x: cx, y: top * 0.72 - 13 * s }, path(khatamPath(2 * s), { fill: p.accent2 })),
      line(val(ctx, "title"), cx, y(0.16), 15 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "subtitle"), cx, y(0.28), 4.6 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "name"), cx, y(0.46), 8.4 * s, { font: "amiri", weight: 700, fill: p.accent2, maxWidth: max }),
      line(val(ctx, "message"), cx, y(0.6), 4.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["date"]), cx, y(0.7), 4.4 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "from"), cx, y(0.82), 4 * s, { font: "amiri", fill: p.soft === inks.black ? inks.black : p.accent2, maxWidth: max }),
    );
  },
};
export default t;
