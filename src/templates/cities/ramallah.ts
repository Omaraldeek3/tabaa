import { ramallahManara } from "../../lib/motifs/index.ts";
import { cityPrint } from "../city-kit.ts";
import { inks, pal } from "../kit.ts";

export default cityPrint({
  slug: "ramallah", ar: "رام الله", en: "Ramallah",
  noteAr: "عمود دوّار المنارة بين بيوت الحجر بقرميدها الأحمر على تلال المدينة.",
  noteEn: "The Al-Manara column among stone houses with red-tiled roofs on the hills of the city.",
  tags: ["المنارة", "تلال", "قرميد"],
  nick: "عروس المصايف", line: "على دوّار المنارة نلتقي", coords: "31.90° N · 35.20° E",
  layout: "bottom",
  palettes: [
    pal("hills", "تلال", "Hills", inks.ivory, inks.black, inks.sand, inks.olive, inks.grey),
    pal("tile", "قرميد", "Tile", inks.paper, inks.black, inks.sand, inks.terracotta, inks.grey),
    pal("cool", "بارد", "Cool", inks.sky, inks.navy, inks.ivory, inks.teal, inks.navy),
  ],
  fonts: ["lalezar", "kufam", "rakkas"],
  draw: (w, h, p) => ramallahManara(w, h, p.accent, inks.terracotta, p.accent2),
});
