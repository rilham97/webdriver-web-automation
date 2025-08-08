import BasePage from '../base/BasePage.js';

class DashboardPage extends BasePage {
    /**
     * Define selectors using getter methods
     */
    
    // Dashboard title
    get dashboardTitle() { 
        return $('h1*=Dashboard'); 
    }
    
    // User email display
    get userEmailDisplay() { 
        return $('vaadin-menu-bar-item span*=@gmail.com'); 
    }
    
    // New Assessment button
    get newAssessmentButton() { 
        return $('button*=New Assessment'); 
    }
    
    // Credits display
    get creditsDisplay() { 
        return $('h4*=Credits'); 
    }
    
    // Navigation menu items
    get dashboardMenuItem() { 
        return $('a[href="dashboard"]'); 
    }
    
    get myVendorsMenuItem() { 
        return $('a[href="myvendors"]'); 
    }
    
    get directoryMenuItem() { 
        return $('a[href="directory"]'); 
    }
    
    get questionnairesMenuItem() { 
        return $('a[href="questionnaire"]'); 
    }
    
    get individualsMenuItem() { 
        return $('a[href="individuals"]'); 
    }
    
    get topRankMenuItem() { 
        return $('a[href="toprank"]'); 
    }
    
    get referralsMenuItem() { 
        return $('a[href="referrals"]'); 
    }
    
    get teamsMenuItem() { 
        return $('a[href="team"]'); 
    }
    
    get billingMenuItem() { 
        return $('a[href="billing"]'); 
    }
    
    get apiMenuItem() { 
        return $('a[href="apisub"]'); 
    }
    
    // Vendor cards
    get vendorCards() { 
        return $$('div*=Current Rating'); 
    }
    
    // Recent ratings section
    get recentRatingsSection() { 
        return $('h2*=Recent Ratings').parentElement(); 
    }
    
    // Logout menu (user profile dropdown)
    get userProfileMenu() { 
        return $('vaadin-menu-bar-item'); 
    }
    
    /**
     * Page Methods
     */
    
    /**
     * Wait for dashboard to load
     */
    async waitForDashboard() {
        await this.waitForUrlContains('/vas/dashboard');
        await this.dashboardTitle.waitForDisplayed({ timeout: this.timeout.long });
        await this.waitForPageLoad();
    }
    
    /**
     * Get user email from display
     * @returns {string} User email
     */
    async getUserEmail() {
        await this.userEmailDisplay.waitForDisplayed();
        return await this.userEmailDisplay.getText();
    }
    
    /**
     * Get credits amount
     * @returns {string} Credits text
     */
    async getCreditsAmount() {
        await this.creditsDisplay.waitForDisplayed();
        return await this.creditsDisplay.getText();
    }
    
    /**
     * Click New Assessment button
     */
    async clickNewAssessment() {
        await this.clickElement(this.newAssessmentButton);
    }
    
    /**
     * Navigate to menu item
     * @param {string} menuItem - Menu item name
     */
    async navigateToMenuItem(menuItem) {
        const menuMap = {
            'dashboard': this.dashboardMenuItem,
            'my vendors': this.myVendorsMenuItem,
            'directory': this.directoryMenuItem,
            'questionnaires': this.questionnairesMenuItem,
            'individuals': this.individualsMenuItem,
            'top rank': this.topRankMenuItem,
            'referrals': this.referralsMenuItem,
            'teams': this.teamsMenuItem,
            'billing': this.billingMenuItem,
            'api': this.apiMenuItem
        };
        
        const element = menuMap[menuItem.toLowerCase()];
        if (element) {
            await this.clickElement(element);
        } else {
            throw new Error(`Menu item "${menuItem}" not found`);
        }
    }
    
    /**
     * Get vendor count from My Vendors menu
     * @returns {number} Vendor count
     */
    async getVendorCount() {
        const vendorText = await this.myVendorsMenuItem.getText();
        const match = vendorText.match(/\((\d+)\)/);
        return match ? parseInt(match[1]) : 0;
    }
    
    /**
     * Get directory count
     * @returns {number} Directory count
     */
    async getDirectoryCount() {
        const directoryText = await this.directoryMenuItem.getText();
        const match = directoryText.match(/\((\d+)\)/);
        return match ? parseInt(match[1]) : 0;
    }
    
    /**
     * Check if user is logged in
     * @returns {boolean} True if logged in
     */
    async isLoggedIn() {
        try {
            return await this.dashboardTitle.isDisplayed() && 
                   await this.userEmailDisplay.isDisplayed();
        } catch (error) {
            return false;
        }
    }
    
    /**
     * Get all recent ratings
     * @returns {Array} Array of rating information
     */
    async getRecentRatings() {
        const ratingCards = await $$('div[ref*="e7"] > div > div');
        const ratings = [];
        
        for (const card of ratingCards) {
            const name = await card.$('h2').getText();
            const riskCount = await card.$('div*=Identified Risk').previousElement().getText();
            const date = await card.$('div*=2025').getText();
            
            ratings.push({
                name,
                riskCount,
                date
            });
        }
        
        return ratings;
    }
    
    /**
     * Open user profile menu
     */
    async openUserProfileMenu() {
        // Wait for page to be fully loaded
        await this.waitForPageLoad();
        
        // Find all vaadin-menu-bar-item elements and find the one with email
        const menuItems = await $$('vaadin-menu-bar-item');
        let emailMenuItem = null;
        
        for (const item of menuItems) {
            try {
                const text = await item.getText();
                if (text && (text.includes('@gmail.com') || text.includes('falaraiza'))) {
                    emailMenuItem = item;
                    break;
                }
            } catch (e) {
                // Continue if unable to get text from this element
                continue;
            }
        }
        
        if (!emailMenuItem) {
            throw new Error('Could not find email menu item');
        }
        
        // Wait for the element to be displayed and clickable
        await emailMenuItem.waitForDisplayed({ timeout: this.timeout.medium });
        await emailMenuItem.waitForClickable({ timeout: this.timeout.medium });
        
        // Scroll element into view if needed
        await emailMenuItem.scrollIntoView();
        
        // Try clicking with JavaScript if regular click fails
        try {
            await emailMenuItem.click();
        } catch (error) {
            console.log('Regular click failed, trying JavaScript click...');
            await browser.execute('arguments[0].click()', emailMenuItem);
        }
    }
}

export default DashboardPage;