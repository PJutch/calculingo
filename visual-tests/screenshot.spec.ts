import { test, expect, Page } from '@playwright/test';

function waitForMathJax(page: Page): Promise<void> {
  return page.locator(':has-text("\\\\")').first().waitFor({ state: 'detached' });
}

// all this tests require running storybook

test.describe('Screenshot tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.waitForLoadState('networkidle');
  });

  test('Menu test', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=pages-menu--default');
    await page.waitForTimeout(1000); // wait for storybook to load
    await waitForMathJax(page);
    await expect(page).toHaveScreenshot('menu.png');
  });

  test('Browse test', async ({ page }) => {
    // requires storybook started to work
    await page.goto('http://localhost:6006/iframe.html?id=pages-browse--default');
    await page.waitForTimeout(1000); // wait for storybook to load
    await expect(page).toHaveScreenshot('browse.png');
  });

  test('Edit test', async ({ page }) => {
    // requires storybook started to work
    await page.goto('http://localhost:6006/iframe.html?id=pages-edit--default');
    await page.waitForTimeout(1000); // wait for storybook to load
    await waitForMathJax(page);
    await expect(page).toHaveScreenshot('edit.png');
  });

  test('Task test', async ({ page }) => {
    // requires storybook started to work
    await page.goto('http://localhost:6006/iframe.html?id=pages-task--default');
    await page.waitForTimeout(1000); // wait for storybook to load
    await waitForMathJax(page);
    await expect(page).toHaveScreenshot('task.png');
  });

  test('Login test', async ({ page }) => {
    // requires storybook started to work
    await page.goto('http://localhost:6006/iframe.html?id=pages-login--default');
    await page.waitForTimeout(1000); // wait for storybook to load
    await expect(page).toHaveScreenshot('login.png');
  });
});
