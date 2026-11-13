import { dotRing, rings, scallopPath } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "occasions-engagement-rings",
  category: "occasions",
  lang: "ar",
  title: { ar: "دعوة خطوبة بخاتمين", en: "Engagement invitation with two rings" },
  note: { ar: "دعوة خطوبة ناعمة: خاتمان داخل ختم مسنّن، والاسمان على سطر واحد.", en: "A soft engagement invitation: two rings in a scalloped seal and both names on one line." },
  tags: ["خطوبة", "خطبة", "خاتم", "قراءة فاتحة", "engagement"],
  sizes: [sizes.a6, sizes.a5, sizes.square12],
  palettes: [
    pal("blush", "خوخ", "Blush", inks.blush, inks.burgundy, inks.rose, inks.goldDeep, inks.ivory),
    pal("sage", "مريمية", "Sage", inks.ivory, inks.oliveDark, inks.sage, inks.goldDeep, inks.paper),
    pal("night", "ليل", "Night", inks.navy, inks.ivory, inks.night, inks.gold, inks.navy),
  ],
  fonts: ["arefruqaa", "amiri", "lateef", "rakkas"],
  fields: [
    { id: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, sample: "حفل خطوبة", maxLength: 22 },
    { id: "first", kind: "text", label: { ar: "الاسم الأول", en: "First name" }, sample: "أنس", maxLength: 16 },
    { id: "second", kind: "text", label: { ar: "الاسم الثاني", en: "Second name" }, sample: "شهد", maxLength: 16 },
    { id: "invite", kind: "text", label: { ar: "نص الدعوة", en: "Invitation line" }, sample: "يسعدنا أن تشاركونا فرحتنا" },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "الجمعة ١٤ أيار ٢٠٢٧" },
    { id: "time", kind: "text", label: { ar: "الوقت", en: "Time" }, sample: "السادسة مساءً" },
    { id: "venue", kind: "text", label: { ar: "المكان", en: "Venue" }, sample: "منزل العائلة، سلفيت" },
  ],
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 105, 148), max = W - 20 * s, r = 19 * s, cy = H * 0.24, y = (k: number) => cy + r + (H - cy - r) * k;
    return scene(W, H, p.paper,
      rect(-b, -b, W + 2 * b, cy + b, { fill: p.accent }),
      g({ x: cx, y: cy }, path(scallopPath(r, 16, 0.12), { fill: p.soft }), dotRing(r * 0.84, 28, 0.4 * s, p.accent2), rings(r * 1.2, p.accent2)),
      line(val(ctx, "title"), cx, y(0.14), 6 * s, { font: "tajawal", weight: 700, fill: p.accent2, maxWidth: max }),
      line(joined(ctx, ["first", "second"], "  و  "), cx, y(0.38), 17 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      rect(cx - 12 * s, y(0.45), 24 * s, 0.3 * s, { fill: p.accent2 }),
      line(val(ctx, "invite"), cx, y(0.57), 4.6 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, y(0.71), 5.6 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, y(0.82), 4.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
    );
  },
};
export default t;
