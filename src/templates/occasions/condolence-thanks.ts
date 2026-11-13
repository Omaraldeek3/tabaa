import { oliveBranch } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { dims, inks, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "occasions-condolence-thanks",
  category: "occasions",
  lang: "ar",
  title: { ar: "بطاقة شكر على تعزية", en: "Thanks for condolences card" },
  note: { ar: "بطاقة وقورة بإطار أسود رفيع وغصن زيتون، تشكر فيها العائلة من واساها. تصلح أيضاً إعلان بيت عزاء.", en: "A sober card with a thin black frame and an olive branch, in which a family thanks those who consoled them. Also works as a mourning notice." },
  tags: ["تعزية", "عزاء", "شكر", "وفاة", "نعي", "condolence"],
  sizes: [sizes.a6l, sizes.a6, sizes.a5],
  palettes: [
    pal("mourning", "حداد", "Mourning", inks.white, inks.black, inks.black, inks.grey, inks.grey),
    pal("olive", "زيتون", "Olive", inks.ivory, inks.black, inks.oliveDark, inks.olive, inks.grey),
    pal("stone", "حجر", "Stone", inks.paper, inks.black, inks.black, inks.goldDeep, inks.grey),
  ],
  fonts: ["amiri", "lateef", "arefruqaa"],
  fields: [
    { id: "opening", kind: "text", label: { ar: "الافتتاح", en: "Opening" }, sample: "إنّا لله وإنّا إليه راجعون" },
    { id: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, sample: "شكر على تعزية", maxLength: 26 },
    { id: "body", kind: "multiline", label: { ar: "النص", en: "Text" }, sample: "تتقدّم عائلة المصري بجزيل الشكر والامتنان\nلكل من واساها بوفاة فقيدها الغالي\nالحاج محمود عبد الله المصري", maxLines: 4 },
    { id: "closing", kind: "text", label: { ar: "الختام", en: "Closing" }, sample: "لا أراكم الله مكروهاً بعزيز" },
  ],
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 148, 105), m = 7 * s, max = W - 2 * m - 16 * s, y = (k: number) => m + (H - 2 * m) * k;
    return scene(W, H, p.paper,
      rect(m, m, W - 2 * m, H - 2 * m, { fill: null, stroke: p.ink, strokeWidth: 1.1 * s }),
      rect(m + 2.2 * s, m + 2.2 * s, W - 2 * m - 4.4 * s, H - 2 * m - 4.4 * s, { fill: null, stroke: p.ink, strokeWidth: 0.2 * s }),
      line(val(ctx, "opening"), cx, y(0.17), 5 * s, { font: "amiri", fill: p.soft === inks.grey ? inks.grey : p.ink, maxWidth: max }),
      line(val(ctx, "title"), cx, y(0.34), 11 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      g({ x: cx - 13 * s, y: y(0.43) }, oliveBranch(26 * s, p.accent2, null, { leaves: 8, bend: 0.06 })),
      stack(linesOf(val(ctx, "body"), 4), cx, y(0.56), 5 * s, (H - 2 * m) * 0.085, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "closing"), cx, y(0.92), 4.4 * s, { font: "amiri", weight: 700, fill: p.accent, maxWidth: max }),
    );
  },
};
export default t;
