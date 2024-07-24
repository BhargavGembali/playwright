import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.instagram.com/');
  await page.getByLabel('Phone number, username, or').click();
  await page.getByLabel('Phone number, username, or').fill('jhbasbda');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('sadasfas');
  await page.getByRole('button', { name: 'Log in', exact: true }).click();
});