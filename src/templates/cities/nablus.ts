import { nablusValley } from "../../lib/motifs/index.ts";
import { cityPrint } from "../city-kit.ts";
import { inks, pal } from "../kit.ts";

export default cityPrint({
  slug: "nablus", ar: "نابلس", en: "Nablus",
  noteAr: "المدينة في الوادي بين جبلي جرزيم وعيبال، وألواح صابون نابلسي مكدّسة في المقدّمة.",
  noteEn: "The city in the valley between Mount Gerizim and Mount Ebal, with bars of Nabulsi soap stacked in front.",
  tags: ["جبل النار", "صابون", "كنافة"],
  nick: "جبل النار", line: "بين جرزيم وعيبال تنام المدينة", coords: "32.22° N · 35.26° E",
  layout: "bottom",
  palettes: [
    pal("olive", "زيتي", "Olive", inks.ivory, inks.black, inks.olive, inks.oliveDark, inks.grey),
    pal("fire", "نار", "Fire", inks.paper, inks.black, inks.terracotta, inks.burgundy, inks.grey),
    pal("dusk", "غسق", "Dusk", inks.sand, inks.navy, inks.navy, inks.teal, inks.grey),
  ],
  fonts: ["lalezar", "rakkas", "jomhuria"],
  draw: (w, h, p) => nablusValley(w, h, p.accent, p.accent2, p.ink, inks.ivory),
});
