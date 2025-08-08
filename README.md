# CyberRank E2E Test Automation Framework

End-to-end test automation framework for CyberRank.ai platform using WebdriverIO with Cucumber BDD.

## Table of Contents
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Writing New Tests](#writing-new-tests)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## Overview

This framework provides automated testing for the CyberRank.ai platform, covering pre-login features, authentication, and post-login functionality.

## Technology Stack

- **WebdriverIO v9** - Browser automation framework
- **Cucumber** - BDD test framework  
- **JavaScript (ES6 Modules)** - Programming language
- **Allure** - Test reporting
- **Chrome** - Browser for test execution
- **GitHub Actions** - CI/CD integration

## Project Structure

```
webDriverProject/
├── .github/
│   └── workflows/
│       └── test.yml              # GitHub Actions workflow
├── config/
│   └── test-data.js              # Test data and credentials
├── docs/
│   ├── GETTING_STARTED.md        # Quick start guide
│   ├── WRITING_TESTS.md          # Guide for writing new tests
│   └── GITHUB_ACTIONS_SETUP.md   # CI/CD setup guide
├── features/
│   ├── pre-login/
│   │   ├── change-language.feature
│   │   ├── forgot-password.feature
│   │   └── registration.feature
│   ├── login/
│   │   └── login.feature
│   └── post-login/
│       ├── add-team-member.feature
│       ├── delete-team-member.feature
│       ├── edit-profile.feature
│       └── edit-report.feature
├── page-objects/
│   ├── base/
│   │   └── BasePage.js           # Base page class
│   └── pages/
│       ├── DashboardPage.js
│       ├── LoginPage.js
│       ├── RegistrationPage.js
│       └── [other page objects]
├── step-definitions/
│   ├── common.steps.js           # Common step definitions
│   ├── login.steps.js
│   ├── registration.steps.js
│   └── [other step definitions]
├── support/
│   ├── hooks.js                  # Cucumber hooks
│   └── world.js                  # Cucumber world configuration
├── package.json                  # Project dependencies
├── wdio.conf.mjs                 # WebdriverIO configuration
└── .env                          # Environment variables (create this)
```

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm
- Chrome browser

### Setup Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd webDriverProject
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file in the root directory:
   ```
   VALID_EMAIL=your-test-email@example.com
   VALID_PASSWORD=your-test-password
   ```

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Headless Mode
```bash
npm run test:headless
```

### Run Specific Test Suites
```bash
# Pre-login features only
npm run test:pre-login

# Login features only
npm run test:login

# Post-login features only
npm run test:post-login
```

### Run Tests with Specific Tags
```bash
# Run smoke tests
npm test -- --cucumberOpts.tags='@smoke'

# Run regression tests
npm test -- --cucumberOpts.tags='@regression'
```

## Test Reports

### Generate Allure Report
After running tests, generate the HTML report:
```bash
npm run allure:generate
```

### Open Allure Report
View the generated report in your browser:
```bash
npm run allure:open
```

The report will open automatically in your default browser at http://localhost:port

### Clean Previous Reports
Remove old test results and reports:
```bash
npm run clean
```

## Writing New Tests

For detailed instructions on creating new test cases, see [docs/WRITING_TESTS.md](docs/WRITING_TESTS.md).

Quick overview:
1. Create a feature file in the appropriate directory
2. Write scenarios using Gherkin syntax
3. Implement step definitions
4. Create/update page objects as needed
5. Run and verify your tests

## CI/CD Integration

The project includes GitHub Actions workflow for automated testing. See [docs/GITHUB_ACTIONS_SETUP.md](docs/GITHUB_ACTIONS_SETUP.md) for setup instructions.

## Troubleshooting

### Common Issues

1. **Tests fail with "element not found"**
   - Check if selectors have changed
   - Increase timeout values in `wdio.conf.mjs`
   - Verify the element exists on the page

2. **Chrome version mismatch**
   - Update Chrome to latest version
   - Or update chromedriver: `npm update wdio-chromedriver-service`

3. **Permission errors**
   - Ensure you have write permissions for screenshots/reports
   - Run: `chmod -R 755 .`

4. **Tests timeout in headless mode**
   - Increase timeout values
   - Add explicit waits for elements
   - Check if behavior differs in headless mode

## License

This project is proprietary and confidential.