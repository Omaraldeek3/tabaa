import { crescentPath, dotField, doubleFrame, lantern, starPath, starTile } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "tags-eidiyya",
  category: "tags",
  lang: "ar",
  title: { ar: "بطاقة العيدية للأطفال", en: "Eid money card for children" },
  note: { ar: "بطاقة تُلفّ عليها العيدية أو تُعلّق على الظرف: فانوس معلّق وهلال ونجوم، و«عيديّتك» بخط مرح، ومربّع للمبلغ واسم الطفل.", en: "A card to wrap Eid money in or hang on the envelope: a hanging lantern, crescent and stars, the word for Eid money in playful type, and a box for the amount and the child's name." },
  tags: ["عيدية", "عيد", "أطفال", "فانوس", "هلال", "eidiyya"],
  sizes: [more.tag, more.tagS],
  palettes: [
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.gold, inks.rose, inks.sky),
    pal("candy", "حلوى", "Candy", inks.blush, inks.burgundy, inks.orange, inks.teal, inks.ivory),
    pal("green", "أخضر", "Green", inks.oliveDark, inks.ivory, inks.mustard, inks.rose, inks.sage),
  ],
  fonts: ["marhey", "lalezar", "rakkas"],
  fields: [
    tf("title", "العنوان", "Title", "عيديّتك", 10),
    tf("name", "الاسم", "Name", "لحبيبة قلبي جنى", 22),
    tf("amount", "المبلغ", "Amount", "٥٠ شيكل", 10),
    tf("from", "من", "From", "من عمّو أبو سعيد", 22),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, u, cx } = dims(ctx, 55, 90), s = u;
    return scene(W, H, p.paper,
      starTile(0, 0, W, H, 7 * s, 1 * s, p.accent, 0.08),
      dotField(0, H * 0.75, W, H * 0.25, 2.6 * s, 0.4 * s, p.accent, { fade: "up", opacity: 0.5 }),
      circle(cx, 6 * s, 2.4 * s, { fill: null, stroke: p.soft, strokeWidth: 0.5 * s }),
      rect(W * 0.3 - 0.15 * s, 9 * s, 0.3 * s, 6 * s, { fill: p.accent }),
      g({ x: W * 0.3, y: 15 * s }, lantern(20 * s, p.accent, p.accent2)),
      g({ x: W * 0.72, y: 18 * s, rotate: -30 }, path(crescentPath(6 * s, 0.42), { fill: p.accent })),
      [[0.82, 30, 1.6], [0.6, 12, 1.1], [0.88, 10, 1]].map(([x, y, r]) => g({ x: W * x, y: y * s }, path(starPath(5, r * s, r * 0.42 * s), { fill: p.soft }))),
      line(val(ctx, "title"), cx, 50 * s, 11 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 10 * s }),
      line(val(ctx, "name"), cx, 57 * s, 3.4 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: W - 10 * s }),
      val(ctx, "amount") ? rect(cx - 15 * s, 61 * s, 30 * s, 11 * s, { fill: null, stroke: p.accent, strokeWidth: 0.5 * s, r: 1.4 * s }) : null,
      line(val(ctx, "amount"), cx, 68.6 * s, 5.4 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: 26 * s }),
      line(val(ctx, "from"), cx, 80 * s, 3 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: W - 10 * s }),
      doubleFrame(2.6 * s, 2.6 * s, W - 5.2 * s, H - 5.2 * s, p.accent, p.paper, { gap: 1.4 * s, heavy: 0.35 * s, thin: 0.15 * s, corner: "star", r: 1.8 * s }),
    );
  },
};
export default t;
