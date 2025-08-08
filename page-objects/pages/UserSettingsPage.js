import BasePage from '../base/BasePage.js';

class UserSettingsPage extends BasePage {
    /**
     * Define selectors for user settings page elements
     */
    
    // Page title
    get pageTitle() {
        return $('h1*=User Settings');
    }
    
    // User email dropdown in navbar  
    get userEmailDropdown() {
        return $('menuitem*=@gmail.com');
    }
    
    // User Settings menu option
    get userSettingsMenuItem() {
        return $('vaadin-menu-bar-item*=User Settings, vaadin-menu-bar-item*=Settings');
    }
    
    // General tab
    get generalTab() {
        return $('[role="tab"]*=General');
    }
    
    // Security tab
    get securityTab() {
        return $('[role="tab"]*=Security');
    }
    
    // Profile picture
    get profilePicture() {
        return $('img*=Profile Picture');
    }
    
    // Profile photo edit/upload button
    get profilePhotoEditButton() {
        return $('vaadin-upload, vaadin-upload-file, vaadin-button*=upload, vaadin-button*=edit, button*=edit, button*=upload, [role="button"]*=photo');
    }
    
    // Nickname display text
    get nicknameDisplay() {
        return $('vaadin-horizontal-layout > div:first-child, vaadin-horizontal-layout div');
    }
    
    // Nickname edit button
    get nicknameEditButton() {
        return $('vaadin-horizontal-layout button, vaadin-button*=edit, button*=edit, button[class*="edit"]');
    }
    
    // Nickname input field (appears when editing)
    get nicknameInput() {
        return $('input[type="text"], vaadin-text-field input, vaadin-text-field, input, [contenteditable="true"]');
    }
    
    // Save nickname button (appears when editing)
    get saveNicknameButton() {
        return $('vaadin-horizontal-layout button:nth-child(2), button:has(img):nth-of-type(1)');
    }
    
    // Cancel nickname button (appears when editing)
    get cancelNicknameButton() {
        return $('vaadin-horizontal-layout button:nth-child(3), button:has(img):nth-of-type(2)');
    }
    
    // Upload success message/alert
    get uploadSuccessMessage() {
        return $('[role="alert"], vaadin-notification-card');
    }
    
    // Password fields
    get newPasswordField() {
        return $('input[placeholder*="New Password"], vaadin-password-field input');
    }
    
    get confirmPasswordField() {
        return $('input[placeholder*="Confirm Password"], vaadin-password-field:nth-of-type(2) input');
    }

    /**
     * Page Methods
     */
    
    /**
     * Wait for user settings page to load
     */
    async waitForUserSettingsPage() {
        await this.waitForUrlContains('/vas/usersettings');
        await this.pageTitle.waitForDisplayed({ timeout: this.timeout.long });
        await this.waitForPageLoad();
    }
    
    /**
     * Click user email dropdown in navbar
     */
    async clickUserEmailDropdown() {
        await this.userEmailDropdown.waitForClickable({ timeout: this.timeout.medium });
        await this.userEmailDropdown.click();
    }
    
    /**
     * Click User Settings menu item
     */
    async clickUserSettings() {
        // Find User Settings menu item dynamically
        const menuItems = await $$('vaadin-menu-bar-item, menuitem');
        let settingsMenuItem = null;
        
        for (const item of menuItems) {
            try {
                const text = await item.getText();
                if (text && (text.includes('User Settings') || text.includes('Settings'))) {
                    settingsMenuItem = item;
                    break;
                }
            } catch (e) {
                continue;
            }
        }
        
        if (!settingsMenuItem) {
            throw new Error('Could not find User Settings menu item');
        }
        
        await settingsMenuItem.waitForClickable({ timeout: this.timeout.medium });
        await settingsMenuItem.click();
    }
    
    /**
     * Check if on user settings page
     * @returns {boolean} True if on user settings page
     */
    async isOnUserSettingsPage() {
        try {
            return await this.pageTitle.isDisplayed() && 
                   await this.generalTab.isDisplayed();
        } catch (error) {
            return false;
        }
    }
    
    /**
     * Check if General tab is selected
     * @returns {boolean} True if General tab is selected
     */
    async isGeneralTabSelected() {
        try {
            const tabElement = await this.generalTab;
            const isSelected = await tabElement.getAttribute('selected');
            return isSelected !== null;
        } catch (error) {
            return false;
        }
    }
    
