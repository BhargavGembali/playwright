import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
const dynamicValues = [
  'B',
  'Bh',
  'Bha',
  'Bhar',
  'Bharg',
  'Bharga',
  'Bhargav',
  'd',
  'ds',
  'dsf',
  'dsfs',
  'dsfsd'
];

  await page.getByLabel('Phone number, username, or').click();
  await page.getByLabel('Phone number, username, or').fill(dynamicValues[0]);
  await page.getByLabel('Phone number, username, or').fill(dynamicValues[1]);
  await page.getByLabel('Phone number, username, or').fill(dynamicValues[2]);
  await page.getByLabel('Phone number, username, or').fill(dynamicValues[3]);
  await page.getByLabel('Phone number, username, or').fill(dynamicValues[4]);
  await page.getByLabel('Phone number, username, or').fill(dynamicValues[5]);
  await page.getByLabel('Phone number, username, or').fill(dynamicValues[6]);
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill(dynamicValues[7]);
  await page.getByLabel('Password').fill(dynamicValues[8]);
  await page.getByLabel('Password').fill(dynamicValues[9]);
  await page.getByLabel('Password').fill(dynamicValues[10]);
  await page.getByLabel('Password').fill(dynamicValues[11]);
  await page.locator('div').filter({ hasText: /^Log in$/ }).first().click();
});