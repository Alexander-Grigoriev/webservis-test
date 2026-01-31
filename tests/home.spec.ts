import { test, expect } from '@playwright/test';

test.describe('Home page – webservis.net', () => {
  test('should load home page and show main headline', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: /your online success starts today/i })
    ).toBeVisible();
  });

  test('should display main navigation links', async ({ page }) => {
    await page.goto('/');

    // Target only visible menu items (avoids hidden responsive menu duplicates)
    const nav = page.locator('header');

    const home = nav.locator('a.menu-link:visible', { hasText: 'Home' });
    const projects = nav.locator('a.menu-link:visible', { hasText: 'Projects' });
    const services = nav.locator('a.menu-link:visible', { hasText: 'Services' });
    const contacts = nav.locator('a.menu-link:visible', { hasText: 'Contacts' });

    await expect(home).toBeVisible();
    await expect(projects).toBeVisible();
    await expect(services).toBeVisible();
    await expect(contacts).toBeVisible();
  });
});
