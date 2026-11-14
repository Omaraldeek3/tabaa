import { guillocheNode, khatamPath } from "../../lib/motifs/index.ts";
import { g, path, rect, scene, type SceneNode, text } from "../../lib/scene.ts";
import { ml, tf } from "../fields.ts";
import { dims, inks, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-for-rent",
  category: "posters",
  lang: "ar",
  title: { ar: "إعلان «شقة للإيجار» بقصاصات الهاتف", en: "Flat for rent notice with tear-off tabs" },
  note: { ar: "إعلان الحائط المعروف: عنوان كبير ومواصفات الشقة، وفي الأسفل قصاصات عمودية برقم الهاتف تُقصّ ويأخذها المارّة.", en: "The classic wall notice: a big heading and the flat's details, with vertical tabs along the foot carrying the phone number for passers-by to tear off." },
  tags: ["إيجار", "شقة", "عقار", "قصاصات", "إعلان", "for rent", "flat"],
  sizes: [sizes.a4, sizes.a5],
  palettes: [
    pal("white", "أبيض", "White", inks.white, inks.black, inks.red, inks.black, inks.grey),
    pal("yellow", "أصفر", "Yellow", inks.mustard, inks.black, inks.black, inks.black, inks.black),
    pal("green", "أخضر", "Green", inks.ivory, inks.oliveDark, inks.olive, inks.oliveDark, inks.grey),
  ],
  fonts: ["lalezar", "kufam", "cairo"],
  fields: [
    tf("title", "العنوان", "Title", "شقة للإيجار", 16),
    tf("area", "المنطقة", "Area", "عين منجد · رام الله"),
    ml("details", "المواصفات", "Details", "٣ غرف نوم وصالون ومطبخ\nحمّامان وبرندة مطلّة\nالطابق الثاني · مصعد · موقف سيارة", 4),
    tf("price", "السعر", "Price", "٦٠٠ دينار شهرياً"),
    tf("phone", "الهاتف", "Phone", "٠٥٩٩١٢٣٤٥٦", 14),
  ],
  safeMm: 6,
  render(ctx) {
    const { W, H, p, b, u, cx } = dims(ctx, 210, 297), s = u, max = W - 30 * s, tabH = 62 * s, n = 9, tw = W / n, phone = val(ctx, "phone");
    const tabs: SceneNode[] = [];
    if (phone) for (let i = 0; i < n; i++) {
      const x = i * tw;
      if (i) tabs.push(path(Array.from({ length: 16 }, (_, k) => `M${x} ${H - tabH + k * tabH / 16} v${tabH / 32}`).join(" "), { fill: null, stroke: p.ink, strokeWidth: 0.3 * s }));
      tabs.push(g({ x: x + tw / 2 + 2.2 * s, y: H - tabH / 2, rotate: -90 }, text(phone, { font: "tajawal", weight: 800, size: 5.4 * s, x: 0, y: 0, align: "center", fill: p.ink, maxWidth: tabH - 10 * s })));
    }
    const z = Math.min(W, H) / 210;
    return scene(W, H, p.paper,
      guillocheNode(0, 0, W, H * 0.16, p.paper, { waves: 3, amp: 1.2 * z, period: 20 * z, width: 0.2 * z, opacity: 0.2 }),
      rect(-b, -b, W + 2 * b, 64 * s + b, { fill: p.accent }),
      line(val(ctx, "title"), cx, 46 * s, 30 * s, { font: ctx.font, weight: 700, fill: p.paper === inks.mustard ? inks.mustard : p.paper, maxWidth: max }),
      line(val(ctx, "area"), cx, 86 * s, 11 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: max }),
      stack(linesOf(val(ctx, "details"), 4), cx, 112 * s, 9 * s, 15 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      line(val(ctx, "price"), cx, H - tabH - 36 * s, 15 * s, { font: ctx.font, weight: 700, fill: p.accent2 === p.ink ? p.ink : p.accent, maxWidth: max }),
      line(phone, cx, H - tabH - 14 * s, 11 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: max }),
      phone ? path(`M${-b} ${H - tabH} H${W + b}`, { fill: null, stroke: p.ink, strokeWidth: 0.4 * s }) : null,
      tabs,
      [[8, H / z * 0.2], [W / z - 8, H / z * 0.2]].map(([x, y]) => g({ x: x * z, y: y * z }, path(khatamPath(2.4 * z), { fill: p.accent }))),
    );
  },
};
export default t;
