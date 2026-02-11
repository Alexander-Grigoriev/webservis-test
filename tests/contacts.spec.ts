import { test, expect } from '@playwright/test';
import { BasePage } from './pages/BasePage';

test.describe('Contacts page – webservis.net', () => {
    test('should load Contacts page and show heading', { tag: '@smoke' }, async ({ page }) => {
        const basePage = new BasePage(page);

        await page.goto('/');
        await basePage.header.goTo('Contacts');

        await expect(page).toHaveURL(/\/contacts\/?$/);
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

    test('should validate required fields before sending', { tag: '@smoke' }, async ({ page }) => {
        await page.goto('/contacts/');

        // Try submit without filling anything
        const submit = page.getByRole('button', { name: /send|submit/i });
        await submit.click();

        // HTML5 validation: at least one field becomes invalid
        const name = page.getByLabel(/name/i);
        const email = page.getByLabel(/email/i);

        // Using browser validation state is more stable than expecting specific error text
        await expect(name).toHaveJSProperty('validity.valid', false);
        await expect(email).toHaveJSProperty('validity.valid', false);

        // Enter invalid email to ensure email validation triggers
        await name.fill('Test User');
        await email.fill('not-an-email');
        await submit.click();

        await expect(email).toHaveJSProperty('validity.valid', false);
    });
});
