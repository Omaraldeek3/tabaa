import { archPath, crescentPath, khatamPath, rosetteLines, scallopPath, starTile } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "certificates-course-arch",
  category: "certificates",
  lang: "ar",
  title: { ar: "شهادة إتمام بقوس ذهبي", en: "Certificate of completion with a gold arch" },
  note: { ar: "شهادة طولية وقورة: النص داخل قوس بخطين ذهبيين ونجوم في الزوايا. لحلقات التحفيظ وإتمام الدورات والتكريم.", en: "A formal portrait certificate: the text inside an arch in two gold lines, with stars at the corners. For Quran circles, course completion and honours." },
  tags: ["شهادة", "إتمام", "تحفيظ", "قرآن", "دورة", "تكريم", "certificate"],
  sizes: [sizes.a4],
  palettes: [
    pal("navy", "كحلي", "Navy", inks.ivory, inks.navy, inks.goldDeep, inks.navy, inks.grey),
    pal("green", "أخضر", "Green", inks.paper, inks.oliveDark, inks.goldDeep, inks.olive, inks.grey),
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.gold, inks.gold, inks.sky),
  ],
  fonts: ["arefruqaa", "amiri", "rakkas", "reemkufi"],
  fields: [
    { id: "org", kind: "text", label: { ar: "الجهة", en: "Organisation" }, sample: "مركز النور لتحفيظ القرآن الكريم" },
    { id: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, sample: "شهادة إتمام", maxLength: 24 },
    { id: "lead", kind: "text", label: { ar: "تمهيد", en: "Lead-in" }, sample: "يشهد المركز بأن الطالبة" },
    { id: "name", kind: "text", label: { ar: "الاسم", en: "Recipient" }, sample: "جنى سامر عودة", maxLength: 36 },
    { id: "reason", kind: "multiline", label: { ar: "النص", en: "Text" }, sample: "قد أتمّت حفظ جزء عمّ كاملاً\nبتقدير ممتاز\nسائلين الله لها التوفيق والسداد", maxLines: 4 },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "حُرّرت في ١ رمضان ١٤٤٩ هـ" },
    { id: "sign1", kind: "text", label: { ar: "التوقيع الأول", en: "First signature" }, sample: "مدير المركز" },
    { id: "sign2", kind: "text", label: { ar: "التوقيع الثاني", en: "Second signature" }, sample: "المحفّظة" },
  ],
  safeMm: 8,
  render(ctx) {
    const { W, H, p, cx } = dims(ctx, 210, 297), m = 16, aw = W - 2 * m, ah = H - 2 * m, max = aw - 44;
    const sign = (label: string, x: number) => label ? [rect(x - 26, 246, 52, 0.35, { fill: p.ink }), line(label, x, 254, 4.8, { font: "amiri", fill: p.ink, maxWidth: 52 })] : [];
    const z = Math.min(W, H) / 210;
    return scene(W, H, p.paper,
      starTile(0, 0, W, H, 14 * z, 1.4 * z, p.accent, 0.06),
      g({ x: W / 2, y: H * 0.45, opacity: 0.12 }, rosetteLines(60 * z, p.accent, { rings: 6, lobes: 16, width: 0.3 * z })),
      g({ x: m, y: m }, path(archPath(aw, ah, 0.6), { fill: null, stroke: p.accent, strokeWidth: 1 })),
      g({ x: m + 4, y: m + 5.4 }, path(archPath(aw - 8, ah - 9.4, 0.6), { fill: null, stroke: p.accent, strokeWidth: 0.3 })),
      [m + 6, W - m - 6].map(x => g({ x, y: m + 6 }, path(khatamPath(6), { fill: p.accent }), path(khatamPath(2.6), { fill: p.paper }))),
      g({ x: cx, y: 54, rotate: -90 }, path(crescentPath(8, 0.5), { fill: p.accent })),
      line(val(ctx, "org"), cx, 82, 6, { font: "tajawal", weight: 700, fill: p.accent2, maxWidth: max * 0.8 }),
      line(val(ctx, "title"), cx, 114, 27, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      rect(cx - 26, 122, 52, 0.5, { fill: p.accent }), g({ x: cx, y: 122.25 }, path(khatamPath(2.6), { fill: p.accent })),
      line(val(ctx, "lead"), cx, 142, 6.4, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "name"), cx, 164, 17, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      stack(linesOf(val(ctx, "reason"), 4), cx, 182, 6, 10, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, 228, 4.8, { font: "amiri", fill: p.soft, maxWidth: max * 0.6 }),
      sign(val(ctx, "sign1"), W - 56), sign(val(ctx, "sign2"), 56),
      g({ x: cx, y: 250 }, path(scallopPath(10, 18), { fill: p.accent }), path(khatamPath(6.6), { fill: p.paper }), path(khatamPath(4.4), { fill: p.accent2 === p.accent ? p.accent : p.accent2 })),
    );
  },
};
export default t;
