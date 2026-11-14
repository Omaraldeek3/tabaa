import { hatch, ringsNode } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "stickers-fragile",
  category: "stickers",
  lang: "ar",
  title: { ar: "ملصق «قابل للكسر» للشحن", en: "Fragile shipping label" },
  note: { ar: "ملصق شحن بخطوط تحذير مائلة على الحافة، وكأس مكسورة، وسهمان للأعلى. للمحلات التي تشحن زجاجاً وفخّاراً وصابوناً.", en: "A shipping label with hazard stripes along the edge, a cracked glass and two up arrows. For shops that ship glass, pottery and soap." },
  tags: ["قابل للكسر", "شحن", "توصيل", "زجاج", "ملصق", "fragile"],
  sizes: [more.label10070, { id: "100x50", label: { ar: "ملصق ١٠٠×٥٠ ملم", en: "Label 100×50 mm" }, widthMm: 100, heightMm: 50 }],
  palettes: [
    pal("red", "أحمر", "Red", inks.white, inks.black, inks.red, inks.black, inks.mustard),
    pal("yellow", "أصفر", "Yellow", inks.mustard, inks.black, inks.black, inks.black, inks.black),
    pal("kraft", "كرافت", "Kraft", inks.sand, inks.black, inks.red, inks.black, inks.ivory),
  ],
  fonts: ["lalezar", "kufam", "jomhuria"],
  fields: [
    tf("title", "التحذير", "Warning", "قابل للكسر", 14),
    tf("sub", "التعليمات", "Instructions", "يُحمل بعناية · لا تضع شيئاً فوقه"),
    tf("shop", "المرسل", "Sender", "فخّار الخليل · ٠٥٩٩ ٠٠٠ ٠٠٠"),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 100, 70), sb = 7 * s, R = W - 8 * s, tw = W * 0.6;
    const stripes = Array.from({ length: Math.ceil((W + 2 * b) / (6 * s)) + 3 }, (_, i) => `M${-b + i * 6 * s - 6 * s} ${-b} l${3 * s} 0 l${-sb} ${sb + b} l${-3 * s} 0 Z`).join(" ");
    const glass = g({ x: W * 0.2, y: H * 0.56 },
      path(`M${-7 * s} ${-14 * s} L${7 * s} ${-14 * s} L${5 * s} ${-2 * s} C${4 * s} ${2 * s} ${-4 * s} ${2 * s} ${-5 * s} ${-2 * s} Z`, { fill: p.accent }),
      rect(-0.8 * s, 0, 1.6 * s, 9 * s, { fill: p.accent }), rect(-5 * s, 9 * s, 10 * s, 1.6 * s, { fill: p.accent }),
      path(`M${-1 * s} ${-14 * s} L${1.6 * s} ${-9 * s} L${-1.4 * s} ${-6 * s} L${1 * s} ${-2 * s}`, { fill: null, stroke: p.paper, strokeWidth: 0.8 * s }));
    const arrow = (x: number) => path(`M${x} ${H - 9 * s} V${H - 18 * s} M${x - 3 * s} ${H - 15 * s} L${x} ${H - 18.5 * s} L${x + 3 * s} ${H - 15 * s}`, { fill: null, stroke: p.ink, strokeWidth: 1 * s });
    return scene(W, H, p.paper,
      hatch(-b, sb, W + 2 * b, H - sb + b, 3 * s, p.soft, 0.15 * s, 0.25),
      g({ x: W * 0.2, y: H * 0.5 }, circle(0, 0, 17 * s, { fill: p.paper }), ringsNode(15 * s, 17 * s, 2, p.accent, 0.3 * s, 0.6)),
      rect(-b, -b, W + 2 * b, sb + b, { fill: p.accent2 === p.ink ? inks.mustard : p.soft }), path(stripes, { fill: p.ink }),
      glass,
      line(val(ctx, "title"), R, 31 * s, 13 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: tw }),
      line(val(ctx, "sub"), R, 40 * s, 3.4 * s, { font: "tajawal", weight: 800, fill: p.ink, align: "start", maxWidth: tw }),
      line(val(ctx, "shop"), R, H - 8 * s, 3 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: tw * 0.8 }),
      arrow(W * 0.36), arrow(W * 0.36 - 8 * s),
      rect(R - tw, 44 * s, tw, 0.4 * s, { fill: p.accent }),
      [0, 1, 2].map(i => g({ x: R - tw + 10 * s + i * 5 * s, y: 50 * s }, path(`M0 ${-2 * s} L${1.6 * s} 0 L0 ${2 * s} L${-1.6 * s} 0 Z`, { fill: p.accent2 === p.ink ? inks.mustard : p.soft }))),
      rect(2.4 * s, sb + 2.4 * s, W - 4.8 * s, H - sb - 4.8 * s, { fill: null, stroke: p.ink, strokeWidth: 0.3 * s }),
    );
  },
};
export default t;
