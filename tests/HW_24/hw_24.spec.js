// @ts-check
import { test, expect } from '@playwright/test';
import { text } from 'stream/consumers';

test.describe('verifying negative cases', () => {
    test.beforeEach(async ({page}) => {
       await page.goto('/')
    });

    test('Open SignUp modal window => validation required "Name" field text', async ( {page} ) => {
        await page.getByRole('button', {name: 'Sign up'}).click();
        await page.locator('input#signupName').click();
        await page.locator('body').click();
        await expect(page.locator('p', {hasText: 'Name required'})).toHaveText('Name required');
    });

    test('Open SignUp modal window => validation required "Last Name" field text', async ( {page} ) => {
        await page.getByRole('button', {name: 'Sign up'}).click();
        await page.locator('input#signupLastName').click();
        await page.locator('body').click();
        await expect(page.locator('p', {hasText: 'Last name required'})).toHaveText('Last name required');
    });

    test('Open SignUp modal window => validation entry "Email" field text', async ( {page} ) => {
        await page.locator('button.hero-descriptor_btn.btn.btn-primary').click();
        await page.locator('input#signupEmail').fill('chyzh.illiagmail.com');
        await page.locator('input#signupLastName').click();
        await expect(page.locator('p', {hasText: 'Email is incorrect'})).toHaveText('Email is incorrect');
    });

    test('Open SignUp modal window => validation required "Password" field text', async ( {page} ) => {
        await page.locator('button.hero-descriptor_btn.btn.btn-primary').click();
        await page.locator('input#signupPassword').click();
        await page.locator('body').click();
        await expect(page.locator('p', {hasText: 'Password required'})).toHaveText('Password required');
    })

    test('Open SignUp modal window => validation entry "Password" field', async ( {page})  => {
        await page.locator('button.hero-descriptor_btn.btn.btn-primary').click();
        await page.locator('input#signupPassword').fill('123');
        await page.locator('body').click();
        await expect(page.locator('p', {hasText: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'})).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    })

    test('Open SignUp modal window => Registaration without click on the "Register" buttno', async ( {page} ) => {
        await page.locator('button.hero-descriptor_btn.btn.btn-primary').click();
        await page.locator('input#signupName').fill('Illia');
        await page.locator('input#signupLastName').fill('Chyzh');
        await page.locator('input#signupEmail').fill('chyzh.illia@gmail.com');
        await page.locator('input#signupPassword').fill('X4x12xdatax.');
        await page.locator('input#signupRepeatPassword').fill('X4x12xdatax.');
        await expect(page.getByRole('button', {name: 'Register'})).toBeEnabled();
    });
});