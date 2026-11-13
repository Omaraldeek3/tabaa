import { suitcase } from "../../lib/motifs/index.ts";
import { g, path, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "occasions-welcome-home",
  category: "occasions",
  lang: "ar",
  title: { ar: "دعوة «الحمد لله على السلامة»", en: "Welcome home invitation" },
  note: { ar: "حقيبة سفر بملصقات المطارات لاستقبال مغترب عائد أو حاجّة أو طالب أنهى دراسته في الخارج.", en: "A suitcase covered in travel stickers, to welcome back an expat, a pilgrim, or a student home from abroad." },
  tags: ["استقبال", "عودة", "مغترب", "سلامة", "سفر", "welcome home"],
  sizes: [sizes.a6, sizes.square12],
  palettes: [
    pal("sunny", "مشمس", "Sunny", inks.ivory, inks.navy, inks.orange, inks.teal, inks.mustard),
    pal("teal", "فيروزي", "Teal", inks.teal, inks.ivory, inks.terracotta, inks.mustard, inks.ivory),
    pal("kraft", "كرافت", "Kraft", inks.sand, inks.black, inks.red, inks.navy, inks.ivory),
  ],
  fonts: ["lalezar", "marhey", "rakkas"],
  fields: [
    tf("title", "العنوان", "Title", "الحمد لله على السلامة", 24),
    tf("name", "الاسم", "Name", "أبو إياد", 20),
    tf("lead", "السطر", "Line", "رجع لنا بعد ١٢ سنة غربة في الخليج"),
    tf("invite", "الدعوة", "Invitation", "أهلاً وسهلاً بكم على سهرة الاستقبال"),
    tf("date", "التاريخ", "Date", "الأحد ٤ آب"),
    tf("place", "المكان", "Place", "بيت العائلة، سلفيت"),
  ],
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 105, 148), max = W - 16 * s, sw = Math.min(W * 0.46, H * 0.3), sy = H * 0.5;
    return scene(W, H, p.paper,
      path(`M${8 * s} ${sy + 1 * s} H${W - 8 * s}`, { fill: null, stroke: p.ink, strokeWidth: 0.4 * s }),
      g({ x: cx, y: sy }, suitcase(sw, p.accent, p.ink, p.accent2, p.soft)),
      line(val(ctx, "title"), cx, 9 + 10 * s, 9 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line(val(ctx, "name"), cx, sy + 15 * s, 11 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "lead"), cx, sy + 24 * s, 4 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "invite"), cx, sy + 32 * s, 3.8 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["date", "place"]), cx, Math.min(H - 7 - 2 * s, sy + 42 * s), 4.2 * s, { font: "tajawal", weight: 800, fill: p.accent2 === inks.mustard ? p.ink : p.accent2, maxWidth: max }),
    );
  },
};
export default t;
