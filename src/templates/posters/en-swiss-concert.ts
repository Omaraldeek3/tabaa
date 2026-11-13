import { circle, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-en-swiss-concert",
  category: "posters",
  lang: "en",
  title: { ar: "بوستر حفلة إنجليزي بالشبكة السويسرية", en: "Swiss grid concert poster" },
  note: { ar: "بوستر إنجليزي على الشبكة السويسرية: دوائر وأعمدة ملوّنة كإيقاع، عنوان ضخم مقطّع على أسطر، والتفاصيل في أعمدة صغيرة.", en: "An English poster on a Swiss grid: coloured circles and bars as rhythm, a huge title broken over lines, and the details in small columns." },
  tags: ["concert", "english", "swiss", "music", "grid", "حفلة", "إنجليزي", "موسيقى"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("primary", "أساسي", "Primary", inks.white, inks.black, inks.red, inks.navy, inks.mustard),
    pal("warm", "دافئ", "Warm", inks.paper, inks.black, inks.orange, inks.teal, inks.rose),
    pal("night", "ليل", "Night", inks.charcoal, inks.ivory, inks.mustard, inks.sky, inks.red),
  ],
  fonts: ["inter", "playfairdisplay"],
  fields: [
    tf("title1", "العنوان ١", "Title line 1", "SOUND", 9),
    tf("title2", "العنوان ٢", "Title line 2", "OF THE", 9),
    tf("title3", "العنوان ٣", "Title line 3", "COAST", 9),
    tf("artists", "الفنانون", "Artists", "Jazz trio from Haifa + guests"),
    tf("date", "التاريخ", "Date", "Sat 21.06.2027"),
    tf("time", "الوقت", "Time", "Doors 19:30"),
    tf("venue", "المكان", "Venue", "Old Port Warehouse"),
    tf("tickets", "التذاكر", "Tickets", "Tickets 60 ₪ at the door"),
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 297, 420), L = 18 * s, col = (W - 2 * L) / 6;
    const big = (v: string, y: number) => line(v, L, y, 54 * s, { font: ctx.font, weight: 800, fill: p.ink, align: "start", dir: "ltr", maxWidth: W - 2 * L, tracking: -1 * s });
    return scene(W, H, p.paper,
      circle(L + col * 4.4, 96 * s, col * 1.7, { fill: p.accent }),
      circle(L + col * 2.2, 140 * s, col * 0.9, { fill: p.accent2 }),
      rect(L + col * 5, -b, col * 0.5, 190 * s + b, { fill: p.soft }),
      rect(-b, 182 * s, W * 0.7 + b, 8 * s, { fill: p.ink }),
      big(val(ctx, "title1"), 240 * s), big(val(ctx, "title2"), 286 * s), big(val(ctx, "title3"), 332 * s),
      line(val(ctx, "artists"), L, 356 * s, 7 * s, { font: "inter", weight: 600, fill: p.ink, align: "start", dir: "ltr", maxWidth: W - 2 * L }),
      line(val(ctx, "date"), L, 384 * s, 6 * s, { font: "inter", weight: 800, fill: p.ink, align: "start", dir: "ltr", maxWidth: col * 1.9 }),
      line(val(ctx, "time"), L + col * 2, 384 * s, 6 * s, { font: "inter", weight: 500, fill: p.ink, align: "start", dir: "ltr", maxWidth: col * 1.9 }),
      line(val(ctx, "venue"), L + col * 4, 384 * s, 6 * s, { font: "inter", weight: 500, fill: p.ink, align: "start", dir: "ltr", maxWidth: col * 1.9 }),
      line(val(ctx, "tickets"), L, 398 * s, 5 * s, { font: "inter", weight: 500, fill: p.ink, align: "start", dir: "ltr", maxWidth: W - 2 * L }),
    );
  },
};
export default t;
