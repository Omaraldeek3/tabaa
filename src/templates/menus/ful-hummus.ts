import { dotField, doubleFrame, hummusBowl, rosetteLines } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { priced, tf } from "../fields.ts";
import { dims, inks, line, more, pal, priceList, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "menus-ful-hummus",
  category: "menus",
  lang: "ar",
  title: { ar: "منيو فول وحمّص عرضي", en: "Ful and hummus menu, landscape" },
  note: { ar: "منيو عرضي في وسطه صحن حمّص من فوق بدوّامة الزيت والحبّات، والقائمتان على جانبيه. لمطاعم الفول والحمّص والفطور.", en: "A landscape menu with a bowl of hummus seen from above in the middle, its oil swirl and chickpeas, and a list on each side. For ful, hummus and breakfast places." },
  tags: ["منيو", "حمص", "فول", "فطور", "مسبحة", "menu", "hummus"],
  sizes: [more.a5l, { id: "a4-landscape", label: { ar: "A4 عرضي (٢٩٧×٢١٠ ملم)", en: "A4 landscape (297×210 mm)" }, widthMm: 297, heightMm: 210 }],
  palettes: [
    pal("cream", "قشدي", "Cream", inks.ivory, inks.oliveDark, inks.olive, inks.terracotta, inks.sand),
    pal("blue", "أزرق", "Blue", inks.navy, inks.ivory, inks.sky, inks.mustard, inks.teal),
    pal("terracotta", "فخّاري", "Clay", inks.terracotta, inks.ivory, inks.ivory, inks.black, inks.paper),
  ],
  fonts: ["rakkas", "lalezar", "arefruqaa"],
  fields: [
    tf("name", "اسم المطعم", "Restaurant name", "حمّص الأقصى", 20),
    tf("tagline", "الشعار", "Tagline", "فطور الملوك من ١٩٥٢"),
    tf("head1", "القسم الأول", "First section", "صحون"),
    priced("list1", "أصناف القسم الأول", "First section items", [["حمّص ناعم", "١٢"], ["فول مدمّس", "١٢"], ["مسبّحة", "١٤"], ["حمّص باللحمة", "٢٢"], ["فتّة", "١٥"]], 6),
    tf("head2", "القسم الثاني", "Second section", "على الجنب"),
    priced("list2", "أصناف القسم الثاني", "Second section items", [["فلافل (٦ حبات)", "٥"], ["مخلل", "٣"], ["بصل وفلفل", "٢"], ["خبز طابون", "٢"], ["شاي بالميرمية", "٤"]], 6),
    tf("footer", "التذييل", "Footer", "باب السلسلة، القدس · من ٦ صباحاً"),
  ],
  safeMm: 7,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 210, 148), r = Math.min(H * 0.3, W * 0.17), cw = (W - 2 * r - 40 * s) / 2, top = 58 * s;
    const opts = (right: number, top: number) => ({ nameX: right, priceX: right - cw, top, pitch: 11 * s, size: 5.6 * s, max: 6, ink: p.ink, priceInk: p.accent2, rule: p.soft });
    const z = Math.min(W, H) / 148;
    return scene(W, H, p.paper,
      g({ x: W / 2, y: H * 0.45, opacity: 0.2 }, rosetteLines(44 * z, p.accent, { rings: 3, lobes: 20, width: 0.25 * z })),
      dotField(0, 0, W, H * 0.25, 5 * z, 0.4 * z, p.accent2, { fade: "down", opacity: 0.2 }),
      rect(-b, H - 18 * s, W + 2 * b, 18 * s + b, { fill: p.accent, opacity: 0.25 }),
      g({ x: cx, y: H * 0.52 }, hummusBowl(r, p.accent, inks.sand, inks.olive, inks.goldDeep)),
      line(val(ctx, "name"), cx, 22 * s, 13 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 30 * s }),
      line(val(ctx, "tagline"), cx, 32 * s, 4.4 * s, { font: "tajawal", weight: 700, fill: p.accent2, maxWidth: W - 30 * s }),
      line(val(ctx, "head1"), W - 12 * s, top - 9 * s, 8 * s, { font: ctx.font, weight: 700, fill: p.accent2, align: "start", maxWidth: cw }),
      priceList(ctx, "list1", opts(W - 12 * s, top)),
      line(val(ctx, "head2"), 12 * s + cw, top - 9 * s, 8 * s, { font: ctx.font, weight: 700, fill: p.accent2, align: "start", maxWidth: cw }),
      priceList(ctx, "list2", opts(12 * s + cw, top)),
      line(val(ctx, "footer"), cx, H - 8 * s, 4.2 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: W - 30 * s }),
      doubleFrame(6 * z, 6 * z, W - 12 * z, H * 0.86, p.accent, p.paper, { gap: 1.8 * z, heavy: 0.4 * z, thin: 0.15 * z, corner: "bracket", r: 2.4 * z }),
    );
  },
};
export default t;
