import { rays, teaCup } from "../../lib/motifs/index.ts";
import { circle, g, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "greetings-get-well",
  category: "greetings",
  lang: "ar",
  title: { ar: "بطاقة «سلامتك» للمريض", en: "Get well soon card" },
  note: { ar: "كاسة شاي بالميرمية يتصاعد منها البخار وشمس صغيرة خلفها، مع «سلامتك، ما تشوف شرّ». لزيارة مريض أو بعد عملية.", en: "A glass of sage tea steaming in front of a small sun, with the Arabic wish for a quick recovery. For a hospital visit or after an operation." },
  tags: ["سلامتك", "مريض", "شفاء", "زيارة", "مستشفى", "get well"],
  sizes: [sizes.a6, sizes.square12],
  palettes: [
    pal("warm", "دافئ", "Warm", inks.ivory, inks.navy, inks.mustard, inks.terracotta, inks.sage),
    pal("mint", "نعناع", "Mint", inks.sage, inks.oliveDark, inks.ivory, inks.terracotta, inks.olive),
    pal("sky", "سماء", "Sky", inks.sky, inks.navy, inks.ivory, inks.orange, inks.olive),
  ],
  fonts: ["marhey", "lalezar", "rakkas"],
  fields: [
    tf("title", "العنوان", "Title", "سلامتك", 14),
    tf("line", "الدعاء", "Wish", "ما تشوف شرّ، والله يشفيك ويعافيك"),
    tf("to", "إلى", "To", "إلى خالتي أم وليد"),
    tf("from", "من", "From", "من كل العيلة"),
  ],
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 105, 148), max = W - 16 * s, cy = H * 0.38, cw = Math.min(W * 0.36, H * 0.24);
    return scene(W, H, p.paper,
      line(val(ctx, "to"), cx, 9 + 5 * s, 4 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
      g({ x: cx + cw * 0.5, y: cy - cw * 0.55 }, g({ opacity: 0.6 }, rays(18, cw * 0.36, cw * 0.62, p.accent, 0.5)), circle(0, 0, cw * 0.3, { fill: p.accent })),
      g({ x: cx, y: cy + cw * 0.55 }, teaCup(cw, p.accent2, inks.goldDeep, p.ink, p.soft)),
      line(val(ctx, "title"), cx, cy + cw * 0.55 + 22 * s, 17 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "line"), cx, cy + cw * 0.55 + 32 * s, 4.2 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "from"), cx, H - 7 - 3 * s, 4 * s, { font: "tajawal", weight: 800, fill: p.accent2, maxWidth: max }),
    );
  },
};
export default t;
