import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

// Signing In
  await page.goto('https://qaplayground.com/bank');
  await page.getByTestId('username-input').click();
  await page.getByTestId('username-input').fill('admin');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('admin123');
  await page.getByTestId('remember-checkbox').click();
  await page.getByTestId('login-button').click();

//   Verifying the Home Page locators
  await expect(page.getByTestId('quick-add-account')).toBeVisible();
  await expect(page.getByTestId('quick-new-transaction')).toBeVisible();
  await expect(page.getByTestId('quick-view-accounts')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Quick Stats' })).toBeVisible();
  await expect(page.getByTestId('pinned-accounts-section').getByRole('heading', { name: 'Pinned Accounts' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Recent Transactions', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Primary Savings' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Checking Account' })).toBeVisible();
});

//