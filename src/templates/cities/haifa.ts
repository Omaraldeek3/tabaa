import { haifaCarmel } from "../../lib/motifs/index.ts";
import { cityPrint } from "../city-kit.ts";
import { inks, pal } from "../kit.ts";

export default cityPrint({
  slug: "haifa", ar: "حيفا", en: "Haifa",
  noteAr: "سفح الكرمل بمدرّجات حدائقه نازلاً إلى الميناء ورافعاته، والاسم كبير فوقه.",
  noteEn: "The slope of Mount Carmel with its terraced gardens running down to the port and its cranes, the name large above.",
  tags: ["كرمل", "ميناء"],
  nick: "عروس الكرمل", line: "على سفح الكرمل بيتٌ يطلّ على الميناء", coords: "32.79° N · 34.99° E",
  layout: "bottom",
  palettes: [
    pal("carmel", "كرمل", "Carmel", inks.ivory, inks.oliveDark, inks.olive, inks.teal, inks.sage),
    pal("dusk", "غسق", "Dusk", inks.sand, inks.black, inks.terracotta, inks.navy, inks.paper),
    pal("night", "ليل", "Night", inks.navy, inks.ivory, inks.sage, inks.sky, inks.olive),
  ],
  fonts: ["reemkufi", "lalezar", "rakkas"],
  draw: (w, h, p) => haifaCarmel(w, h, p.accent, p.soft, p.accent2),
});
