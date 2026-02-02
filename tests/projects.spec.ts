import { test, expect } from '@playwright/test';

test.describe('Projects page – webservis.net', () => {
  test('should navigate from Home to Projects and show heading', async ({ page }) => {
    await page.goto('/');

    // Click the visible Projects link in the header nav
    await page.locator('header a.menu-link:visible', { hasText: 'Projects' }).click();

    await expect(page).toHaveURL(/\/projects\/?$/);
    await expect(page.getByRole('heading', { name: /concepts & demonstrations/i })).toBeVisible();
  });

  test('should load Projects page directly', async ({ page }) => {
    await page.goto('/projects/');

    await expect(page).toHaveURL(/\/projects\/?$/);
    await expect(page.getByRole('heading', { name: /concepts & demonstrations/i })).toBeVisible();
  });
});
