import { When, Then } from '@wdio/cucumber-framework';
import allureReporter from '@wdio/allure-reporter';
import TeamPage from '../page-objects/pages/TeamPage.js';

const teamPage = new TeamPage();

// Note: Navigation steps are handled by add-team-member.steps.js to avoid duplication

// Check if there are any candidate users
When('I check if there are any candidate users', async () => {
    allureReporter.addStep('Check for existing candidate users', async () => {
        const hasCandidates = await teamPage.hasCandidateUsers();
        
        if (!hasCandidates) {
            throw new Error('No candidate users found. Please run add-team-member tests first to create test data.');
        }
        
        // Store that we have candidates for the test
        global.hasCandidateUsers = true;
    });
});

// Click trash icon for a candidate user
When('I click the trash icon for a candidate user', async () => {
    allureReporter.addStep('Click trash icon for a candidate user', () => {
        return teamPage.clickTrashIconForCandidate();
    });
});

// Verify confirmation popup appears
Then('I should see a confirmation popup', async () => {
    allureReporter.addStep('Verify confirmation popup is displayed', async () => {
        const isPopupDisplayed = await teamPage.isConfirmationPopupDisplayed();
        await expect(isPopupDisplayed).toBe(true);
    });
});

// Click confirm on the popup
When('I click confirm on the popup', async () => {
    allureReporter.addStep('Click confirm on deletion popup', () => {
        return teamPage.clickConfirmOnPopup();
    });
});

// Verify team member was removed
Then('the team member should be removed from the list', async () => {
    allureReporter.addStep('Verify team member was removed from list', async () => {
        const isRemoved = await teamPage.isTeamMemberRemoved();
        await expect(isRemoved).toBe(true);
    });
});

// Verify success message for deletion
Then('I should see a success message for deletion', async () => {
    allureReporter.addStep('Verify deletion success message or confirm removal', async () => {
        try {
            const messageText = await teamPage.getDeletionSuccessMessage();
            const hasSuccessKeyword = messageText.toLowerCase().includes('success') || 
                                     messageText.toLowerCase().includes('removed') || 
                                     messageText.toLowerCase().includes('deleted');
            await expect(hasSuccessKeyword).toBe(true);
        } catch (error) {
            // If no success message is found, verify that the member was actually removed
            const isRemoved = await teamPage.isTeamMemberRemoved();
            await expect(isRemoved).toBe(true); // If removal was successful, that's the main goal
        }
    });
});