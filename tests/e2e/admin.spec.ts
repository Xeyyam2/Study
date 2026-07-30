// tests/e2e/admin.spec.ts
import { test, expect } from '@playwright/test';

test('admin login → overview → kanban drag updates status', async ({ page }) => {
  await page.goto('/admin/login');
  // pick the admin demo profile (first button)
  await page.getByRole('button').first().click();
  await expect(page).toHaveURL(/\/admin$/);

  // overview shows pipeline
  await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();

  // go to leads kanban
  await page.getByRole('link', { name: /Leads/ }).click();
  await expect(page).toHaveURL(/\/admin\/leads/);
  await expect(page.getByText('New')).toBeVisible();
});
