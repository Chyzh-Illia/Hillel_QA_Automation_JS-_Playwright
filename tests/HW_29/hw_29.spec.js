import { LoginPage } from '../../src/Pages/LoginPage';
import { BasePage } from '../../src/Pages/BasePage';
import { test, expect } from '../../src/fixtures/userGaragePage';
import { GaragePage } from '../../src/Pages/GaragePage';
import { ok } from 'assert';
import { exec } from 'child_process';

test.describe('HTTP => Authorization qauto page', () => {
    test.beforeEach(async ({page}) => {
       const baseUrl = new BasePage(page, '/');
       await baseUrl.open();
    });

    test('Intercepting API Profile request => Creating cars with request', async ({request, page, userGaragePage }) => {
        const garage = new GaragePage(page);
        await page.route('**/api/users/profile', async route => {
        const fakeProfile = {
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
            data: {
                lastName: "Illia",
                name: "Chyzh",
                photoFilename: "default-user.png",
                userId: 254299 }
            }),
        };
        await route.fulfill(fakeProfile);
        });
        await expect(userGaragePage._page.locator('a.sidebar_btn.-active')).toBeVisible();
        await garage.clickProfileDropdown();
        await garage.selectProfileOption();
        await page.waitForURL("**/panel/profile");
        await expect(page.locator('p.profile_name.display-4')).toHaveText('Chyzh Illia');
        await page.goto('/panel/garage');
        await page.waitForURL("**/panel/garage");
        const response = await page.request.post('/api/cars', {
            data: {
            carBrandId: 1,
            carModelId: 1,
            mileage: 1000
            }
        });
        await expect(response.ok()).toBeTruthy();
        await page.waitForURL("**/panel/garage");
        const body = await response.json();
        await console.log(body);
        const carId = body.data.id;
        const responseDelete = await page.request.delete(`/api/cars/${carId}`, {
            data: {
                "status": "ok",
                "data": {
                    "carId": 1
                }
            }
        });
        await expect(responseDelete.ok()).toBeTruthy();
        const bodyCarDeleted = await responseDelete.json();
        await console.log(bodyCarDeleted);
        await page.waitForURL("**/panel/garage");
    });
});