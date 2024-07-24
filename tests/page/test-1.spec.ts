import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
const dynamicValues = [
  'H',
  'He',
  'Hel',
  'Hell',
  'Hello',
  'Hello ',
  'I',
  'I ',
  'I a',
  'I am',
  'I am ',
  'I am B',
  'I am Bh',
  'I am Bha',
  'I am Bhar',
  'I am Bharg',
  'I am Bharga',
  'I am Bhargav'
];

  await page.goto('https://todomakers.vercel.app/');
  await page.getByPlaceholder('enter a task').click();
  await page.getByPlaceholder('enter a task').fill(dynamicValues[0]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[1]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[2]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[3]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[4]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[5]);
  await page.getByRole('button', { name: 'Add task' }).click();
  await page.getByPlaceholder('enter a task').click();
  await page.getByPlaceholder('enter a task').fill(dynamicValues[6]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[7]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[8]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[9]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[10]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[11]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[12]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[13]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[14]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[15]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[16]);
  await page.getByPlaceholder('enter a task').fill(dynamicValues[17]);
  await page.getByRole('button', { name: 'Add task' }).click();
});