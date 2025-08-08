import { When, Then } from '@wdio/cucumber-framework';
import allureReporter from '@wdio/allure-reporter';
import DashboardPage from '../page-objects/pages/DashboardPage.js';
import UserSettingsPage from '../page-objects/pages/UserSettingsPage.js';

const dashboardPage = new DashboardPage();
const userSettingsPage = new UserSettingsPage();
let generatedNickname;
let uploadedImagePath;

// Click user email in navbar
When('I click on the user email in the navbar', async () => {
    allureReporter.addStep('Open user profile menu from navbar', () => {
        return dashboardPage.openUserProfileMenu();
    });
});

// Verify user settings dropdown is visible
Then('I should see the user settings dropdown', async () => {
    allureReporter.addStep('Verify user settings dropdown is visible', async () => {
        const isDropdownVisible = await userSettingsPage.isUserSettingsDropdownVisible();
        await expect(isDropdownVisible).toBe(true);
    });
});

// Click User Settings menu item
When('I click on {string} in the dropdown', async (menuItem) => {
    if (menuItem === 'User Settings') {
        allureReporter.addStep(`Click on ${menuItem}`, () => {
            return userSettingsPage.clickUserSettings();
        });
    }
});

// Verify on user settings page
Then('I should be on the user settings page', async () => {
    allureReporter.addStep('Wait for user settings page to load', () => {
        return userSettingsPage.waitForUserSettingsPage();
    });
    
    allureReporter.addStep('Verify on user settings page', async () => {
        const isOnSettingsPage = await userSettingsPage.isOnUserSettingsPage();
        await expect(isOnSettingsPage).toBe(true);
    });
});

// Verify General tab is selected
Then('I should see the General tab is selected', async () => {
    allureReporter.addStep('Verify General tab is selected', async () => {
        const isGeneralSelected = await userSettingsPage.isGeneralTabSelected();
        await expect(isGeneralSelected).toBe(true);
    });
});

// Click profile photo edit button
When('I click on the profile photo edit button', async () => {
    allureReporter.addStep('Click profile photo edit button', () => {
        return userSettingsPage.clickProfilePhotoEdit();
    });
});

// Upload random test image
When('I upload a random test image', async () => {
    allureReporter.addStep('Generate random test image path', () => {
        uploadedImagePath = userSettingsPage.getRandomTestImagePath();
        return uploadedImagePath;
    });
    
    allureReporter.addStep('Upload test image', () => {
        return userSettingsPage.uploadTestImage(uploadedImagePath);
    });
});

// Verify photo upload success message
Then('I should see the photo upload success message', async () => {
    allureReporter.addStep('Wait for upload success message', () => {
        return userSettingsPage.waitForUploadSuccess();
    });
    
    allureReporter.addStep('Verify photo upload success message is visible', async () => {
        const isUploadSuccessVisible = await userSettingsPage.isUploadSuccessVisible();
        await expect(isUploadSuccessVisible).toBe(true);
    });
});

// Click nickname edit button  
When('I click on the nickname edit button', async () => {
    allureReporter.addStep('Click nickname edit button', () => {
        return userSettingsPage.clickNicknameEdit();
    });
});

// Enter unique nickname
When('I enter a unique nickname', async () => {
    allureReporter.addStep('Generate unique nickname', () => {
        generatedNickname = userSettingsPage.generateUniqueNickname();
        return generatedNickname;
    });
    
    allureReporter.addStep('Enter unique nickname', () => {
        return userSettingsPage.enterNickname(generatedNickname);
    });
});

// Click save nickname button
When('I click the save nickname button', async () => {
    allureReporter.addStep('Click save nickname button', () => {
        return userSettingsPage.clickSaveNickname();
    });
});

// Verify nickname updated successfully
Then('the nickname should be updated successfully', async () => {
    allureReporter.addStep('Verify nickname was updated successfully', async () => {
        const isNicknameUpdated = await userSettingsPage.isNicknameUpdated(generatedNickname);
        await expect(isNicknameUpdated).toBe(true);
    });
});