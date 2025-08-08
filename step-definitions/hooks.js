import { Before, After } from '@wdio/cucumber-framework';
import LoginPage from '../page-objects/pages/LoginPage.js';
import DashboardPage from '../page-objects/pages/DashboardPage.js';
import testData from '../config/test-data.js';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

// Hook for scenarios that require authenticated session
Before({ tags: '@authenticated' }, async () => {
    
    // Navigate to login page
    await browser.url('/vas/login');
    await loginPage.waitForPageLoad();
    
    // Get credentials from test data config
    const email = testData.validUser.email;
    const password = testData.validUser.password;
    
    // Perform login
    await loginPage.login(email, password);
    
    // Wait for dashboard to load
    await dashboardPage.waitForDashboard();
    
    // Verify we're on the dashboard
    const currentUrl = await browser.getUrl();
    if (!currentUrl.includes('/vas/dashboard')) {
        throw new Error('Failed to navigate to dashboard after login');
    }
    
});

// Clean up after each scenario
After(async (scenario) => {
    // Take screenshot on failure
    if (scenario.result.status === 'FAILED') {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await browser.saveScreenshot(`./screenshots/failed-${timestamp}.png`);
    }
    
    // Clear session storage and cookies
    await browser.deleteAllCookies();
    await browser.execute(() => {
        sessionStorage.clear();
        localStorage.clear();
    });
});