import { dotRing, kaaba } from "../../lib/motifs/index.ts";
import { g, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "greetings-adha-kaaba",
  category: "greetings",
  lang: "ar",
  title: { ar: "بطاقة عيد الأضحى بالكعبة والطواف", en: "Eid al-Adha card with the Kaaba" },
  note: { ar: "الكعبة بحزامها الذهبي تحيط بها حلقات من نقاط كالطائفين، لعيد الأضحى وموسم الحجّ.", en: "The Kaaba with its gold band, ringed by circles of dots like pilgrims circling it. For Eid al-Adha and the Hajj season." },
  tags: ["عيد الأضحى", "أضحى", "حج", "كعبة", "عيد", "مكة", "eid al-adha"],
  sizes: [sizes.a6, sizes.square12],
  palettes: [
    pal("sand", "رمل", "Sand", inks.paper, inks.black, inks.black, inks.goldDeep, inks.goldDeep),
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.charcoal, inks.gold, inks.gold),
    pal("teal", "فيروزي", "Teal", inks.teal, inks.ivory, inks.black, inks.gold, inks.ivory),
  ],
  fonts: ["arefruqaa", "reemkufi", "amiri"],
  fields: [
    tf("title", "العنوان", "Title", "عيد أضحى مبارك", 18),
    tf("line", "التهنئة", "Wish", "تقبّل الله منّا ومنكم صالح الأعمال"),
    tf("from", "من", "From", "أبو أحمد وعائلته"),
  ],
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 105, 148), max = W - 16 * s, kw = Math.min(W * 0.34, H * 0.24), cy = H * 0.4;
    return scene(W, H, p.paper,
      g({ x: cx, y: cy - kw * 0.3, scaleY: 0.42 }, dotRing(kw * 1.05, 44, 0.9 * s, p.soft), dotRing(kw * 1.3, 56, 0.75 * s, p.soft), dotRing(kw * 1.55, 68, 0.6 * s, p.soft)),
      g({ x: cx, y: cy + kw * 0.1 }, kaaba(kw * 1.4, p.accent, p.accent2, p.paper === inks.night ? inks.navy : inks.grey)),
      line(val(ctx, "title"), cx, cy + kw * 0.45 + 20 * s, 11 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "line"), cx, cy + kw * 0.45 + 30 * s, 4.2 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "from"), cx, H - 7 - 4 * s, 4 * s, { font: "tajawal", weight: 700, fill: p.accent2, maxWidth: max }),
    );
  },
};
export default t;
