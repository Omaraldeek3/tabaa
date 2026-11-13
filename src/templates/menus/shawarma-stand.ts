import { shawarmaSpit } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { priced, tf } from "../fields.ts";
import { dims, inks, line, pal, priceList, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "menus-shawarma-stand",
  category: "menus",
  lang: "ar",
  title: { ar: "منيو شاورما بالسيخ", en: "Shawarma stand menu" },
  note: { ar: "سيخ شاورما طويل بطبقاته المحمّرة يقف على يسار المنيو بطوله، والأصناف والأسعار على يمينه. لمحلات الشاورما والسناك.", en: "A tall shawarma spit with its browned layers stands the full height of the menu's left side, with items and prices to its right. For shawarma and snack shops." },
  tags: ["منيو", "شاورما", "سناك", "مطعم", "سندويش", "menu", "shawarma"],
  sizes: [sizes.a4, sizes.a3],
  palettes: [
    pal("ember", "جمر", "Ember", inks.charcoal, inks.ivory, inks.terracotta, inks.mustard, inks.grey),
    pal("red", "أحمر", "Red", inks.red, inks.ivory, inks.burgundy, inks.mustard, inks.ivory),
    pal("paper", "ورق", "Paper", inks.paper, inks.black, inks.terracotta, inks.red, inks.grey),
  ],
  fonts: ["lalezar", "rakkas", "jomhuria"],
  fields: [
    tf("name", "اسم المحل", "Shop name", "شاورما الأصيل", 22),
    tf("tagline", "الشعار", "Tagline", "على الفحم، من ١٩٩٨"),
    tf("head1", "القسم الأول", "First section", "سندويشات"),
    priced("list1", "أصناف القسم الأول", "First section items", [["شاورما دجاج صغير", "١٢"], ["شاورما دجاج كبير", "١٨"], ["شاورما لحمة", "٢٢"], ["عربي دجاج", "٢٥"], ["صاج دبل", "٢٨"]], 7),
    tf("head2", "القسم الثاني", "Second section", "وجبات"),
    priced("list2", "أصناف القسم الثاني", "Second section items", [["وجبة شاورما مع بطاطا", "٣٠"], ["صحن شاورما عائلي", "٧٥"], ["بطاطا كبيرة", "١٠"], ["مشروب غازي", "٥"]], 6),
    tf("footer", "التذييل", "Footer", "دوّار الشهداء، نابلس · توصيل ٠٥٩٩ ٠٠٠ ١١١"),
  ],
  safeMm: 8,
  render(ctx) {
    const { W, H, p, b, u, v } = dims(ctx, 210, 297), s = u, R = W - 14 * s, L = W * 0.36, top1 = 92 * v;
    const opts = (top: number, max: number) => ({ nameX: R, priceX: L, top, pitch: 15 * v, size: 8.4 * s, max, ink: p.ink, priceInk: p.accent2, rule: p.soft });
    const n1 = Math.min(7, (ctx.values.list1 as string[][] | undefined)?.length ?? 0), top2 = top1 + (Math.max(n1, 3) + 1.6) * 15 * v;
    return scene(W, H, p.paper,
      rect(-b, -b, W * 0.3 + b, H + 2 * b, { fill: p.accent }),
      g({ x: W * 0.15, y: H - 30 * v }, shawarmaSpit(H * 0.82, p.accent2, inks.burgundy, inks.grey)),
      line(val(ctx, "name"), R, 42 * v, 22 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: W * 0.6 }),
      line(val(ctx, "tagline"), R, 58 * v, 7.4 * s, { font: "tajawal", weight: 700, fill: p.accent2, align: "start", maxWidth: W * 0.6 }),
      line(val(ctx, "head1"), R, top1 - 10 * v, 12 * s, { font: ctx.font, weight: 700, fill: p.accent2, align: "start", maxWidth: W * 0.5 }),
      priceList(ctx, "list1", opts(top1, 7)),
      line(val(ctx, "head2"), R, top2 - 10 * v, 12 * s, { font: ctx.font, weight: 700, fill: p.accent2, align: "start", maxWidth: W * 0.5 }),
      priceList(ctx, "list2", opts(top2, Math.max(0, Math.min(6, Math.floor((H - 30 * v - top2) / (15 * v)))))),
      line(val(ctx, "footer"), R, H - 16 * v, 5.4 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: W * 0.6 }),
    );
  },
};
export default t;
