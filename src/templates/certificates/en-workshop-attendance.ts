import { guillocheNode, stampRing } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "certificates-en-workshop-attendance",
  category: "certificates",
  lang: "en",
  title: { ar: "شهادة حضور ورشة بالإنجليزية", en: "Workshop attendance certificate" },
  note: { ar: "شهادة إنجليزية بسيطة وحديثة: شريط قطري ملوّن في الزاوية، وتفاصيل الورشة (الساعات والمدرّب والمكان) في أعمدة صغيرة. للدورات والمؤتمرات والتدريب.", en: "A clean modern English certificate: a diagonal colour band in the corner, with the workshop's hours, trainer and venue in small columns. For courses, conferences and training." },
  tags: ["certificate", "english", "workshop", "attendance", "training", "شهادة", "إنجليزي", "حضور"],
  sizes: [sizes.a4l],
  palettes: [
    pal("blue", "أزرق", "Blue", inks.white, inks.black, inks.navy, inks.sky, inks.grey),
    pal("orange", "برتقالي", "Orange", inks.white, inks.black, inks.orange, inks.mustard, inks.grey),
    pal("green", "أخضر", "Green", inks.ivory, inks.oliveDark, inks.olive, inks.sage, inks.grey),
  ],
  fonts: ["inter", "playfairdisplay"],
  fields: [
    tf("kind", "النوع", "Kind", "CERTIFICATE OF ATTENDANCE"),
    tf("lead", "تمهيد", "Lead-in", "This is to certify that"),
    tf("name", "الاسم", "Recipient", "Lana Mansour", 34),
    tf("line", "النص", "Text", "attended the workshop"),
    tf("workshop", "الورشة", "Workshop", "Designing for Print: Arabic Type in Practice", 60),
    tf("hours", "الساعات", "Hours", "12 hours"),
    tf("trainer", "المدرّب", "Trainer", "Trainer: Samir Haddad"),
    tf("place", "المكان والتاريخ", "Place and date", "Nablus · 3–5 March 2027"),
    tf("sign", "التوقيع", "Signature", "Programme Director"),
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 297, 210), L = 26 * s, max = W - 2 * L, ltr = { align: "start" as const, dir: "ltr" as const };
    const z = Math.min(W, H) / 210;
    return scene(W, H, p.paper,
      guillocheNode(14 * z, 14 * z, W * 0.6, H - 28 * z, p.accent2, { waves: 14, amp: 1.2 * z, period: 22 * z, width: 0.15 * z, opacity: 0.15 }),
      path(`M${W - 90 * s} ${-b} L${W + b} ${-b} L${W + b} ${90 * s} Z`, { fill: p.accent }),
      path(`M${W - 120 * s} ${-b} L${W - 100 * s} ${-b} L${W + b} ${100 * s} L${W + b} ${120 * s} Z`, { fill: p.accent2 }),
      line(val(ctx, "kind"), L, 40 * s, 6 * s, { ...ltr, font: "inter", weight: 800, fill: p.accent, maxWidth: max * 0.7, tracking: 1 * s }),
      line(val(ctx, "lead"), L, 68 * s, 6 * s, { ...ltr, font: "inter", fill: p.ink, maxWidth: max }),
      line(val(ctx, "name"), L, 92 * s, 20 * s, { ...ltr, font: ctx.font, weight: 800, fill: p.ink, maxWidth: max }),
      rect(L, 98 * s, 60 * s, 1 * s, { fill: p.accent }),
      line(val(ctx, "line"), L, 112 * s, 6 * s, { ...ltr, font: "inter", fill: p.ink, maxWidth: max }),
      line(val(ctx, "workshop"), L, 126 * s, 10 * s, { ...ltr, font: "playfairdisplay", weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "hours"), L, 152 * s, 5 * s, { ...ltr, font: "inter", weight: 700, fill: p.ink, maxWidth: 60 * s }),
      line(val(ctx, "trainer"), L + 70 * s, 152 * s, 5 * s, { ...ltr, font: "inter", fill: p.ink, maxWidth: 80 * s }),
      line(val(ctx, "place"), L + 160 * s, 152 * s, 5 * s, { ...ltr, font: "inter", fill: p.ink, maxWidth: 85 * s }),
      val(ctx, "sign") ? rect(W - L - 60 * s, 176 * s, 60 * s, 0.4 * s, { fill: p.ink }) : null,
      line(val(ctx, "sign"), W - L - 30 * s, 184 * s, 4.6 * s, { font: "inter", fill: p.soft, maxWidth: 60 * s }),
      g({ x: W - 40 * z, y: H - 50 * z, rotate: -12 }, stampRing(14 * z, p.accent, z)),
      [[10, 10], [10, H / z - 10]].map(([x, y]) => path(`M${(x + 10) * z} ${y * z} H${x * z} V${(y + (y < 20 ? 10 : -10)) * z}`, { fill: null, stroke: p.accent, strokeWidth: 0.6 * z })),
    );
  },
};
export default t;
