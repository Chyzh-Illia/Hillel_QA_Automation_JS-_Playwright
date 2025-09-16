import { test as setup } from '@playwright/test';
import { LoginPage } from '../../src/Pages/LoginPage.js';
import path from 'path';

const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/');
  await loginPage.clickLoginButton();
  await loginPage.inputEmailField(process.env.PLAYWRIGHT_USER_EMAIL);
  await loginPage.inputPasswordField(process.env.PLAYWRIGHT_USER_PASSWORD);
  await loginPage.checkRemeberMe();
  await loginPage.clickPressLoginButton();
  await loginPage.waitGarageContainer();

  await page.context().storageState({ path: authFile });
});
