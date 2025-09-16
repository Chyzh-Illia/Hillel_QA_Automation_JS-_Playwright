import { test as base, expect } from '@playwright/test';
import { BasePage } from '../Pages/BasePage.js';

export const test = base.extend({
  userGaragePage: async ({ page }, use) => {
    const garagePage = new BasePage(page, '/panel/garage');
    await garagePage.open();
    await expect(page.locator('a.sidebar_btn.-active')).toBeVisible();
    await use(garagePage);
  },
});

export { expect };
