import { test, expect } from '@playwright/test';

test('Home should not log severe console errors @smoke', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/');

    // Allow some known noisy errors if needed later; for now keep it strict.
    expect(errors, `Console errors:\n${errors.join('\n')}`).toEqual([]);
});
