import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://todomakers.vercel.app/');
  await page.getByPlaceholder('enter a task').click();
  await page.getByPlaceholder('enter a task').fill(dynamicValues[0]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[1]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[2]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[3]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[4]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[5]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[6]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[7]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[8]);
  await page.getByRole('button', { name: 'Add task' }).click();
  await page.getByPlaceholder('enter a task').click();
  await page.getByPlaceholder('enter a task').fill(dynamicValues[2]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[9]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[10]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[11]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[12]);
  await page.getByRole('button', { name: 'Add task' }).click();
  await page.getByText('sjkksdfDelete').click();
  await page.locator('li').filter({ hasText: 'safsdDelete' }).getByRole('checkbox').check();
  await page.locator('li').filter({ hasText: 'sjkksdfDelete' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Delete' }).click();
});