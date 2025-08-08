import BasePage from '../base/BasePage.js';

class LoginPage extends BasePage {
    /**
     * Define selectors using getter methods
     */
    
    // Email input field (Vaadin text field)
    get emailInput() { 
        return $('input[type="text"]'); 
    }
    
    // Password input field (Vaadin password field)
    get passwordInput() { 
        return $('input[type="password"]'); 
    }
    
    // Login button with submit ID
    get loginButton() { 
        return $('#submit-button'); 
    }
    
    // Error message display (snackbar/alert)
    get errorMessage() { 
        return $('[role="alert"], alert'); 
    }
    
    // Show password button
    get showPasswordButton() { 
        return $('button*=Show password'); 
    }
    
    // Sign in with Google button
    get googleSignInButton() { 
        return $('button*=Sign in with Google'); 
    }
    
    // Sign in with Microsoft button
    get microsoftSignInButton() { 
        return $('button*=Sign in with Microsoft'); 
    }
    
    // Forgot password link
    get forgotPasswordLink() { 
        return $('vaadin-button*=Forgot Password'); 
    }
    
    // Register link
    get registerLink() { 
        return $('vaadin-button*=Register'); 
    }
    
    // Remember me checkbox (if exists)
    get rememberMeCheckbox() { 
        return $('input[type="checkbox"]'); 
    }
    
    /**
     * Page Methods
     */
    
    /**
     * Navigate to login page
     */
    async open() {
        await super.navigate('/vas/login');
    }
    
    /**
     * Perform login with email and password
     * @param {string} email - User email
     * @param {string} password - User password
     */
    async login(email, password) {
        await this.emailInput.waitForDisplayed({ timeout: this.timeout.medium });
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
    
    /**
     * Toggle password visibility
     */
    async togglePasswordVisibility() {
        await this.showPasswordButton.click();
    }
    
    /**
     * Click forgot password link
     */
    async clickForgotPassword() {
        await this.forgotPasswordLink.click();
    }
    
    /**
     * Click register link
     */
    async clickRegister() {
        await this.registerLink.click();
    }
    
    /**
     * Login with Google SSO
     */
    async loginWithGoogle() {
        await this.googleSignInButton.click();
    }
    
    /**
     * Login with Microsoft SSO
     */
    async loginWithMicrosoft() {
        await this.microsoftSignInButton.click();
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
     * Check if login form is displayed
     * @returns {boolean} True if form is displayed
     */
    async isLoginFormDisplayed() {
        return await this.emailInput.isDisplayed() && 
               await this.passwordInput.isDisplayed() && 
               await this.loginButton.isDisplayed();
    }
    
    /**
     * Clear login form
     */
    async clearForm() {
        await this.emailInput.clearValue();
        await this.passwordInput.clearValue();
    }
}

export default LoginPage;