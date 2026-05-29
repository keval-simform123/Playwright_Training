import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://qaplayground.com/bank');
  await expect(page.locator('h1')).toContainText('Welcome to SecureBank');
  await expect(page.locator('#app-title')).toContainText('SecureBank Demo');
  await expect(page.locator('#app-subtitle')).toContainText('Automation Testing Practice Application');
  await expect(page.locator('#username-label')).toContainText('Username');
  await expect(page.locator('#password-label')).toContainText('Password');
  await expect(page.locator('#remember-me-label')).toContainText('Remember me');
  await expect(page.getByTestId('username-input')).toBeVisible();
  await expect(page.getByTestId('password-input')).toBeVisible();
  await expect(page.getByTestId('remember-checkbox')).toBeVisible();
  await expect(page.getByTestId('login-button')).toBeVisible();
  await expect(page.getByTestId('clear-button')).toBeVisible();
  await page.getByTestId('username-input').click();
  await page.getByTestId('username-input').fill('admin');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('admin123');
  await page.getByTestId('toggle-password-btn').click();
  await page.getByTestId('remember-checkbox').click();
  await page.getByTestId('toggle-password-btn').click();
  await page.getByTestId('toggle-password-btn').click();
  await expect(page.getByTestId('toggle-password-btn')).toBeVisible();
  await page.getByTestId('login-button').click();
});