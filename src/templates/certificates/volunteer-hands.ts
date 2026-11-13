import { raisedHands } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { certAr } from "../fields.ts";
import { dims, inks, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "certificates-volunteer-hands",
  category: "certificates",
  lang: "ar",
  title: { ar: "شهادة تطوّع بالأيدي المرفوعة", en: "Volunteer certificate with raised hands" },
  note: { ar: "صفّ من الأيدي المرفوعة بألوان مختلفة على طول أسفل الشهادة كأنها فريق، والنص فوقها بخط ودود. للمبادرات الشبابية وحملات التطوّع.", en: "A row of raised hands in different colours along the foot of the certificate like a team, with the text above in a friendly face. For youth initiatives and volunteer drives." },
  tags: ["تطوع", "متطوع", "شهادة", "مبادرة", "شباب", "عمل جماعي", "volunteer"],
  sizes: [sizes.a4l],
  palettes: [
    pal("bright", "مشرق", "Bright", inks.ivory, inks.navy, inks.orange, inks.teal, inks.red),
    pal("earth", "تراب", "Earth", inks.paper, inks.black, inks.terracotta, inks.olive, inks.mustard),
    pal("night", "ليل", "Night", inks.navy, inks.ivory, inks.mustard, inks.sky, inks.rose),
  ],
  fonts: ["marhey", "lalezar", "rakkas"],
  fields: certAr({ org: "مبادرة «إيد بإيد» الشبابية", title: "شهادة تطوّع", lead: "نشكر المتطوّعة", name: "تسنيم عبد الهادي", reason: "على مشاركتها في حملة قطف الزيتون مع المزارعين\nبواقع ٦٠ ساعة تطوّعية", date: "تشرين الثاني ٢٠٢٧", sign1: "منسّق المبادرة", sign2: "رئيس المجلس القروي" }),
  safeMm: 8,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 297, 210), max = W - 50 * s;
    const sign = (label: string, x: number) => label ? [rect(x - 24 * s, 138 * s, 48 * s, 0.4 * s, { fill: p.ink }), line(label, x, 145 * s, 4.6 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: 48 * s })] : [];
    return scene(W, H, p.paper,
      g({ x: -b, y: H + b }, raisedHands(W + 2 * b, 11, [p.accent, p.accent2, p.soft, p.ink === inks.ivory ? inks.sand : inks.sand])),
      line(val(ctx, "org"), cx, 26 * s, 7 * s, { font: "tajawal", weight: 800, fill: p.accent2, maxWidth: max }),
      line(val(ctx, "title"), cx, 52 * s, 22 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line(val(ctx, "lead"), cx, 68 * s, 6.4 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      line(val(ctx, "name"), cx, 88 * s, 15 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      stack(linesOf(val(ctx, "reason"), 3), cx, 104 * s, 5.6 * s, 8.6 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, 140 * s, 4.6 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: 60 * s }),
      sign(val(ctx, "sign1"), W - 54 * s), sign(val(ctx, "sign2"), 54 * s),
    );
  },
};
export default t;
