import { damascusGate } from "../../lib/motifs/index.ts";
import { cityPrint } from "../city-kit.ts";
import { inks, pal } from "../kit.ts";

export default cityPrint({
  slug: "jerusalem-gate", ar: "القدس", en: "Jerusalem",
  noteAr: "باب العامود بأسواره المسنّنة وقوسه المدبّب داخل قوس كبير كأنه نافذة على البلدة القديمة.",
  noteEn: "Damascus Gate with its crenellations and pointed arch, framed inside a big arch like a window onto the Old City.",
  tags: ["باب العامود", "البلدة القديمة", "أسوار"],
  nick: "باب العامود", line: "مررنا على دار الحبيب فردّنا", coords: "31.78° N · 35.23° E",
  layout: "arch",
  palettes: [
    pal("stone", "حجر", "Stone", inks.ivory, inks.black, inks.black, inks.sky, inks.goldDeep),
    pal("gold", "ذهبي", "Gold", inks.charcoal, inks.ivory, inks.black, inks.gold, inks.gold),
    pal("rose", "وردي", "Rose", inks.ivory, inks.navy, inks.navy, inks.blush, inks.goldDeep),
  ],
  fonts: ["arefruqaa", "amiri", "reemkufi"],
  draw: (w, h, p) => damascusGate(w, h, inks.sand, p.accent),
});
