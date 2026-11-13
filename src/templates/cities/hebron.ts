import { hebronGlass } from "../../lib/motifs/index.ts";
import { cityPrint } from "../city-kit.ts";
import { inks, pal } from "../kit.ts";

export default cityPrint({
  slug: "hebron", ar: "الخليل", en: "Hebron",
  noteAr: "آنية من زجاج الخليل الأزرق المنفوخ وعنقود عنب من كروم المدينة.",
  noteEn: "Blown Hebron glass in blue and a bunch of grapes from the vineyards of the city.",
  tags: ["زجاج", "عنب", "كروم"],
  nick: "خليل الرحمن", line: "زجاجٌ أزرق وعنبٌ يكفي الدنيا", coords: "31.53° N · 35.10° E",
  layout: "top",
  palettes: [
    pal("glass", "زجاج", "Glass", inks.ivory, inks.navy, inks.teal, inks.sky, inks.grey),
    pal("vine", "كرمة", "Vine", inks.paper, inks.oliveDark, inks.navy, inks.olive, inks.grey),
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.sky, inks.teal, inks.sky),
  ],
  fonts: ["rakkas", "lalezar", "reemkufi"],
  draw: (w, h, p) => hebronGlass(w, h, p.accent, p.accent2, inks.burgundy, inks.olive),
});
