import { tiberiasLake } from "../../lib/motifs/index.ts";
import { cityPrint } from "../city-kit.ts";
import { inks, pal } from "../kit.ts";

export default cityPrint({
  slug: "tiberias", ar: "طبريا", en: "Tiberias",
  noteAr: "البحيرة محاطة بالتلال، ونخلة على الشاطئ وقارب صغير، في شريط عريض.",
  noteEn: "The lake held between hills, a palm on the shore and a small boat, in a wide band.",
  tags: ["بحيرة", "نخلة", "الجليل"],
  nick: "بحيرة طبريا", line: "بين الجبال بحيرة ونخلة", coords: "32.79° N · 35.53° E",
  layout: "band",
  palettes: [
    pal("lake", "بحيرة", "Lake", inks.ivory, inks.navy, inks.teal, inks.sand, inks.grey),
    pal("sunset", "غروب", "Sunset", inks.paper, inks.black, inks.orange, inks.blush, inks.grey),
    pal("green", "أخضر", "Green", inks.ivory, inks.oliveDark, inks.sky, inks.sage, inks.grey),
  ],
  fonts: ["reemkufi", "lalezar", "arefruqaa"],
  draw: (w, h, p) => tiberiasLake(w, h, inks.olive, p.accent, inks.oliveDark),
});
