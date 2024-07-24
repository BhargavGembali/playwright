import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
const dynamicValues = [
  'd',
  'dx',
  'dxd',
  'dxdf',
  'dxdfs',
  'dxdfsd',
  'dxdfsdf',
  'df',
  'dfs',
  'dfsd'
];

  await page.goto('https://todomakers.vercel.app/');
  await page.getByPlaceholder('enter a task').click();
  await page.getByPlaceholder('enter a task').fill(dynamicValues[0]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[1]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[2]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[3]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[4]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[5]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[6]);
  await page.getByRole('button', { name: 'Add task' }).click();
  await page.getByPlaceholder('enter a task').click();
  await page.getByPlaceholder('enter a task').fill(dynamicValues[0]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[7]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[8]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[9]);
  await page.getByRole('button', { name: 'Add task' }).click();
  await page.locator('li').filter({ hasText: 'dxdfsdfDelete' }).getByRole('checkbox').check();
  await page.locator('li').filter({ hasText: 'dfsdDelete' }).getByRole('checkbox').check();
});