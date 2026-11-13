import { oliveBranch, tatreezBand } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const enOliveBranch: Template = {
  id: "wedding-en-olive-branch",
  category: "wedding",
  lang: "en",
  title: { ar: "دعوة زفاف إنجليزية بغصني زيتون", en: "English wedding invitation with olive branches" },
  note: { ar: "دعوة بالإنجليزية للأعراس في المهجر: حروف سيريف واسعة بين غصني زيتون، وشريط تطريز رفيع يذكّر بالبلد.", en: "An English invitation for weddings abroad: spaced serif capitals between two olive branches, with a thin tatreez band as a nod to home." },
  tags: ["wedding", "english", "olive", "invitation", "serif", "زفاف", "إنجليزي", "مهجر"],
  sizes: [sizes.a5, sizes.invite, sizes.a6],
  palettes: [
    pal("grove", "كرم", "Grove", inks.ivory, inks.oliveDark, inks.olive, inks.red, inks.sage),
    pal("ink", "حبر", "Ink", inks.white, inks.black, inks.black, inks.red, inks.grey),
    pal("dusk", "غسق", "Dusk", inks.navy, inks.ivory, inks.gold, inks.gold, inks.sky),
  ],
  fonts: ["playfairdisplay", "inter"],
  fields: [
    { id: "lead", kind: "text", label: { ar: "السطر الأول", en: "Lead line" }, sample: "TOGETHER WITH THEIR FAMILIES" },
    { id: "first", kind: "text", label: { ar: "الاسم الأول", en: "First name" }, sample: "Layla", maxLength: 22 },
    { id: "second", kind: "text", label: { ar: "الاسم الثاني", en: "Second name" }, sample: "Yousef", maxLength: 22 },
    { id: "invite", kind: "text", label: { ar: "نص الدعوة", en: "Invitation line" }, sample: "request the pleasure of your company" },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "SATURDAY 12 JUNE 2027" },
    { id: "time", kind: "text", label: { ar: "الوقت", en: "Time" }, sample: "at six o'clock in the evening" },
    { id: "venue", kind: "text", label: { ar: "المكان", en: "Venue" }, sample: "The Orchard House, Amman" },
    { id: "rsvp", kind: "text", label: { ar: "تأكيد الحضور", en: "RSVP" }, sample: "RSVP by 1 May · layla.yousef@example.com" },
  ],
  render(ctx) {
    const { widthMm: W, heightMm: H } = ctx.size, p = ctx.palette;
    const s = Math.min(W / 148, H / 210), v = H / 210, cx = W / 2, max = W - 36 * s, caps = ctx.font === "inter" ? "inter" : "inter";
    return scene(W, H, p.paper,
      rect(9 * s, 9 * s, W - 18 * s, H - 18 * s, { fill: null, stroke: p.accent, strokeWidth: 0.25 * s }),
      g({ x: cx, y: 40 * v, rotate: 180 }, g({ x: 3 * s, rotate: 10 }, oliveBranch(34 * s, p.accent, p.ink, { leaves: 8, olives: 2 }))),
      g({ x: cx, y: 40 * v }, g({ x: 3 * s, rotate: -10, scaleY: -1 }, oliveBranch(34 * s, p.accent, p.ink, { leaves: 8, olives: 2 }))),
      line(val(ctx, "lead"), cx, 62 * v, 3.3 * s, { font: caps, weight: 600, fill: p.ink, tracking: 0.9 * s, maxWidth: max }),
      line(val(ctx, "first"), cx, 89 * v, 19 * s, { font: ctx.font, weight: 500, fill: p.ink, maxWidth: max }),
      line("&", cx, 104 * v, 9 * s, { font: "playfairdisplay", weight: 400, fill: p.accent2, safe: false }),
      line(val(ctx, "second"), cx, 124 * v, 19 * s, { font: ctx.font, weight: 500, fill: p.ink, maxWidth: max }),
      line(val(ctx, "invite"), cx, 140 * v, 4.4 * s, { font: "playfairdisplay", weight: 400, fill: p.ink, maxWidth: max }),
      g({ x: cx - 27 * s, y: 148 * v }, tatreezBand("chain", 54 * s, 3.6 * s, [p.accent2, p.accent])),
      line(val(ctx, "date"), cx, 166 * v, 4.4 * s, { font: caps, weight: 700, fill: p.ink, tracking: 0.9 * s, maxWidth: max }),
      line(val(ctx, "time"), cx, 175 * v, 4.4 * s, { font: "playfairdisplay", fill: p.ink, maxWidth: max }),
      line(val(ctx, "venue"), cx, 183.5 * v, 4.6 * s, { font: "playfairdisplay", weight: 600, fill: p.ink, maxWidth: max }),
      line(val(ctx, "rsvp"), cx, 195 * v, 3 * s, { font: caps, weight: 500, fill: p.soft === inks.grey ? inks.grey : p.accent, tracking: 0.3 * s, maxWidth: max }),
    );
  },
};

export default enOliveBranch;
