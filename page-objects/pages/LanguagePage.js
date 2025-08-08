import BasePage from '../base/BasePage.js';

class LanguagePage extends BasePage {
    /**
     * Define selectors for language functionality
     */
    
    // Language selector button (shows current language)
    get languageSelectorButton() { 
        return $('vaadin-select-value-button[role="button"]'); 
    }
    
    // English language option
    get englishLanguageOption() { 
        return $('[role="option"]*=English'); 
    }
    
    // Indonesian language option
    get indonesianLanguageOption() { 
        return $('vaadin-select-item*=Indonesian'); 
    }
    
    // Malaysian language option  
    get malaysianLanguageOption() { 
        return $('[role="option"]*=Malaysian'); 
    }
    
    // Current language indicator
    get currentLanguageIndicator() { 
        return $('button[expanded] img, button img[alt*="ID"], button img[alt*="EN"], button img[alt*="MS"]'); 
    }
    
    // Navigation items for verification
    get berandaNavItem() { 
        return $('*=Beranda'); 
    }
    
    get apaYangKamiLakukanNavItem() { 
        return $('*=Apa yang kami lakukan'); 
    }
    
    get homeNavItem() { 
        return $('*=Home'); 
    }
    
    get whatWeDoNavItem() { 
        return $('*=What we do'); 
    }
    
    // Back to Home button
    get backToHomeButton() { 
        return $('button*=Back to Home'); 
    }
    
    /**
     * Page Methods
     */
    
    /**
     * Click language selector button
     */
    async clickLanguageSelector() {
        await this.languageSelectorButton.waitForDisplayed({ timeout: this.timeout.medium });
        await this.languageSelectorButton.click();
    }
    
    /**
     * Select language from dropdown
     * @param {string} language - Language to select (English, Indonesian, Malaysian, etc.)
     */
    async selectLanguage(language) {
        let languageOption;
        switch(language.toLowerCase()) {
            case 'indonesian':
                languageOption = this.indonesianLanguageOption;
                break;
            case 'english':
                languageOption = this.englishLanguageOption;
                break;
            case 'malaysian':
                languageOption = this.malaysianLanguageOption;
                break;
            default:
                throw new Error(`Language "${language}" not supported`);
        }
        
        await languageOption.waitForDisplayed({ timeout: this.timeout.medium });
        await languageOption.click();
    }
    
    /**
     * Navigate to home page
     */
    async goToHomePage() {
        await this.backToHomeButton.waitForDisplayed({ timeout: this.timeout.medium });
        await this.backToHomeButton.click();
    }
    
    /**
     * Check if Indonesian navigation items are displayed
     * @returns {boolean} True if Indonesian nav items are displayed
     */
    async areIndonesianNavItemsDisplayed() {
        const beranda = await this.berandaNavItem.isDisplayed();
        const apaYangKami = await this.apaYangKamiLakukanNavItem.isDisplayed();
        return beranda && apaYangKami;
    }
    
    /**
     * Check if English navigation items are displayed
     * @returns {boolean} True if English nav items are displayed
     */
    async areEnglishNavItemsDisplayed() {
        const home = await this.homeNavItem.isDisplayed();
        const whatWeDo = await this.whatWeDoNavItem.isDisplayed();
        return home && whatWeDo;
    }
    
    /**
     * Get current language from the language selector button
     * @returns {string} Current language text
     */
    async getCurrentLanguage() {
        await this.languageSelectorButton.waitForDisplayed({ timeout: this.timeout.medium });
        // Get the text from the span inside the button
        const languageSpan = await this.languageSelectorButton.$('span');
        const buttonText = await languageSpan.getText();
        return buttonText;
    }
    
    /**
     * Verify specific navigation text is displayed
     * @param {string} navText - Navigation text to verify
     * @returns {boolean} True if navigation text is displayed
     */
    async isNavItemDisplayed(navText) {
        const navElement = await $(`*=${navText}`);
        return await navElement.isDisplayed();
    }
}

export default LanguagePage;