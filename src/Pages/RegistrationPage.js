import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { addAbortListener } from 'events';

export class RegistrationPage extends BasePage {
  constructor(page) {
    super(page, "/");
    this.signUp = page.getByRole('button', {name: 'Sign up'});
    this.signUpName = page.locator('input#signupName');
    this.signUpLastName = page.locator('input#signupLastName');
    this.signUpEmail = page.locator('input#signupEmail');
    this.signUpPassword = page.locator('input#signupPassword');
    this.signUpRepeatPassword = page.locator('input#signupRepeatPassword');
    this.registerButton = page.getByRole('button', {name: 'Register'});
    this.anotherHtmlElementPick = page.locator('body');
    this.nameRequired = page.locator('p', {hasText: 'Name required'});
    this.emailRequired = page.locator('p', {hasText: 'Email is incorrect'});
    this.passwordRequired = page.locator('p', {hasText: 'Password required'});
    this.passwordValidationMessage = page.locator('p', {hasText: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'});
  }

  async signUpButton() {
    await this.signUp.click();
  };

  async signUpNameVerify(text) {
    await this.signUp.click();
    await this.signUpName.click();
    await this.anotherHtmlElementPick.click();
    await expect(this.nameRequired).toHaveText(text);
    await expect(this.signUpName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  };

  async signUpLastNameVerify(text) {
    await this.signUp.click();
    await this.signUpLastName.click();
    await this.anotherHtmlElementPick.click();
    await expect(this.nameRequired).toHaveText(text);
    await expect(this.signUpLastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  };

  async signUpEmailVerify(email, option) {
    await this.signUp.click();
    await this.signUpEmail.fill(email);
    await this.signUpLastName.click();
    await expect(this.emailRequired).toHaveText(option);
    await expect(this.signUpEmail).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  };

  async signUpPasswordVerify(text) {
    await this.signUp.click();
    await this.signUpPassword.click();
    await this.anotherHtmlElementPick.click();
    await expect(this.passwordRequired).toHaveText(text);
    await expect(this.passwordRequired).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  };

  async signUpPasswordValidation(option, text) {
    await this.signUp.click();
    await this.signUpPassword.fill(option);
    await this.anotherHtmlElementPick.click();
    await expect(this.passwordValidationMessage).toHaveText(text);
    await expect(this.signUpPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  };

  async userRegistration(name, lastName, email, password, repeatPasword) {
    await this.signUp.click();
    await this.signUpName.fill(name);
    await this.signUpLastName.fill(lastName);
    await this.signUpEmail.fill(email);
    await this.signUpPassword.fill(password);
    await this.signUpRepeatPassword.fill(repeatPasword);
    await expect(this.registerButton).toBeEnabled();
  }


}
