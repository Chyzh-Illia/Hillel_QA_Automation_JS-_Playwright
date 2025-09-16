import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.loginButton = page.getByRole('button', {name: 'Sign In'});
        this.emailField = page.locator('input#signinEmail');
        this.passwordField = page.locator('input#signinPassword');
        this.rememberMe = page.locator('input#remember');
        this.pressLoginButton = page.getByRole('button', {name: 'Login'});
        this.waitingGarageContainer = page.locator('a.btn.btn-white.btn-sidebar.sidebar_btn.-active');

    }

    async clickLoginButton() {
        await this.loginButton.click();
    };

    async inputEmailField(email) {
        await this.emailField.fill(email);
        await expect(this.emailField).toHaveValue(email)
    };

    async inputPasswordField(password) {
        await this.passwordField.fill(password);
        await expect(this.passwordField).toHaveValue(password)
    };

    async checkRemeberMe() {
        await this.rememberMe.check();
    }

    async clickPressLoginButton() {
        await this.pressLoginButton.click();
    }

    async waitGarageContainer(){
        await expect(this.waitingGarageContainer).toBeVisible();
    }
}