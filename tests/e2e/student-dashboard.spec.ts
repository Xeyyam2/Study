import { test, expect } from '@playwright/test';

test('student login → overview → messages', async ({ page }) => {
  await page.goto('/en/dashboard/login');
  // pick the first demo student button
  await page.getByRole('button').first().click();
  await expect(page).toHaveURL(/\/en\/dashboard$/);
  await expect(page.getByRole('heading', { name: 'My dashboard' })).toBeVisible();

  await page.getByRole('link', { name: 'Messages' }).click();
  await expect(page).toHaveURL(/\/en\/dashboard\/messages/);
});
