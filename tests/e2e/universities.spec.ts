import { test, expect } from "@playwright/test";

test.describe("University filters", () => {
  test("renders the filter rail on desktop", async ({ page }) => {
    await page.goto("/en/universities");

    await expect(
      page.getByRole("complementary", { name: /filters/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("searchbox", { name: /search/i }),
    ).toBeVisible();
  });

  test("updates the filter URL without dropping other query parameters", async ({
    page,
  }) => {
    await page.goto("/en/universities?sort=name&city=istanbul");

    const search = page.getByRole("searchbox", { name: /search/i });
    await search.fill("Bahcesehir");

    await expect(page).toHaveURL(
      /\/en\/universities\?sort=name&city=istanbul&search=Bahcesehir/,
    );
  });

  test("opens and closes the filter drawer on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en/universities");

    await page.getByRole("button", { name: /filters/i }).click();
    await expect(page.getByRole("dialog", { name: /filters/i })).toBeVisible();

    await page.getByRole("button", { name: /close/i }).click();
    await expect(page.getByRole("dialog", { name: /filters/i })).toBeHidden();
  });

  test("keeps the filter drawer open while typing a mobile search", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en/universities");

    await page.getByRole("button", { name: /filters/i }).click();
    const dialog = page.getByRole("dialog", { name: /filters/i });
    await dialog.getByRole("searchbox", { name: /search/i }).fill("Bahcesehir");

    await expect(dialog).toBeVisible();
    await expect(page).toHaveURL(/\/en\/universities\?search=Bahcesehir/);
  });
});
