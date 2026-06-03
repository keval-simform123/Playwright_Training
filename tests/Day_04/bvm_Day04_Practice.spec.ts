import { test, expect } from '@playwright/test';


// Dropdown Handling on Hovering and clicking on options
test('Academics dropdown practice', async ({ page }) => {

  // Opening website
  await page.goto('https://www.bvmengineering.ac.in/');

  await page.getByRole('button', { name: 'Close important news popup' }).click();

  // Hover Dropdown to open it
  await page.getByRole('link', { name: 'Academics' }).hover();

  await page.waitForTimeout(1000);

  // Selecting option from dropdown   
  await page.getByRole('link', { name: 'Fee Structure' }).click();

  await page.goto('https://www.bvmengineering.ac.in/');
  await page.getByRole('button', { name: 'Close important news popup' }).click();

    // Hovering Department dropdown
  await page.getByRole('link', { name: 'Department ' }).hover();

    // Selecting option from dropdown
  await page.getByRole('link', { name: 'Electronics', exact: true }).click();

});


// Dropdown using the selectOption() method
test('Select category from Amazon search dropdown', async ({ page }) => {
  await page.goto('https://www.amazon.in');

  const dropdown = page.locator('#searchDropdownBox');

  // Select by value
  await dropdown.click(); // Open the dropdown
  await dropdown.selectOption({ value: 'search-alias=electronics' });
  await expect(dropdown).toHaveValue('search-alias=electronics');
});

