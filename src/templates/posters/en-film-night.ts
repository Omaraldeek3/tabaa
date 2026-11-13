import { crescentPath, jerusalem, starPath } from "../../lib/motifs/index.ts";
import { type SceneNode, g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-en-film-night",
  category: "posters",
  lang: "en",
  title: { ar: "بوستر إنجليزي لعرض فيلم", en: "English film screening poster" },
  note: { ar: "بوستر بالإنجليزية لعروض الأفلام وأمسيات التضامن في الخارج: مخروط ضوء من جهاز العرض فوق أفق المدينة.", en: "An English poster for film screenings and solidarity evenings abroad: a projector beam falling over the city skyline." },
  tags: ["film", "screening", "english", "event", "poster", "فيلم", "عرض", "إنجليزي"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("reel", "بكرة", "Reel", inks.night, inks.ivory, inks.mustard, inks.red, inks.navy),
    pal("ember", "جمر", "Ember", inks.charcoal, inks.paper, inks.orange, inks.red, inks.black),
    pal("olive", "زيتون", "Olive", inks.oliveDark, inks.ivory, inks.mustard, inks.terracotta, inks.black),
  ],
  fonts: ["playfairdisplay", "inter"],
  fields: [
    { id: "kicker", kind: "text", label: { ar: "السطر العلوي", en: "Kicker" }, sample: "PALESTINE FILM NIGHTS" },
    { id: "title", kind: "multiline", label: { ar: "العنوان", en: "Title" }, sample: "Stories from\nthe Olive Hills", maxLines: 2 },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "FRIDAY 20 AUGUST · 8 PM" },
    { id: "place", kind: "text", label: { ar: "المكان", en: "Place" }, sample: "Community Hall, 14 Mill Street" },
    { id: "details", kind: "multiline", label: { ar: "التفاصيل", en: "Details" }, sample: "Three short films with English subtitles\nFree entry · tea and maamoul after the screening", maxLines: 3 },
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, v, s } = dims(ctx, 297, 420), m = 24 * s, max = W - 2 * m, skyH = 80 * v, skyY = H - skyH - 96 * v;
    const stars: SceneNode[] = [[0.1, 0.1, 1], [0.3, 0.06, 0.7], [0.5, 0.14, 0.6], [0.66, 0.05, 0.9], [0.9, 0.1, 0.7], [0.06, 0.3, 0.6]].map(([x, y, r]) => g({ x: x * W, y: y * H }, path(starPath(4, r * 3 * s, r * 0.85 * s), { fill: p.accent, opacity: 0.8 })));
    return scene(W, H, p.paper,
      path(`M${W + b} ${-b} L${W * 0.02} ${skyY + skyH * 0.5} L${W * 0.74} ${skyY + skyH * 0.5} Z`, { fill: p.accent, opacity: 0.16 }),
      stars, g({ x: W * 0.84, y: 54 * v, rotate: 200 }, path(crescentPath(16 * s, 0.5), { fill: p.accent })),
      line(val(ctx, "kicker"), m, 96 * v, 8.6 * s, { font: "inter", weight: 700, fill: p.accent, align: "start", tracking: 1.6 * s, maxWidth: max }),
      stack(linesOf(val(ctx, "title"), 2), m, 142 * v, 39 * s, 46 * v, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: max }),
      rect(m, 204 * v, 44 * s, 2 * s, { fill: p.accent2 }),
      g({ x: -b, y: skyY }, jerusalem(W + 2 * b, skyH, p.soft, p.accent, p.paper)),
      rect(-b, skyY + skyH - 0.5, W + 2 * b, H - skyY - skyH + b + 0.5, { fill: p.soft }),
      line(val(ctx, "date"), m, H - 68 * v, 12 * s, { font: "inter", weight: 800, fill: p.accent, align: "start", tracking: 0.8 * s, maxWidth: max }),
      line(joined(ctx, ["place"]), m, H - 52 * v, 12.5 * s, { font: "playfairdisplay", weight: 600, fill: inks.ivory, align: "start", maxWidth: max }),
      stack(linesOf(val(ctx, "details"), 3), m, H - 38 * v, 7.6 * s, 10.5 * v, { font: "inter", weight: 400, fill: inks.ivory, align: "start", maxWidth: max }),
    );
  },
};
export default t;
