// tests/e2e/admin.spec.ts
import { test, expect } from '@playwright/test';

test('admin login → overview → leads kanban shows the pipeline', async ({ page }) => {
  await page.goto('/admin/login');
  // dev fallback (DEV_AUTH_ENABLED): pick the admin demo profile by name
  await page.getByRole('button', { name: /Admin User/ }).click();
  await expect(page).toHaveURL(/\/admin$/);

  // overview shows pipeline
  await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();

  // go to leads kanban
  await page.getByRole('link', { name: /Leads/ }).click();
  await expect(page).toHaveURL(/\/admin\/leads/);
  await expect(page.getByText('New')).toBeVisible();
});
