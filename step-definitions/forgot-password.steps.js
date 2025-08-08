import { When, Then } from '@wdio/cucumber-framework';
import allureReporter from '@wdio/allure-reporter';
import ForgotPasswordPage from '../page-objects/pages/ForgotPasswordPage.js';
import testData from '../config/test-data.js';

const forgotPasswordPage = new ForgotPasswordPage();

// Note: The "I click the 'Forgot Password' text link" step is handled by login.steps.js
// It uses the loginPage.forgotPasswordLink selector

// Verify forgot password page
Then('I should be on the forgot password page', async () => {
    allureReporter.addStep('Wait for navigation to forgot password page', async () => {
        await browser.waitUntil(
            async () => {
                const url = await browser.getUrl();
                return url.includes('/forgot') || url.includes('/reset') || url.includes('/password');
            },
            {
                timeout: forgotPasswordPage.timeout.medium,
                timeoutMsg: 'Expected to navigate to forgot password page'
            }
        );
    });
    
    allureReporter.addStep('Wait for page to load completely', () => {
        return forgotPasswordPage.waitForPageLoad();
    });
    
    allureReporter.addStep('Verify URL contains forgot password path', async () => {
        const currentUrl = await browser.getUrl();
        const isOnForgotPasswordPage = currentUrl.includes('/forgot') || 
                                     currentUrl.includes('/reset') || 
                                     currentUrl.includes('/password');
        await expect(isOnForgotPasswordPage).toBe(true);
    });
});

// Fill forgot password form
When('I enter a registered email in the reset email field', async () => {
    allureReporter.addStep('Wait for email input field to be displayed', () => {
        return forgotPasswordPage.emailInput.waitForDisplayed({ timeout: forgotPasswordPage.timeout.medium });
    });
    
    allureReporter.addStep('Enter registered email address', () => {
        const registeredEmail = testData.registeredEmail;
        return forgotPasswordPage.emailInput.setValue(registeredEmail);
    });
});

When('I enter {string} in the reset email field', async (email) => {
    await forgotPasswordPage.emailInput.waitForDisplayed({ timeout: forgotPasswordPage.timeout.medium });
    await forgotPasswordPage.emailInput.setValue(email);
});

When('I click the Send Reset Password Link button', async () => {
    allureReporter.addStep('Wait for Send Reset button to be clickable', () => {
        return forgotPasswordPage.sendResetButton.waitForClickable({ timeout: forgotPasswordPage.timeout.medium });
    });
    
    allureReporter.addStep('Click Send Reset Password Link button', () => {
        return forgotPasswordPage.sendResetButton.click();
    });
});

// Success popup verification
Then('I should see a success popup displayed', async () => {
    allureReporter.addStep('Wait for success popup to appear', async () => {
        const alertElement = await $('[role="alert"]');
        await alertElement.waitForDisplayed({ timeout: forgotPasswordPage.timeout.long });
        return alertElement;
    });
    
    allureReporter.addStep('Verify success popup is displayed', async () => {
        const alertElement = await $('[role="alert"]');
        const isDisplayed = await alertElement.isDisplayed();
        await expect(isDisplayed).toBe(true);
    });
    
    allureReporter.addStep('Verify success message contains password recovery text', async () => {
        const alertElement = await $('[role="alert"]');
        const messageText = await alertElement.getText();
        await expect(messageText).toContain('password recovery link');
    });
});

Then('I should be redirected back to the login page', async () => {
    allureReporter.addStep('Verify redirected back to login page', async () => {
        const currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain('/login');
    });
});