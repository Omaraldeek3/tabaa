import { bethlehemStar, bethlehemTown } from "../../lib/motifs/index.ts";
import { circle, g, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "greetings-christmas-bethlehem",
  category: "greetings",
  lang: "ar",
  title: { ar: "بطاقة ميلاد بنجمة بيت لحم", en: "Bethlehem star Christmas card" },
  note: { ar: "نجمة بذيل طويل يشير إلى أسطح بيت لحم القديمة وبرج جرسها، في سماء ليلية. لتهاني الميلاد من مدينة المهد.", en: "A star with a long tail points down to the old rooftops and bell tower of Bethlehem in a night sky. For Christmas greetings from the city of the Nativity." },
  tags: ["ميلاد", "عيد الميلاد", "بيت لحم", "نجمة", "مسيحي", "كريسمس", "christmas"],
  sizes: [sizes.a6, sizes.square12, sizes.a6l],
  palettes: [
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.gold, inks.navy, inks.sky),
    pal("red", "أحمر", "Red", inks.burgundy, inks.ivory, inks.gold, inks.black, inks.blush),
    pal("snow", "ثلج", "Snow", inks.ivory, inks.navy, inks.goldDeep, inks.navy, inks.sky),
  ],
  fonts: ["arefruqaa", "amiri", "reemkufi"],
  fields: [
    tf("title", "العنوان", "Title", "ميلاد مجيد", 16),
    tf("line", "التهنئة", "Wish", "وعلى الأرض السلام وبالناس المسرّة"),
    tf("from", "من", "From", "عائلة قنواتي · بيت لحم"),
  ],
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 105, 148), max = W - 16 * s, townH = H * 0.2, base = H - 22 * s, sr = Math.min(W, H) * 0.09;
    const dust = Array.from({ length: 22 }, (_, i) => circle(W * (((i * 41) % 100) / 100), H * 0.5 * (((i * 67) % 100) / 100), (0.25 + (i % 3) * 0.15) * s, { fill: p.soft, opacity: 0.8 }));
    return scene(W, H, p.paper,
      dust,
      g({ x: cx, y: H * 0.2 }, bethlehemStar(sr, p.accent)),
      g({ x: -b, y: base }, bethlehemTown(W + 2 * b, townH, p.accent2 === inks.navy && p.paper === inks.night ? inks.black : p.accent2)),
      rect(-b, base, W + 2 * b, H - base + b, { fill: p.accent2 === inks.navy && p.paper === inks.night ? inks.black : p.accent2 }),
      line(val(ctx, "title"), cx, H * 0.2 + sr * 3.4 + 12 * s, 14 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "line"), cx, H * 0.2 + sr * 3.4 + 21 * s, 4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "from"), cx, H - 7 - 4 * s, 4 * s, { font: "tajawal", weight: 700, fill: p.paper === inks.ivory ? inks.ivory : p.ink, maxWidth: max }),
    );
  },
};
export default t;
