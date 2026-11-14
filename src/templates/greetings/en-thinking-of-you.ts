import { doubleFrame, ringsNode } from "../../lib/motifs/index.ts";
import { circle, g, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "greetings-en-thinking-of-you",
  category: "greetings",
  lang: "en",
  title: { ar: "بطاقة «أفكّر فيك» بالإنجليزية", en: "Thinking of you card" },
  note: { ar: "بطاقة إنجليزية رقيقة للمواساة والاطمئنان: دوائر شفّافة متداخلة كبقع ألوان مائية، والعبارة بخط سيريف مائل. لمن يمرّ بوقت صعب.", en: "A gentle English card for comfort and checking in: overlapping translucent circles like watercolour blots, with the words in serif italic. For someone going through a hard time." },
  tags: ["thinking of you", "english", "sympathy", "comfort", "watercolour", "مواساة", "إنجليزي"],
  sizes: [sizes.a6, sizes.square12],
  palettes: [
    pal("dusk", "غسق", "Dusk", inks.ivory, inks.navy, inks.sky, inks.rose, inks.mustard),
    pal("sage", "مريمي", "Sage", inks.ivory, inks.oliveDark, inks.sage, inks.mustard, inks.sky),
    pal("blush", "وردي", "Blush", inks.white, inks.burgundy, inks.rose, inks.sand, inks.blush),
  ],
  fonts: ["playfairdisplay", "inter"],
  fields: [
    tf("title", "العنوان", "Title", "Thinking of you", 22),
    tf("message", "الرسالة", "Message", "and sending all my love your way"),
    tf("from", "من", "From", "— Maya"),
  ],
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 105, 148), max = W - 18 * s, cy = H * 0.36, r = Math.min(W, H) * 0.2;
    const blots = [[-0.6, 0.1, 1, p.accent], [0.35, -0.3, 0.85, p.accent2], [0.2, 0.45, 0.7, p.soft], [-0.15, -0.55, 0.5, p.accent2]] as const;
    const z = Math.min(W, H) / 105;
    return scene(W, H, p.paper,
      g({ x: W / 2, y: H * 0.3, opacity: 0.2 }, ringsNode(24 * z, 40 * z, 4, p.accent, 0.25 * z)),
      blots.map(([x, y, k, c]) => circle(cx + x * r, cy + y * r, r * k, { fill: c, opacity: 0.38 })),
      line(val(ctx, "title"), cx, cy + r * 1.7 + 6 * s, 9.6 * s, { font: "playfairdisplay", weight: 600, fill: p.ink, maxWidth: max }),
      line(val(ctx, "message"), cx, cy + r * 1.7 + 15 * s, 4 * s, { font: "playfairdisplay", fill: p.ink, maxWidth: max }),
      line(val(ctx, "from"), cx, H - 7 - 5 * s, 4.2 * s, { font: "playfairdisplay", fill: p.ink, maxWidth: max }),
      doubleFrame(5 * z, 5 * z, W - 10 * z, H - 10 * z, p.accent, p.paper, { gap: 1.6 * z, heavy: 0.4 * z, thin: 0.15 * z, corner: "dot", r: 2 * z }),
    );
  },
};
export default t;
