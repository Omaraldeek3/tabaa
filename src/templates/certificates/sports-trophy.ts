import { burstLines, guillocheNode, trophy } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { certAr } from "../fields.ts";
import { dims, inks, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "certificates-sports-trophy",
  category: "certificates",
  lang: "ar",
  title: { ar: "شهادة فوز رياضي بالكأس", en: "Sports winner certificate with a trophy" },
  note: { ar: "شهادة عرضية حيوية: كأس ذهبي كبير على يسارها فوق خطوط سرعة مائلة، والفائز والمركز بخط عريض. للبطولات المدرسية والأندية والدوريات.", en: "A lively landscape certificate: a big gold cup on the left over slanted speed lines, the winner and place in heavy type. For school tournaments, clubs and leagues." },
  tags: ["شهادة", "رياضة", "بطولة", "كأس", "فوز", "دوري", "sports"],
  sizes: [sizes.a4l],
  palettes: [
    pal("navy", "كحلي", "Navy", inks.white, inks.navy, inks.goldDeep, inks.red, inks.sky),
    pal("green", "ملعب", "Pitch", inks.ivory, inks.oliveDark, inks.goldDeep, inks.olive, inks.sage),
    pal("black", "أسود", "Black", inks.charcoal, inks.ivory, inks.gold, inks.orange, inks.grey),
  ],
  fonts: ["lalezar", "kufam", "rakkas"],
  fields: certAr({ org: "نادي شباب البيرة الرياضي", title: "بطل الدوري", lead: "تُمنح هذه الشهادة لفريق", name: "أشبال الحارة الشرقية", reason: "تقديراً لفوزهم بالمركز الأول في دوري الأحياء لكرة القدم\nموسم ٢٠٢٧", date: "١٥ تموز ٢٠٢٧", sign1: "رئيس النادي", sign2: "المدرّب" }),
  safeMm: 8,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 297, 210), R = W - 22 * s, tw = W * 0.6;
    const speed = [0, 1, 2, 3, 4].map(i => `M${-b} ${60 * s + i * 22 * s} L${W * 0.42 - i * 8 * s} ${60 * s + i * 22 * s - 30 * s}`).join(" ");
    const sign = (label: string, x: number) => label ? [rect(x - 26 * s, 176 * s, 52 * s, 0.4 * s, { fill: p.ink }), line(label, x, 184 * s, 5 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: 52 * s })] : [];
    const z = Math.min(W, H) / 210;
    return scene(W, H, p.paper,
      g({ x: W * 0.2, y: H * 0.42, opacity: 0.25 }, burstLines(48, 40 * z, 90 * z, p.accent, 0.35 * z)),
      guillocheNode(W * 0.45, 14 * z, W * 0.55 - 14 * z, H - 28 * z, p.accent, { waves: 14, amp: 1.2 * z, period: 22 * z, width: 0.15 * z, opacity: 0.1 }),
      rect(-b, -b, W + 2 * b, 8 * s + b, { fill: p.accent2 }), rect(-b, H - 8 * s, W + 2 * b, 8 * s + b, { fill: p.accent2 }),
      path(speed, { fill: null, stroke: p.soft, strokeWidth: 3 * s, opacity: 0.6 }),
      g({ x: W * 0.2, y: H * 0.78 }, trophy(H * 0.56, p.accent, p.ink)),
      line(val(ctx, "org"), R, 32 * s, 8 * s, { font: "tajawal", weight: 800, fill: p.accent2, align: "start", maxWidth: tw }),
      line(val(ctx, "title"), R, 64 * s, 26 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: tw }),
      line(val(ctx, "lead"), R, 82 * s, 7 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: tw }),
      line(val(ctx, "name"), R, 104 * s, 17 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: tw }),
      stack(linesOf(val(ctx, "reason"), 3), R, 124 * s, 6 * s, 10 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: tw }),
      line(val(ctx, "date"), R, 160 * s, 5.4 * s, { font: "tajawal", weight: 700, fill: p.soft === inks.grey ? p.ink : p.accent2, align: "start", maxWidth: tw * 0.5 }),
      sign(val(ctx, "sign1"), R - 30 * s), sign(val(ctx, "sign2"), R - 110 * s),
    );
  },
};
export default t;
