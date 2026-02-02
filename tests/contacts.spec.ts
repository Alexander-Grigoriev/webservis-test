import { test, expect } from '@playwright/test';

test.describe('Contacts page – webservis.net', () => {
    test('should load Contacts page and show heading', async ({ page }) => {
        await page.goto('/contacts/');

        await expect(
            page.getByRole('heading', { name: /let’s build something great together/i })
        ).toBeVisible();
    });

    test('should display contact form fields', async ({ page }) => {
        await page.goto('/contacts/');

        // Prefer accessible locators: label -> input/textarea
        await expect(page.getByLabel('Name')).toBeVisible();
        await expect(page.getByLabel('Email')).toBeVisible();
        await expect(page.getByLabel('Message')).toBeVisible();

        // Optional: ensure fields are editable (not disabled)
        await expect(page.getByLabel('Name')).toBeEditable();
        await expect(page.getByLabel('Email')).toBeEditable();
        await expect(page.getByLabel('Message')).toBeEditable();

        // Keep this check if it's stable on the page
        const emailLink = page.getByRole('link', { name: /info@webservis\.net/i }).first();
        await expect(emailLink).toBeVisible();
        await expect(emailLink).toHaveAttribute('href', /mailto:info@webservis\.net/i);
    });
});
