import { test, expect } from '@playwright/test';

test.describe('Menu visual tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.waitForLoadState('networkidle');
  });

  test('Primary test', async ({ page }) => {
    // requires storybook started to work
    await page.goto('http://localhost:6006/iframe.html?id=pages-menu--default');
    await page.waitForTimeout(3000); // wait some time for MathJax to load
    await expect(page).toHaveScreenshot('menu.png');
  });
});
