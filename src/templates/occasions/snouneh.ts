import { burstLines, dotRing, doubleFrame, starTile, wheatBowl } from "../../lib/motifs/index.ts";
import { g, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "occasions-snouneh",
  category: "occasions",
  lang: "ar",
  title: { ar: "دعوة سنّونة (أول سنّ)", en: "Snouneh first tooth invitation" },
  note: { ar: "لعادة السنّونة: صحن قمح مسلوق مزيّن بالسكّر والمكسّرات احتفالاً بأول سنّ يطلع للطفل.", en: "For the snouneh custom: a bowl of boiled wheat with sugar and nuts, celebrating a baby's first tooth." },
  tags: ["سنونة", "أول سن", "قمح", "طفل", "مولود", "عادات", "first tooth"],
  sizes: [sizes.a6, sizes.square12],
  palettes: [
    pal("wheat", "قمح", "Wheat", inks.ivory, inks.black, inks.mustard, inks.terracotta, inks.sand),
    pal("mint", "نعناع", "Mint", inks.ivory, inks.teal, inks.sage, inks.orange, inks.sand),
    pal("pink", "زهري", "Pink", inks.blush, inks.burgundy, inks.rose, inks.mustard, inks.ivory),
  ],
  fonts: ["marhey", "lalezar", "rakkas"],
  fields: [
    tf("title", "العنوان", "Title", "سنّونة", 14),
    tf("lead", "السطر الأول", "Lead line", "طلعت أول سنّة لحبيبنا"),
    tf("name", "اسم الطفل", "Child's name", "كرم", 18),
    tf("date", "التاريخ", "Date", "السبت ٣ تموز"),
    tf("time", "الوقت", "Time", "بعد العصر"),
    tf("place", "المكان", "Place", "بيت سيدو، عنبتا"),
    tf("from", "من", "From", "بابا وماما"),
  ],
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 105, 148), max = W - 16 * s, bw = Math.min(W * 0.62, H * 0.4), by = H * 0.52;
    const z = Math.min(W, H) / 105;
    return scene(W, H, p.paper,
      starTile(0, H * 0.82, W, H * 0.18, 7 * z, 0.9 * z, p.accent, 0.12),
      g({ x: W / 2, y: H * 0.38, opacity: 0.25 }, burstLines(48, 26 * z, 34 * z, p.accent2, 0.3 * z)),
      g({ x: cx, y: by - bw * 0.3 }, dotRing(bw * 0.56, 36, 0.5 * s, p.accent)),
      line(val(ctx, "title"), cx, 9 + 12 * s, 15 * s, { font: ctx.font, weight: 700, fill: p.accent2, maxWidth: max }),
      line(val(ctx, "lead"), cx, 9 + 20 * s, 4.6 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
      g({ x: cx, y: by }, wheatBowl(bw, p.accent2, p.accent, p.ink, p.paper)),
      line(val(ctx, "name"), cx, by + 18 * s, 13 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, by + 29 * s, 4.8 * s, { font: "tajawal", weight: 800, fill: p.accent2, maxWidth: max }),
      line(joined(ctx, ["time", "place"]), cx, by + 36 * s, 4 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      line(val(ctx, "from"), cx, H - 7 - 3 * s, 4 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: max }),
doubleFrame(5 * z, 5 * z, W - 10 * z, H - 10 * z, p.accent, p.paper, { gap: 1.6 * z, heavy: 0.4 * z, thin: 0.15 * z, corner: "dot", r: 2.2 * z }),
    );
  },
};
export default t;
