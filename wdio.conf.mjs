import allure from '@wdio/allure-reporter';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    
    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './features/**/*.feature'
    ],
    exclude: [],
    
    //
    // ============
    // Capabilities
    // ============
    maxInstances: 1,
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                ...(process.env.HEADLESS === 'true' ? ['--headless', '--disable-gpu'] : []),
                '--window-size=1920,1080',
                '--no-sandbox',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor',
                '--disable-dev-shm-usage'
            ]
        },
        'goog:loggingPrefs': {
            browser: 'OFF',
            driver: 'SEVERE',
            performance: 'OFF'
        }
    }],
    
    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'warn',
    bail: 0,
    baseUrl: 'https://www.cyberrank.ai',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    
    services: [],
    
    framework: 'cucumber',
    
    //
    // Cucumber Options
    //
    cucumberOpts: {
        import: [
            './step-definitions/**/*.js',
            './support/**/*.js'
        ],
        backtrace: false,
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tags: '',  // Run all tests by default
        timeout: 180000, // 3 minutes to handle long registration process
        ignoreUndefinedDefinitions: false
    },
    
    //
    // =======
    // Reporters
    // =======
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: true,
            addConsoleLogs: true,
            reportSeleniumCommands: false,
            disableMochaHooks: true
        }]
    ],

    //
    // =====
    // Hooks
    // =====
    // Note: All hooks moved to support/hooks.js to avoid duplication
}