import BasePage from '../base/BasePage.js';

class ForgotPasswordPage extends BasePage {
    /**
     * Define selectors for forgot password page elements
     */
    
    // Email input field
    get emailInput() { 
        return $('input[type="email"], input[type="text"]'); 
    }
    
    // Send Reset Password Link button
    get sendResetButton() { 
        return $('vaadin-button*=Send Reset Password Link'); 
    }
    
    // Success popup elements
    get successPopup() {
        return $('vaadin-notification-container vaadin-notification-card'); 
    }
    
    get successPopupMessage() {
        return $('vaadin-notification-card div'); 
    }
    
    // Back to login link
    get backToLoginLink() { 
        return $('vaadin-button*=Back to Login, a*=Back to Login'); 
    }
    
    // Error message display
    get errorMessage() { 
        return $('[role="alert"], .error-message'); 
    }
    
    /**
     * Page Methods
     */
    
    /**
     * Navigate to forgot password page
     */
    async open() {
        await super.navigate('/forgot-password');
    }
    
    /**
     * Submit forgot password form
     * @param {string} email - User email
     */
    async resetPassword(email) {
        await this.emailInput.waitForDisplayed({ timeout: this.timeout.medium });
        await this.emailInput.setValue(email);
        await this.sendResetButton.click();
    }
    
    /**
     * Wait for success popup
     */
    async waitForSuccessPopup() {
        await this.successPopup.waitForDisplayed({ timeout: this.timeout.medium });
    }
    
    /**
     * Get success message text
     * @returns {string} Success message text
     */
    async getSuccessMessage() {
        await this.successPopupMessage.waitForDisplayed();
        return await this.successPopupMessage.getText();
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
     * Check if forgot password form is displayed
     * @returns {boolean} True if form is displayed
     */
    async isForgotPasswordFormDisplayed() {
        return await this.emailInput.isDisplayed() && 
               await this.sendResetButton.isDisplayed();
    }
    
    /**
     * Go back to login page
     */
    async goBackToLogin() {
        await this.backToLoginLink.click();
    }
}

export default ForgotPasswordPage;