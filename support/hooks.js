import { Before, After, BeforeAll, AfterAll } from '@wdio/cucumber-framework';
import { Status } from '@cucumber/cucumber';

/**
 * Global hooks for test execution
 */

// Run once before all tests
BeforeAll(async function () {
    console.log('Starting test suite execution...');
});

// Run before each scenario
Before(async function (scenario) {
    // Start performance tracking
    this.setData('startTime', Date.now());
    
    // Log scenario start
    console.log(`Starting scenario: ${scenario.pickle.name}`);
    
    // Set up browser window
    await browser.setWindowRect(0, 0, 1920, 1080);
    await browser.maximizeWindow();
    
    // Clear browser state
    await browser.deleteAllCookies();
    // Only clear storage if we're on a proper page (not about:blank)
    await browser.execute('if (window.location.protocol !== "about:") { try { window.localStorage.clear(); } catch(e) {} }');
    await browser.execute('if (window.location.protocol !== "about:") { try { window.sessionStorage.clear(); } catch(e) {} }');
    
    // Navigate to base URL
    await browser.url('/');
    
    // Clear world data
    this.clearData();
    
    // Note: Allure labels removed to prevent duplicate reporting
});

// Run after each scenario
After(async function (scenario) {
    // Performance tracking
    const startTime = this.getData('startTime');
    const duration = startTime ? Date.now() - startTime : 0;
    console.log(`Scenario duration: ${duration}ms`);
    // Note: Allure duration label removed to prevent duplicate reporting
    
    // Take screenshot on failure
    if (scenario.result.status === Status.FAILED) {
        // Capture screenshot
        const screenshot = await browser.takeScreenshot();
        this.attach(screenshot, 'image/png');
        
        // Note: Allure attachment removed to prevent duplicate reporting
        
        // Only capture critical browser console errors (not network failures)
        const logs = await browser.getLogs('browser');
        if (logs.length > 0) {
            const criticalLogs = logs
                .filter(log => log.level === 'SEVERE' && 
                          !log.message.includes('Failed to load resource') &&
                          !log.message.includes('ERR_NAME_NOT_RESOLVED') &&
                          !log.message.includes('404 (Not Found)') &&
                          !log.message.includes('403 (Forbidden)'))
                .map(log => `${log.level}: ${log.message}`)
                .join('\n');
            
            if (criticalLogs) {
                this.attach(`Critical Browser Errors:\n${criticalLogs}`, 'text/plain');
            }
        }
    }
    
    // Log scenario completion
    console.log(`Completed scenario: ${scenario.pickle.name} - ${scenario.result.status}`);
});

// Run once after all tests
AfterAll(async function () {
    console.log('Test suite execution completed.');
});

// Note: All tagged hooks removed to avoid duplication and conflicts
// All logic is now handled in the main Before/After hooks above

export default {};