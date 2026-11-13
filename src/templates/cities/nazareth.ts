import { nazarethBasilica } from "../../lib/motifs/index.ts";
import { cityPrint } from "../city-kit.ts";
import { inks, pal } from "../kit.ts";

export default cityPrint({
  slug: "nazareth", ar: "الناصرة", en: "Nazareth",
  noteAr: "كنيسة البشارة بقبّتها المخروطية كالفانوس فوق واجهة مقوّسة.",
  noteEn: "The Basilica of the Annunciation with its lantern-like cone above an arcaded front.",
  tags: ["البشارة", "كنيسة", "الجليل"],
  nick: "مدينة البشارة", line: "في الناصرة قبّة تشبه فانوساً", coords: "32.70° N · 35.30° E",
  layout: "top",
  palettes: [
    pal("stone", "حجر", "Stone", inks.paper, inks.black, inks.sand, inks.teal, inks.grey),
    pal("blue", "أزرق", "Blue", inks.ivory, inks.navy, inks.sky, inks.navy, inks.grey),
    pal("olive", "زيتي", "Olive", inks.ivory, inks.oliveDark, inks.sand, inks.olive, inks.grey),
  ],
  fonts: ["reemkufi", "rakkas", "lalezar"],
  draw: (w, h, p) => nazarethBasilica(w, h, p.accent, p.accent2, p.paper),
});
