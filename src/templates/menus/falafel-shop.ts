import { dotField, doubleFrame, keffiyeh, khatamPath, tatreezBand } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene, type SceneNode } from "../../lib/scene.ts";
import { inks, line, pal, rows, sizes, val } from "../kit.ts";
import type { RenderContext, Template } from "../types.ts";

const falafelShop: Template = {
  id: "menus-falafel-shop",
  category: "menus",
  lang: "ar",
  title: { ar: "قائمة مطعم فلافل وحمّص", en: "Falafel and hummus shop menu" },
  note: { ar: "قائمة من عمودين لمطعم شعبي: ترويسة بشبكة الكوفية، وأسعار واضحة تُقرأ من بعيد.", en: "A two-column menu for a neighbourhood shop: keffiyeh header and prices you can read from the counter." },
  tags: ["قائمة", "منيو", "مطعم", "فلافل", "حمص", "شعبي", "menu"],
  sizes: [sizes.a4, sizes.a3],
  palettes: [
    pal("tahini", "طحينة", "Tahini", inks.paper, inks.black, inks.red, inks.olive, inks.sand),
    pal("mint", "نعنع", "Mint", inks.ivory, inks.oliveDark, inks.olive, inks.terracotta, inks.sage),
    pal("slate", "لوح", "Slate", inks.charcoal, inks.paper, inks.mustard, inks.terracotta, inks.grey),
  ],
  fonts: ["lalezar", "rakkas", "kufam", "cairo"],
  fields: [
    { id: "name", kind: "text", label: { ar: "اسم المطعم", en: "Shop name" }, sample: "فلافل أبو خليل", maxLength: 30 },
    { id: "tagline", kind: "text", label: { ar: "الشعار", en: "Tagline" }, sample: "طازة كل صباح منذ ١٩٧٤" },
    { id: "head1", kind: "text", label: { ar: "عنوان القسم الأول", en: "First section title" }, sample: "السندويشات" },
    { id: "list1", kind: "list", label: { ar: "القسم الأول", en: "First section" }, columns: [{ ar: "الصنف", en: "Item" }, { ar: "السعر", en: "Price" }], maxRows: 9,
      sample: [["فلافل", "٥"], ["فلافل محشي", "٧"], ["حمّص", "٦"], ["مسبّحة", "٧"], ["فول", "٦"], ["بطاطا", "٦"], ["مشكّل", "٨"]] },
    { id: "head2", kind: "text", label: { ar: "عنوان القسم الثاني", en: "Second section title" }, sample: "الصحون" },
    { id: "list2", kind: "list", label: { ar: "القسم الثاني", en: "Second section" }, columns: [{ ar: "الصنف", en: "Item" }, { ar: "السعر", en: "Price" }], maxRows: 9,
      sample: [["صحن حمّص", "١٢"], ["حمّص باللحمة", "٢٠"], ["فتّة حمّص", "١٥"], ["قدسية", "١٤"], ["صحن فلافل", "١٠"], ["سلطة عربية", "٨"], ["مخلل مشكّل", "٥"]] },
    { id: "currency", kind: "text", label: { ar: "العملة", en: "Currency" }, sample: "الأسعار بالشيكل", maxLength: 30 },
    { id: "footer", kind: "text", label: { ar: "التذييل", en: "Footer" }, sample: "البلدة القديمة، الخليل · ٠٢ ٢٢٢ ٠٠٠٠ · يومياً من ٦ صباحاً" },
  ],
  safeMm: 8,
  render(ctx) {
    const { widthMm: W, heightMm: H } = ctx.size, p = ctx.palette, b = ctx.bleedMm + 1;
    const s = W / 210, v = H / 297, cx = W / 2, m = 16 * s, headH = 78 * v, body = "tajawal";
    const colW = (W - 2 * m - 12 * s) / 2;
    const column = (c: RenderContext, head: string, list: string, right: number): SceneNode[] => {
      const out: (SceneNode | null)[] = [], left = right - colW, top = headH + 34 * v;
      out.push(line(val(c, head), right, top, 13 * s, { font: c.font, fill: p.accent, align: "start", maxWidth: colW }));
      out.push(g({ x: left, y: top + 5 * v }, tatreezBand("zigzag", colW, 4.2 * s, [p.ink, p.accent])));
      const items = rows(c, list, 9), pitch = Math.min(17 * v, (H - 34 * v - (top + 20 * v)) / Math.max(1, items.length));
      items.forEach(([name = "", price = ""], i) => {
        const y = top + 24 * v + i * pitch;
        out.push(line(name, right, y, 8 * s, { font: body, weight: 700, fill: p.ink, align: "start", maxWidth: colW - 24 * s }));
        out.push(line(price, left, y, 9 * s, { font: body, weight: 800, fill: p.accent, align: "end", maxWidth: 20 * s }));
        out.push(path(Array.from({ length: Math.floor(colW / (1.8 * s)) }, (_, k) => `M${left + k * 1.8 * s} ${y + 3.6 * s} h${0.7 * s} v${0.35 * s} h${-0.7 * s} Z`).join(" "), { fill: p.soft }));
      });
      return out.filter((n): n is SceneNode => !!n);
    };
    const z = Math.min(W, H) / 210;
    return scene(W, H, p.paper,
      dotField(0, H * 0.3, W, H * 0.7, 5 * z, 0.4 * z, p.accent, { fade: "up", opacity: 0.12 }),
      rect(-b, -b, W + 2 * b, headH + b, { fill: p.accent }),
      g({ x: -b, y: -b, opacity: 0.14 }, keffiyeh(W + 2 * b, headH + b, 9 * s, inks.paper, 0.13)),
      g({ x: cx, y: 17 * v }, path(khatamPath(6.5 * s), { fill: inks.paper }), circle(0, 0, 2.2 * s, { fill: p.accent })),
      line(val(ctx, "name"), cx, 50 * v, 27 * s, { font: ctx.font, weight: 800, fill: inks.paper, maxWidth: W - 2 * m }),
      line(val(ctx, "tagline"), cx, 65 * v, 8 * s, { font: body, weight: 500, fill: inks.paper, maxWidth: W - 2 * m }),
      g({ x: -b, y: headH }, rect(0, 0, W + 2 * b, 7 * s, { fill: p.ink }), g({ y: 1 * s }, tatreezBand("chain", W + 2 * b, 5 * s, [p.paper, p.accent2]))),
      column(ctx, "head1", "list1", W - m),
      column(ctx, "head2", "list2", m + colW),
      rect(cx - 0.2 * s, headH + 26 * v, 0.4 * s, H - headH - 62 * v, { fill: p.soft }),
      line(val(ctx, "currency"), cx, H - 25 * v, 5.4 * s, { font: body, fill: p.accent2, maxWidth: W - 2 * m }),
      rect(m, H - 21 * v, W - 2 * m, 0.5 * s, { fill: p.ink }),
      line(val(ctx, "footer"), cx, H - 13 * v, 5.8 * s, { font: body, weight: 700, fill: p.ink, maxWidth: W - 2 * m }),
      doubleFrame(5 * z, 5 * z, W - 10 * z, H - 10 * z, p.accent, p.paper, { gap: 1.8 * z, heavy: 0.4 * z, thin: 0.15 * z, corner: "khatam", r: 2 * z }),
    );
  },
};

export default falafelShop;
