import { burstLines, dabkeLine, doubleFrame, starTile, tatreezBand } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-dabke-festival",
  category: "posters",
  lang: "ar",
  title: { ar: "بوستر مهرجان الدبكة", en: "Dabke festival poster" },
  note: { ar: "صفّ من الدبّيكة متشابكي الأيدي، واحد ضارب برجله وواحد واقف، فوق شريط تطريز، وعنوان عريض فوقهم.", en: "A line of dabke dancers hand in hand, every other one kicking, above a tatreez band, with a heavy title over them." },
  tags: ["دبكة", "مهرجان", "فلكلور", "تراث", "رقص", "dabke", "festival"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("red", "أحمر", "Red", inks.red, inks.ivory, inks.black, inks.ivory, inks.mustard),
    pal("sun", "شمس", "Sun", inks.mustard, inks.black, inks.black, inks.red, inks.red),
    pal("olive", "زيتي", "Olive", inks.ivory, inks.oliveDark, inks.oliveDark, inks.red, inks.red),
  ],
  fonts: ["lalezar", "rakkas", "jomhuria"],
  fields: [
    tf("kicker", "سطر علوي", "Kicker", "الدورة الثالثة"),
    tf("title", "العنوان", "Title", "مهرجان الدبكة", 16),
    tf("sub", "الشعار", "Slogan", "على دلعونا وعلى دلعونا"),
    tf("bands", "الفرق", "Troupes", "بمشاركة ٨ فرق من مدن الضفة والداخل"),
    tf("date", "التاريخ", "Date", "٢٢–٢٤ آب"),
    tf("venue", "المكان", "Venue", "مدرّج سبسطية الأثري"),
    tf("organiser", "المنظّم", "Organiser", "جمعية الفنون الشعبية"),
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 297, 420), max = W - 36 * s, floor = H * 0.68, dh = H * 0.24;
    const z = Math.min(W, H) / 297;
    return scene(W, H, p.paper,
      starTile(0, 0, W, H, 18 * z, 2.4 * z, p.paper, 0.06),
      g({ x: W / 2, y: H * 0.45, opacity: 0.12 }, burstLines(72, 40 * z, W, p.paper, 0.8 * z)),
      line(val(ctx, "kicker"), cx, 38 * s, 9 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: max }),
      line(val(ctx, "title"), cx, 112 * s, 62 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "sub"), cx, 148 * s, 13 * s, { font: "arefruqaa", weight: 700, fill: p.accent2, maxWidth: max }),
      g({ x: 14 * s, y: floor }, dabkeLine(7, W - 28 * s, dh, p.accent, p.soft)),
      rect(-b, floor + 2 * s, W + 2 * b, 1.4 * s, { fill: p.accent }),
      g({ x: -b, y: floor + 6 * s }, tatreezBand("chain", W + 2 * b, 12 * s, [p.accent, p.soft])),
      line(val(ctx, "bands"), cx, floor + 38 * s, 8 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["date", "venue"], "  ·  "), cx, floor + 58 * s, 12 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "organiser"), cx, H - 22 * s, 7 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
      doubleFrame(10 * z, 10 * z, W - 20 * z, H - 20 * z, p.paper, p.accent, { gap: 3 * z, heavy: 0.8 * z, thin: 0.3 * z, corner: "khatam", r: 4 * z }),
    );
  },
};
export default t;
