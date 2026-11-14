import { doubleFrame, guillocheNode } from "../../lib/motifs/index.ts";
import { circle, g, path, scene } from "../../lib/scene.ts";
import { cardAr } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "cards-calligrapher-nib",
  category: "cards",
  lang: "ar",
  title: { ar: "كرت خطّاط بالقلم والنقطة", en: "Calligrapher's card with reed pen and dot" },
  note: { ar: "قلم قصب مبريّ بشقّ في سنّه، ونقطة حبر مربّعة كمقياس الخط، والاسم بخط رقعة كبير. للخطاطين والمزخرفين ومحلات اللافتات.", en: "A cut reed pen with its slit nib and a diamond ink dot like the calligrapher's measure, with the name in large ruqaa. For calligraphers, illuminators and sign shops." },
  tags: ["كرت", "خطاط", "خط عربي", "قلم", "زخرفة", "لافتات", "calligraphy"],
  sizes: [sizes.card, sizes.card90],
  palettes: [
    pal("paper", "ورق", "Paper", inks.paper, inks.black, inks.terracotta, inks.black, inks.goldDeep),
    pal("ink", "حبر", "Ink", inks.ivory, inks.navy, inks.goldDeep, inks.navy, inks.goldDeep),
    pal("black", "أسود", "Black", inks.charcoal, inks.paper, inks.gold, inks.paper, inks.gold),
  ],
  fonts: ["arefruqaa", "amiri", "katibeh"],
  fields: cardAr({ name: "الخطّاط إياد", role: "خط عربي · لوحات · شعارات · كتابة دعوات", phone: "٠٥٦٩ ٤٤٤ ٢٢٢", address: "البلدة القديمة، عكا" }),
  safeMm: 4,
  render(ctx) {
    const { W, H, p, s } = dims(ctx, 85, 55), max = W * 0.66, px = W * 0.2, py = H * 0.84;
    const z = Math.min(W, H) / 55;
    return scene(W, H, p.paper,
      guillocheNode(W * 0.3, 2 * z, W * 0.7 - 2 * z, H - 4 * z, p.accent, { waves: 5, amp: 0.5 * z, period: 8 * z, width: 0.08 * z, opacity: 0.2 }),
      g({ x: px, y: py, rotate: -20 },
        path(`M0 0 L${2.4 * s} ${-6 * s} L${2.4 * s} ${-60 * s} L${-2.4 * s} ${-60 * s} L${-2.4 * s} ${-6 * s} Z`, { fill: p.accent }),
        path(`M0 0 L${0.25 * s} ${-5 * s} L${-0.25 * s} ${-5 * s} Z`, { fill: p.paper }),
        path(`M${-2.4 * s} ${-14 * s} H${2.4 * s} M${-2.4 * s} ${-30 * s} H${2.4 * s}`, { fill: null, stroke: p.ink, strokeWidth: 0.25 * s, opacity: 0.5 })),
      g({ x: px + 6 * s, y: py + 2 * s, rotate: 45 }, path(`M${-1.3 * s} ${-1.3 * s} h${2.6 * s} v${2.6 * s} h${-2.6 * s} Z`, { fill: p.accent2 })),
      circle(px + 10 * s, py + 1 * s, 0.5 * s, { fill: p.accent2 }),
      line(val(ctx, "name"), W * 0.58, 19 * s, 10 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "role"), W * 0.58, 27.4 * s, 2.8 * s, { font: "tajawal", weight: 500, fill: p.soft, maxWidth: max }),
      line(val(ctx, "phone"), W - 6 * s, 39 * s, 3.8 * s, { font: "tajawal", weight: 800, fill: p.ink, align: "start", maxWidth: W * 0.56 }),
      line(val(ctx, "address"), W - 6 * s, 45 * s, 2.6 * s, { font: "tajawal", fill: p.ink, align: "start", maxWidth: W * 0.56 }),
      doubleFrame(2.4 * z, 2.4 * z, W - 4.8 * z, H - 4.8 * z, p.ink, p.paper, { gap: 1 * z, heavy: 0.25 * z, thin: 0.1 * z, corner: "diamond", r: 1 * z }),
    );
  },
};
export default t;
