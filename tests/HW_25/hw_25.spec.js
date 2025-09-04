// @ts-check
import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../src/Pages/RegistrationPage';
import { BasePage } from '../../src/Pages/BasePage';

test.describe('verifying negative cases', () => {
    test.beforeEach(async ({page}) => {
       const baseUrl = new BasePage(page, '/');
       await baseUrl.open();
    });

    test('Open SignUp modal window => validation required "Name" field text', async ( {page} ) => {
        const verifyNameInput = new RegistrationPage(page);
        await verifyNameInput.signUpNameVerify('Name required');
    });

    test('Open SignUp modal window => validation required "Last Name" field text', async ( {page} ) => {
        const verifyLastNameInput = new RegistrationPage(page);
        await verifyLastNameInput.signUpLastNameVerify('Last name required')
    });

    test('Open SignUp modal window => validation entry "Email" field text', async ( {page} ) => {
        const verifyEmailInput = new RegistrationPage(page);
        await verifyEmailInput.signUpEmailVerify('chyzh.illiagmail.com', 'Email is incorrect');
    });

    test('Open SignUp modal window => validation required "Password" field text', async ( {page} ) => {
        const verifyPasswordInput = new RegistrationPage(page);
        await verifyPasswordInput.signUpPasswordVerify('Password required');
    })

    test('Open SignUp modal window => validation entry "Password" field', async ( {page})  => {
        const validationPasswordInput = new RegistrationPage(page);
        await validationPasswordInput.signUpPasswordValidation('123', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    })

    test('Open SignUp modal window => Registaration without click on the "Register" button', async ( {page} ) => {
        const registrationPassing = new RegistrationPage(page);
        await registrationPassing.userRegistration('Illia', 'Chyzh', 'chyzh.illia@gmail.com', 'X4x12xdatax', 'X4x12xdatax')
    });
});