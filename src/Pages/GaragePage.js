import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class GaragePage extends BasePage {
    constructor(page) {
        super(page);
        this.myProfileDropdown = page.locator('button#userNavDropdown');
        this.profileOption = page.locator('a.dropdown-item.btn.btn-link.user-nav_link', {hasText: 'Profile'});
        this.garageSidebar = page.locator('a.btn.btn-white.btn-sidebar.sidebar_btn.-active', {hasText: 'Garage'});
        this.carAudiCreated = page.locator('p.car_name.h2')
    }    

    async clickProfileDropdown() {
        await this.myProfileDropdown.click();
    }

    async selectProfileOption() {
        await this.profileOption.click();
    }

    async clickGarageSidebar() {
        await this.garageSidebar.click();
    }

    async createdCarAudiIsVisible() {
        await expect(this.carAudiCreated).toBeVisible();
    }


}