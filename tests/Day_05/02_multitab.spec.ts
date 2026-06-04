import { test, expect } from '@playwright/test';


test('Open a new tab and check its URL', async ({ context, page }) => {
  await page.goto('https://qaplayground.vercel.app/');

  // wait for the new tab while clicking the button
  const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('button', { name: 'Open New Tab' }).click(),
  ]);

  await newTab.waitForLoadState('domcontentloaded');

  // check the new tab opened properly
  console.log('New tab URL:', newTab.url());
  expect(newTab.url()).not.toBe('about:blank');

  await newTab.close();
});

test('Switch between two tabs', async ({ context, page }) => {
  await page.goto('https://qaplayground.vercel.app/');

  const [secondTab] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('button', { name: 'Open New Tab' }).click(),
  ]);

  await secondTab.waitForLoadState('domcontentloaded');

  // go back to first tab to verify the URL
  await page.bringToFront();
  await expect(page).toHaveURL('https://qaplayground.vercel.app/');

  // then bring the second tab front
  await secondTab.bringToFront();
  console.log('Second tab URL:', secondTab.url());

  await secondTab.close();
});

test('Interact with input and dropdown inside the window panel', async ({ page }) => {
  await page.goto('https://qaplayground.vercel.app/');

  // this page has a fake window panel to test
  const windowPanel = page.locator('#s20');

  const input = windowPanel.locator('input[type="text"]').first();
  await input.fill('Hello from Playwright');
  await expect(input).toHaveValue('Hello from Playwright');

  // choose an option from the dropdown
  const dropdown = windowPanel.locator('select');
  await dropdown.selectOption({ label: 'Option Alpha' });
  await expect(dropdown).toHaveValue('alpha');
});