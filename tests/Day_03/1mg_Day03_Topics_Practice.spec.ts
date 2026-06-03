import { test, expect } from '@playwright/test';

// USING THE CSS locators:

// Search for paracetamol in 1mg.com and verify the search box locator
test('locate search box', async ({ page }) => {
  await page.goto('https://www.1mg.com/');

  const searchBox = page.locator('[placeholder="Search for Medicines and Health Products"]');
  await searchBox.click();
  await searchBox.fill('paracetamol');

  await expect(searchBox).toHaveValue('paracetamol');
});

// Verify that the logo of 1mg.com is visible on the homepage using css class locator
test('verify logo is visible', async ({ page }) => {
  await page.goto('https://www.1mg.com/');

  const logo = page.locator('.Header__logo__Ellyq.ImageLoader__img-loaded__nP9UD');
  await expect(logo).toBeVisible();
});



// USING THE X-Path locators:

// Verify that the cart icon is visible on the homepage using data-testid 
test('cart icon visible', async ({ page }) => {
  await page.goto('https://www.1mg.com/');

  // Use alt-text locator to find the cart icon
  const cart = page.getByAltText('cart icon');
  await expect(cart).toBeVisible();
});

// Verify that the location selector is visible on the homepage using xpath
test('location selector via xpath', async ({ page }) => {
  await page.goto('https://www.1mg.com/');

  const sel_location = page.locator('//*[@id="location-selector"]');
  await expect(sel_location).toBeVisible();
});

// Verify that the "Shop by health concerns" section is visible on the homepage using xpath
test('Shop by health concerns is visible', async ({ page }) => {
  await page.goto('https://www.1mg.com/');

  const sel_location = page.locator('//*[@id="app"]/main/div/div[3]/div/div[1]/div/div/div[1]/div/div/h2');
  await expect(sel_location).toBeVisible();
});

// Add an item to the cart and verify that the cart icon is updated using xpath
test('Add Item in Cart', async ({ page }) => {
  await page.goto('https://www.1mg.com/');
  await page.locator('//*[@id="app"]/main/div/div[3]/div/div[1]/div/div/div[2]/div/div[1]/div[1]/div/a/div').click();    
  await page.locator('//*[@id="app"]/main/div[1]/div/div/div[3]/div[5]/div/div[1]/a/div/div[2]/div/button').click();
  await page.locator('//*[@id="app"]/main/div[1]/div/div/div[3]/div[5]/div/div[1]/a/div/div[2]/div/div/button[2]/img').click();
  await page.locator('//*[@id="app"]/div[1]/div[1]/div[1]/div[2]/a[2]/img').hover();
  await page.locator('//*[@id="app"]/div[1]/div[1]/div[1]/div[2]/a[2]/img').click();
});

test('Lab Tests', async ({ page }) => {
  await page.goto('https://www.1mg.com/');
  await page.getByRole('link', { name: 'LAB TESTS' }).click();
  await expect(page.getByRole('textbox', { name: 'Search tests or full body' })).toBeVisible();

  // get by role locator to search for MRI test and click on it
  await page.getByRole('textbox', { name: 'Search tests or full body' }).click();
  await page.getByRole('textbox', { name: 'Search tests or full body' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Search tests or full body' }).fill('MRI');
  await page.getByRole('link', { name: 'MRI Lumbo-Sacral Spine (LS)' }).click();

  // get by text locator to verify the details of the test
  await expect(page.getByText('Know more about this test')).toBeVisible();
  await expect(page.getByText('Starts at:')).toBeVisible();
  await expect(page.locator('.PrimaryButton__buttonContainer__OMfyU.PrimaryButton__coral__NuuWa')).toBeVisible();
});

//