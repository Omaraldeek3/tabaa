import { keffiyeh, oliveBranch } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { dims, inks, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "certificates-olive-modern",
  category: "certificates",
  lang: "ar",
  title: { ar: "شهادة مشاركة عصرية", en: "Modern certificate of participation" },
  note: { ar: "شهادة عرضية عصرية: عمود لون جانبي بشبكة الكوفية وغصن زيتون، والنص محاذٍ لليمين. للدورات والمخيمات والورش.", en: "A modern landscape certificate: a colour column with a keffiyeh net and an olive branch, text set to the right. For courses, camps and workshops." },
  tags: ["شهادة", "مشاركة", "دورة", "مخيم", "ورشة", "تدريب", "certificate"],
  sizes: [sizes.a4l],
  palettes: [
    pal("olive", "زيتون", "Olive", inks.ivory, inks.black, inks.olive, inks.terracotta, inks.grey),
    pal("sea", "بحر", "Sea", inks.white, inks.navy, inks.teal, inks.mustard, inks.grey),
    pal("clay", "فخّار", "Clay", inks.paper, inks.black, inks.terracotta, inks.oliveDark, inks.grey),
  ],
  fonts: ["kufam", "reemkufi", "cairo", "lalezar"],
  fields: [
    { id: "org", kind: "text", label: { ar: "الجهة", en: "Organisation" }, sample: "مركز الشباب · بلدية طوباس" },
    { id: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, sample: "شهادة مشاركة", maxLength: 26 },
    { id: "lead", kind: "text", label: { ar: "تمهيد", en: "Lead-in" }, sample: "نشهد بأن" },
    { id: "name", kind: "text", label: { ar: "الاسم", en: "Recipient" }, sample: "يزن خالد دراغمة", maxLength: 40 },
    { id: "reason", kind: "multiline", label: { ar: "النص", en: "Text" }, sample: "شارك في المخيم الصيفي للبرمجة والروبوت\nمن ١ إلى ١٥ تموز ٢٠٢٧ بواقع ٤٠ ساعة تدريبية", maxLines: 3 },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "١٥ تموز ٢٠٢٧" },
    { id: "sign1", kind: "text", label: { ar: "التوقيع الأول", en: "First signature" }, sample: "مدير المركز" },
    { id: "sign2", kind: "text", label: { ar: "التوقيع الثاني", en: "Second signature" }, sample: "المدرّب" },
  ],
  safeMm: 8,
  render(ctx) {
    const { W, H, p, b } = dims(ctx, 297, 210), side = 62, right = W - 24, max = W - side - 48;
    const sign = (label: string, x: number) => label ? [rect(x - 54, 172, 54, 0.4, { fill: p.ink }), line(label, x, 180, 4.6, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: 54 })] : [];
    return scene(W, H, p.paper,
      rect(-b, -b, side + b, H + 2 * b, { fill: p.accent }),
      g({ x: -b, y: -b, opacity: 0.16 }, keffiyeh(side + b, H + 2 * b, 11, inks.paper, 0.12)),
      g({ x: side / 2, y: H - 22, rotate: -90 }, oliveBranch(H - 50, inks.ivory, null, { leaves: 15, bend: 0.05 })),
      rect(side, -b, 2, H + 2 * b, { fill: p.accent2 }),
      line(val(ctx, "org"), right, 34, 5.6, { font: "tajawal", weight: 700, fill: p.accent2, align: "start", maxWidth: max }),
      line(val(ctx, "title"), right, 68, 27, { font: ctx.font, weight: 800, fill: p.ink, align: "start", maxWidth: max }),
      rect(right - 40, 76, 40, 1.6, { fill: p.accent }),
      line(val(ctx, "lead"), right, 96, 6.4, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "name"), right, 116, 15, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: max }),
      stack(linesOf(val(ctx, "reason"), 3), right, 131, 5.8, 9.4, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: max }),
      sign(val(ctx, "sign1"), right), sign(val(ctx, "sign2"), right - 74),
      line(val(ctx, "date"), side + 24, 180, 4.6, { font: "tajawal", weight: 700, fill: p.soft, align: "end", maxWidth: 60 }),
    );
  },
};
export default t;
