import { test, expect } from "@playwright/test";

test.describe("Apply form", () => {
  test("shows validation errors on empty submit", async ({ page }) => {
    await page.goto("/en/apply");
    await expect(page.getByRole("heading", { name: /apply/i })).toBeVisible();

    await page.getByRole("button", { name: /submit/i }).click();

    // Zod + RHF validation surfaces field errors.
    await expect(page.getByText(/first name/i).first()).toBeVisible();
  });

  test("submits a valid application and shows success", async ({ page }) => {
    await page.goto("/en/apply");

    await page.getByLabel(/first name/i).fill("John");
    await page.getByLabel(/last name/i).fill("Doe");
    await page.getByLabel(/email/i).fill(`e2e-${Date.now()}@example.com`);
    await page.getByLabel(/phone/i).fill("+905001112233");

    // Optional country select may exist; pick one if present.
    const country = page.getByLabel(/country/i);
    if (await country.count()) {
      await country.selectOption({ index: 1 });
    }

    await page.getByRole("button", { name: /submit/i }).click();

    // Successful submit shows the success panel.
    await expect(page.getByText(/success/i).first()).toBeVisible({ timeout: 15_000 });
  });
});
