import { test, expect } from '@playwright/test';
import { BasePage } from './pages/BasePage';

test.describe('Header navigation – webservis.net', () => {
  test('Projects link routes correctly', { tag: '@smoke' }, async ({ page }) => {
    const basePage = new BasePage(page);

    await page.goto('/');
    await basePage.header.goTo('Projects');

    await expect(page).toHaveURL(/\/projects\/?$/);
  });

  test('Services link routes correctly', { tag: '@smoke' }, async ({ page }) => {
    const basePage = new BasePage(page);

    await page.goto('/');
    await basePage.header.goTo('Services');

    await expect(page).toHaveURL(/\/services\/?$/);
  });

  test('Contacts link routes correctly', { tag: '@smoke' }, async ({ page }) => {
    const basePage = new BasePage(page);

    await page.goto('/');
    await basePage.header.goTo('Contacts');

    await expect(page).toHaveURL(/\/contacts\/?$/);
  });
});
