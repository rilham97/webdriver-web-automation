@regression @pre-login @forgot-password
Feature: Forgot Password
  As a registered user
  I want to reset my password
  So that I can regain access to my account
  
  Scenario: Reset password with registered email
    Given I am on the CyberRank login page
    When I click the "Forgot Password" text link
    Then I should be on the forgot password page
    When I enter a registered email in the reset email field
    And I click the Send Reset Password Link button
    Then I should see a success popup displayed
    And I should be redirected back to the login page