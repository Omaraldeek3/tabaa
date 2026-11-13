# Tabaa (طبعة): design

Date: 2026-11-13. Approved in chat by Omar.

## Purpose

A free library of print templates, mostly Arabic and specifically Palestinian
in flavour: wedding invitations, posters, business cards, menus, product
labels, greeting cards and certificates. A visitor picks a template, fills in
its fields, and downloads a print-ready PDF with bleed and crop marks. No
account, nothing uploaded; everything runs in the browser.

It sits beside Qalib (web designs), Naqsh (ornament) and Harf (fonts) as the
lab's paper-side library. Target address: `tabaa.omardeek.tech`.

## Decisions

- **Editing model: ready-made fields.** Each template declares its own fields
  (names, date, venue, phone...). The visitor also switches palette, font and,
  where the template allows it, size. Elements are not draggable. This keeps
  every output well composed and lets the first release ship many templates.
- **Site look: a blend of three directions.** Bold-poster hero, warm
  Palestinian print-shop library, dark gold gallery for weddings.
- **Language:** Arabic first (RTL), English toggle. About 50 Arabic templates
  and 10 English ones in the first release.
- **No repeats.** Every template is a distinct design; variants are palettes
  and options inside one template, not extra cards.

## Architecture

Next 16 static export (`output: "export"`), React 19, TypeScript, the same
shape as Naqsh. Lives in `D:\work\tabaa`. Read `node_modules/next/dist/docs`
before writing Next code; this Next version differs from older ones.

Units, each with one job:

- `src/templates/<category>/<id>.ts`: one template per file. Exports
  metadata and a pure `render(values, palette, fontId, shape) => SvgNode`.
- `src/templates/registry.ts`: the list of all templates; the single
  extension point.
- `src/lib/scene.ts`: a tiny SVG scene model (group, path, rect, circle,
  text) in millimetres. Templates build scenes; they never emit strings.
- `src/lib/motifs/`: original, code-drawn Palestinian motifs as scene
  builders: tatreez units on a stitch grid, olive branch, keffiyeh net,
  Jerusalem arches, poppy, Jaffa orange, plus borders built from them.
- `src/lib/shaping.ts`: harfbuzzjs + bidi-js text shaping to outline paths
  (the approach Harf's `src/lib/vector.ts` uses), with line fitting:
  shrink-to-width and centre/start/end alignment.
- `src/lib/render-svg.ts`: scene to SVG markup, for preview and SVG export.
  Preview uses live fonts via CSS for speed; exports use outlined text.
- `src/lib/render-pdf.ts`: scene to PDF with pdf-lib. Page = trim size plus
  bleed on each side plus a margin for crop marks. Sets TrimBox and BleedBox.
- `src/lib/export.ts`: PDF, PNG (canvas at 300 dpi) and SVG downloads.
- `src/components/`: site chrome, library grid, filters, template editor.
- `src/content/`: Arabic and English UI strings.

### Template contract

```ts
type Field =
  | { id: string; kind: "text" | "multiline"; label: L10n; sample: string; maxLength?: number }
  | { id: string; kind: "date" | "time"; label: L10n; sample: string }
  | { id: string; kind: "list"; label: L10n; sample: string[][]; columns: L10n[] }; // menus

type Template = {
  id: string;
  category: Category;
  lang: "ar" | "en";
  title: L10n;
  tags: string[];
  sizes: { id: string; label: L10n; widthMm: number; heightMm: number }[];
  palettes: Palette[];            // named colour sets; first is default
  fonts: string[];                // font ids this design is tuned for
  fields: Field[];
  render(ctx: RenderContext): SceneNode;
};
```

A template must render correctly with its own sample values, with every one
of its palettes, fonts and sizes, and with long input (text shrinks to fit;
it never overflows the safe area).

### Print output

- Bleed 3 mm by default (0 to 5 selectable), safe margin shown in preview as
  a toggle, crop marks on by default.
- All text is outlined, so the print shop needs no fonts.
- Colour: palettes carry both sRGB and CMYK values. The PDF writer targets
  DeviceCMYK fills. This is checked first by a spike; if pdf-lib cannot do it
  cleanly for our scene model (flat fills and simple gradients), the PDF
  ships in RGB and the print guide says so plainly.
- Sticker sheets and business cards offer "single" or "imposed on A4/A3".
  Imposition is out of the first release unless it falls out cheaply.

### Fonts

About a dozen open-licence (OFL) Arabic and Latin fonts, copied from Harf's
catalogue with their licence files, spanning naskh, kufi, ruqaa, thuluth
display, modern sans, and two Latin faces.

## First release content (about 60 templates)

| Category | Count | Notes |
|---|---|---|
| Wedding invitations | 12 | tatreez frame, olive wreath, Jerusalem arch, gold on dark, modern kufi... |
| Engagement, henna, graduation, newborn | 8 | |
| Posters | 10 | events, heritage, olive harvest, Land Day, shop offers |
| Business cards | 8 | 85 x 55 mm, two sides |
| Menus | 6 | restaurant, cafe, sweets, falafel/shawarma shop |
| Product labels | 6 | olive oil, za'atar, Nabulsi soap, honey, maftoul, dates |
| Ramadan and Eid greetings | 6 | |
| Certificates | 4 | |

About 10 of these are English templates spread across categories.

## Site design

- **Hero (bold poster):** the word «طبعة» in giant letters, strong flat
  colours, registration marks, real templates drifting and tilting around
  it, one clear call to action.
- **Library (print shop):** warm cream paper, tatreez red, olive green, ink
  black; tatreez borders; crop marks and CMYK strips as ornament. Templates
  appear as real sheets with a soft shadow, at true aspect ratio.
- **Weddings (dark gallery):** charcoal and gold band where the wedding
  cards are lit like pieces in a gallery.
- **Template page:** large live preview on one side, fields on the other;
  palette, font and size chips; download bar with PDF/PNG/SVG and bleed and
  crop-mark toggles. On a phone the preview sticks to the top.
- Motion is purposeful and respects `prefers-reduced-motion`.
- Pages: home, library with category/language/tag filters and search,
  template page, short print guide (bleed, paper, what to tell the printer).

## Error handling

- Font or shaping engine fails to load: preview keeps working with CSS
  fonts; export buttons show a clear message and a retry.
- Empty field: falls back to nothing (the element is omitted), never to the
  sample text in an export.
- Values are kept per template in localStorage (wrapped in try/catch) so a
  reload does not lose work.

## Testing

- Unit (node test runner): every registered template renders for every
  palette/font/size without throwing and stays inside its page; ids unique;
  long-text fitting; PDF page, TrimBox and BleedBox sizes.
- Playwright: open library, filter, open a template, edit a field, download
  a PDF, check it is a non-empty PDF.

## Out of scope for the first release

Free-form canvas editing, user image upload, accounts, saving to a server,
imposition/gang sheets, payment.

## After launch

Add a Tabaa card to the portfolio lab (`D:\work\codex\src\lab\registry.ts`
plus `src/lab/tabaa/view.tsx`). Creating the GitHub repo and the Vercel
project needs Omar's go-ahead at that point.
