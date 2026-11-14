import { path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "programmes-en-table-number",
  category: "programmes",
  lang: "en",
  title: { ar: "رقم طاولة إنجليزي بالحروف", en: "Spelled-out table number" },
  note: { ar: "رقم طاولة إنجليزي بأسلوب عصري: الرقم مكتوباً بالحروف بخط سيريف، وإطار هندسي رفيع بزوايا مقطوعة، والرقم صغيراً في الأعلى.", en: "A modern English table number: the number spelled out in serif type, a fine geometric frame with clipped corners, and the figure small at the top." },
  tags: ["table number", "english", "wedding", "modern", "serif", "طاولة", "إنجليزي"],
  sizes: [sizes.a6, sizes.square12],
  palettes: [
    pal("white", "أبيض", "White", inks.white, inks.black, inks.goldDeep, inks.sage, inks.grey),
    pal("green", "أخضر", "Green", inks.oliveDark, inks.ivory, inks.gold, inks.sage, inks.sage),
    pal("terracotta", "فخّار", "Clay", inks.terracotta, inks.ivory, inks.ivory, inks.sand, inks.sand),
  ],
  fonts: ["playfairdisplay", "inter"],
  fields: [
    tf("figure", "الرقم", "Figure", "07", 3),
    tf("label", "الكلمة", "Label", "TABLE", 10),
    tf("word", "الرقم بالحروف", "Number in words", "Seven", 12),
    tf("names", "الضيوف", "Guests", "The Haddad family"),
  ],
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 105, 148), m = 9 * s, k = 7 * s;
    const frame = `M${m + k} ${m} H${W - m - k} L${W - m} ${m + k} V${H - m - k} L${W - m - k} ${H - m} H${m + k} L${m} ${H - m - k} V${m + k} Z`;
    return scene(W, H, p.paper,
      path(frame, { fill: null, stroke: p.accent, strokeWidth: 0.5 * s }),
      line(val(ctx, "figure"), cx, H * 0.26, 9 * s, { font: "inter", weight: 600, fill: p.accent, maxWidth: W * 0.4, tracking: 1 * s }),
      line(val(ctx, "label"), cx, H * 0.43, 6 * s, { font: "inter", weight: 600, fill: p.ink, maxWidth: W * 0.6, tracking: 2 * s }),
      line(val(ctx, "word"), cx, H * 0.6, Math.min(W, H) * 0.22, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 2 * m - 12 * s }),
      rect(cx - 8 * s, H * 0.68, 16 * s, 0.4 * s, { fill: p.accent2 }),
      line(val(ctx, "names"), cx, H * 0.76, 4.4 * s, { font: "playfairdisplay", fill: p.ink, maxWidth: W - 2 * m - 12 * s }),
    );
  },
};
export default t;
