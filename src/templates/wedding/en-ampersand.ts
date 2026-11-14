import { doubleFrame, guillocheNode } from "../../lib/motifs/index.ts";
import { rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "wedding-en-ampersand",
  category: "wedding",
  lang: "en",
  title: { ar: "دعوة زفاف إنجليزية بعلامة & كبيرة", en: "Giant ampersand wedding invitation" },
  note: { ar: "دعوة إنجليزية طباعية: علامة & ضخمة باهتة تملأ الورقة، والاسمان فوقها وتحتها بحروف كبيرة.", en: "A typographic English invitation: a huge pale ampersand fills the card with both names above and below it in capitals." },
  tags: ["wedding", "english", "typographic", "ampersand", "modern", "زفاف", "إنجليزي", "طباعي"],
  sizes: [sizes.a5, sizes.invite, sizes.square15],
  palettes: [
    pal("blush", "وردي", "Blush", inks.blush, inks.burgundy, inks.rose, inks.burgundy, inks.ivory),
    pal("mono", "أسود", "Mono", inks.white, inks.black, inks.sand, inks.black, inks.grey),
    pal("olive", "زيتي", "Olive", inks.ivory, inks.oliveDark, inks.sage, inks.olive, inks.grey),
  ],
  fonts: ["playfairdisplay", "inter"],
  fields: [
    tf("invite", "تمهيد", "Lead-in", "Together with their families"),
    tf("bride", "الاسم الأول", "First name", "LAYLA", 14),
    tf("groom", "الاسم الثاني", "Second name", "SAMI", 14),
    tf("line", "نص الدعوة", "Invitation line", "request the pleasure of your company at their wedding"),
    tf("date", "التاريخ", "Date", "Saturday, 12 June 2027"),
    tf("time", "الوقت", "Time", "Five in the afternoon"),
    tf("venue", "المكان", "Venue", "The Olive House, Amman"),
    tf("rsvp", "تأكيد الحضور", "RSVP", "RSVP by 1 May · layla.sami@example.com"),
  ],
  safeMm: 6,
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 148, 210), max = W - 24 * s, mid = H * 0.44;
    const z = Math.min(W, H) / 148;
    return scene(W, H, p.paper,
      guillocheNode(0, H * 0.2, W, H * 0.5, p.accent, { waves: 8, amp: 1.2 * z, period: 18 * z, width: 0.15 * z, opacity: 0.15 }),
      line("&", cx, mid + H * 0.2, Math.min(H * 0.55, W * 0.95), { font: "playfairdisplay", fill: p.accent, safe: false }),
      line(val(ctx, "invite"), cx, 18 * s, 4.2 * s, { font: "playfairdisplay", fill: p.ink, maxWidth: max }),
      line(val(ctx, "bride"), cx, mid - 14 * s, 17 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max, tracking: 1.2 * s }),
      line(val(ctx, "groom"), cx, mid + 22 * s, 17 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max, tracking: 1.2 * s }),
      rect(cx - 12 * s, H - 56 * s, 24 * s, 0.35 * s, { fill: p.accent2 }),
      line(val(ctx, "line"), cx, H - 46 * s, 4.2 * s, { font: "playfairdisplay", fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, H - 35 * s, 5.4 * s, { font: "playfairdisplay", weight: 700, fill: p.accent2, maxWidth: max }),
      line(joined(ctx, ["time", "venue"], "  |  "), cx, H - 26 * s, 3.8 * s, { font: "inter", weight: 500, fill: p.ink, maxWidth: max, tracking: 0.3 * s }),
      line(val(ctx, "rsvp"), cx, H - 14 * s, 3.2 * s, { font: "inter", fill: p.ink, maxWidth: max }),
      doubleFrame(7 * z, 7 * z, W - 14 * z, H - 14 * z, p.accent, p.paper, { gap: 2 * z, heavy: 0.4 * z, thin: 0.15 * z, corner: "dot", r: 2 * z }),
    );
  },
};
export default t;
