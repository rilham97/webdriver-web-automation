import BasePage from '../base/BasePage.js';

class RegistrationPage extends BasePage {
    /**
     * Define selectors for registration page elements
     */
    
    // Email input field
    get emailInput() { 
        return $('input[type="email"], input[type="text"]'); 
    }
    
    // Password input field - first password field
    get passwordInput() { 
        return $$('input[type="password"]')[0]; 
    }
    
    // Confirm password input field - second password field
    get confirmPasswordInput() { 
        return $$('input[type="password"]')[1]; 
    }
    
    // Terms and conditions checkbox
    get termsCheckbox() { 
        // Click the vaadin-checkbox element directly
        return $('vaadin-checkbox'); 
    }
    
    // Submit/Register button - the main register button (not the bottom login redirect)
    get submitButton() { 
        // Use partial text selector for the Register button
        return $('vaadin-button*=Register');
    }
    
    // Success popup elements
    get successPopup() {
        // The actual notification container structure
        return $('vaadin-notification-container vaadin-notification-card'); 
    }
    
    get successPopupTitle() {
        // Look for the success title within the notification card
        return $('vaadin-notification-card div'); 
    }
    
    get successPopupBody() {
        // Look for the email verification message
        return $('vaadin-notification-card span*=Please check your mailbox'); 
    }
    
    // Error message display
    get errorMessage() { 
        return $('[role="alert"], .error-message'); 
    }
    
    /**
     * Page Methods
     */
    
    /**
     * Navigate to registration page
     */
    async open() {
        await super.navigate('/register');
    }
    
    /**
     * Fill registration form
     * @param {string} email - User email
     * @param {string} password - User password
     * @param {boolean} acceptTerms - Whether to accept terms
     */
    async register(email, password, acceptTerms = true) {
        await this.emailInput.waitForDisplayed({ timeout: this.timeout.medium });
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        
        if (acceptTerms) {
            await this.termsCheckbox.click();
        }
        
        await this.submitButton.click();
    }
    
    /**
     * Wait for success popup
     */
    async waitForSuccessPopup() {
        await this.successPopup.waitForDisplayed({ timeout: this.timeout.long });
    }
    
    /**
     * Get error message text
     * @returns {string} Error message text
     */
    async getErrorMessage() {
        await this.errorMessage.waitForDisplayed();
        return await this.errorMessage.getText();
    }
    
    /**
     * Check if registration form is displayed
     * @returns {boolean} True if form is displayed
     */
    async isRegistrationFormDisplayed() {
        return await this.emailInput.isDisplayed() && 
               await this.passwordInput.isDisplayed() && 
               await this.submitButton.isDisplayed();
    }
}

export default RegistrationPage;