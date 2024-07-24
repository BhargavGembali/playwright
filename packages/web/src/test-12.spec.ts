import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://todomarkers.vercel.app/');
  await page.goto('https://www.instagram.com/');
  await page.getByLabel('Phone number, username, or').click();
  await page.getByLabel('Password').click();
  await page.locator('div').filter({ hasText: /^Log in$/ }).first().click();
});