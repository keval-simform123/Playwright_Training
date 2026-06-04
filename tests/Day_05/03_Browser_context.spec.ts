import { test, expect, chromium } from '@playwright/test';

test('Two separate contexts should not share cookies', async () => {
  const browser = await chromium.launch();

  const contextA = await browser.newContext();
  const contextB = await browser.newContext();

  const pageA = await contextA.newPage();
  const pageB = await contextB.newPage();

  await pageA.goto('https://qaplayground.vercel.app/');
  await pageB.goto('https://qaplayground.vercel.app/');

  // add a cookie in only one context
  await contextA.addCookies([{
    name: 'session_test',
    value: 'context_a_only',
    domain: 'qaplayground.vercel.app',
    path: '/',
  }]);

  const cookiesA = await contextA.cookies();
  const cookiesB = await contextB.cookies();

  // check that the other context cannot see it
  expect(cookiesA.find(c => c.name === 'session_test')?.value).toBe('context_a_only');
  expect(cookiesB.find(c => c.name === 'session_test')).toBeUndefined();

  await contextA.close();
  await contextB.close();
  await browser.close();
});

test('Two separate contexts should not share localStorage', async () => {
  const browser = await chromium.launch();

  const context1 = await browser.newContext();
  const context2 = await browser.newContext();

  const page1 = await context1.newPage();
  const page2 = await context2.newPage();

  await page1.goto('https://qaplayground.vercel.app/');
  await page2.goto('https://qaplayground.vercel.app/');

  // put data in localStorage for just page1
  await page1.evaluate(() => {
    localStorage.setItem('user', 'QA_Engineer');
  });

  // page2 should not see the stored value
  const valueInPage2 = await page2.evaluate(() => localStorage.getItem('user'));
  const valueInPage1 = await page1.evaluate(() => localStorage.getItem('user'));

  expect(valueInPage1).toBe('QA_Engineer');
  expect(valueInPage2).toBeNull();

  await context1.close();
  await context2.close();
  await browser.close();
});

test('Set a cookie and verify it persists within the same context', async ({ context, page }) => {
  await page.goto('https://qaplayground.vercel.app/');

  await context.addCookies([{
    name: 'test_cookie',
    value: 'playwright_rocks',
    domain: 'qaplayground.vercel.app',
    path: '/',
  }]);

  // reload and make sure cookie still exists
  await page.reload();

  const cookies = await context.cookies();
  const myCookie = cookies.find(c => c.name === 'test_cookie');

  expect(myCookie).toBeDefined();
  expect(myCookie?.value).toBe('playwright_rocks');
});

test('Clear cookies and verify they are gone', async ({ context, page }) => {
  await page.goto('https://qaplayground.vercel.app/');

  // first set a cookie
  await context.addCookies([{
    name: 'temp_cookie',
    value: 'to_be_deleted',
    domain: 'qaplayground.vercel.app',
    path: '/',
  }]);

  // make sure cookie is there
  let cookies = await context.cookies();
  expect(cookies.find(c => c.name === 'temp_cookie')).toBeDefined();

  // delete cookies now
  await context.clearCookies();

  // check the cookie disappeared
  cookies = await context.cookies();
  expect(cookies.find(c => c.name === 'temp_cookie')).toBeUndefined();
});

test('Desktop and mobile contexts have different viewport widths', async () => {
  const browser = await chromium.launch();

  const desktopContext = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
  });

  const desktopPage = await desktopContext.newPage();
  const mobilePage = await mobileContext.newPage();

  await desktopPage.goto('https://qaplayground.vercel.app/');
  await mobilePage.goto('https://qaplayground.vercel.app/');

  const desktopWidth = await desktopPage.evaluate(() => window.innerWidth);
  const mobileWidth = await mobilePage.evaluate(() => window.innerWidth);

  expect(desktopWidth).toBe(1920);
  expect(mobileWidth).toBe(375);

  await desktopContext.close();
  await mobileContext.close();
  await browser.close();
});