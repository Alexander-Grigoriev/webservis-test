import { test, expect } from '@playwright/test';
import { BasePage } from './pages/BasePage';

test.describe('Home page – webservis.net', () => {
  test('should load home page and show main headline', { tag: '@smoke' }, async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: /your online success starts today/i })
    ).toBeVisible();
  });

  test('should display main navigation links', { tag: '@smoke' }, async ({ page }) => {
    const basePage = new BasePage(page);

    await page.goto('/');
    await basePage.header.expectVisible();
  });
});
