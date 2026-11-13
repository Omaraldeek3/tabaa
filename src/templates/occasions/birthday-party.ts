import { rays, scallopPath, starPath, watermelon } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "occasions-birthday-party",
  category: "occasions",
  lang: "ar",
  title: { ar: "دعوة عيد ميلاد للأطفال", en: "Children's birthday invitation" },
  note: { ar: "دعوة ملوّنة: رقم العمر داخل ختم فوق أشعة، وشرائح بطيخ في الأسفل. للأطفال ولمن بقي طفلاً.", en: "A colourful invitation: the age in a seal over rays, with watermelon slices along the foot. For children, and for anyone who stayed one." },
  tags: ["عيد ميلاد", "أطفال", "حفلة", "بطيخ", "birthday", "kids"],
  sizes: [sizes.a6, sizes.square12, sizes.a5],
  palettes: [
    pal("melon", "بطيخ", "Melon", inks.mustard, inks.black, inks.red, inks.olive, inks.ivory),
    pal("sea", "بحر", "Sea", inks.sky, inks.navy, inks.terracotta, inks.teal, inks.ivory),
    pal("candy", "حلوى", "Candy", inks.blush, inks.burgundy, inks.rose, inks.olive, inks.ivory),
  ],
  fonts: ["lalezar", "marhey", "rakkas", "kufam"],
  fields: [
    { id: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, sample: "عيد ميلاد", maxLength: 18 },
    { id: "age", kind: "text", label: { ar: "العمر", en: "Age" }, sample: "٧", maxLength: 3 },
    { id: "name", kind: "text", label: { ar: "صاحب العيد", en: "Birthday child" }, sample: "جود", maxLength: 16 },
    { id: "invite", kind: "text", label: { ar: "نص الدعوة", en: "Invitation line" }, sample: "تعالوا نحتفل ونلعب ونأكل الكعك" },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "السبت ١٠ تموز" },
    { id: "time", kind: "text", label: { ar: "الوقت", en: "Time" }, sample: "الرابعة عصراً" },
    { id: "venue", kind: "text", label: { ar: "المكان", en: "Venue" }, sample: "بيت جدّو" },
  ],
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 105, 148), max = W - 20 * s, cy = H * 0.27, r = 20 * s, y = (k: number) => cy + r + (H - cy - r) * k;
    return scene(W, H, p.paper,
      g({ x: cx, y: cy, opacity: 0.2 }, rays(18, r, Math.hypot(W, H), p.ink, 0.5)),
      rect(-b, H - 16 * s, W + 2 * b, 16 * s + b, { fill: p.accent2 }),
      [0.14, 0.38, 0.62, 0.86].map((x, i) => g({ x: x * W, y: H - 16 * s, rotate: i % 2 ? 8 : -8 }, watermelon(19 * s, inks.red, inks.oliveDark, inks.ivory, inks.black))),
      g({ x: cx, y: cy }, path(scallopPath(r, 14, 0.14), { fill: p.accent }), circle(0, 0, r * 0.82, { fill: null, stroke: p.soft, strokeWidth: 0.6 * s })),
      [[-1.5, -0.7, 3], [1.5, -0.5, 2.4], [-1.7, 0.5, 2], [1.75, 0.6, 3]].map(([x, yy, k]) => g({ x: cx + x * r, y: cy + yy * r }, path(starPath(5, k * s, k * 0.42 * s), { fill: p.accent }))),
      line(val(ctx, "age"), cx, cy + r * 0.42, r * 1.25, { font: ctx.font, weight: 800, fill: p.soft, maxWidth: r * 1.3 }),
      line(joined(ctx, ["title", "name"], " "), cx, y(0.26), 14 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "invite"), cx, y(0.4), 4.6 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, y(0.54), 6.4 * s, { font: "tajawal", weight: 800, fill: p.accent, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, y(0.64), 4.8 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
    );
  },
};
export default t;
