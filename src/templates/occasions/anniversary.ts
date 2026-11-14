import { dotField, doubleFrame, rings, ringsNode } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "occasions-anniversary",
  category: "occasions",
  lang: "ar",
  title: { ar: "دعوة ذكرى الزواج", en: "Wedding anniversary invitation" },
  note: { ar: "عدد السنين برقم عملاق يملأ نصف الورقة، وخاتمان صغيران في زاويته. للذكرى الفضية والذهبية وما بينهما.", en: "The number of years as a giant numeral filling half the card, with two small rings at its corner. For silver, golden and every year between." },
  tags: ["ذكرى زواج", "عيد زواج", "فضية", "ذهبية", "سنوات", "anniversary"],
  sizes: [sizes.a6, sizes.a5, sizes.square12],
  palettes: [
    pal("silver", "فضّي", "Silver", inks.ivory, inks.navy, inks.grey, inks.navy, inks.sand),
    pal("gold", "ذهبي", "Gold", inks.charcoal, inks.ivory, inks.gold, inks.goldDeep, inks.ivory),
    pal("ruby", "ياقوتي", "Ruby", inks.blush, inks.burgundy, inks.red, inks.burgundy, inks.ivory),
  ],
  fonts: ["rakkas", "lalezar", "reemkufi"],
  fields: [
    tf("years", "عدد السنين", "Years", "٢٥", 3),
    tf("title", "العنوان", "Title", "عاماً من المودّة والرحمة", 30),
    tf("names", "الزوجان", "Couple", "أبو رامي وأم رامي", 30),
    tf("invite", "الدعوة", "Invitation", "يدعوكم الأبناء والأحفاد للاحتفال معهما"),
    tf("date", "التاريخ", "Date", "السبت ١٠ تشرين الأول"),
    tf("time", "الوقت", "Time", "الثامنة مساءً"),
    tf("venue", "المكان", "Venue", "مطعم الكرمة، بيت ساحور"),
  ],
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 105, 148), max = W - 16 * s, ny = H * 0.5;
    const z = Math.min(W, H) / 105;
    return scene(W, H, p.paper,
      g({ x: W * 0.47, y: H * 0.3, opacity: 0.18 }, ringsNode(30 * z, 46 * z, 5, p.accent2, 0.3 * z)),
      dotField(0, H * 0.7, W, H * 0.3, 4 * z, 0.4 * z, p.accent, { fade: "up", opacity: 0.25 }),
      line(val(ctx, "years"), cx, ny, Math.min(H * 0.42, W * 0.62), { font: ctx.font, weight: 700, fill: p.accent, maxWidth: W - 14 * s }),
      g({ x: cx + W * 0.3, y: ny - H * 0.3 }, rings(14 * s, p.accent2)),
      rect(cx - 18 * s, ny + 4 * s, 36 * s, 0.5 * s, { fill: p.ink }),
      line(val(ctx, "title"), cx, ny + 13 * s, 6 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "names"), cx, ny + 24 * s, 7.4 * s, { font: "amiri", weight: 700, fill: p.accent2 === inks.navy ? p.ink : p.accent, maxWidth: max }),
      line(val(ctx, "invite"), cx, ny + 33 * s, 3.8 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, ny + 41 * s, 4.4 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, Math.min(H - 7 - 2 * s, ny + 48 * s), 3.8 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
doubleFrame(6 * z, 6 * z, W - 12 * z, H - 12 * z, p.accent, p.paper, { gap: 2 * z, heavy: 0.4 * z, thin: 0.15 * z, corner: "dot", r: 2.2 * z }),
    );
  },
};
export default t;
