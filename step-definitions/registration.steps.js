import { When, Then } from '@wdio/cucumber-framework';
import allureReporter from '@wdio/allure-reporter';
import RegistrationPage from '../page-objects/pages/RegistrationPage.js';

const registrationPage = new RegistrationPage();

// Note: The "I click the 'Register' button" step is handled by login.steps.js
// It uses the loginPage.registerLink selector which looks for 'button*=Register'

// Verify registration page
Then('I should be on the registration page', async () => {
    allureReporter.addStep('Wait for navigation to registration page', async () => {
        await browser.waitUntil(
            async () => {
                const url = await browser.getUrl();
                return url.includes('/register');
            },
            {
                timeout: registrationPage.timeout.medium,
                timeoutMsg: 'Expected to navigate to registration page'
            }
        );
    });
    
    allureReporter.addStep('Wait for page to load completely', () => {
        return registrationPage.waitForPageLoad();
    });
    
    allureReporter.addStep('Verify URL contains /register path', async () => {
        const currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain('/register');
    });
});

// Fill registration form
When('I enter {string} in the registration email field', async (email) => {
    await registrationPage.emailInput.waitForDisplayed({ timeout: registrationPage.timeout.medium });
    await registrationPage.emailInput.setValue(email);
});

When('I enter a unique email in the registration email field', async () => {
    allureReporter.addStep('Wait for email input field to be displayed', () => {
        return registrationPage.emailInput.waitForDisplayed({ timeout: registrationPage.timeout.medium });
    });
    
    allureReporter.addStep('Generate and enter unique email address', () => {
        const timestamp = Date.now();
        const uniqueEmail = `testuser${timestamp}@example.com`;
        return registrationPage.emailInput.setValue(uniqueEmail);
    });
});

When('I enter {string} in the registration password field', async (password) => {
    allureReporter.addStep('Wait for password input field to be displayed', () => {
        return registrationPage.passwordInput.waitForDisplayed({ timeout: registrationPage.timeout.medium });
    });
    
    allureReporter.addStep('Enter password in registration form', () => {
        return registrationPage.passwordInput.setValue(password);
    });
});

When('I enter {string} in the confirm password field', async (password) => {
    allureReporter.addStep('Wait for confirm password field to be displayed', () => {
        return registrationPage.confirmPasswordInput.waitForDisplayed({ timeout: registrationPage.timeout.medium });
    });
    
    allureReporter.addStep('Enter password in confirm password field', () => {
        return registrationPage.confirmPasswordInput.setValue(password);
    });
});

When('I check the {string} checkbox', async (checkboxName) => {
    if (checkboxName === 'Terms and Conditions') {
        allureReporter.addStep('Wait for Terms and Conditions checkbox to be displayed', () => {
            return registrationPage.termsCheckbox.waitForDisplayed({ timeout: registrationPage.timeout.medium });
        });
        
        allureReporter.addStep('Click Terms and Conditions checkbox', () => {
            return registrationPage.termsCheckbox.click();
        });
    }
});

When('I click the {string} submit button', async (buttonText) => {
    if (buttonText === 'Register') {
        allureReporter.addStep('Find Register submit button', async () => {
            const registerButtons = await $$('vaadin-button*=Register');
            if (registerButtons.length === 0) {
                throw new Error('No Register button found');
            }
            return registerButtons[0];
        });
        
        allureReporter.addStep('Wait for Register button to be clickable', async () => {
            const registerButtons = await $$('vaadin-button*=Register');
            await registerButtons[0].waitForClickable({ timeout: registrationPage.timeout.medium });
        });
        
        allureReporter.addStep('Click Register submit button', async () => {
            const registerButtons = await $$('vaadin-button*=Register');
            await registerButtons[0].click();
        });
    }
});

// Success popup verification
Then('I should see a success popup with message {string}', async (expectedMessage) => {
    allureReporter.addStep('Wait for success popup to appear (registration processing)', async () => {
        await registrationPage.successPopup.waitForDisplayed({ timeout: registrationPage.timeout.extraLong }); // 2.5 minutes timeout
    });
    
    allureReporter.addStep('Verify success popup title is displayed', async () => {
        const titleElement = await registrationPage.successPopupTitle;
        await expect(titleElement).toBeDisplayed();
    });
    
    allureReporter.addStep(`Verify popup title contains "${expectedMessage}"`, async () => {
        const titleElement = await registrationPage.successPopupTitle;
        const titleText = await titleElement.getText();
        await expect(titleText).toContain(expectedMessage);
    });
});

Then('the popup should contain {string}', async (expectedText) => {
    allureReporter.addStep(`Verify popup contains text: "${expectedText}"`, async () => {
        const notificationCard = await registrationPage.successPopup;
        const cardText = await notificationCard.getText();
        await expect(cardText).toContain(expectedText);
    });
});

Then('I should be redirected to the login page', async () => {
    allureReporter.addStep('Wait for redirect to login page', async () => {
        await browser.waitUntil(
            async () => {
                const url = await browser.getUrl();
                return url.includes('/login');
            },
            {
                timeout: registrationPage.timeout.long, // 30 seconds for redirect after popup
                timeoutMsg: 'Expected to be redirected to login page'
            }
        );
    });
    
    allureReporter.addStep('Verify URL contains /login path', async () => {
        const currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain('/login');
    });
});