import { test, expect } from '@playwright/test';

test.describe('Services page – webservis.net', () => {
    test('should load Services page and show heading', async ({ page }) => {
        await page.goto('/services/');

        await expect(
            page.getByRole('heading', { name: /what we can build for you/i })
        ).toBeVisible();
    });

    test('should show at least one "Starting Price" item', async ({ page }) => {
        await page.goto('/services/');

        // Strict-mode safe: assert there is at least one match
        const startingPrices = page.getByText(/starting price:/i);
        const count = await startingPrices.count();
        expect(count).toBeGreaterThan(0);
        await expect(startingPrices.first()).toBeVisible();
    });
});
