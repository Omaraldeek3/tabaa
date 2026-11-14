import { dotField, doubleFrame, nurseryMobile, ringsNode } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "occasions-en-baby-shower",
  category: "occasions",
  lang: "en",
  title: { ar: "دعوة استقبال مولود بالإنجليزية", en: "Baby shower invitation" },
  note: { ar: "دعوة إنجليزية بلعبة معلّقة من نجوم وأهلّة وغيمة تتدلّى من أعلى الورقة. ناعمة وهادئة.", en: "An English invitation with a nursery mobile of stars, moons and a cloud hanging from the top of the card. Soft and calm." },
  tags: ["baby shower", "english", "newborn", "mobile", "stars", "مولود", "إنجليزي", "استقبال"],
  sizes: [sizes.a6, sizes.a5, sizes.square12],
  palettes: [
    pal("dream", "حلم", "Dream", inks.ivory, inks.navy, inks.mustard, inks.sky, inks.rose),
    pal("blush", "وردي", "Blush", inks.blush, inks.burgundy, inks.gold, inks.rose, inks.white),
    pal("sage", "مريمي", "Sage", inks.ivory, inks.oliveDark, inks.sage, inks.mustard, inks.sand),
  ],
  fonts: ["playfairdisplay", "inter"],
  fields: [
    tf("lead", "تمهيد", "Lead-in", "Please join us for a"),
    tf("title", "العنوان", "Title", "Baby Shower", 18),
    tf("honour", "على شرف", "Honouring", "honouring mum-to-be"),
    tf("name", "الاسم", "Name", "Dana Haddad", 24),
    tf("date", "التاريخ", "Date", "Sunday, 14 March"),
    tf("time", "الوقت", "Time", "3 pm"),
    tf("venue", "المكان", "Venue", "Lemon Tree Café, Ramallah"),
    tf("rsvp", "تأكيد", "RSVP", "RSVP to Lina · 059 000 0000"),
  ],
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 105, 148), max = W - 18 * s, mw = Math.min(W * 0.72, H * 0.42), y0 = 6 * s + mw * 0.72;
    const z = Math.min(W, H) / 105;
    return scene(W, H, p.paper,
      dotField(0, H * 0.45, W, H * 0.55, 4 * z, 0.35 * z, p.accent2, { fade: "up", opacity: 0.25 }),
      g({ x: W / 2, y: H * 0.06, opacity: 0.2 }, ringsNode(10 * z, 34 * z, 6, p.accent, 0.25 * z)),
      rect(cx - 0.15 * s, -4, 0.3 * s, 10 * s, { fill: p.ink }),
      g({ x: cx, y: 10 * s }, nurseryMobile(mw, p.ink, p.accent, p.accent2, p.soft)),
      line(val(ctx, "lead"), cx, y0 + 6 * s, 4 * s, { font: "playfairdisplay", fill: p.ink, maxWidth: max }),
      line(val(ctx, "title"), cx, y0 + 18 * s, 11 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "honour"), cx, y0 + 26 * s, 3.6 * s, { font: "playfairdisplay", fill: p.ink, maxWidth: max }),
      line(val(ctx, "name"), cx, y0 + 35 * s, 7 * s, { font: "playfairdisplay", weight: 700, fill: p.accent === inks.gold ? p.ink : p.ink, maxWidth: max }),
      line(joined(ctx, ["date", "time"], " · "), cx, y0 + 44 * s, 3.8 * s, { font: "inter", weight: 600, fill: p.ink, maxWidth: max }),
      line(val(ctx, "venue"), cx, y0 + 50 * s, 3.4 * s, { font: "inter", fill: p.ink, maxWidth: max }),
      line(val(ctx, "rsvp"), cx, Math.min(H - 7 - 2 * s, y0 + 58 * s), 3 * s, { font: "inter", fill: p.ink, maxWidth: max }),
doubleFrame(5 * z, 5 * z, W - 10 * z, H - 10 * z, p.accent, p.paper, { gap: 1.6 * z, heavy: 0.4 * z, thin: 0.15 * z, corner: "dot", r: 2.2 * z }),
    );
  },
};
export default t;
