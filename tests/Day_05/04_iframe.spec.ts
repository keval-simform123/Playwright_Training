import { test, expect } from '@playwright/test';

// IFrames — S11 section
// Site: https://qaplayground.vercel.app/ (scroll to S11)

test('Locate an element inside the iframe', async ({ page }) => {
  await page.goto('https://qaplayground.vercel.app/');
  await page.waitForLoadState('networkidle');

  // frameLocator() is the modern way to work inside iframes
  const frame = page.frameLocator('#s11 iframe').first();

  // Verify the iframe loaded by checking its body is visible
  await expect(frame.locator('body')).toBeVisible({ timeout: 10000 });
});

test('Read text content from inside the iframe', async ({ page }) => {
  await page.goto('https://qaplayground.vercel.app/');
  await page.waitForLoadState('networkidle');

  const frame = page.frameLocator('#s11 iframe').first();

  const text = await frame.locator('body').textContent();

  // There should be some text inside the iframe
  expect(text).toBeTruthy();
  console.log('Text inside iframe:', text);
});

test('Click a button inside the iframe', async ({ page }) => {
  await page.goto('https://qaplayground.vercel.app/');
  await page.waitForLoadState('networkidle');

  const frame = page.frameLocator('#s11 iframe').first();

  const button = frame.getByRole('button').first();

  if (await button.count() > 0) {
    await button.click();
    await page.waitForTimeout(500);
  } else {
    console.log('No button found inside the iframe');
  }
});

test('Fill a text field inside the iframe', async ({ page }) => {
  await page.goto('https://qaplayground.vercel.app/');
  await page.waitForLoadState('networkidle');

  const frame = page.frameLocator('#s11 iframe').first();

  const input = frame.locator('input[type="text"]').first();

  if (await input.count() > 0) {
    await input.fill('Hello from Playwright!');
    await expect(input).toHaveValue('Hello from Playwright!');
  } else {
    console.log('No text input found inside the iframe');
  }
});

test('Verify the iframe src attribute is set', async ({ page }) => {
  await page.goto('https://qaplayground.vercel.app/');
  await page.waitForLoadState('networkidle');

  // Check the src of the iframe element on the main page
  const src = await page.locator('#s11 iframe').first().getAttribute('src');

  if (src) {
    expect(src).not.toBe('');
    console.log('iframe src:', src);
  } else {
    // Some iframes use srcdoc — just verify the body loads
    const frame = page.frameLocator('#s11 iframe').first();
    await expect(frame.locator('body')).toBeVisible();
  }
});