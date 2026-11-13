import { sheep } from "../../lib/motifs/index.ts";
import { g, path, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "occasions-aqiqa",
  category: "occasions",
  lang: "ar",
  title: { ar: "دعوة عقيقة المولود", en: "Aqiqa dinner invitation" },
  note: { ar: "خروفان على تلّة خضراء فوق دعوة غداء العقيقة، باسم المولود في الوسط. بسيطة ومفرحة.", en: "Two sheep on a green hill above the aqiqa lunch invitation, with the baby's name in the middle. Simple and cheerful." },
  tags: ["عقيقة", "مولود", "خروف", "غداء", "ذبيحة", "aqiqa", "newborn"],
  sizes: [sizes.a6, sizes.a5, sizes.square12],
  palettes: [
    pal("meadow", "مرج", "Meadow", inks.ivory, inks.oliveDark, inks.olive, inks.sage, inks.white),
    pal("sky", "سماء", "Sky", inks.sky, inks.navy, inks.olive, inks.oliveDark, inks.white),
    pal("sand", "رمل", "Sand", inks.paper, inks.black, inks.goldDeep, inks.sand, inks.ivory),
  ],
  fonts: ["rakkas", "lalezar", "arefruqaa"],
  fields: [
    tf("opening", "الافتتاح", "Opening", "بسم الله الرحمن الرحيم"),
    tf("host", "الداعي", "Host", "يتشرّف أبو المجد وعائلته بدعوتكم"),
    tf("lead", "المناسبة", "Occasion", "لتناول طعام الغداء بمناسبة عقيقة المولود"),
    tf("name", "اسم المولود", "Baby's name", "مجد", 18),
    tf("date", "التاريخ", "Date", "الجمعة ١٢ آذار، بعد صلاة الجمعة"),
    tf("venue", "المكان", "Venue", "ديوان العائلة، قباطية"),
    tf("prayer", "الدعاء", "Blessing", "جعله الله من مواليد السعادة"),
  ],
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 105, 148), max = W - 16 * s, hill = H * 0.36, sw = Math.min(W * 0.32, H * 0.2);
    const Y = (k: number) => hill + 12 * s + (H - 7 - 4 * s - hill - 12 * s) * k;
    return scene(W, H, p.paper,
      path(`M${-b} ${hill} Q${W * 0.3} ${hill - H * 0.12} ${W * 0.6} ${hill - H * 0.06} T${W + b} ${hill - H * 0.04} V${hill + 4 * s} H${-b} Z`, { fill: p.accent }),
      g({ x: W * 0.36, y: hill - H * 0.075 }, sheep(sw, p.soft, p.ink)),
      g({ x: W * 0.66, y: hill - H * 0.06, scaleX: -1 }, sheep(sw * 0.8, p.soft, p.ink)),
      line(val(ctx, "opening"), cx, 8 + 4 * s, 3.8 * s, { font: "amiri", fill: p.ink, maxWidth: max * 0.7 }),
      line(val(ctx, "host"), cx, Y(0), 4.2 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "lead"), cx, Y(0.13), 4 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      line(val(ctx, "name"), cx, Y(0.42), 15 * s, { font: ctx.font, weight: 700, fill: p.accent === inks.goldDeep ? p.accent : p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, Y(0.6), 4.2 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: max }),
      line(val(ctx, "venue"), cx, Y(0.73), 4 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      line(val(ctx, "prayer"), cx, Y(1), 4.2 * s, { font: "amiri", fill: p.accent2 === inks.sand ? p.accent : p.accent2, maxWidth: max }),
    );
  },
};
export default t;
