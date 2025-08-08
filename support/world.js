import { setWorldConstructor } from '@wdio/cucumber-framework';

/**
 * Custom World class for Cucumber
 * Provides shared context across step definitions
 */
class CustomWorld {
    constructor({ attach }) {
        this.attach = attach;
        this.testData = {};
        this.currentPage = null;
        this.context = {};
    }

    /**
     * Store data for sharing between steps
     * @param {string} key - Data key
     * @param {any} value - Data value
     */
    setData(key, value) {
        this.testData[key] = value;
    }

    /**
     * Retrieve stored data
     * @param {string} key - Data key
     * @returns {any} Stored value
     */
    getData(key) {
        return this.testData[key];
    }

    /**
     * Set current page object
     * @param {object} page - Page object instance
     */
    setCurrentPage(page) {
        this.currentPage = page;
    }

    /**
     * Get current page object
     * @returns {object} Current page object
     */
    getCurrentPage() {
        return this.currentPage;
    }

    /**
     * Take screenshot and attach to report
     * @param {string} name - Screenshot name
     */
    async takeScreenshot(name = 'screenshot') {
        const screenshot = await browser.takeScreenshot();
        this.attach(screenshot, 'image/png');
        return screenshot;
    }

    /**
     * Attach text to report
     * @param {string} text - Text to attach
     * @param {string} mediaType - Media type (default: text/plain)
     */
    attachText(text, mediaType = 'text/plain') {
        this.attach(text, mediaType);
    }

    /**
     * Clear test data
     */
    clearData() {
        this.testData = {};
        this.context = {};
    }
}

setWorldConstructor(CustomWorld);

export default CustomWorld;