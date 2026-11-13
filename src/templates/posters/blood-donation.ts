import { dropPath, heartbeat } from "../../lib/motifs/index.ts";
import { g, path, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-blood-donation",
  category: "posters",
  lang: "ar",
  title: { ar: "بوستر حملة التبرّع بالدم", en: "Blood donation drive poster" },
  note: { ar: "قطرة دم ضخمة يعبرها خطّ نبض القلب من طرف البوستر إلى طرفه، والدعوة بخط عريض. لحملات المستشفيات والجامعات.", en: "A huge drop of blood crossed edge to edge by a heartbeat line, with the call to give in heavy type. For hospital and campus drives." },
  tags: ["تبرع بالدم", "دم", "صحة", "حملة", "مستشفى", "blood", "donate"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("red", "أحمر", "Red", inks.white, inks.black, inks.red, inks.black, inks.white),
    pal("cream", "قشدي", "Cream", inks.ivory, inks.burgundy, inks.red, inks.burgundy, inks.ivory),
    pal("dark", "داكن", "Dark", inks.charcoal, inks.ivory, inks.red, inks.ivory, inks.white),
  ],
  fonts: ["lalezar", "kufam", "cairo"],
  fields: [
    tf("title", "العنوان", "Title", "قطرة منك حياة", 18),
    tf("sub", "النوع", "Kind", "حملة التبرّع بالدم"),
    tf("date", "التاريخ", "Date", "الاثنين والثلاثاء ٧–٨ نيسان"),
    tf("time", "الوقت", "Time", "من ٩ صباحاً حتى ٣ عصراً"),
    tf("venue", "المكان", "Venue", "ساحة الجامعة العربية الأمريكية، جنين"),
    tf("with", "بالتعاون مع", "Partner", "بالتعاون مع بنك الدم المركزي"),
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 297, 420), max = W - 40 * s, dh = Math.min(H * 0.46, W * 1.05), dy = H * 0.42;
    return scene(W, H, p.paper,
      g({ x: cx, y: dy }, path(dropPath(dh), { fill: p.accent })),
      g({ x: -b, y: dy + dh * 0.3 }, path(heartbeat(W + 2 * b, dh * 0.16), { fill: null, stroke: p.accent2, strokeWidth: 3 * s })),
      line(val(ctx, "sub"), cx, 40 * s, 11 * s, { font: "tajawal", weight: 800, fill: p.accent, maxWidth: max }),
      line(val(ctx, "title"), cx, dy + dh * 0.1, 30 * s, { font: ctx.font, weight: 700, fill: p.soft, maxWidth: dh * 0.5 }),
      line(val(ctx, "date"), cx, H - 74 * s, 12 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["time"]), cx, H - 56 * s, 8 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "venue"), cx, H - 42 * s, 8 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      line(val(ctx, "with"), cx, H - 20 * s, 6.4 * s, { font: "tajawal", weight: 700, fill: p.accent, maxWidth: max }),
    );
  },
};
export default t;
