import { Locator, Page } from "@playwright/test";

export class LoginPage {
    page: Page;
    usernameInputField: Locator;
    passwordInputField: Locator
    submitButton: Locator;

    
    constructor(page:Page){
        this.page = page;
        this.usernameInputField = page.locator('#ConnectInput0-ref-id'); 
        this.passwordInputField = page.locator('#ConnectInput1-ref-id');
        this.submitButton = page.locator('[name="submit"]'); 
    }

    async login(username: string, password:string){
        await this.usernameInputField.fill(username);
        await this.passwordInputField.fill(password);
        await this.submitButton.click();

        

    }

}

 
        // await page.locator('#ConnectInput0-ref-id').fill('mcpadminusr');
        // await page.locator('#ConnectInput1-ref-id').fill('1971');
        // await page.locator('[name="submit"]').click();
        // await expect(page).toHaveURL('https://dtl.mastercardconnect.com/mcp-stage/dashboard');
        // console.log('Page heading: ', await page.getByText('Dashboard').textContent());
        // //toBeVisible gives Playwright's proper auto-waiting and retry behavior
        // await expect( page.getByText('Dashboard')).toBeVisible();
