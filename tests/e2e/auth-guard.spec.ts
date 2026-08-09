// tests/e2e/auth-guard.spec.ts
import { test, expect } from '@playwright/test';

// Unauthenticated access to protected areas must redirect to login.
// These tests don't need a DB — the middleware redirect happens first.

test('unauthenticated /admin redirects to /admin/login', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/admin\/login/);
});

test('unauthenticated /dashboard redirects to login', async ({ page }) => {
  await page.goto('/en/dashboard');
  await expect(page).toHaveURL(/\/dashboard\/login/);
});
