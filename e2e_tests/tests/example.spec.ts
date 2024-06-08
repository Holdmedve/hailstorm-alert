import { test, expect } from '@playwright/test';


test('search for city, click on suggestion, see temperature', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  
  page.locator("#city-searchbar").fill("Teramo");
  await page.waitForTimeout(1000);

  page.locator('.suggestion').first().click();
  await page.waitForTimeout(1000);

  await expect(page.locator('.city-temperature')).toBeVisible();
});
