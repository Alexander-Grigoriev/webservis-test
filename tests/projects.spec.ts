import { test, expect } from '@playwright/test';
import { BasePage } from './pages/BasePage';

test.describe('Projects page – webservis.net', () => {
  test('should navigate from Home to Projects and show heading', { tag: '@smoke' }, async ({ page }) => {
    const basePage = new BasePage(page);

    await page.goto('/');
    await basePage.header.goTo('Projects');

    await expect(page).toHaveURL(/\/projects\/?$/);
    await expect(page.getByRole('heading', { name: /concepts & demonstrations/i })
    ).toBeVisible();
  });

  test('should load Projects page directly', { tag: '@smoke' }, async ({ page }) => {
    await page.goto('/projects/');

    await expect(page).toHaveURL(/\/projects\/?$/);
    await expect(page.getByRole('heading', { name: /concepts & demonstrations/i })).toBeVisible();
  });
});
