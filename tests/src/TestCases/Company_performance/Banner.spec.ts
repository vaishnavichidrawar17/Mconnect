import { test, expect } from '@playwright/test';
import { LoginPage } from '../../PageObjects/LoginPage';
import { Dashboard } from '../../PageObjects/Dashboard';


test.describe('Banner Tests', () => {

    test.beforeEach(async ({ page }) => {
        test.setTimeout(120000);

        const Menuitem=page.locator('[aria-label="My Items"]');

        await page.goto('http://dtl.mastercardconnect.com/mcp-stage/dashboard');
        await page.locator('#onetrust-accept-btn-handler').click();
        await page.locator('[data-testid="button-primary"]').click();

        let loginPage = new LoginPage(page);
        let dashboard = new Dashboard(page);

        await loginPage.login('mcpadminusr', '1971');


    });
 
    test("Verify the maximum number of Banners on MCP DashBoard Page", async({page}) => {
    
        await page.locator('[data-testid="notification-close"]').nth(0).waitFor();
        const bannercount=await page.locator('.sc-aXZVg.sc-gEvEer.sc-dLMFU.ySXiI.PJepm.lfMCUs').count();
        await console.log( "number of Banners : ",bannercount);

        await expect(bannercount).toEqual(2);

    })

    test("Verify the text and hyperlink of Banner with colour code", async({page}) => {
    
        await page.locator("[data-testid='link-span-id']").nth(0).waitFor();
        const link =  page.locator("[data-testid='link-span-id']").nth(0);
        const color = await link.evaluate((element) => {
        return window.getComputedStyle(element).color;
         });
        console.log(color);

        await expect(link).toHaveCSS('color', 'rgb(196, 65, 0)');
        await expect(link).toContainText("Dam");
        
    });


})