    /**
     * Click profile photo edit button
     */
    async clickProfilePhotoEdit() {
        // Try to find profile photo edit elements dynamically
        const possibleSelectors = [
            'vaadin-upload',
            'vaadin-upload-file', 
            'vaadin-button*=upload',
            'vaadin-button*=edit',
            'button*=edit',
            'button*=upload',
            '[role="button"]*=photo',
            'input[type="file"]',
            '.upload-button'
        ];
        
        let editButton = null;
        
        for (const selector of possibleSelectors) {
            try {
                const element = await $(selector);
                if (await element.isExisting() && await element.isDisplayed()) {
                    editButton = element;
                    break;
                }
            } catch (e) {
                continue;
            }
        }
        
        if (!editButton) {
            throw new Error('Could not find profile photo edit button');
        }
        
        await editButton.waitForClickable({ timeout: this.timeout.medium });
        await editButton.click();
    }
    
    /**
     * Get a random test image path
     * @returns {string} Path to a random test image
     */
    getRandomTestImagePath() {
        const imageNumber = Math.floor(Math.random() * 5) + 1;
        const extension = imageNumber === 2 ? 'jpg' : 'png'; // avatar2 is jpg, others are png
        return `/Users/rama/Documents/Coding/webDriverProject/img/avatar${imageNumber}.${extension}`;
    }
    
    /**
     * Upload test image file
     * @param {string} imagePath - Path to image file (optional, uses random if not provided)
     */
    async uploadTestImage(imagePath = null) {
        if (!imagePath) {
            imagePath = this.getRandomTestImagePath();
        }
        
        // The file upload dialog should be open after clicking the edit button
        await this.waitDelay(this.timeout.veryShort, 'File dialog ready');
        
        // Find the hidden file input
        const fileInput = await $('input[type="file"]#fileInput, input[type="file"][hidden], input[type="file"]');
        
        if (await fileInput.isExisting()) {
            // For hidden file inputs, use JavaScript to remove the hidden attribute and then upload
            await browser.execute(
                'arguments[0].removeAttribute("hidden"); arguments[0].style.display = "block"; arguments[0].style.visibility = "visible";',
                await fileInput
            );
            
            await this.waitDelay(500, 'Element visibility');
            
            // Now upload the file
            await fileInput.setValue(imagePath);
            
            // Hide it again after upload
            await browser.execute(
                'arguments[0].setAttribute("hidden", ""); arguments[0].style.display = "none";',
                await fileInput
            );
        } else {
            throw new Error('Could not find file input element for upload');
        }
        
    }
    
    /**
     * Wait for upload success message
     */
    async waitForUploadSuccess() {
        // Try multiple selectors for upload success indicators
        const possibleSuccessSelectors = [
            '[role="alert"]',
            'vaadin-notification-card',
            'div*=100%',
            'div*=uploaded',
            'div*=success',
            '.notification',
            '.alert',
            '.success-message'
        ];
        
        let successElement = null;
        
        for (const selector of possibleSuccessSelectors) {
            try {
                const element = await $(selector);
                await element.waitForDisplayed({ timeout: this.timeout.veryShort });
                if (await element.isDisplayed()) {
                    successElement = element;
                    break;
                }
            } catch (e) {
                continue;
            }
        }
        
        if (!successElement) {
            // Just wait a moment for any processing to complete
            await this.waitDelay(this.timeout.veryShort, 'Upload processing');
        }
    }
    
    /**
     * Check if upload success message is visible
     * @returns {boolean} True if upload success message is visible
     */
    async isUploadSuccessVisible() {
        try {
            return await this.uploadSuccessMessage.isDisplayed();
        } catch (error) {
            return false;
        }
    }
    
    /**
     * Get current nickname text
     * @returns {string} Current nickname
     */
    async getCurrentNickname() {
        await this.nicknameDisplay.waitForDisplayed({ timeout: this.timeout.medium });
        return await this.nicknameDisplay.getText();
    }
    
