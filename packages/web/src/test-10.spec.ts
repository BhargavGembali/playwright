import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://todomakers.vercel.app/');
  await page.getByPlaceholder('enter a task').click();
  await page.getByPlaceholder('enter a task').click();
  await page.getByRole('button', { name: 'Add task' }).click();
  await page.getByPlaceholder('enter a task').click();
  await page.getByRole('button', { name: 'Add task' }).click();
  await page.locator('li').filter({ hasText: 'ddfdfdfDelete' }).getByRole('checkbox').check();
  await page.locator('li').filter({ hasText: 'dgfdfDelete' }).getByRole('checkbox').check();
  await page.locator('li').filter({ hasText: 'ddfdfdfDelete' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Delete' }).click();
});