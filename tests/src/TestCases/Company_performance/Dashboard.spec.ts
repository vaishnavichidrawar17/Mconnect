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

    test("Verify the text of all the hyperlinks under Help", async({page}) => {

        await page.locator('[aria-label="Help"]').click();
        await page.locator("[data-track-click='Navigation: Help Center']").click();

        const connectoverview = await page.locator("[data-track-click='Help Center: Connect overview link']");
        const textconnectoverview= await connectoverview.textContent();
        await expect(textconnectoverview).toEqual("Connect overview");

        const watchthisshortvideo= await page.locator("[data-track-click='Help Center: Basics of Connect video']");
        const textofwatchthisshortvideo= await watchthisshortvideo.textContent();
        await expect(textofwatchthisshortvideo).toEqual("watch this short video");
                    
        const Connectadministration= await page.locator("[data-track-click='Help Center: Connect administration link']");
        const textofConnectadministration= await Connectadministration.textContent();
        await expect(textofConnectadministration).toEqual("Connect administration");

        const Findageneralsupportphonenumber= await page.locator(".sc-fUnMCh.c--72i7w0.OPQDa.eHBRNG [data-testid='link-span-id']").nth(0);
        const textofFindageneralsupportphonenumber= await Findageneralsupportphonenumber.textContent();
        await expect(textofFindageneralsupportphonenumber).toEqual("Find a general support phone number");

        const Findagatewaysupportphonenumber= await page.locator(".sc-fUnMCh.c--72i7w0.OPQDa.eHBRNG [data-testid='link-span-id']").nth(1);
        const textofFindagatewaysupportphonenumber= await Findagatewaysupportphonenumber.textContent();
        await expect(textofFindagatewaysupportphonenumber).toEqual("Find a Gateway support phone number");

        const Createandviewyoursupportcases= await page.locator(".sc-fUnMCh.c--72i7w0.OPQDa.eHBRNG [data-testid='link-span-id']").nth(2);
        const textofCreateandviewyoursupportcases= await Createandviewyoursupportcases.textContent();
        await expect(textofCreateandviewyoursupportcases).toEqual("Create and view your support cases");

        const Findaform= await page.locator(".sc-fUnMCh.c--72i7w0.OPQDa.eHBRNG [data-testid='link-span-id']").nth(3);
        const textofFindaform= await Findaform.textContent();
        await expect(textofFindaform).toEqual("Find a form");

    })

    test("Verify the response status of each url to be success(200)", async({page , request}) => {
        await page.locator('[aria-label="Help"]').click();
        await page.locator("[data-track-click='Navigation: Help Center']").click();

        const links = page.locator('[data-testid="link-span-id"]');
        const count = await links.count();

        for (let i = 0; i < count; i++) {
        const href = await links.nth(i).getAttribute('href');

        if (href && href.startsWith('http')) {
        const response = await request.get(href);

        console.log(href, response.status());

        expect(response.status()).toBe(200);
    }
}
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

    test("Info Icon visibility/functionality of Declines Card", async ({ page }) => {
        let dashboard = new Dashboard(page);

        const [performancePage] = await Promise.all([
            page.context().waitForEvent('page'),
            page.locator('a:has-text("My Company Performance Stage")').click()
        ]);
        await page.locator("button[aria-label='More information about this metric - DECLINES'] svg").isVisible();
        await page.locator("button[aria-label='More information about this metric - DECLINES'] svg").hover();
        
        const infotext = await page.locator('div.sc-aXZVg.sc-gEvEer.sc-bVHCgj.ySXiI.PJepm.eCidp:visible').textContent();
        await expect(infotext).toContain("DECLINE MATRICES CALCULATION");
        const headerText = await page.locator('strong:has-text("DECLINE MATRICES CALCULATION")').textContent();
        await expect(headerText).toEqual("DECLINE MATRICES CALCULATION ");
    });


    test("Verify Decline Card Visibility", async({page}) => {
        let dashboard = new Dashboard(page);

        const [performancePage] = await Promise.all([
            page.context().waitForEvent('page'),
            page.locator('a:has-text("My Company Performance Stage")').click()
            ]);
        await page.locator("[data-testid='matrixTile_2']").isVisible();

        await expect(page.locator('[data-testid="matrixTile_2"] .tileHeading')).toContainText('DECLINES');

    })

    test("Info Icon visibility/functionality of CHARGEBACKS Card", async ({ page }) => {
        let dashboard = new Dashboard(page);

        const [performancePage] = await Promise.all([
            page.context().waitForEvent('page'),
            page.locator('a:has-text("My Company Performance Stage")').click()
        ]);
        await page.locator("button[aria-label='More information about this metric - CHARGEBACKS'] svg").isVisible();
        await page.locator("button[aria-label='More information about this metric - CHARGEBACKS'] svg").hover();
        
        const infotext = await page.locator("div[class='sc-aXZVg sc-gEvEer sc-cVzyXs ySXiI PJepm fBLuYk'] span:nth-child(1)").textContent();
        await expect(infotext).toContain("CHARGEBACK MATRICES CALCULATION");
        const headerText = await page.locator('strong:has-text("CHARGEBACK MATRICES CALCULATION")').textContent();
        await expect(headerText).toEqual("CHARGEBACK MATRICES CALCULATION");
    });


    test("Verify CHARGEBACKS Card Visibility", async({page}) => {
        let dashboard = new Dashboard(page);

        const [performancePage] = await Promise.all([
            page.context().waitForEvent('page'),
            page.locator('a:has-text("My Company Performance Stage")').click()
            ]);
        await page.locator("[data-testid='matrixTile_1']").isVisible();

        await expect(page.locator('[data-testid="matrixTile_1"] .tileHeading')).toContainText('CHARGEBACKS');

    })

     test("Info Icon visibility/functionality of FRAUD Card", async ({ page }) => {
        let dashboard = new Dashboard(page);

        const [performancePage] = await Promise.all([
            page.context().waitForEvent('page'),
            page.locator('a:has-text("My Company Performance Stage")').click()
        ]);
        await page.locator("button[aria-label='More information about this metric - FRAUD'] svg").isVisible();
        await page.locator("button[aria-label='More information about this metric - FRAUD'] svg").hover();
        
        const infotext = await page.locator('div.sc-aXZVg.sc-gEvEer.sc-bJBgwP.ySXiI.PJepm.bZRgXw:visible').textContent();
        await expect(infotext).toContain("FRAUD MATRICES CALCULATION");
        const headerText = await page.locator('strong:has-text("FRAUD MATRICES CALCULATION")').textContent();
        await expect(headerText).toEqual(" FRAUD MATRICES CALCULATION");
    });


    test("Verify FRAUD Card Visibility", async({page}) => {
        let dashboard = new Dashboard(page);

        const [performancePage] = await Promise.all([
            page.context().waitForEvent('page'),
            page.locator('a:has-text("My Company Performance Stage")').click()
            ]);
        await page.locator("[data-testid='matrixTile_0']").isVisible();

        await expect(page.locator('[data-testid="matrixTile_0"] .tileHeading')).toContainText('FRAUD');

    })


    test("Verify ICA number display", async({page}) => {
         let dashboard = new Dashboard(page);

        const [performancePage] = await Promise.all([
            page.context().waitForEvent('page'),
            page.locator('a:has-text("My Company Performance Stage")').click()
            ]);
        const cards = page.locator('div.matrixTileWrapper .gaugeChartIca');
        await expect(cards).toHaveCount(3);
        for (let i = 0; i < 3; i++) {
        await expect(cards.nth(i)).toContainText('ICA 5');
    }

    });

    test("Verify Gauge Chart Rendering", async({page}) => {
        let dashboard = new Dashboard(page);

        const [performancePage] = await Promise.all([
            page.context().waitForEvent('page'),
            page.locator('a:has-text("My Company Performance Stage")').click()
            ]);
        const cards = page.locator('div.matrixTileWrapper .gaugeChartVisual');
        await expect(cards).toHaveCount(3);
        for (let i = 0; i < 3; i++) {
        const Gaugechart= await cards.nth(i);
        await expect(Gaugechart).toBeVisible();
    }   

    });

    test("Verify percentage calculation and peer comparison", async({page}) => {
         let dashboard = new Dashboard(page);

        const [performancePage] = await Promise.all([
            page.context().waitForEvent('page'),
            page.locator('a:has-text("My Company Performance Stage")').click()
            ]);
        const cards = page.locator('div.matrixTileWrapper .tilePeersFooter');
        await expect(cards).toHaveCount(3);
        for (let i = 0; i < 3; i++) {
        const percentagepeer= await cards.nth(i);
        await expect(percentagepeer).toBeVisible();    
    }    

    });


});