    /**
     * Click nickname edit button
     */
    async clickNicknameEdit() {
        // Look for edit buttons - usually empty vaadin-buttons with icons
        const allButtons = await $$('vaadin-button');
        
        let editButton = null;
        
        // Look for empty vaadin-buttons (which typically contain edit icons)
        for (let i = 0; i < allButtons.length; i++) {
            try {
                const button = allButtons[i];
                if (await button.isDisplayed()) {
                    const text = await button.getText();
                    
                    // Look for empty buttons (likely edit buttons with icons) 
                    // Skip the first few as they are likely navigation/menu buttons
                    if (text === '' && i > 2) {
                        editButton = button;
                        break;
                    }
                }
            } catch (e) {
                continue;
            }
        }
        
        if (!editButton) {
            // Fallback: try to find any button in the General tab content area
            const generalAreaButtons = await $$('vaadin-vertical-layout vaadin-button, vaadin-horizontal-layout vaadin-button');
            
            for (const button of generalAreaButtons) {
                if (await button.isDisplayed()) {
                    const text = await button.getText();
                    if (text === '') {
                        editButton = button;
                        break;
                    }
                }
            }
        }
        
        if (!editButton) {
            throw new Error('Could not find nickname edit button');
        }
        
        await editButton.waitForClickable({ timeout: this.timeout.medium });
        await editButton.click();
    }
    
    /**
     * Generate unique nickname with timestamp
     * @returns {string} Unique nickname
     */
    generateUniqueNickname() {
        const timestamp = Date.now();
        return `TestUser${timestamp}`;
    }
    
    /**
     * Enter nickname in edit mode
     * @param {string} nickname - Nickname to enter
     */
    async enterNickname(nickname) {
        // Wait for the inline editing to appear
        await this.waitDelay(this.timeout.veryShort, 'Inline editing mode');
        
        // Try different input field selectors
        const possibleInputSelectors = [
            'input[type="text"]',
            'vaadin-text-field input', 
            'vaadin-text-field',
            'input',
            '[contenteditable="true"]',
            'vaadin-horizontal-layout input',
            'div input'
        ];
        
        let inputField = null;
        
        for (const selector of possibleInputSelectors) {
            try {
                const element = await $(selector);
                if (await element.isExisting() && await element.isDisplayed()) {
                    inputField = element;
                    break;
                }
            } catch (e) {
                continue;
            }
        }
        
        if (!inputField) {
            throw new Error('Could not find nickname input field');
        }
        
        // Clear existing text and enter new nickname
        await inputField.click();
        
        // Select all text (Ctrl+A or Cmd+A)
        const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
        await browser.keys([modifier, 'a']);
        await browser.keys('Delete');
        
        await inputField.setValue(nickname);
    }
    
    /**
     * Click save nickname button
     */
    async clickSaveNickname() {
        // Look for the save button that contains save-solid.svg icon
        // Use XPath to find the vaadin-button that contains the save icon
        const saveButton = await $('//vaadin-button[.//vaadin-icon[contains(@src, "save-solid.svg")]]');
        
        if (!(await saveButton.isExisting())) {
            throw new Error('Could not find save nickname button with save-solid.svg icon');
        }
        
        await saveButton.waitForClickable({ timeout: this.timeout.medium });
        await saveButton.click();
        // Wait for save to complete
        await this.waitDelay(this.timeout.veryShort, 'Save operation');
    }
    
    /**
     * Click cancel nickname button
     */
    async clickCancelNickname() {
        // Look for the cancel button that contains times-circle-solid.svg icon
        // Use XPath to find the vaadin-button that contains the cancel icon
        const cancelButton = await $('//vaadin-button[.//vaadin-icon[contains(@src, "times-circle-solid.svg")]]');
        
        if (!(await cancelButton.isExisting())) {
            throw new Error('Could not find cancel nickname button with times-circle-solid.svg icon');
        }
        
        await cancelButton.waitForClickable({ timeout: this.timeout.medium });
        await cancelButton.click();
    }
    
    /**
     * Check if nickname was updated successfully
     * @param {string} expectedNickname - Expected nickname text
     * @returns {boolean} True if nickname matches expected value
     */
    async isNicknameUpdated(expectedNickname) {
        try {
            // Wait for edit mode to close
            await this.waitDelay(this.timeout.veryShort, 'Edit mode close');
            const currentNickname = await this.getCurrentNickname();
            return currentNickname === expectedNickname;
        } catch (error) {
            return false;
        }
    }
    
    /**
     * Check if user settings dropdown is visible
     * @returns {boolean} True if dropdown is visible
     */
    async isUserSettingsDropdownVisible() {
        try {
            // After clicking the email dropdown, look for any menu items that might be User Settings
            const menuItems = await $$('vaadin-menu-bar-item, menuitem');
            
            for (const item of menuItems) {
                try {
                    const text = await item.getText();
                    if (text && (text.includes('User Settings') || text.includes('Settings'))) {
                        return await item.isDisplayed();
                    }
                } catch (e) {
                    continue;
                }
            }
            return false;
        } catch (error) {
            return false;
        }
    }
}

export default UserSettingsPage;