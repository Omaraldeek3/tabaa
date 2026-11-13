import { readFile } from "node:fs/promises";
import path from "node:path";
import { setFontLoader } from "../src/lib/fonts.ts";

/** Tests read fonts from disk instead of fetching them. */
export function useDiskFonts(): void {
  setFontLoader(async file => {
    const buf = await readFile(path.join(import.meta.dirname, "..", "public", file));
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  });
}
