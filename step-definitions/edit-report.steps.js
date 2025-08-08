import { When, Then } from '@wdio/cucumber-framework';
import allureReporter from '@wdio/allure-reporter';
import ReportSettingsPage from '../page-objects/pages/ReportSettingsPage.js';

const reportSettingsPage = new ReportSettingsPage();
let generatedName;
let generatedDescription;

// Click on first report card (to ensure report is selected)
When('I click on the first report card in the dashboard', async () => {
    // Look for a report card - it should have a heading and charts
    const reportCard = await $('h1'); // First main heading should be a report name
    await reportCard.waitForDisplayed({ timeout: reportSettingsPage.timeout.medium });
    
    // Check if this is actually a report (not just "Dashboard")
    const reportText = await reportCard.getText();
    if (reportText !== 'Dashboard') {
        // The report is already visible, no need to click anything
        return;
    }
    
    // If no report visible, look for one in the recent ratings section
    const reportLinks = await $$('h2').filter(async (h2) => {
        const text = await h2.getText();
        return !['Dashboard', 'Recent Ratings', 'Cyber Rank', 'Privacy', 'Security', 'Compliance', 'Data Breach'].includes(text);
    });
    
    if (reportLinks.length > 0) {
        await reportLinks[0].click();
        // Wait for report to load using explicit wait
        await browser.waitUntil(
            async () => {
                const url = await browser.getUrl();
                return !url.includes('/dashboard');
            },
            {
                timeout: reportSettingsPage.timeout.medium,
                timeoutMsg: 'Report did not load'
            }
        );
    }
});

// Click on settings icon for the report
When('I click on the settings icon for the report', async () => {
    await reportSettingsPage.clickSettingsIcon();
});

// Verify on report settings page
Then('I should be on the report settings page', async () => {
    // Wait for navigation to complete
    await browser.waitUntil(
        async () => await reportSettingsPage.isOnSettingsPage(),
        {
            timeout: reportSettingsPage.timeout.medium,
            timeoutMsg: 'Report settings page did not load'
        }
    );
    
    const isOnSettingsPage = await reportSettingsPage.isOnSettingsPage();
    await expect(isOnSettingsPage).toBe(true);
});

// Clear and enter unique name  
When('I clear the Name field and enter a unique report name', async () => {
    generatedName = reportSettingsPage.generateUniqueName();
    await reportSettingsPage.clearAndEnterName(generatedName);
});

// Clear and enter unique description
When('I clear the Description field and enter a unique report description', async () => {
    generatedDescription = reportSettingsPage.generateUniqueDescription();
    await reportSettingsPage.clearAndEnterDescription(generatedDescription);
});

// Click Save button
When('I click the Save button', async () => {
    await reportSettingsPage.clickSave();
});

// Verify success message (dialog closes indicates success in this application)
Then('I should see a success message', async () => {
    // Wait for dialog to close (indicates success)
    await browser.waitUntil(
        async () => {
            const dialogVisible = await reportSettingsPage.settingsDialog.isDisplayed().catch(() => false);
            return !dialogVisible;
        },
        {
            timeout: reportSettingsPage.timeout.medium,
            timeoutMsg: 'Settings dialog did not close after save'
        }
    );
    
    const dialogClosed = !(await reportSettingsPage.settingsDialog.isDisplayed().catch(() => false));
    await expect(dialogClosed).toBe(true);
});

// Verify Name field contains new value
Then('the Name field should contain the new report name', async () => {
    // Check if the dashboard shows the updated name (it appears as heading)
    const nameHeading = await $(`h1*=${generatedName}`);
    await nameHeading.waitForDisplayed({ timeout: reportSettingsPage.timeout.short });
    const isDisplayed = await nameHeading.isDisplayed();
    await expect(isDisplayed).toBe(true);
});

// Verify Description field contains new value  
Then('the Description field should contain the new report description', async () => {
    // Check if the dashboard shows the updated description (it appears as heading)
    const descHeading = await $(`h3*=${generatedDescription}`);
    await descHeading.waitForDisplayed({ timeout: reportSettingsPage.timeout.short });
    const isDisplayed = await descHeading.isDisplayed();
    await expect(isDisplayed).toBe(true);
});