import { LoginPage } from '../../src/Pages/LoginPage';
import { BasePage } from '../../src/Pages/BasePage';
import { test, expect } from '../../src/fixtures/userGaragePage';

test.describe('HTTP => Authorization qauto page', () => {
    test.beforeEach(async ({page}) => {
       const baseUrl = new BasePage(page, '/');
       await baseUrl.open();
    });

    // Previously used untill using fixtures
    // test('Click on the "Login" button, the garage page is opened', async ({page}) => {
    //     const authoriztionLogin = new LoginPage(page);
    //     await authoriztionLogin.clickLoginButton();
    //     await authoriztionLogin.inputEmailField(process.env.PLAYWRIGHT_USER_EMAIL);
    //     await authoriztionLogin.inputPasswordField(process.env.PLAYWRIGHT_USER_PASSWORD);
    //     await authoriztionLogin.checkRemeberMe();
    //     await authoriztionLogin.clickPressLoginButton();
    //     await authoriztionLogin.waitGarageContainer();
    // });

    test('User is already logged in and sees Garage page', async ({ userGaragePage }) => {
        await expect(userGaragePage._page.locator('a.sidebar_btn.-active')).toBeVisible();
    });
});