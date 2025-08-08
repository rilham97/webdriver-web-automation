# Project Structure

This document explains the organization and purpose of each directory and file in the CyberRank E2E Test Automation Framework.

## Directory Structure

```
webDriverProject/
│
├── .github/
│   └── workflows/
│       └── test.yml              # GitHub Actions CI/CD configuration
│
├── config/
│   └── test-data.js              # Centralized test data and constants
│
├── docs/                         # Documentation
│   ├── GETTING_STARTED.md        # Quick start guide for new users
│   ├── WRITING_TESTS.md          # How to write new test cases
│   ├── GITHUB_ACTIONS_SETUP.md   # CI/CD setup instructions
│   ├── PROJECT_STRUCTURE.md      # This file
│   └── TEST_SUITE_OPTIONS.md     # Available test suites
│
├── features/                     # Cucumber feature files (Gherkin)
│   ├── pre-login/               # Tests that don't require authentication
│   │   ├── change-language.feature
│   │   ├── forgot-password.feature
│   │   └── registration.feature
│   │
│   ├── login/                   # Authentication tests
│   │   └── login.feature
│   │
│   └── post-login/              # Tests requiring authentication
│       ├── add-team-member.feature
│       ├── delete-team-member.feature
│       ├── edit-profile.feature
│       └── edit-report.feature
│
├── page-objects/                # Page Object Model implementation
│   ├── base/
│   │   └── BasePage.js         # Base class with common methods
│   │
│   └── pages/                  # Individual page classes
│       ├── DashboardPage.js
│       ├── ForgotPasswordPage.js
│       ├── LanguagePage.js
│       ├── LoginPage.js
│       ├── RegistrationPage.js
│       ├── ReportSettingsPage.js
│       ├── TeamPage.js
│       └── UserSettingsPage.js
│
├── step-definitions/            # Cucumber step implementations
│   ├── common.steps.js         # Shared step definitions
│   ├── add-team-member.steps.js
│   ├── dashboard.steps.js
│   ├── delete-team-member.steps.js
│   ├── edit-profile.steps.js
│   ├── edit-report.steps.js
│   ├── forgot-password.steps.js
│   ├── language.steps.js
│   ├── login.steps.js
│   └── registration.steps.js
│
├── support/                    # Support files and utilities
│   ├── hooks.js               # Cucumber hooks (Before/After)
│   └── world.js               # Cucumber world configuration
│
├── allure-results/            # Test execution results (auto-generated)
├── allure-report/             # HTML test reports (auto-generated)
├── screenshots/               # Screenshots on test failure
│
├── .env                       # Environment variables (create from .env.example)
├── .env.example               # Template for environment variables
├── .gitignore                 # Git ignore patterns
├── package.json               # Project dependencies and scripts
├── package-lock.json          # Locked dependency versions
├── README.md                  # Project overview and setup
└── wdio.conf.mjs             # WebdriverIO configuration
```

## File Descriptions

### Configuration Files

#### `wdio.conf.mjs`
Main WebdriverIO configuration file containing:
- Browser capabilities (Chrome settings)
- Test framework setup (Cucumber)
- Reporter configuration (Allure, Spec)
- Timeout settings
- File patterns for tests

#### `.env` / `.env.example`
Environment variables for:
- Test user credentials
- Base URL configuration
- Browser settings (headless mode)
- Timeout values

#### `package.json`
Project metadata and scripts:
- Dependencies list
- NPM scripts for running tests
- Project information

### Test Files

#### `features/*.feature`
Gherkin feature files describing test scenarios in plain English:
- Human-readable test cases
- Tagged for organization (@smoke, @regression, etc.)
- Structured with Given/When/Then syntax

Example structure:
```gherkin
@tag1 @tag2
Feature: Feature Name
  As a user
  I want to do something
  So that I achieve a goal

  Scenario: Scenario name
    Given I am in a certain state
    When I perform an action
    Then I should see the expected result
```

#### `step-definitions/*.steps.js`
JavaScript implementation of Gherkin steps:
- Maps Gherkin steps to actual code
- Interacts with page objects
- Contains assertions
- Includes Allure reporting

#### `page-objects/pages/*.js`
Page Object Model classes:
- Encapsulates page elements (selectors)
- Provides methods for page interactions
- Inherits from BasePage for common functionality
- Handles waits and element interactions

### Support Files

#### `support/hooks.js`
Cucumber hooks for test lifecycle:
- `BeforeAll`: Runs once before all tests
- `Before`: Runs before each scenario
- `After`: Runs after each scenario
- `AfterAll`: Runs once after all tests

Common uses:
- Browser setup/teardown
- Screenshots on failure
- Test data cleanup
- Performance tracking

#### `support/world.js`
Cucumber World configuration:
- Custom world class
- Shared test context
- Helper methods available in all steps

#### `config/test-data.js`
Centralized test data:
- User credentials
- Test constants
- Reusable test data
- Environment-specific values

### Generated Directories

#### `allure-results/`
Raw test execution data:
- Created after each test run
- JSON files with test details
- Used to generate HTML reports

#### `allure-report/`
HTML test reports:
- Generated from allure-results
- Interactive web-based reports
- Contains test history, trends, and details

#### `screenshots/`
Test failure screenshots:
- Automatically captured on test failure
- Named with timestamp
- Helpful for debugging

## Best Practices

### 1. Feature Organization
- Group features by authentication state (pre-login, post-login)
- One feature per file
- Related scenarios in the same feature file

### 2. Step Definitions
- One step definition file per feature
- Common steps in `common.steps.js`
- Keep steps small and reusable

### 3. Page Objects
- One page object per page/major component
- All selectors in page objects
- No test logic in page objects

### 4. Naming Conventions
- Feature files: `kebab-case.feature`
- Step definitions: `kebab-case.steps.js`
- Page objects: `PascalCase.js`
- Use descriptive names

### 5. File Location Rules
- New features go in appropriate `features/` subdirectory
- Step definitions go in `step-definitions/`
- Page objects go in `page-objects/pages/`
- Utility functions go in `support/`

## Adding New Components

### Adding a New Test Feature

1. Create feature file in appropriate directory:
   ```
   features/post-login/new-feature.feature
   ```

2. Create corresponding step definition:
   ```
   step-definitions/new-feature.steps.js
   ```

3. Create/update page object if needed:
   ```
   page-objects/pages/NewFeaturePage.js
   ```

### Adding a New Page Object

1. Create new file in `page-objects/pages/`
2. Extend from `BasePage`
3. Define selectors as getters
4. Implement page-specific methods

### Adding Shared Functionality

1. For shared steps: Add to `common.steps.js`
2. For shared utilities: Add to `support/` directory
3. For shared selectors: Consider creating a component page object

## Maintenance

### Regular Tasks
1. Keep dependencies updated: `npm update`
2. Clean old reports: `npm run clean`
3. Review and refactor duplicated code
4. Update selectors when UI changes
5. Add new test data to `config/test-data.js`

### File Cleanup
- Delete `allure-results/` after generating reports
- Archive old screenshots periodically
- Remove unused step definitions
- Clean up commented code

This structure promotes:
- **Maintainability**: Clear organization
- **Scalability**: Easy to add new tests
- **Reusability**: Shared components
- **Clarity**: Self-documenting structure