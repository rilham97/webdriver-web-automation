@regression @pre-login @registration
Feature: User Registration
  As a new user
  I want to register for a CyberRank account
  So that I can access the platform features
  
  Note: Registration process takes 1-2 minutes to complete

  Scenario: Registration with valid data
    Given I am on the CyberRank login page
    When I click the login page "Register" button
    Then I should be on the registration page
    When I enter a unique email in the registration email field
    And I enter "ValidPassword123!" in the registration password field
    And I enter "ValidPassword123!" in the confirm password field
    And I check the "Terms and Conditions" checkbox
    And I click the "Register" submit button
    Then I should see a success popup with message "Registration Success"
    And the popup should contain "Please check your mailbox to verify your email address."
    And the popup should contain "You may want to check the spam folder if you cannot find the email from us."
    And I should be redirected to the login page