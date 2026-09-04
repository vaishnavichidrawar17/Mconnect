import { Locator, Page } from "@playwright/test";

export class Dashboard {
    page: Page;
        
    constructor(page:Page){
        this.page = page;   
    }

    async closeNotification(){
        // await this.page.locator('[data-testid="notification-close"]').nth(2).click();
        await this.page.locator('[data-testid="notification-close"]').nth(1).click();
        await this.page.locator('[data-testid="notification-close"]').nth(0).click();
    }

    async navigatePage(){
        await this.page.locator('[aria-label="My Items"]').click();
        const [performancePage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.page.locator('a:has-text("My Company Performance Stage")').click()
        ]);
        return performancePage;
    }

    async selectIssuerType(newPage: Page){
        await newPage.locator(':text-is("Acquirer")').first().click();
        await newPage.locator('button:has-text("Issuer")').click();
    }

    async selectProcessor(newPage: Page, input : string){
        await newPage.locator('#ica-selector-label-selector-field').click();
        const searchInput = newPage.locator('[data-testid="IcaDropdown"] [data-testid="menu-search-input"]');
        searchInput.click();
        searchInput.fill(input);
        await searchInput.press('Enter');
        await newPage.waitForLoadState('networkidle');
        let value = `button:has-text("${input}")`;
        await newPage.locator(value).click();

        await newPage.waitForLoadState('networkidle');

    }
    
    async selectAcquirerType(newPage: Page){
        await newPage.locator(':text-is("Acquirer")').first().click();
        await newPage.locator('button:has-text("Acquirer")').click();

        await newPage.waitForLoadState('networkidle');
    }
    

}

 
        // await page.locator('#ConnectInput0-ref-id').fill('mcpadminusr');
        // await page.locator('#ConnectInput1-ref-id').fill('1971');
        // await page.locator('[name="submit"]').click();
        // await expect(page).toHaveURL('https://dtl.mastercardconnect.com/mcp-stage/dashboard');
        // console.log('Page heading: ', await page.getByText('Dashboard').textContent());
        // //toBeVisible gives Playwright's proper auto-waiting and retry behavior
        // await expect( page.getByText('Dashboard')).toBeVisible();
