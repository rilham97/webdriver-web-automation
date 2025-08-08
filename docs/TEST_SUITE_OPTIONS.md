# Test Suite Options for GitHub Actions

## Available Test Suites

When manually triggering the GitHub Actions workflow, you can select from the following test suites:

### 1. **Smoke (All Tests)** 🔥
- **Description**: Runs ALL test cases across the entire application
- **Includes**: Pre-login, Login, and Post-login features
- **Use Case**: Full regression testing, release validation
- **Command**: `npm test` or `npm run test:smoke`
- **Test Count**: ~49+ test steps

### 2. **Pre-Login** 🔐
- **Description**: Tests features available before user authentication
- **Includes**:
  - Language Change (4 steps)
  - Registration (12 steps)
  - Forgot Password (7 steps - has known issues)
- **Use Case**: Testing public-facing features
- **Command**: `npm run test:pre-login`
- **Test Count**: ~23 test steps

### 3. **Login** 🔑
- **Description**: Tests user authentication functionality
- **Includes**:
  - Successful login with valid credentials (6 steps)
  - Login with invalid email (6 steps)
  - Login with incorrect password (6 steps)
- **Use Case**: Authentication flow validation
- **Command**: `npm run test:login`
- **Test Count**: 18 test steps

### 4. **Post-Login** 👤
- **Description**: Tests features requiring authentication
- **Includes**:
  - Edit Profile (13 steps)
  - Add Team Member (11 steps)
  - Delete Team Member (9 steps)
  - Edit Report (10 steps - has known issues)
- **Use Case**: Testing authenticated user features
- **Command**: `npm run test:post-login`
- **Test Count**: ~43 test steps

## GitHub Actions Manual Trigger

To run specific test suites:

1. Go to **Actions** tab in your GitHub repository
2. Select **"E2E Tests"** workflow
3. Click **"Run workflow"**
4. Select your branch
5. Choose test suite from dropdown:
   - `smoke` - Run all tests
   - `pre-login` - Only pre-login features
   - `login` - Only login features
   - `post-login` - Only post-login features
6. Click **"Run workflow"** button

## Local Testing Commands

```bash
# Run all tests (visible browser)
npm test

# Run all tests (headless mode - for CI)
npm run test:headless

# Run specific test suites
npm run test:pre-login
npm run test:login
npm run test:post-login

# Run with specific tags
npm test -- --cucumberOpts.tags='@regression'
npm test -- --cucumberOpts.tags='@smoke'
```

## Test Organization

```
features/
├── pre-login/
│   ├── change-language.feature
│   ├── forgot-password.feature
│   └── registration.feature
├── login/
│   └── login.feature
└── post-login/
    ├── edit-profile.feature
    ├── add-team-member.feature
    ├── delete-team-member.feature
    └── edit-report.feature
```

## Notes

- **Smoke Suite** = All tests (comprehensive testing)
- Tests run in **headless Chrome** in GitHub Actions
- **Allure reports** are generated for all test runs
- Failed tests include **screenshots** for debugging
- Test results are retained for **30 days** as artifacts