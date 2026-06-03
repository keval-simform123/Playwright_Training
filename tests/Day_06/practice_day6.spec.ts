import { test, expect } from '@playwright/test';

// 1. Assertions
test('redbus homepage title assertion', async ({ page }) => {
  await page.goto('https://www.redbus.in');
  await expect(page).toHaveTitle(/redBus/i);
  await expect(page).toHaveURL(/redbus\.in/);
});


// 2. Soft Assertions
test('redbus soft assertions', async ({ page }) => {
  await page.goto('https://www.redbus.in');
  await expect.soft(page).toHaveTitle(/redBus/i);
  await expect.soft(page).toHaveURL(/redbus\.in/);
});

// 3. Auto Waiting
test('blinkit network idle wait', async ({ page }) => {
  await page.goto('https://blinkit.com');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/blinkit\.com/);
});

// 4. Screenshots and Videos
test('lakme full page screenshot', async ({ page }) => {
  await page.goto('https://www.lakmeindia.com');
  await page.waitForLoadState('domcontentloaded');
  await page.screenshot({ path: 'screenshots/lakme-full.png', fullPage: true });
  await expect(page).toHaveURL(/lakmeindia\.com/);
});

test('lakme element screenshot', async ({ page }) => {
  await page.goto('https://www.lakmeindia.com');
  await page.waitForLoadState('domcontentloaded');
  const header = page.locator('header').first();
  if (await header.isVisible()) {
    await header.screenshot({ path: 'screenshots/lakme-header.png' });
  }
  await expect(page).toHaveTitle(/.+/);
});

// 5. Trace Viewer
test('redbus trace recording', async ({ page, context }) => {
  await context.tracing.start({ screenshots: true, snapshots: true });
  await page.goto('https://www.redbus.in');
  await page.waitForLoadState('domcontentloaded');
  const from = page.locator('#src').first();
  if (await from.isVisible()) {
    await from.fill('Mumbai');
  }
  await context.tracing.stop({ path: 'traces/redbus-trace.zip' });
  await expect(page).toHaveURL(/redbus\.in/);
});

// 6. Parallel Execution
test.describe.configure({ mode: 'parallel' });

test('parallel - redbus loads', async ({ page }) => {
  await page.goto('https://www.redbus.in');
  await expect(page).toHaveURL(/redbus\.in/);
});

test('parallel - blinkit loads', async ({ page }) => {
  await page.goto('https://blinkit.com');
  await expect(page).toHaveURL(/blinkit\.com/);
});

test('parallel - lakme loads', async ({ page }) => {
  await page.goto('https://www.lakmeindia.com');
  await expect(page).toHaveURL(/lakmeindia\.com/);
});

test('parallel - redbus search page', async ({ page }) => {
  await page.goto('https://www.redbus.in');
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveTitle(/redBus/i);
});

// 7. Retries and Repeat
test('redbus page load with retry', async ({ page }) => {
  await page.goto('https://www.redbus.in', { timeout: 30000 });
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveTitle(/redBus/i);
});

for (let i = 1; i <= 3; i++) {
  test(`redbus repeat run ${i}`, async ({ page }) => {
    await page.goto('https://www.redbus.in');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/redbus\.in/);
  });
}

// 8. Timeouts
test('blinkit with custom timeout', async ({ page }) => {
  test.setTimeout(45000);
  await page.goto('https://blinkit.com', { timeout: 30000 });
  await page.waitForLoadState('domcontentloaded', { timeout: 20000 });
  await expect(page.locator('body')).toBeVisible({ timeout: 10000 });
});

test('redbus navigation timeout', async ({ page }) => {
  test.setTimeout(40000);
  page.setDefaultTimeout(20000);
  page.setDefaultNavigationTimeout(30000);
  await page.goto('https://www.redbus.in');
  await expect(page).toHaveURL(/redbus\.in/);
});

// 9. Debugging Techniques
test('redbus debug with evaluate', async ({ page }) => {
  page.on('pageerror', (err) => {
    console.error(err.message);
  });
  await page.goto('https://www.redbus.in');
  await page.waitForLoadState('domcontentloaded');
  const title = await page.evaluate(() => document.title);
  expect(title.length).toBeGreaterThan(0);
  await page.screenshot({ path: 'screenshots/debug-redbus.png' });
  await expect(page).toHaveURL(/redbus\.in/);
});

test('redbus debug element state', async ({ page }) => {
  await page.goto('https://www.redbus.in');
  await page.waitForLoadState('domcontentloaded');
  const from = page.locator('#src').first();
  const exists = (await from.count()) > 0;
  if (exists) {
    await expect(from).toBeVisible();
  }
  await page.screenshot({ path: 'screenshots/debug-redbus-element.png' });
  await expect(page).toHaveURL(/redbus\.in/);
});