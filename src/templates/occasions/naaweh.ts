import { guillocheNode, khatamPath } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { ml, tf } from "../fields.ts";
import { dims, inks, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "occasions-naaweh",
  category: "occasions",
  lang: "ar",
  title: { ar: "نعوة (ورقة نعي للجدران)", en: "Naaweh wall obituary notice" },
  note: { ar: "ورقة النعي التي تُلصق على الجدران في فلسطين بترتيبها المعروف: إطار أسود، آية، اسم الفقيد بخط عريض، ومكان تقبّل التعازي في شريط أسود.", en: "The obituary notice posted on walls across Palestine, in its familiar order: black frame, a verse, the name in heavy type, and where condolences are received on a black band." },
  tags: ["نعي", "نعوة", "وفاة", "عزاء", "ورقة نعي", "obituary"],
  sizes: [sizes.a4, sizes.a5, sizes.a3],
  palettes: [
    pal("white", "أبيض", "White", inks.white, inks.black, inks.black, inks.white, inks.grey),
    pal("cream", "عاجي", "Cream", inks.ivory, inks.black, inks.black, inks.ivory, inks.grey),
  ],
  fonts: ["reemkufi", "amiri", "rakkas"],
  fields: [
    tf("verse", "الآية", "Verse", "يا أيّتها النفس المطمئنة ارجعي إلى ربّك راضيةً مرضيّة"),
    tf("lead", "التمهيد", "Lead-in", "بمزيد من الرضا والتسليم بقضاء الله وقدره ينعى آل حمّاد فقيدهم المرحوم بإذن الله"),
    tf("name", "اسم الفقيد", "Name", "الحاج أبو خالد محمود حمّاد", 32),
    tf("age", "العمر", "Age", "عن عمر يناهز ٧٨ عاماً"),
    ml("family", "الأسرة", "Family", "والد كلٍّ من: خالد، وسامي، وعماد، وأحمد\nوشقيق كلٍّ من: الحاج يوسف والمرحوم عبد الله", 3),
    ml("funeral", "التشييع", "Funeral", "وسيُشيَّع جثمانه الطاهر بعد صلاة العصر من مسجد البلدة الكبير\nويوارى الثرى في مقبرة العائلة", 2),
    tf("condolence", "التعازي", "Condolences", "تُقبل التعازي في ديوان آل حمّاد لمدة ثلاثة أيام"),
    tf("closing", "الخاتمة", "Closing", "إنّا لله وإنّا إليه راجعون"),
  ],
  safeMm: 12,
  render(ctx) {
    const { W, H, p, u, cx } = dims(ctx, 210, 297), s = u, m = 8 * s, max = W - 34 * s;
    const z = Math.min(W, H) / 210;
    return scene(W, H, p.paper,
      guillocheNode(0, 0, W, H * 0.14, p.soft, { waves: 3, amp: 1 * z, period: 18 * z, width: 0.15 * z, opacity: 0.25 }),
      rect(m, m, W - 2 * m, H - 2 * m, { fill: null, stroke: p.ink, strokeWidth: 3.2 * s }),
      rect(m + 4 * s, m + 4 * s, W - 2 * m - 8 * s, H - 2 * m - 8 * s, { fill: null, stroke: p.ink, strokeWidth: 0.5 * s }),
      line("بسم الله الرحمن الرحيم", cx, 30 * s, 6 * s, { font: "amiri", fill: p.ink, maxWidth: max * 0.6, safe: false }),
      line(val(ctx, "verse"), cx, 44 * s, 7.4 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "lead"), cx, 66 * s, 6 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "name"), cx, 100 * s, 17 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "age"), cx, 118 * s, 6.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      stack(linesOf(val(ctx, "family"), 3), cx, 142 * s, 6.2 * s, 12 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      stack(linesOf(val(ctx, "funeral"), 2), cx, 190 * s, 6.2 * s, 12 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      val(ctx, "condolence") ? rect(m + 4 * s, 222 * s, W - 2 * m - 8 * s, 20 * s, { fill: p.ink }) : null,
      line(val(ctx, "condolence"), cx, 235 * s, 7 * s, { font: ctx.font, weight: 700, fill: p.accent2, maxWidth: max }),
      line(val(ctx, "closing"), cx, 266 * s, 8 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      [[13, 13], [W / z - 13, 13], [13, H / z - 13], [W / z - 13, H / z - 13]].map(([x, y]) => g({ x: x * z, y: y * z }, path(khatamPath(2.4 * z), { fill: p.ink }), circle(0, 0, 0.8 * z, { fill: p.paper }))),
    );
  },
};
export default t;
