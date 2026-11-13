import { safadHill } from "../../lib/motifs/index.ts";
import { cityPrint } from "../city-kit.ts";
import { inks, pal } from "../kit.ts";

export default cityPrint({
  slug: "safad", ar: "صفد", en: "Safad",
  noteAr: "بلدة على رأس تلّة مخروطية، بيوتها الحجرية مكدّسة فوق بعضها بأبواب زرقاء.",
  noteEn: "A town on top of a cone of a hill, its stone houses stacked one above another with blue doors.",
  tags: ["جبل", "الجليل", "أبواب زرقاء"],
  nick: "مدينة الجبل", line: "صفد على راس الجبل والسماء أقرب", coords: "32.97° N · 35.50° E",
  layout: "arch",
  palettes: [
    pal("blue", "أزرق", "Blue", inks.ivory, inks.navy, inks.sky, inks.sand, inks.grey),
    pal("green", "أخضر", "Green", inks.paper, inks.oliveDark, inks.navy, inks.sage, inks.grey),
    pal("dusk", "غسق", "Dusk", inks.blush, inks.burgundy, inks.teal, inks.sand, inks.grey),
  ],
  fonts: ["arefruqaa", "rakkas", "reemkufi"],
  draw: (w, h, p) => safadHill(w, h, inks.olive, inks.ivory, p.accent),
});
