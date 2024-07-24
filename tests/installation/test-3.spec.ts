import { test, expect } from '@playwright/test';
import { dynamicValues } from 'packages/playwright-core/lib/client/dynamicValues';

test('test', async ({ page }) => {
  // Recording...
await page.goto('https://www.instagram.com/');
await page.getByLabel('Phone number, username, or').click();
await page.getByLabel('Phone number, username, or').fill(dynamicValues[0]);
await page.getByLabel('Phone number, username, or').fill(dynamicValues[1]);
await page.getByLabel('Phone number, username, or').fill(dynamicValues[2]);
await page.getByLabel('Password').click();
await page.getByLabel('Password').fill(dynamicValues[3]);
await page.getByLabel('Password').fill(dynamicValues[4]);
await page.getByLabel('Password').fill(dynamicValues[5]);
});