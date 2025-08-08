import { Given, When, Then } from '@wdio/cucumber-framework';
import allureReporter from '@wdio/allure-reporter';
import BasePage from '../page-objects/base/BasePage.js';
import LoginPage from '../page-objects/pages/LoginPage.js';
import DashboardPage from '../page-objects/pages/DashboardPage.js';
import testData from '../config/test-data.js';

const basePage = new BasePage();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

// Authentication step
Given('I am logged into CyberRank', async () => {
    allureReporter.addStep('Navigate to login page', () => {
        return browser.url('/vas/login');
    });
    
    allureReporter.addStep('Wait for login page to load', () => {
        return loginPage.waitForPageLoad();
    });
    
    allureReporter.addStep('Enter valid credentials', () => {
        const email = testData.validUser.email;
        const password = testData.validUser.password;
        return loginPage.login(email, password);
    });
    
    allureReporter.addStep('Wait for dashboard to load', () => {
        return dashboardPage.waitForDashboard();
    });
    
    allureReporter.addStep('Verify successful login', async () => {
        const currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain('/vas/dashboard');
    });
});

// Common navigation steps
Given('I am on the CyberRank homepage', async () => {
    allureReporter.addStep('Navigate to homepage', () => {
        return browser.url('/');
    });
    
    allureReporter.addStep('Wait for page to load completely', async () => {
        await browser.waitUntil(
            async () => (await browser.execute(() => document.readyState)) === 'complete',
            {
                timeout: basePage.timeout.long,
                timeoutMsg: 'Page did not load completely'
            }
        );
    });
});

When('I click on the {string} button', async (buttonText) => {
    const button = await $(`button*=${buttonText}`);
    await button.waitForClickable({ timeout: basePage.timeout.medium });
    await button.click();
});

When('I click on the {string} link', async (linkText) => {
    const link = await $(`a*=${linkText}`);
    await link.waitForClickable({ timeout: basePage.timeout.medium });
    await link.click();
});

Then('I should see {string}', async (text) => {
    const element = await $(`*=${text}`);
    await expect(element).toBeDisplayed();
});

Then('the page title should contain {string}', async (expectedTitle) => {
    const title = await browser.getTitle();
    await expect(title).toContain(expectedTitle);
});

Then('I should be on the {string} page', async (pageName) => {
    const url = await browser.getUrl();
    await expect(url.toLowerCase()).toContain(pageName.toLowerCase());
});

When('I wait for {int} seconds', async (seconds) => {
    await browser.waitUntil(() => false, { timeout: seconds * 1000, timeoutMsg: `Waiting ${seconds} seconds` }).catch(() => {});
});

Then('I take a screenshot named {string}', async (screenshotName) => {
    await browser.saveScreenshot(`./screenshots/${screenshotName}.png`);
});

// Form related steps
When('I enter {string} in the {string} field', async (value, fieldName) => {
    const field = await $(`input[name="${fieldName}"]`);
    await field.setValue(value);
});

Then('the {string} field should be empty', async (fieldName) => {
    const field = await $(`input[name="${fieldName}"]`);
    const value = await field.getValue();
    await expect(value).toEqual('');
});

// Visibility steps
Then('the {string} should be visible', async (elementDescription) => {
    let element;
    
    switch(elementDescription.toLowerCase()) {
        case 'main navigation menu':
            element = await $('nav');
            break;
        case 'hero section':
            element = await $('div*=Global Standard');
            break;
        case 'login button':
            element = await $('a*=Login');
            break;
        default:
            element = await $(`*=${elementDescription}`);
    }
    
    await expect(element).toBeDisplayed();
});

Then('the {string} should be displayed', async (elementDescription) => {
    const element = await $(`*=${elementDescription}`);
    await expect(element).toBeDisplayed();
});

// Error message steps
Then('I should see an error message', async () => {
    const errorElement = await $('.error-message, .error, [class*="error"]');
    await expect(errorElement).toBeDisplayed();
});

Then('I should not see an error message', async () => {
    const errorElement = await $('.error-message, .error, [class*="error"]');
    await expect(errorElement).not.toBeDisplayed();
});

// URL verification
Then('the URL should contain {string}', async (urlPart) => {
    await browser.waitUntil(
        async () => {
            const currentUrl = await browser.getUrl();
            return currentUrl.includes(urlPart);
        },
        {
            timeout: basePage.timeout.medium,
            timeoutMsg: `URL does not contain: ${urlPart}`
        }
    );
});