# CyberRank E2E Test Automation Framework

End-to-end test automation framework for CyberRank.ai platform using WebdriverIO with Cucumber BDD.

📊 **Live Test Reports**: [https://rilham97.github.io/webdriver-web-automation/](https://rilham97.github.io/webdriver-web-automation/)

## 🎯 For Assessment Reviewers

**Quick Evaluation Steps:**
1. **View Live Reports**: [https://rilham97.github.io/webdriver-web-automation/](https://rilham97.github.io/webdriver-web-automation/) *(No setup required)*
2. **Run Tests**: [GitHub Actions Workflow](https://github.com/rilham97/webdriver-web-automation/actions/workflows/test.yml) → Click "Run workflow"
3. **Clone & Test Locally**: `git clone https://github.com/rilham97/webdriver-web-automation.git` → Follow [Local Installation](#local-installation)

**Key Features Demonstrated:**
- ✅ WebdriverIO + Cucumber BDD Framework
- ✅ Page Object Model Architecture  
- ✅ Comprehensive Test Coverage (Authentication, UI, API interactions)
- ✅ Allure Test Reporting with Screenshots
- ✅ GitHub Actions CI/CD Pipeline
- ✅ Professional Documentation
- ✅ Real-world Test Scenarios (CyberRank.ai platform)

---

## Table of Contents
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Quick Start (GitHub Actions)](#quick-start-github-actions)
- [Local Installation](#local-installation)
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

## Quick Start (GitHub Actions)

**⚡ Fastest way to run tests - No local setup required!**

### Step 1: Access GitHub Actions
1. Go to: [https://github.com/rilham97/webdriver-web-automation/actions/workflows/test.yml](https://github.com/rilham97/webdriver-web-automation/actions/workflows/test.yml)
2. Click **"Run workflow"** button (top right)

### Step 2: Configure Test Run
3. Select test suite:
   - **login** - Fast authentication tests (3 scenarios, ~5 minutes)
   - **smoke** - All test scenarios (9 scenarios, ~15 minutes)  
   - **pre-login** - Features before authentication
   - **post-login** - Features requiring authentication
   - **all** - Comprehensive test suite

4. Enable debug mode (optional): Check for detailed logging
5. Click **"Run workflow"** button

### Step 3: Monitor Execution
6. Watch real-time progress in the Actions tab
7. View live test logs and execution status
8. Wait for completion (~5-15 minutes depending on suite)

### Step 4: View Results
9. **Live Reports**: Visit [https://rilham97.github.io/webdriver-web-automation/](https://rilham97.github.io/webdriver-web-automation/)
10. **Download Artifacts**: Screenshots and detailed logs available in the workflow run
11. **GitHub Summary**: View test summary directly in Actions tab

### Test Credentials
Tests use pre-configured credentials:
- **Email**: `falaraiza@gmail.com`
- **Password**: `K1j@nghijau97` 
- **Target**: `https://www.cyberrank.ai`

---

## Local Installation

### Prerequisites
- Node.js (v18 or higher)
- npm
- Chrome browser

### Setup Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/rilham97/webdriver-web-automation.git
   cd webdriver-web-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file in the root directory:
   ```
   TEST_USER_EMAIL=your-test-email@example.com
   TEST_USER_PASSWORD=your-test-password
   BASE_URL=https://www.cyberrank.ai
   HEADLESS=false
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