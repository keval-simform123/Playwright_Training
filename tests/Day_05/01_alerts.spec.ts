import { test, expect } from '@playwright/test';

// Trying browser alerts here, still learning
test('Handle a simple alert and accept it', async ({ page }) => {
  await page.goto('https://qaplayground.vercel.app/');

  // set up the alert handler before clicking
  page.once('dialog', async (dialog) => {
    console.log('Alert message:', dialog.message());
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Simple Alert' }).click();
});

test('Accept a confirm dialog', async ({ page }) => {
  await page.goto('https://qaplayground.vercel.app/');

  page.once('dialog', async (dialog) => {
    console.log('Dialog type:', dialog.type()); // this should say confirm
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Confirmation Alert' }).click();
});

test('Dismiss a confirm dialog', async ({ page }) => {
  await page.goto('https://qaplayground.vercel.app/');

  page.once('dialog', async (dialog) => {
    await dialog.dismiss();
  });

  await page.getByRole('button', { name: 'Confirmation Alert' }).click();
});

test('Fill in a prompt dialog and accept', async ({ page }) => {
  await page.goto('https://qaplayground.vercel.app/');

  page.once('dialog', async (dialog) => {
    // fill the prompt and press OK
    await dialog.accept('Playwright Automation');
  });

  await page.getByRole('button', { name: 'Prompt Alert' }).click();
});

test('Dismiss a prompt dialog without typing anything', async ({ page }) => {
  await page.goto('https://qaplayground.vercel.app/');

  page.once('dialog', async (dialog) => {
    await dialog.dismiss();
  });

  await page.getByRole('button', { name: 'Prompt Alert' }).click();
});