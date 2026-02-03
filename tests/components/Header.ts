import { expect, Locator, Page } from '@playwright/test';

export class Header {
  private readonly header: Locator;

  constructor(private readonly page: Page) {
    // Target the real site header (Astra theme uses #masthead)
    this.header = page.locator('#masthead');
  }

  navLink(name: 'Home' | 'Projects' | 'Services' | 'Contacts'): Locator {
    return this.header.locator('a.menu-link:visible', { hasText: name });
  }

  async goTo(name: 'Home' | 'Projects' | 'Services' | 'Contacts') {
    await this.navLink(name).click();
  }

  async expectVisible() {
    await expect(this.header).toBeVisible();
    await expect(this.navLink('Home')).toBeVisible();
    await expect(this.navLink('Projects')).toBeVisible();
    await expect(this.navLink('Services')).toBeVisible();
    await expect(this.navLink('Contacts')).toBeVisible();
  }
}
