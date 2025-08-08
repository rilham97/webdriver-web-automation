# Getting Started Guide

This guide will help you quickly set up and run the CyberRank E2E Test Automation Framework.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
  - Check version: `node --version`
  - Download from: https://nodejs.org/

- **npm** (comes with Node.js)
  - Check version: `npm --version`

- **Chrome Browser** (latest version)
  - Download from: https://www.google.com/chrome/

- **Git**
  - Check version: `git --version`
  - Download from: https://git-scm.com/

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd webDriverProject
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- WebdriverIO
- Cucumber
- Allure Reporter
- Chrome Driver

### 3. Configure Environment

Create a `.env` file in the root directory:

```bash
# Copy from the example
cp .env.example .env
```

Or create it manually with the following content:

```env
# Test User Credentials
TEST_USER_EMAIL=your-test-email@example.com
TEST_USER_PASSWORD=your-test-password

# Environment URLs
BASE_URL=https://www.cyberrank.ai

# Browser Configuration
HEADLESS=false
BROWSER=chrome
```

**Important**: Replace the email and password with valid test credentials.

### 4. Verify Setup

Run a single test to verify everything is working:

```bash
# Run login test only
npm run test:login
```

You should see:
- Chrome browser opens automatically
- Test navigates to CyberRank login page
- Test performs login
- Results displayed in terminal

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run in headless mode (no browser UI)
npm run test:headless

# Run specific test suites
npm run test:pre-login    # Features before login
npm run test:login        # Login features only
npm run test:post-login   # Features after login
```

### Advanced Options

```bash
# Run tests with specific tags
npm test -- --cucumberOpts.tags='@smoke'

# Run a specific feature file
npx wdio run wdio.conf.mjs --spec ./features/login/login.feature

# Debug mode (with Chrome DevTools)
npm run test:debug
```

## Viewing Test Reports

### Generate Allure Report

After running tests:

```bash
# Generate HTML report
npm run allure:generate
```

### Open Report

```bash
# Open in browser
npm run allure:open
```

This will:
1. Start a local server
2. Open the report in your default browser
3. Display detailed test results with:
   - Pass/Fail status
   - Execution time
   - Step-by-step details
   - Screenshots (for failures)
   - Test history

### Clean Reports

Before running new tests, clean old reports:

```bash
npm run clean
```

## Project Structure Overview

```
webDriverProject/
│
├── features/              # Test scenarios in Gherkin
│   ├── pre-login/        # Tests without authentication
│   ├── login/            # Authentication tests
│   └── post-login/       # Tests requiring login
│
├── step-definitions/      # Test implementation
│   └── *.steps.js        # Step definition files
│
├── page-objects/         # Page Object Model
│   ├── base/            # Base page class
│   └── pages/           # Individual page classes
│
├── config/              # Configuration files
│   └── test-data.js     # Test data
│
└── wdio.conf.mjs        # WebdriverIO configuration
```

## Common Tasks

### Check What Tests Exist

```bash
# List all feature files
find features -name "*.feature" -type f
```

### Run Tests for Specific Feature

```bash
# Example: Run only language change tests
npx wdio run wdio.conf.mjs --spec ./features/pre-login/change-language.feature
```

### Generate Report Without Running Tests

If tests were already run:

```bash
npm run allure:generate
npm run allure:open
```

## Troubleshooting

### Issue: "Chrome driver not found"

Solution:
```bash
npm install wdio-chromedriver-service --save-dev
```

### Issue: "Permission denied" errors

Solution:
```bash
chmod -R 755 .
```

### Issue: Tests fail immediately

Check:
1. `.env` file exists with correct credentials
2. Chrome browser is installed
3. Internet connection is active
4. Target website is accessible

### Issue: "Element not found" errors

Try:
1. Run in non-headless mode to see what's happening
2. Check if website UI has changed
3. Increase timeout in `wdio.conf.mjs`

## Environment Variables

The framework uses these environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| TEST_USER_EMAIL | Valid test user email | Required |
| TEST_USER_PASSWORD | Valid test user password | Required |
| BASE_URL | Target website URL | https://www.cyberrank.ai |
| HEADLESS | Run without browser UI | false |
| BROWSER | Browser to use | chrome |

## Tips for Success

1. **Start Small**: Run individual features first before running all tests
2. **Check Reports**: Always generate and check Allure reports for detailed results
3. **Clean Regularly**: Use `npm run clean` to remove old test artifacts
4. **Update Dependencies**: Periodically run `npm update` to get latest packages
5. **Use Headless for CI**: Set `HEADLESS=true` for faster execution in CI/CD

## Next Steps

1. ✅ Verify setup is working
2. 📖 Read [Writing Tests Guide](WRITING_TESTS.md) to create new tests
3. 🚀 Explore [GitHub Actions Setup](GITHUB_ACTIONS_SETUP.md) for CI/CD
4. 🧪 Start writing your own test scenarios!

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review error messages in terminal
3. Check Allure report for detailed failure information
4. Verify all prerequisites are installed correctly
5. Ensure test credentials are valid

For framework-specific help:
- [WebdriverIO Documentation](https://webdriver.io/docs/gettingstarted)
- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [Allure Documentation](https://docs.qameta.io/allure/)