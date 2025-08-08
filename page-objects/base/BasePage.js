/**
 * Base Page class containing common functionality for all page objects
 */
class BasePage {
    constructor() {
        this.timeout = {
            veryShort: 1000,    // 1 second - brief pauses
            short: 5000,        // 5 seconds - quick waits
            medium: 10000,      // 10 seconds - standard waits
            mediumLong: 15000,  // 15 seconds - error messages
            long: 30000,        // 30 seconds - slow operations
            veryLong: 60000,    // 1 minute - hooks/background
            extraLong: 150000   // 2.5 minutes - registration/long processes
        };
    }

    /**
     * Navigate to a specific path
     * @param {string} path - Path to navigate to
     */
    async navigate(path) {
        await browser.url(path);
    }

    /**
     * Wait for page to load completely
     */
    async waitForPageLoad() {
        await browser.waitUntil(
            async () => (await browser.execute(() => document.readyState)) === 'complete',
            {
                timeout: this.timeout.long,
                timeoutMsg: 'Page did not load completely'
            }
        );
    }

    /**
     * Click an element with wait
     * @param {WebdriverIO.Element} element - Element to click
     */
    async clickElement(element) {
        await element.waitForClickable({ timeout: this.timeout.medium });
        await element.click();
    }

    /**
     * Set value in input field with clear
     * @param {WebdriverIO.Element} element - Input element
     * @param {string} value - Value to set
     */
    async setValue(element, value) {
        await element.waitForDisplayed({ timeout: this.timeout.medium });
        await element.clearValue();
        await element.setValue(value);
    }

    /**
     * Get element text with wait
     * @param {WebdriverIO.Element} element - Element to get text from
     * @returns {string} Element text
     */
    async getText(element) {
        await element.waitForDisplayed({ timeout: this.timeout.medium });
        return await element.getText();
    }

    /**
     * Check if element is displayed
     * @param {WebdriverIO.Element} element - Element to check
     * @returns {boolean} True if displayed
     */
    async isDisplayed(element) {
        try {
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Wait for element to be displayed
     * @param {WebdriverIO.Element} element - Element to wait for
     * @param {number} timeout - Custom timeout
     */
    async waitForElement(element, timeout = this.timeout.medium) {
        await element.waitForDisplayed({ timeout });
    }

    /**
     * Wait for element to disappear
     * @param {WebdriverIO.Element} element - Element to wait for
     * @param {number} timeout - Custom timeout
     */
    async waitForElementToDisappear(element, timeout = this.timeout.medium) {
        await element.waitForDisplayed({ 
            timeout, 
            reverse: true 
        });
    }

    /**
     * Take screenshot
     * @param {string} name - Screenshot name
     */
    async takeScreenshot(name) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await browser.saveScreenshot(`./screenshots/${name}-${timestamp}.png`);
    }

    /**
     * Scroll to element
     * @param {WebdriverIO.Element} element - Element to scroll to
     */
    async scrollToElement(element) {
        await element.scrollIntoView();
    }

    /**
     * Get current URL
     * @returns {string} Current URL
     */
    async getCurrentUrl() {
        return await browser.getUrl();
    }

    /**
     * Refresh the page
     */
    async refresh() {
        await browser.refresh();
    }

    /**
     * Switch to frame
     * @param {WebdriverIO.Element} frame - Frame element
     */
    async switchToFrame(frame) {
        await browser.switchToFrame(frame);
    }

    /**
     * Switch back to parent frame
     */
    async switchToParentFrame() {
        await browser.switchToParentFrame();
    }

    /**
     * Accept alert
     */
    async acceptAlert() {
        await browser.acceptAlert();
    }

    /**
     * Dismiss alert
     */
    async dismissAlert() {
        await browser.dismissAlert();
    }

    /**
     * Get alert text
     * @returns {string} Alert text
     */
    async getAlertText() {
        return await browser.getAlertText();
    }

    /**
     * Execute JavaScript
     * @param {string} script - JavaScript to execute
     * @param {Array} args - Arguments for script
     * @returns {any} Script result
     */
    async executeScript(script, ...args) {
        return await browser.execute(script, ...args);
    }

    /**
     * Wait for URL to contain specific text
     * @param {string} urlPart - Part of URL to wait for
     * @param {number} timeout - Custom timeout
     */
    async waitForUrlContains(urlPart, timeout = this.timeout.medium) {
        await browser.waitUntil(
            async () => {
                const currentUrl = await browser.getUrl();
                return currentUrl.includes(urlPart);
            },
            {
                timeout,
                timeoutMsg: `URL does not contain: ${urlPart}`
            }
        );
    }

    /**
     * Better alternative to browser.pause - wait for specific condition
     * @param {Function} condition - Condition function to wait for
     * @param {Object} options - Wait options
     * @returns {Promise}
     */
    async waitForCondition(condition, options = {}) {
        const defaultOptions = {
            timeout: this.timeout.medium,
            interval: 500,
            timeoutMsg: 'Condition not met within timeout'
        };
        
        const waitOptions = { ...defaultOptions, ...options };
        
        return await browser.waitUntil(condition, waitOptions);
    }

    /**
     * Smart wait with retry delay instead of pause
     * @param {number} timeout - Timeout in milliseconds
     * @param {string} reason - Reason for waiting (for debugging)
     */
    async waitDelay(timeout = this.timeout.veryShort, reason = 'Retry delay') {
        await browser.waitUntil(() => false, { timeout, timeoutMsg: reason }).catch(() => {});
    }

    /**
     * Wait for multiple elements to be displayed
     * @param {Array} selectors - Array of element selectors
     * @param {number} timeout - Custom timeout
     */
    async waitForMultipleElements(selectors, timeout = this.timeout.medium) {
        await browser.waitUntil(
            async () => {
                for (const selector of selectors) {
                    const element = await $(selector);
                    if (!(await element.isDisplayed())) {
                        return false;
                    }
                }
                return true;
            },
            {
                timeout,
                timeoutMsg: 'Not all elements are displayed'
            }
        );
    }

    /**
     * Wait for element count to match expected count
     * @param {string} selector - Element selector
     * @param {number} expectedCount - Expected number of elements
     * @param {number} timeout - Custom timeout
     */
    async waitForElementCount(selector, expectedCount, timeout = this.timeout.medium) {
        await browser.waitUntil(
            async () => {
                const elements = await $$(selector);
                return elements.length >= expectedCount;
            },
            {
                timeout,
                timeoutMsg: `Expected ${expectedCount} elements with selector '${selector}'`
            }
        );
    }
}

export default BasePage;