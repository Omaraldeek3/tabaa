import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";

test("pick a template, change a name, download a print PDF", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "تصفّح القوالب" }).click();
  await expect(page.getByRole("heading", { name: "المكتبة" })).toBeVisible();

  await page.getByRole("button", { name: /دعوات أعراس/ }).click();
  await expect(page.locator(".card")).not.toHaveCount(0);
  for (const card of await page.locator(".card").all()) await expect(card).toHaveAttribute("href", /\/t\/wedding-/);

  await page.locator('.card[href*="wedding-tatreez-frame"]').click();
  // The live preview replaces the thumbnail once the shaping engine has loaded.
  await expect(page.locator(".stage-svg svg")).toBeVisible();
  const before = await page.locator(".stage-svg").innerHTML();

  await page.getByLabel("العريس").fill("عبد الرحمن");
  await expect.poll(async () => page.locator(".stage-svg").innerHTML()).not.toBe(before);
  await expect(page.locator(".stage-svg text")).toHaveCount(0);

  const downloading = page.waitForEvent("download");
  await page.getByRole("button", { name: "نزّل PDF للمطبعة" }).click();
  const download = await downloading;
  expect(download.suggestedFilename()).toBe("tabaa-wedding-tatreez-frame.pdf");
  const bytes = await readFile(await download.path());
  expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
  expect(bytes.length).toBeGreaterThan(5000);

  // The edit survives a reload.
  await page.reload();
  await expect(page.getByLabel("العريس")).toHaveValue("عبد الرحمن");
});

test("search finds by Arabic word and the English switch flips direction", async ({ page }) => {
  await page.goto("/library/");
  await page.getByRole("searchbox").fill("زيتون");
  await expect(page.locator('.card[href*="olive"]').first()).toBeVisible();
  await page.getByRole("searchbox").fill("لا يوجد شيء كهذا");
  await expect(page.getByText("لا يوجد قالب يطابق بحثك")).toBeVisible();
  await page.getByRole("button", { name: "English" }).click();
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.getByRole("heading", { name: "Library" })).toBeVisible();
});
