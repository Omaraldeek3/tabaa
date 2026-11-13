import { akkaWalls } from "../../lib/motifs/index.ts";
import { cityPrint } from "../city-kit.ts";
import { inks, pal } from "../kit.ts";

export default cityPrint({
  slug: "akka", ar: "عكا", en: "Akka",
  noteAr: "أسوار عكا البحرية المسنّنة والقبّة والمئذنة خلفها، والموج يضرب الصخر، في شريط عريض وسط اللوحة.",
  noteEn: "The crenellated sea walls of Akka with the dome and minaret behind them and waves on the rocks, in a wide band across the print.",
  tags: ["أسوار", "بحر", "الجزار"],
  nick: "ما بتخاف من هدير البحر", line: "يا خوف عكّا من هدير البحر", coords: "32.92° N · 35.07° E",
  layout: "band",
  palettes: [
    pal("stone", "حجر", "Stone", inks.ivory, inks.black, inks.sand, inks.teal, inks.grey),
    pal("sea", "بحر", "Sea", inks.paper, inks.navy, inks.sky, inks.navy, inks.grey),
    pal("sunset", "غروب", "Sunset", inks.blush, inks.burgundy, inks.terracotta, inks.orange, inks.burgundy),
  ],
  fonts: ["rakkas", "lalezar", "arefruqaa"],
  draw: (w, h, p) => akkaWalls(w, h, inks.sand, p.accent, p.ink),
});
