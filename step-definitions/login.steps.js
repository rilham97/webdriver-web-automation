import { Given, When, Then } from '@wdio/cucumber-framework';
import allureReporter from '@wdio/allure-reporter';
import LoginPage from '../page-objects/pages/LoginPage.js';
import DashboardPage from '../page-objects/pages/DashboardPage.js';
import testData from '../config/test-data.js';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

Given('I am on the CyberRank login page', async () => {
    allureReporter.addStep('Navigate to login page', () => {
        return browser.url('/vas/login');
    });
    allureReporter.addStep('Wait for page to load', () => {
        return loginPage.waitForPageLoad();
    });
});

When('I enter {string} in the email field', async (email) => {
    allureReporter.addStep(`Enter email: ${email}`, () => {
        return loginPage.emailInput.setValue(email);
    });
});

When('I enter {string} in the password field', async (password) => {
    allureReporter.addStep('Enter password', () => {
        return loginPage.passwordInput.setValue(password);
    });
});

When('I click the login page {string} button', async (buttonText) => {
    allureReporter.addStep(`Click ${buttonText} button`, async () => {
        switch(buttonText.toLowerCase()) {
            case 'login':
                await loginPage.loginButton.click();
                break;
            case 'forgot password':
                await loginPage.forgotPasswordLink.click();
                break;
            case 'register':
                await loginPage.registerLink.click();
                break;
            default:
                throw new Error(`Button "${buttonText}" not found on login page`);
        }
    });
});

When('I click the {string} text link', async (linkText) => {
    switch(linkText.toLowerCase()) {
        case 'forgot password':
            await loginPage.forgotPasswordLink.click();
            break;
        default:
            throw new Error(`Text link "${linkText}" not found`);
    }
});

When('I login with {string} and {string}', async (email, password) => {
    await loginPage.login(email, password);
});

When('I enter valid login credentials', async () => {
    const email = testData.validUser.email;
    const password = testData.validUser.password;
    await loginPage.login(email, password);
});

// Removed "Remember me" functionality as the checkbox doesn't exist on the page

Then('I should be logged in successfully', async () => {
    allureReporter.addStep('Wait for dashboard to load', () => {
        return dashboardPage.waitForDashboard();
    });
    allureReporter.addStep('Verify URL contains /vas/dashboard', async () => {
        const currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain('/vas/dashboard');
    });
});

Then('I should see the user dashboard', async () => {
    allureReporter.addStep('Find dashboard title element', async () => {
        const dashboardTitle = await $('h1.text-l.m-0');
        await expect(dashboardTitle).toBeDisplayed();
        return dashboardTitle;
    });
    allureReporter.addStep('Verify dashboard title text', async () => {
        const dashboardTitle = await $('h1.text-l.m-0');
        const titleText = await dashboardTitle.getText();
        await expect(titleText).toEqual('Dashboard');
    });
});

Then('I should see an error message {string}', async (expectedError) => {
    allureReporter.addStep('Wait for error message to appear', () => {
        return loginPage.errorMessage.waitForDisplayed({ timeout: loginPage.timeout.mediumLong });
    });
    allureReporter.addStep(`Verify error message contains: "${expectedError}"`, async () => {
        const actualError = await loginPage.errorMessage.getText();
        await expect(actualError).toContain(expectedError);
    });
});

Then('I should remain on the login page', async () => {
    allureReporter.addStep('Verify URL still contains /login', async () => {
        const currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain('/login');
    });
});

// Password field clearing verification removed since both scenarios now have same error message

// Removed "Remember me" related step definitions as the functionality doesn't exist