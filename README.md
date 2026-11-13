# Tabaa (طبعة)

A free library of Arabic and Palestinian print templates: wedding invitations,
posters, business cards, menus, product labels, greeting cards and
certificates. Pick a template, fill in its fields, and download a print-ready
PDF: vector, CMYK, text outlined, with bleed and crop marks. Nothing is
uploaded; everything runs in the browser.

## Run it

```bash
npm install
npm run dev        # http://127.0.0.1:3016
npm test           # unit tests: engine, every template
npm run build      # static export in ./out
npm run test:e2e   # browser test against ./out (uses installed Edge)
```

## How it is built

- A template is a pure function that returns a **scene** in millimetres
  (`src/lib/scene.ts`): paths, rectangles, circles, text, groups. Flat fills
  only, so the PDF stays exact.
- `src/lib/shaping.ts` turns text into outlines with HarfBuzz and bidi-js;
  `resolve.ts` applies that to a whole scene.
- `render-svg.ts` and `render-pdf.ts` draw a resolved scene. The PDF writer
  sets DeviceCMYK colours, the trim and bleed boxes, and crop marks.
- `scripts/thumbs.ts` pre-renders each template to `public/thumbs` before dev
  and build, so the library never loads the shaping engine.

## Add a template

1. Create `src/templates/<category>/<name>.ts` exporting a `Template`
   (see `src/templates/types.ts`; `wedding/tatreez-frame.ts` is a good model).
   The id is `<category>-<name>`.
2. Add it to the list in `src/templates/registry.ts`.
3. Run `npm test`. The registry test renders it in every size, palette and
   font, checks that text stays in the safe area even with long input, and
   that empty fields leave nothing behind.
4. Look at it: `node --experimental-strip-types scripts/sheet.ts templates out.png <name> all`.

Every template must be its own design. Colour variants are palettes inside
one template, not separate cards.

## Licence

Code MIT, designs CC0, fonts OFL. See `LICENSE` and `ASSET-LICENSE.md`.
