import { bethlehemBells } from "../../lib/motifs/index.ts";
import { cityPrint } from "../city-kit.ts";
import { inks, pal } from "../kit.ts";

export default cityPrint({
  slug: "bethlehem", ar: "بيت لحم", en: "Bethlehem",
  noteAr: "برج أجراس بثلاثة أقواس وثلاثة أجراس، وباب صغير منخفض كباب التواضع، داخل قوس كبير.",
  noteEn: "A belfry of three arches with three bells and a small low door like the Door of Humility, inside a big arch.",
  tags: ["أجراس", "المهد", "كنيسة"],
  nick: "مدينة المهد", line: "وتقرع الأجراس للسلام", coords: "31.70° N · 35.20° E",
  layout: "arch",
  palettes: [
    pal("stone", "حجر", "Stone", inks.ivory, inks.black, inks.black, inks.sky, inks.goldDeep),
    pal("wine", "خمري", "Wine", inks.paper, inks.burgundy, inks.black, inks.blush, inks.goldDeep),
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.black, inks.navy, inks.gold),
  ],
  fonts: ["arefruqaa", "amiri", "reemkufi"],
  draw: (w, h) => bethlehemBells(w, h, inks.sand, inks.goldDeep, inks.charcoal),
});
