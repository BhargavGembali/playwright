import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.instagram.com/');
  await page.getByLabel('Phone number, username, or').click();
  await page.getByLabel('Phone number, username, or').fill(dynamicValues[7]);
  await page.getByLabel('Phone number, username, or').fill(dynamicValues[8]);
  await page.getByLabel('Phone number, username, or').fill(dynamicValues[9]);
  await page.getByLabel('Phone number, username, or').fill(dynamicValues[10]);
  await page.getByLabel('Phone number, username, or').fill(dynamicValues[11]);
  await page.getByLabel('Phone number, username, or').fill(dynamicValues[12]);
  await page.getByLabel('Phone number, username, or').fill(dynamicValues[13]);
  await page.getByLabel('Phone number, username, or').fill(dynamicValues[14]);
});