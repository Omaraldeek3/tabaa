import { defineConfig } from "@playwright/test";

/** Runs against the static export, so `npm run build` comes first.
 *  Uses the installed Edge by default; set PW_CHANNEL to change it. */
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 60_000,
  use: { baseURL: "http://127.0.0.1:3017", channel: process.env.PW_CHANNEL || "msedge", locale: "ar" },
  webServer: { command: "node scripts/serve.mjs", url: "http://127.0.0.1:3017", reuseExistingServer: true },
});
