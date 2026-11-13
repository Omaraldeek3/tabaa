import { jaffaClock } from "../../lib/motifs/index.ts";
import { cityPrint } from "../city-kit.ts";
import { inks, pal } from "../kit.ts";

export default cityPrint({
  slug: "jaffa", ar: "يافا", en: "Jaffa",
  noteAr: "برج الساعة العثماني على واجهة يافا البحرية والموج تحته، بألوان البرتقال والبحر.",
  noteEn: "The Ottoman clock tower on the Jaffa sea front with the waves below, in orange and sea colours.",
  tags: ["بحر", "برتقال", "برج الساعة"],
  nick: "عروس البحر", line: "يا بحر يافا خبّر البيّارات أنّا راجعون", coords: "32.05° N · 34.75° E",
  layout: "top",
  palettes: [
    pal("sea", "بحري", "Sea", inks.ivory, inks.navy, inks.orange, inks.teal, inks.grey),
    pal("orange", "برتقالي", "Orange", inks.orange, inks.black, inks.ivory, inks.navy, inks.black),
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.mustard, inks.teal, inks.sky),
  ],
  fonts: ["lalezar", "rakkas", "reemkufi"],
  draw: (w, h, p) => jaffaClock(w, h, p.paper === inks.night ? inks.sand : p.ink, p.accent, p.accent2),
});
