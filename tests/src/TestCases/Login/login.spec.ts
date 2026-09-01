import { test, expect } from '@playwright/test';
import { LoginPage } from '../../PageObjects/LoginPage';

test.describe('Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        test.setTimeout( 120000);
        await page.goto('http://dtl.mastercardconnect.com/mcp-stage/dashboard');
        await page.locator('#onetrust-accept-btn-handler').click();
        // await page.locator('button.sc-aXZVg').click();
        await page.locator('[data-testid="button-primary"]').click();
    });

    test('TC_LOGIN_000 - Login with valid credentials using common method', async ({ page }) => {

        let loginPage = new LoginPage(page);
        
        await loginPage.login('mcpadminusr', '1971');

        await expect(page).toHaveURL('https://dtl.mastercardconnect.com/mcp-stage/dashboard');
        await expect( page.getByText('Dashboard')).toBeVisible();
      
    });
    
    test('TC_LOGIN_001 - Login with valid credentials', async ({ page }) => {

        await page.locator('#ConnectInput0-ref-id').fill('mcpadminusr');
        await page.locator('#ConnectInput1-ref-id').fill('1971');
        await page.locator('[name="submit"]').click();
        await expect(page).toHaveURL('https://dtl.mastercardconnect.com/mcp-stage/dashboard');
        console.log('Page heading: ', await page.getByText('Dashboard').textContent());
        //toBeVisible gives Playwright's proper auto-waiting and retry behavior
        await expect( page.getByText('Dashboard')).toBeVisible();
      
    });

    test.skip('TC_LOGIN_002 - Login with Invalid credentials', async({page})=>{

        await page.locator('#ConnectInput0-ref-id').fill('mcpadminus');
        await page.locator('#ConnectInput1-ref-id').fill('1971');
        await page.locator('[name="submit"]').click();

        const message=await page.locator('p:has-text("/You have \d+ attempts? left/")');
        await expect(message).toBeVisible();
        const text=message.textContent();
        console.log(text);
        
        const message1=await page.locator('p:has-text("Whoops! It looks like some of your credentials are incorrect")');
        await expect(message1).toBeVisible();
    });

    
          

});

