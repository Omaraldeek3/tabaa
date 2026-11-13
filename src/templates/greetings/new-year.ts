import { firework } from "../../lib/motifs/index.ts";
import { g, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "greetings-new-year",
  category: "greetings",
  lang: "ar",
  title: { ar: "بطاقة سنة جديدة بالألعاب النارية", en: "New Year card with fireworks" },
  note: { ar: "رقم السنة الجديدة كبيراً في الأسفل وفوقه ألعاب نارية من النقاط تتفتّح بثلاثة ألوان. لتهاني رأس السنة للأصدقاء والزبائن.", en: "The new year's number large at the foot with dotted fireworks opening above it in three colours. For New Year wishes to friends and customers." },
  tags: ["سنة جديدة", "رأس السنة", "ألعاب نارية", "تهنئة", "عام جديد", "new year"],
  sizes: [sizes.a6, sizes.a6l, sizes.square12],
  palettes: [
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.gold, inks.rose, inks.sky),
    pal("black", "أسود", "Black", inks.charcoal, inks.ivory, inks.mustard, inks.red, inks.teal),
    pal("white", "أبيض", "White", inks.white, inks.navy, inks.goldDeep, inks.red, inks.teal),
  ],
  fonts: ["lalezar", "reemkufi", "rakkas"],
  fields: [
    tf("year", "السنة", "Year", "٢٠٢٨", 6),
    tf("title", "التهنئة", "Greeting", "كل عام وأنتم بخير", 26),
    tf("from", "من", "From", "من فريق مطبعة الأمل"),
  ],
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 105, 148), max = W - 16 * s, m = Math.min(W, H);
    const bursts = [[0.3, 0.2, 0.2, p.accent], [0.7, 0.28, 0.16, p.accent2], [0.52, 0.12, 0.12, p.soft], [0.18, 0.45, 0.1, p.soft], [0.82, 0.08, 0.1, p.accent]] as const;
    return scene(W, H, p.paper,
      bursts.map(([x, y, r, c]) => g({ x: W * x, y: H * y + 6 * s }, firework(m * r, c))),
      line(val(ctx, "year"), cx, H - 22 * s, Math.min(H * 0.3, W * 0.34), { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 14 * s }),
      line(val(ctx, "title"), cx, H - 22 * s - Math.min(H * 0.3, W * 0.34) * 0.9, 6.4 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line(val(ctx, "from"), cx, H - 7 - 3 * s, 3.8 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
    );
  },
};
export default t;
