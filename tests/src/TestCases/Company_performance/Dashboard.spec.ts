import { test, expect } from '@playwright/test';
import { LoginPage } from '../../PageObjects/LoginPage';
import { Dashboard } from '../../PageObjects/Dashboard';


test.describe('Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        test.setTimeout(120000);

        const Menuitem=page.locator('[aria-label="My Items"]');

        await page.goto('http://dtl.mastercardconnect.com/mcp-stage/dashboard');
        await page.locator('#onetrust-accept-btn-handler').click();
        await page.locator('[data-testid="button-primary"]').click();

        let loginPage = new LoginPage(page);
        let dashboard = new Dashboard(page);

        await loginPage.login('mcpadminusr', '1971');

        await dashboard.closeNotification();

        await Menuitem.click();

    });

    test('navigate to My Company Performance ', async ({ page }) => {
  
        let dashboard = new Dashboard(page);
    
        const [performancePage] = await Promise.all([
            page.context().waitForEvent('page'),
            page.locator('a:has-text("My Company Performance Stage")').click()
        ]);

        let headerTitle = await performancePage.locator('#page-header-title').textContent();

        expect(headerTitle).toEqual('My Company Performance');
    });

    test('1670 - INDIA performance for Acquirer', async ({ page }) => {

        let dashboard = new Dashboard(page);

        const [performancePage] = await Promise.all([
            page.context().waitForEvent('page'),
            page.locator('a:has-text("My Company Performance Stage")').click()
        ]);

        await dashboard.selectProcessor(performancePage, '1670 - INDIA');

        await dashboard.selectAcquirerType(performancePage);

        let value = await performancePage.locator('[data-testid="matrixTile_2"] .gaugeChartValue').textContent();
        await expect(value).toEqual('100%');
    });

    test('1477 - INDIA company performance for Issuer', async ({ page }) => {

        let dashboard = new Dashboard(page);

        const [performancePage] = await Promise.all([
            page.context().waitForEvent('page'),
            page.locator('a:has-text("My Company Performance Stage")').click()
        ]);

        await dashboard.selectIssuerType(performancePage);

        await dashboard.selectProcessor(performancePage, '1477 - INDIA');

        let value = await performancePage.locator('[data-testid="matrixTile_2"] .gaugeChartValue').textContent();
        await expect(value).toEqual('100%');

    });

    test("Info Icon visibility of Declines Card", async({page}) => {
        
        

    });


});
