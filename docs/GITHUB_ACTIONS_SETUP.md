# GitHub Actions Setup Guide

This guide explains how to set up GitHub Actions for continuous integration and automated test execution.

## Prerequisites

### 1. GitHub Repository Secrets
Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

- `TEST_USER_EMAIL`: Valid test user email
- `TEST_USER_PASSWORD`: Valid test user password
- `BASE_URL`: (Optional) Base URL for testing, defaults to https://www.cyberrank.ai

## Running Tests Locally

### Normal Mode (with browser UI)
```bash
npm test
```

### Headless Mode (for CI/CD)
```bash
npm run test:headless
# or
HEADLESS=true npm test
```

### Specific Test Suites
```bash
# Smoke tests only
npm run test:smoke

# Regression tests
npm run test:regression

# Pre-login features only
npm run test:pre-login

# Post-login features only
npm run test:post-login
```

## GitHub Actions Workflow

The workflow is configured in `.github/workflows/test.yml` and includes:

### Triggers
- **Push**: Runs on push to `main` and `develop` branches
- **Pull Request**: Runs on PRs to `main` and `develop`
- **Schedule**: Daily run at 2 AM UTC
- **Manual**: Can be triggered manually with test suite selection

### Features
1. **Headless Chrome**: Tests run in headless mode for CI environment
2. **Allure Reports**: Generated and uploaded as artifacts
3. **GitHub Pages**: Reports deployed to GitHub Pages (main branch only)
4. **Test Suite Selection**: Choose which tests to run when triggering manually
5. **Failure Notifications**: Notifies team when tests fail on main branch

### Artifacts
- **Test Results**: Allure results and screenshots (retained for 30 days)
- **Allure Report**: HTML report (retained for 30 days)
- **GitHub Pages**: Historical reports at `https://<username>.github.io/<repo>/test-reports/<run-number>`

## Configuration Details

### Headless Mode Configuration
The `wdio.conf.mjs` automatically detects the `HEADLESS` environment variable:

```javascript
'goog:chromeOptions': {
    args: [
        ...(process.env.HEADLESS === 'true' ? ['--headless', '--disable-gpu'] : []),
        '--window-size=1920,1080',
        '--no-sandbox',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--disable-dev-shm-usage'
    ]
}
```

### Chrome Options for CI
- `--headless`: Runs Chrome without UI
- `--disable-gpu`: Disables GPU hardware acceleration
- `--no-sandbox`: Required for running in Docker/CI environments
- `--disable-dev-shm-usage`: Prevents /dev/shm shared memory issues

## Troubleshooting

### Common Issues

1. **Tests timeout in CI but work locally**
   - Increase timeout values in `wdio.conf.mjs`
   - Check if selectors are different in headless mode

2. **Chrome crashes in CI**
   - Ensure `--no-sandbox` and `--disable-dev-shm-usage` flags are set
   - Check available memory in CI runner

3. **Screenshots not captured**
   - Create `screenshots` directory in the workflow
   - Check file permissions

### Debug Tips
- Add `console.log` statements to debug CI-specific issues
- Use `browser.saveScreenshot()` to capture state at failure points
- Check Allure report artifacts for detailed error information

## Best Practices

1. **Use Page Objects**: Maintain selectors in one place
2. **Add Waits**: Use explicit waits for elements in headless mode
3. **Test Data**: Use environment variables for sensitive data
4. **Parallel Execution**: Consider using multiple workers for faster execution
5. **Retry Logic**: Add retry for flaky tests in CI environment

## Example Manual Trigger

To manually trigger the workflow:
1. Go to Actions tab in GitHub
2. Select "E2E Tests" workflow
3. Click "Run workflow"
4. Select branch and test suite
5. Click "Run workflow" button

The test results will be available in:
- Actions tab → workflow run → Artifacts
- GitHub Pages (for main branch): `https://<username>.github.io/<repo>/test-reports/<run-number>`