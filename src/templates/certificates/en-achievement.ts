import { oliveWreath, starPath, tatreezBand } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "certificates-en-achievement",
  category: "certificates",
  lang: "en",
  title: { ar: "شهادة إنجاز بالإنجليزية", en: "English certificate of achievement" },
  note: { ar: "شهادة إنجليزية بحروف سيريف وإكليل زيتون حول نجمة، وشريطي تطريز أعلى وأسفل. للمدارس الدولية والمؤسسات والدورات.", en: "An English certificate in serif type with an olive wreath round a star and tatreez bands at head and foot. For international schools, NGOs and courses." },
  tags: ["certificate", "english", "achievement", "award", "school", "شهادة", "إنجليزي", "إنجاز"],
  sizes: [sizes.a4l],
  palettes: [
    pal("classic", "كلاسيكي", "Classic", inks.ivory, inks.black, inks.olive, inks.red, inks.grey),
    pal("navy", "كحلي", "Navy", inks.white, inks.navy, inks.goldDeep, inks.navy, inks.grey),
    pal("clay", "فخّار", "Clay", inks.paper, inks.black, inks.oliveDark, inks.terracotta, inks.grey),
  ],
  fonts: ["playfairdisplay", "inter"],
  fields: [
    { id: "org", kind: "text", label: { ar: "الجهة", en: "Organisation" }, sample: "BETHLEHEM COMMUNITY SCHOOL" },
    { id: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, sample: "Certificate of Achievement", maxLength: 34 },
    { id: "lead", kind: "text", label: { ar: "تمهيد", en: "Lead-in" }, sample: "This certificate is proudly presented to" },
    { id: "name", kind: "text", label: { ar: "الاسم", en: "Recipient" }, sample: "Mariam Al-Qasem", maxLength: 40 },
    { id: "reason", kind: "multiline", label: { ar: "النص", en: "Text" }, sample: "for outstanding work in the 2027 science fair\nand for helping her classmates along the way", maxLines: 3 },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "30 May 2027" },
    { id: "sign1", kind: "text", label: { ar: "التوقيع الأول", en: "First signature" }, sample: "Head Teacher" },
    { id: "sign2", kind: "text", label: { ar: "التوقيع الثاني", en: "Second signature" }, sample: "Class Teacher" },
  ],
  safeMm: 8,
  render(ctx) {
    const { W, H, p, b, cx } = dims(ctx, 297, 210), max = W - 80, band = 8;
    const sign = (label: string, x: number) => label ? [rect(x - 28, 172, 56, 0.35, { fill: p.ink }), line(label, x, 179, 3.6, { font: "inter", weight: 500, fill: p.ink, maxWidth: 56 })] : [];
    return scene(W, H, p.paper,
      g({ x: -b, y: 10 }, tatreezBand("chain", W + 2 * b, band, [p.accent2, p.accent])),
      g({ x: -b, y: H - 10 - band }, tatreezBand("chain", W + 2 * b, band, [p.accent2, p.accent])),
      line(val(ctx, "org"), cx, 38, 4.2, { font: "inter", weight: 700, fill: p.accent2 === inks.navy ? p.accent : p.accent2, tracking: 1.4, maxWidth: max }),
      line(val(ctx, "title"), cx, 62, 18, { font: ctx.font, weight: 600, fill: p.ink, maxWidth: max }),
      line(val(ctx, "lead"), cx, 80, 5, { font: "playfairdisplay", fill: p.ink, maxWidth: max }),
      line(val(ctx, "name"), cx, 104, 19, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      rect(cx - 50, 111, 100, 0.4, { fill: p.ink }),
      stack(linesOf(val(ctx, "reason"), 3), cx, 124, 5.2, 8.6, { font: "playfairdisplay", fill: p.ink, maxWidth: max }),
      g({ x: cx, y: 166 }, oliveWreath(13, p.accent, null, { leaves: 9, open: 40 }), path(starPath(5, 5.4, 2.3), { fill: p.accent2 })),
      sign(val(ctx, "sign1"), 70), sign(val(ctx, "sign2"), W - 70),
      line(val(ctx, "date"), cx, 187.4, 3.4, { font: "inter", weight: 600, fill: p.soft, maxWidth: 60 }),
    );
  },
};
export default t;
