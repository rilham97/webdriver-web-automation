import BasePage from '../base/BasePage.js';

class ReportSettingsPage extends BasePage {
    /**
     * Define selectors for report settings page elements
     */
    
    // Settings icon on dashboard - use class selector and find by text content
    get settingsIcon() { 
        return $('vaadin-button.dashboard-action-button2=Settings');
    }
    
    // Name field (textbox in the dialog)
    get nameField() { 
        return $$('input')[0]; // First input field should be Name
    }
    
    // Description field (could be textarea or input)
    get descriptionField() { 
        return $('textarea, input[placeholder*="Description"], input[name*="description"]');
    }
    
    // Save button (blue button with Save text) 
    get saveButton() { 
        return $('vaadin-button=Save'); 
    }
    
    // Success message or notification
    get successMessage() { 
        return $('[role="alert"], vaadin-notification-card, .notification, [class*="success"]'); 
    }
    
    // Cancel button (red button with Cancel text)
    get cancelButton() { 
        return $('button:has-text("Cancel")'); 
    }
    
    // Report settings dialog
    get settingsDialog() {
        return $('[role="dialog"]');
    }
    
    /**
     * Page Methods
     */
    
    /**
     * Click settings icon - using correct Vaadin selector
     */
    async clickSettingsIcon() {
        await this.settingsIcon.waitForClickable({ timeout: this.timeout.medium });
        await this.settingsIcon.click();
    }
    
    /**
     * Clear and enter name
     * @param {string} name - New name to enter
     */
    async clearAndEnterName(name) {
        await this.nameField.waitForDisplayed({ timeout: this.timeout.medium });
        
        // Clear existing text
        await this.nameField.click();
        // Select all text (Ctrl+A or Cmd+A)
        const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
        await browser.keys([modifier, 'a']);
        await browser.keys('Delete');
        
        // Enter new text
        await this.nameField.setValue(name);
    }
    
    /**
     * Clear and enter description
     * @param {string} description - New description to enter
     */
    async clearAndEnterDescription(description) {
        await this.descriptionField.waitForDisplayed({ timeout: this.timeout.medium });
        
        // Clear existing text
        await this.descriptionField.click();
        // Select all text (Ctrl+A or Cmd+A)
        const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
        await browser.keys([modifier, 'a']);
        await browser.keys('Delete');
        
        // Enter new text
        await this.descriptionField.setValue(description);
    }
    
    /**
     * Generate unique name with timestamp
     * @returns {string} Unique name
     */
    generateUniqueName() {
        const timestamp = Date.now();
        return `Report_${timestamp}`;
    }
    
    /**
     * Generate unique description with timestamp
     * @returns {string} Unique description
     */
    generateUniqueDescription() {
        const timestamp = Date.now();
        return `Updated description at ${timestamp} - This is an automated test description`;
    }
    
    /**
     * Click save button
     */
    async clickSave() {
        await this.saveButton.waitForClickable({ timeout: this.timeout.medium });
        await this.saveButton.click();
    }
    
    /**
     * Wait for success message
     */
    async waitForSuccessMessage() {
        await this.successMessage.waitForDisplayed({ timeout: this.timeout.medium });
    }
    
    /**
     * Get success message text
     * @returns {string} Success message text
     */
    async getSuccessMessageText() {
        await this.waitForSuccessMessage();
        return await this.successMessage.getText();
    }
    
    /**
     * Check if on report settings dialog
     * @returns {boolean} True if settings dialog is open
     */
    async isOnSettingsPage() {
        try {
            await this.settingsDialog.waitForDisplayed({ timeout: this.timeout.short });
            return await this.settingsDialog.isDisplayed() && 
                   await this.nameField.isDisplayed() && 
                   await this.descriptionField.isDisplayed();
        } catch (error) {
            return false;
        }
    }
}

export default ReportSettingsPage;