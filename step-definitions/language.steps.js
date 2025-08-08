import { When, Then } from '@wdio/cucumber-framework';
import allureReporter from '@wdio/allure-reporter';
import LanguagePage from '../page-objects/pages/LanguagePage.js';

const languagePage = new LanguagePage();

// Language selector interaction
When('I click the language selector button', async () => {
    allureReporter.addStep('Click language selector button', () => {
        return languagePage.clickLanguageSelector();
    });
});

When('I select {string} from the language dropdown', async (language) => {
    allureReporter.addStep(`Select ${language} from dropdown`, () => {
        return languagePage.selectLanguage(language);
    });
});

// Language verification
Then('the language should be changed to Indonesian', async () => {
    allureReporter.addStep('Wait for language change to take effect', async () => {
        await browser.waitUntil(
            async () => {
                const currentLanguage = await languagePage.getCurrentLanguage();
                return currentLanguage.includes('Indonesian');
            },
            {
                timeout: languagePage.timeout.medium,
                timeoutMsg: 'Language did not change to Indonesian'
            }
        );
    });
    
    allureReporter.addStep('Verify language selector shows Indonesian', async () => {
        const currentLanguage = await languagePage.getCurrentLanguage();
        await expect(currentLanguage).toContain('Indonesian');
    });
});

// Navigation steps
When('I navigate to the home page', async () => {
    await languagePage.goToHomePage();
});

Then('I should see Indonesian navigation items', async () => {
    // Wait for Indonesian navigation items to appear
    await browser.waitUntil(
        async () => await languagePage.areIndonesianNavItemsDisplayed(),
        {
            timeout: languagePage.timeout.mediumLong,
            timeoutMsg: 'Indonesian navigation items did not appear'
        }
    );
    
    const indonesianNavDisplayed = await languagePage.areIndonesianNavItemsDisplayed();
    await expect(indonesianNavDisplayed).toBe(true);
});

Then('I should see {string} in the navigation', async (navText) => {
    const isDisplayed = await languagePage.isNavItemDisplayed(navText);
    await expect(isDisplayed).toBe(true);
});

Then('I should see {string} as the login page heading', async (expectedHeading) => {
    allureReporter.addStep('Wait for heading to be displayed', async () => {
        const heading = await $('h2');
        await heading.waitForDisplayed({ timeout: languagePage.timeout.short });
        return heading;
    });
    
    allureReporter.addStep(`Verify heading text is "${expectedHeading}"`, async () => {
        const heading = await $('h2');
        const headingText = await heading.getText();
        await expect(headingText).toEqual(expectedHeading);
    });
});

Then('I should see {string} as the email field label', async (expectedLabel) => {
    allureReporter.addStep('Wait for page language update to complete', async () => {
        await browser.waitUntil(
            async () => {
                const emailLabels = await $$(`*=${expectedLabel}`);
                return emailLabels.length > 0 && await emailLabels[0].isDisplayed().catch(() => false);
            },
            {
                timeout: languagePage.timeout.medium,
                timeoutMsg: `Email field label '${expectedLabel}' not found`
            }
        );
    });
    
    allureReporter.addStep(`Verify email field label is "${expectedLabel}"`, async () => {
        const emailLabels = await $$(`*=${expectedLabel}`);
        
        // Find the first visible label
        let found = false;
        for (const label of emailLabels) {
            if (await label.isDisplayed()) {
                const labelText = await label.getText();
                await expect(labelText).toEqual(expectedLabel);
                found = true;
                break;
            }
        }
        
        await expect(found).toBe(true);
    });
});

Then('I should see {string} as the password field label', async (expectedLabel) => {
    allureReporter.addStep(`Verify password field label is "${expectedLabel}"`, async () => {
        const passwordLabels = await $$(`*=${expectedLabel}`);
        
        // Find the first visible label
        let found = false;
        for (const label of passwordLabels) {
            if (await label.isDisplayed()) {
                const labelText = await label.getText();
                await expect(labelText).toEqual(expectedLabel);
                found = true;
                break;
            }
        }
        
        await expect(found).toBe(true);
    });
});