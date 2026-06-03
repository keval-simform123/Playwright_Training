import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://qaplayground.com/bank');
  await page.getByTestId('username-input').click();
  await page.getByTestId('username-input').fill('admin');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('admin123');
  await page.getByTestId('login-button').click();
  await page.getByTestId('quick-add-account').click();
  await page.getByTestId('account-name-input').click();
  await page.getByTestId('account-name-input').press('CapsLock');
  await page.getByTestId('account-name-input').fill('TSA-T');
  await page.getByTestId('account-name-input').press('CapsLock');
  await page.getByTestId('account-name-input').fill('TSA-The Saving ');
  await page.getByTestId('account-name-input').press('CapsLock');
  await page.getByTestId('account-name-input').fill('TSA-The Saving A');
  await page.getByTestId('account-name-input').press('CapsLock');
  await page.getByTestId('account-name-input').fill('TSA-The Saving Account');
  await page.getByTestId('account-type-select').click();
  await page.getByRole('option', { name: 'Savings Account' }).click();
  await page.getByTestId('initial-balance-input').click();
  await page.getByTestId('initial-balance-input').fill('45000');
  await page.getByTestId('status-active-radio').click();
  await page.getByTestId('save-account-button').click();
  await expect(page.getByRole('cell', { name: 'Edit account TSA-The Saving' })).toBeVisible();
  await expect(page.locator('#filters-section')).toBeVisible();
  await expect(page.locator('#search-filter-container')).toBeVisible();
  await expect(page.getByTestId('search-input')).toBeVisible();
  await expect(page.getByText('Total Balance')).toBeVisible();
  await expect(page.getByText('Total Accounts')).toBeVisible();
  await expect(page.getByTestId('accounts-summary-bar').getByText('Active')).toBeVisible();
});
//