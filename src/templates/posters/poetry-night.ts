import { doubleFrame, guillocheNode } from "../../lib/motifs/index.ts";
import { rect, scene } from "../../lib/scene.ts";
import { ml, tf } from "../fields.ts";
import { dims, inks, joined, line, linesOf, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-poetry-night",
  category: "posters",
  lang: "ar",
  title: { ar: "بوستر أمسية شعرية", en: "Poetry evening poster" },
  note: { ar: "البيت الشعري نفسه هو التصميم: سطور بأحجام متدرّجة تملأ البوستر بين علامتي تنصيص ضخمتين، والتفاصيل في الأسفل.", en: "The verse is the design: lines in stepped sizes fill the poster between two giant quotation marks, with the details below." },
  tags: ["شعر", "أمسية", "قصيدة", "أدب", "ثقافة", "poetry"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("ink", "حبر", "Ink", inks.ivory, inks.black, inks.red, inks.sand, inks.sand),
    pal("night", "ليل", "Night", inks.navy, inks.ivory, inks.mustard, inks.teal, inks.navy),
    pal("sage", "مريمي", "Sage", inks.sage, inks.oliveDark, inks.burgundy, inks.ivory, inks.olive),
  ],
  fonts: ["arefruqaa", "amiri", "katibeh", "reemkufi"],
  fields: [
    ml("verse", "الأبيات", "Verse", "على هذه الأرض\nما يستحقّ\nالحياة", 4),
    tf("title", "العنوان", "Title", "أمسية شعرية"),
    tf("poets", "الشعراء", "Poets", "يقرأ فيها: مريم الأحمد · زياد عيسى · هالة سمعان"),
    tf("date", "التاريخ", "Date", "الأربعاء ١٩ شباط · السابعة مساءً"),
    tf("venue", "المكان", "Venue", "مكتبة البلدية، طولكرم"),
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 297, 420), max = W - 44 * s, lines = linesOf(val(ctx, "verse"), 4), sz = [34, 46, 60, 50];
    let y = 96 * s;
    const verse = lines.map((l, i) => { const k = sz[i] * s * (lines.length > 3 ? 0.82 : 1); y += k * 1.45; return line(l, cx, y - k * 0.35, k, { font: ctx.font, weight: 700, fill: i % 2 ? p.accent : p.ink, maxWidth: max }); });
    const z = Math.min(W, H) / 297;
    return scene(W, H, p.paper,
      guillocheNode(14 * z, 14 * z, W - 28 * z, H - 28 * z, p.accent2, { waves: 16, amp: 1.4 * z, period: 26 * z, width: 0.2 * z, opacity: 0.12 }),
      line("«", W - 36 * s, 96 * s, 80 * s, { font: "amiri", fill: p.accent2, safe: false }),
      line("»", 36 * s, H - 104 * s, 80 * s, { font: "amiri", fill: p.accent2, safe: false }),
      line(val(ctx, "title"), cx, 46 * s, 12 * s, { font: "tajawal", weight: 800, fill: p.accent, maxWidth: max }),
      verse,
      rect(cx - 30 * s, H - 84 * s, 60 * s, 0.8 * s, { fill: p.ink }),
      line(val(ctx, "poets"), cx, H - 62 * s, 8 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["date", "venue"], "  ·  "), cx, H - 40 * s, 7.4 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
      doubleFrame(10 * z, 10 * z, W - 20 * z, H - 20 * z, p.accent2, p.paper, { gap: 3 * z, heavy: 0.6 * z, thin: 0.25 * z, corner: "khatam", r: 4 * z }),
    );
  },
};
export default t;
