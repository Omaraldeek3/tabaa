import { archPath, tatreezBand } from "../../lib/motifs/index.ts";
import { g, path, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "programmes-table-number",
  category: "programmes",
  lang: "ar",
  title: { ar: "رقم طاولة بقوس وتطريز", en: "Table number in an arch with tatreez" },
  note: { ar: "رقم الطاولة كبيراً داخل قوس، وشريط تطريز تحت قاعدته، و«طاولة» فوقه وسطر للعائلة. يطبع على الكرتون ويقف على حامل في قاعات الأعراس.", en: "The table number large inside an arch with a tatreez band at its foot, the word table above and a line for the family. Printed on card for a stand in wedding halls." },
  tags: ["رقم طاولة", "عرس", "قاعة", "طاولة", "تنظيم", "table number"],
  sizes: [sizes.a6, sizes.square12, sizes.a5],
  palettes: [
    pal("red", "أحمر", "Red", inks.ivory, inks.black, inks.red, inks.olive, inks.sand),
    pal("gold", "ذهبي", "Gold", inks.charcoal, inks.ivory, inks.gold, inks.goldDeep, inks.grey),
    pal("sage", "مريمي", "Sage", inks.white, inks.oliveDark, inks.olive, inks.rose, inks.sage),
  ],
  fonts: ["arefruqaa", "rakkas", "reemkufi"],
  fields: [
    tf("label", "الكلمة", "Word", "طاولة", 10),
    tf("number", "الرقم", "Number", "٧", 3),
    tf("guests", "المدعوون", "Guests", "عائلة العريس · الأعمام", 28),
  ],
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 105, 148), m = 12 * s, aw = W - 2 * m, ah = H - 2 * m - 10 * s;
    return scene(W, H, p.paper,
      g({ x: m, y: m }, path(archPath(aw, ah, 0.5), { fill: null, stroke: p.accent, strokeWidth: 0.8 * s })),
      g({ x: m, y: m + ah - 7 * s }, tatreezBand("trees", aw, 7 * s, [p.accent2, p.accent])),
      line(val(ctx, "label"), cx, m + aw * 0.42, 9 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: aw * 0.7 }),
      line(val(ctx, "number"), cx, m + ah * 0.7, Math.min(aw * 0.62, ah * 0.42), { font: ctx.font, weight: 700, fill: p.ink, maxWidth: aw * 0.7 }),
      line(val(ctx, "guests"), cx, H - 7 - 4 * s, 4 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: W - 16 * s }),
    );
  },
};
export default t;
