import { oliveBranch, shieldPath } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { certAr } from "../fields.ts";
import { dims, inks, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "certificates-appreciation-shield",
  category: "certificates",
  lang: "ar",
  title: { ar: "شهادة شكر وتقدير بالدرع", en: "Certificate of appreciation with a shield" },
  note: { ar: "درع تكريم في أعلى الوسط بين غصني زيتون، وإطار مزدوج رفيع، والنص متناظر تحته. للمؤسسات والبلديات والجمعيات.", en: "A shield of honour at top centre between two olive branches, a fine double frame, and the text set symmetrically below. For institutions, councils and associations." },
  tags: ["شكر وتقدير", "تكريم", "درع", "شهادة", "مؤسسة", "بلدية", "appreciation"],
  sizes: [sizes.a4l],
  palettes: [
    pal("green", "أخضر", "Green", inks.ivory, inks.oliveDark, inks.goldDeep, inks.olive, inks.grey),
    pal("navy", "كحلي", "Navy", inks.white, inks.navy, inks.goldDeep, inks.navy, inks.grey),
    pal("wine", "خمري", "Wine", inks.paper, inks.burgundy, inks.goldDeep, inks.burgundy, inks.grey),
  ],
  fonts: ["arefruqaa", "amiri", "reemkufi"],
  fields: certAr({ org: "بلدية بيت ساحور", title: "شكر وتقدير", lead: "تتقدّم البلدية بجزيل الشكر والتقدير إلى", name: "السيد جورج حزبون", reason: "تقديراً لجهوده المخلصة في خدمة أبناء البلدة\nوعطائه المتواصل طوال عشرين عاماً", date: "١ كانون الأول ٢٠٢٧", sign1: "رئيس البلدية", sign2: "سكرتير المجلس" }),
  safeMm: 10,
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 297, 210), m = 10 * s, max = W - 60 * s, sw = 22 * s, top = 18 * s;
    const sign = (label: string, x: number) => label ? [rect(x - 26 * s, 172 * s, 52 * s, 0.35 * s, { fill: p.ink }), line(label, x, 180 * s, 4.8 * s, { font: "amiri", fill: p.ink, maxWidth: 52 * s })] : [];
    return scene(W, H, p.paper,
      rect(m, m, W - 2 * m, H - 2 * m, { fill: null, stroke: p.accent, strokeWidth: 1 * s }),
      rect(m + 3 * s, m + 3 * s, W - 2 * m - 6 * s, H - 2 * m - 6 * s, { fill: null, stroke: p.accent, strokeWidth: 0.3 * s }),
      g({ x: cx, y: top }, path(shieldPath(sw), { fill: p.accent }), g({ y: sw * 0.1 }, path(shieldPath(sw * 0.78), { fill: p.accent2 }))),
      g({ x: cx - sw * 0.66, y: top + sw * 0.8, rotate: 205 }, oliveBranch(32 * s, p.accent2, null, { leaves: 7 })),
      g({ x: cx + sw * 0.66, y: top + sw * 0.8, rotate: -25, scaleY: -1 }, oliveBranch(32 * s, p.accent2, null, { leaves: 7 })),
      line(val(ctx, "org"), cx, 60 * s, 6 * s, { font: "tajawal", weight: 700, fill: p.accent2, maxWidth: max }),
      line(val(ctx, "title"), cx, 84 * s, 22 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line(val(ctx, "lead"), cx, 100 * s, 6.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "name"), cx, 120 * s, 15 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      stack(linesOf(val(ctx, "reason"), 3), cx, 136 * s, 6 * s, 9 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, 178 * s, 4.6 * s, { font: "amiri", fill: p.soft, maxWidth: max * 0.3 }),
      sign(val(ctx, "sign1"), W - 60 * s), sign(val(ctx, "sign2"), 60 * s),
    );
  },
};
export default t;
