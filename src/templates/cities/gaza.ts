import { gazaBoats } from "../../lib/motifs/index.ts";
import { cityPrint } from "../city-kit.ts";
import { inks, pal } from "../kit.ts";

export default cityPrint({
  slug: "gaza", ar: "غزة", en: "Gaza",
  noteAr: "مراكب الصيّادين بأشرعتها المثلّثة على بحر غزة والشمس واطئة خلفها، في شريط عريض.",
  noteEn: "Fishing boats with lateen sails on the sea at Gaza and a low sun behind them, in a wide band.",
  tags: ["بحر", "صيادين", "مراكب"],
  nick: "غزّة هاشم", line: "على شاطئ غزّة مراكب الصيّادين والشمس", coords: "31.50° N · 34.47° E",
  layout: "band",
  palettes: [
    pal("sun", "شمس", "Sun", inks.ivory, inks.navy, inks.sky, inks.sky, inks.grey),
    pal("red", "أحمر", "Red", inks.paper, inks.black, inks.red, inks.burgundy, inks.grey),
    pal("teal", "فيروزي", "Teal", inks.sand, inks.black, inks.teal, inks.teal, inks.grey),
  ],
  fonts: ["lalezar", "reemkufi", "rakkas"],
  draw: (w, h) => gazaBoats(w, h, inks.orange, inks.ivory, inks.black, inks.navy),
});
