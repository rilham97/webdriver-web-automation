# Writing New Test Cases

This guide explains how to create new test cases in the CyberRank E2E Test Automation Framework.

## Table of Contents
- [Overview](#overview)
- [Step-by-Step Guide](#step-by-step-guide)
- [1. Create Feature File](#1-create-feature-file)
- [2. Write Step Definitions](#2-write-step-definitions)
- [3. Create Page Objects](#3-create-page-objects)
- [4. Add Test Data](#4-add-test-data)
- [5. Run and Debug Tests](#5-run-and-debug-tests)
- [Best Practices](#best-practices)
- [Examples](#examples)

## Overview

The framework follows the BDD (Behavior Driven Development) approach using Cucumber. Tests are written in three layers:

1. **Feature Files** - Human-readable test scenarios in Gherkin syntax
2. **Step Definitions** - JavaScript code that implements the steps
3. **Page Objects** - Encapsulate page elements and actions

## Step-by-Step Guide

### 1. Create Feature File

Feature files describe test scenarios in plain English using Gherkin syntax.

**Location**: Place feature files in the appropriate directory:
- `features/pre-login/` - For features available without login
- `features/login/` - For authentication features
- `features/post-login/` - For features requiring authentication

**Example**: `features/post-login/search.feature`

```gherkin
@regression @post-login @search
Feature: Search Functionality
  As a logged-in user
  I want to search for vendors
  So that I can find specific security ratings

  Background:
    Given I am logged into CyberRank

  @smoke
  Scenario: Search for vendor by name
    When I navigate to the search page
    And I enter "Microsoft" in the search field
    And I click the search button
    Then I should see search results for "Microsoft"
    And the results should contain at least 1 vendor

  Scenario: Search with no results
    When I navigate to the search page
    And I enter "XYZ123NonExistentVendor" in the search field
    And I click the search button
    Then I should see "No results found" message
```

**Gherkin Keywords**:
- `Feature:` - Describes the feature being tested
- `Scenario:` - A specific test case
- `Given` - Preconditions
- `When` - Actions
- `Then` - Expected results
- `And` - Additional steps
- `Background:` - Common steps for all scenarios

**Tags**:
- `@regression` - Include in regression suite
- `@smoke` - Include in smoke tests
- `@post-login` - Categorize the feature

### 2. Write Step Definitions

Step definitions connect Gherkin steps to actual code.

**Location**: `step-definitions/search.steps.js`

```javascript
import { When, Then } from '@wdio/cucumber-framework';
import allureReporter from '@wdio/allure-reporter';
import SearchPage from '../page-objects/pages/SearchPage.js';
import DashboardPage from '../page-objects/pages/DashboardPage.js';

const searchPage = new SearchPage();
const dashboardPage = new DashboardPage();

// Navigation step
When('I navigate to the search page', async () => {
    allureReporter.addStep('Navigate to search from dashboard', () => {
        return dashboardPage.navigateToSearch();
    });
    
    allureReporter.addStep('Wait for search page to load', () => {
        return searchPage.waitForPageLoad();
    });
});

// Search input step
When('I enter {string} in the search field', async (searchTerm) => {
    allureReporter.addStep(`Enter search term: ${searchTerm}`, () => {
        return searchPage.enterSearchTerm(searchTerm);
    });
});

// Click search button
When('I click the search button', async () => {
    allureReporter.addStep('Click search button', () => {
        return searchPage.clickSearchButton();
    });
});

// Verify search results
Then('I should see search results for {string}', async (searchTerm) => {
    allureReporter.addStep('Wait for search results to appear', () => {
        return searchPage.waitForSearchResults();
    });
    
    allureReporter.addStep(`Verify results contain "${searchTerm}"`, async () => {
        const hasResults = await searchPage.hasResultsFor(searchTerm);
        await expect(hasResults).toBe(true);
    });
});

// Verify result count
Then('the results should contain at least {int} vendor', async (minCount) => {
    allureReporter.addStep(`Verify at least ${minCount} result(s)`, async () => {
        const resultCount = await searchPage.getResultCount();
        await expect(resultCount).toBeGreaterThanOrEqual(minCount);
    });
});

// Verify no results message
Then('I should see {string} message', async (expectedMessage) => {
    allureReporter.addStep(`Verify message: "${expectedMessage}"`, async () => {
        const message = await searchPage.getNoResultsMessage();
        await expect(message).toContain(expectedMessage);
    });
});
```

**Key Points**:
- Import necessary dependencies
- Use Allure reporter for detailed step reporting
- Each step should be focused and reusable
- Use parameters `{string}` and `{int}` for dynamic values
- Add explicit waits for reliable execution

### 3. Create Page Objects

Page objects encapsulate page elements and actions.

**Location**: `page-objects/pages/SearchPage.js`

```javascript
import BasePage from '../base/BasePage.js';

class SearchPage extends BasePage {
    /**
     * Define selectors
     */
    get searchInput() { 
        return $('input[placeholder*="Search"]'); 
    }
    
    get searchButton() { 
        return $('button[type="submit"]'); 
    }
    
    get searchResults() { 
        return $$('.search-result-item'); 
    }
    
    get noResultsMessage() { 
        return $('.no-results-message'); 
    }
    
    get loadingSpinner() { 
        return $('.loading-spinner'); 
    }
    
    /**
     * Page actions
     */
    async enterSearchTerm(searchTerm) {
        await this.searchInput.waitForDisplayed({ timeout: this.timeout.medium });
        await this.searchInput.clearValue();
        await this.searchInput.setValue(searchTerm);
    }
    
    async clickSearchButton() {
        await this.searchButton.waitForClickable({ timeout: this.timeout.short });
        await this.searchButton.click();
    }
    
    async waitForSearchResults() {
        // Wait for loading to complete
        await this.loadingSpinner.waitForDisplayed({ reverse: true, timeout: this.timeout.medium });
        
        // Wait for either results or no results message
        await browser.waitUntil(
            async () => {
                const hasResults = await this.searchResults.length > 0;
                const hasNoResultsMsg = await this.noResultsMessage.isDisplayed().catch(() => false);
                return hasResults || hasNoResultsMsg;
            },
            {
                timeout: this.timeout.medium,
                timeoutMsg: 'Search results did not appear'
            }
        );
    }
    
    async hasResultsFor(searchTerm) {
        const results = await this.searchResults;
        if (results.length === 0) return false;
        
        // Check if any result contains the search term
        for (const result of results) {
            const text = await result.getText();
            if (text.toLowerCase().includes(searchTerm.toLowerCase())) {
                return true;
            }
        }
        return false;
    }
    
    async getResultCount() {
        const results = await this.searchResults;
        return results.length;
    }
    
    async getNoResultsMessage() {
        await this.noResultsMessage.waitForDisplayed({ timeout: this.timeout.short });
        return await this.noResultsMessage.getText();
    }
}

export default SearchPage;
```

**Page Object Best Practices**:
- Inherit from `BasePage` for common functionality
- Use getter methods for selectors
- Keep selectors at the top
- Create reusable methods for page actions
- Handle waits within page methods
- Use meaningful method names

### 4. Add Test Data

If your tests need specific data, add it to the test data configuration.

**Location**: `config/test-data.js`

```javascript
export default {
    validUser: {
        email: process.env.VALID_EMAIL || 'test@example.com',
        password: process.env.VALID_PASSWORD || 'password123'
    },
    
    searchTerms: {
        valid: ['Microsoft', 'Google', 'Amazon'],
        invalid: 'XYZ123NonExistentVendor',
        special: 'Test & Company @123'
    },
    
    // Add more test data as needed
};
```

### 5. Run and Debug Tests

#### Run Your New Test

```bash
# Run specific feature file
npx wdio run wdio.conf.mjs --spec ./features/post-login/search.feature

# Run with specific tag
npm test -- --cucumberOpts.tags='@search'
```

#### Debug Tips

1. **Add console logs**:
   ```javascript
   console.log('Current URL:', await browser.getUrl());
   console.log('Element visible:', await element.isDisplayed());
   ```

2. **Take screenshots**:
   ```javascript
   await browser.saveScreenshot('./debug-screenshot.png');
   ```

3. **Use browser pause** (for debugging only):
   ```javascript
   await browser.pause(3000); // Pause for 3 seconds
   ```

4. **Run in debug mode**:
   ```bash
   npm run test:debug
   ```

## Best Practices

### 1. Feature Files
- Use descriptive scenario names
- Keep scenarios independent
- Use Background for common setup
- Tag appropriately for test organization
- Write from user's perspective

### 2. Step Definitions
- Keep steps small and focused
- Reuse existing steps when possible
- Use parameters for flexibility
- Add Allure reporting for visibility
- Handle errors gracefully

### 3. Page Objects
- One page object per page/component
- Encapsulate all page interactions
- Use explicit waits
- Keep selectors maintainable
- Don't add assertions in page objects

### 4. Selectors
- Prefer ID and data attributes
- Avoid fragile XPath selectors
- Use CSS selectors when possible
- Make selectors readable

### 5. Waits
- Always use explicit waits
- Avoid hardcoded pauses
- Wait for specific conditions
- Use appropriate timeout values

## Examples

### Example 1: Form Validation Test

```gherkin
Scenario: Validate required fields
    When I navigate to the registration page
    And I click the submit button without filling any fields
    Then I should see "Email is required" error message
    And I should see "Password is required" error message
```

### Example 2: Data-Driven Test

```gherkin
Scenario Outline: Login with different credentials
    When I enter "<email>" in the email field
    And I enter "<password>" in the password field
    And I click the login button
    Then I should see "<result>"
    
    Examples:
        | email              | password    | result                |
        | valid@test.com     | ValidPass1! | Dashboard             |
        | invalid@test.com   | WrongPass   | Invalid credentials   |
        | notanemail         | Pass123!    | Invalid email format  |
```

### Example 3: File Upload Test

```javascript
// Step definition
When('I upload the file {string}', async (filename) => {
    const filePath = path.join(__dirname, '../test-data/files/', filename);
    await uploadPage.uploadFile(filePath);
});

// Page object method
async uploadFile(filePath) {
    const remoteFilePath = await browser.uploadFile(filePath);
    await this.fileInput.setValue(remoteFilePath);
}
```

## Common Patterns

### Handling Dynamic Content
```javascript
// Wait for element with dynamic text
await browser.waitUntil(
    async () => {
        const text = await element.getText();
        return text.includes('Expected');
    },
    {
        timeout: 5000,
        timeoutMsg: 'Expected text did not appear'
    }
);
```

### Handling Popups/Modals
```javascript
// Page object method
async handleConfirmationPopup(action = 'accept') {
    await this.confirmPopup.waitForDisplayed();
    if (action === 'accept') {
        await this.confirmButton.click();
    } else {
        await this.cancelButton.click();
    }
    await this.confirmPopup.waitForDisplayed({ reverse: true });
}
```

### Working with Tables
```javascript
// Get data from specific table row
async getRowData(rowIndex) {
    const rows = await this.tableRows;
    if (rowIndex >= rows.length) {
        throw new Error(`Row ${rowIndex} does not exist`);
    }
    
    const cells = await rows[rowIndex].$$('td');
    const data = [];
    
    for (const cell of cells) {
        data.push(await cell.getText());
    }
    
    return data;
}
```

## Next Steps

1. Review existing tests for patterns and conventions
2. Start with simple scenarios and build complexity
3. Run tests frequently during development
4. Review Allure reports for test visibility
5. Refactor and optimize as needed

For more information:
- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [WebdriverIO API](https://webdriver.io/docs/api)
- [Gherkin Reference](https://cucumber.io/docs/gherkin/reference/)