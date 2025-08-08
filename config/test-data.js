export const testData = {
    // Login credentials
    validUser: {
        email: process.env.TEST_USER_EMAIL || 'falaraiza@gmail.com',
        password: process.env.TEST_USER_PASSWORD || 'K1j@nghijau97'
    },
    
    // Test emails for different scenarios
    registeredEmail: process.env.TEST_REGISTERED_EMAIL || 'test@example.com',
    
    // Add other test data as needed
};

export default testData;