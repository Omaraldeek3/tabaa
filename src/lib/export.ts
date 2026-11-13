/** Browser downloads: PDF for the press, PNG for sharing, SVG for editing. */
import { type PrintOptions, renderSvg } from "./render-svg.ts";
import type { Scene } from "./scene.ts";

function save(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob), a = document.createElement("a");
  a.href = url; a.download = name; a.rel = "noopener";
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export async function downloadPdf(resolved: Scene, name: string, opts: PrintOptions, title: string): Promise<void> {
  const { renderPdf } = await import("./render-pdf.ts");
  const bytes = await renderPdf(resolved, opts, { title });
  save(new Blob([bytes as BlobPart], { type: "application/pdf" }), `${name}.pdf`);
}

export function downloadSvg(resolved: Scene, name: string, opts: PrintOptions): void {
  save(new Blob([renderSvg(resolved, opts)], { type: "image/svg+xml" }), `${name}.svg`);
}

/** The trimmed design as a PNG at print resolution, capped so phones can make it. */
export async function downloadPng(resolved: Scene, name: string, dpi = 300): Promise<void> {
  const svg = renderSvg(resolved);
  const cap = 6000, scale = Math.min(dpi / 25.4, cap / resolved.widthMm, cap / resolved.heightMm);
  const w = Math.round(resolved.widthMm * scale), h = Math.round(resolved.heightMm * scale);
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  try {
    const img = new Image();
    img.decoding = "async";
    await new Promise<void>((ok, fail) => { img.onload = () => ok(); img.onerror = () => fail(new Error("PNG render failed")); img.src = url; });
    const canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = h;
    canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
    const blob = await new Promise<Blob | null>(ok => canvas.toBlob(ok, "image/png"));
    if (!blob) throw new Error("PNG render failed");
    save(blob, `${name}.png`);
  } finally { URL.revokeObjectURL(url); }
}
