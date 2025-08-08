@regression @login
Feature: User Login
  As a registered user
  I want to log into CyberRank
  So that I can access my account and platform features

  Background:
    Given I am on the CyberRank login page

  @smoke
  Scenario: Successful login with valid credentials
    When I enter "falaraiza@gmail.com" in the email field
    And I enter "K1j@nghijau97" in the password field
    And I click the login page "Login" button
    Then I should be logged in successfully
    And I should see the user dashboard

  Scenario: Login with invalid email
    When I enter "invalid@email" in the email field
    And I enter "Password123!" in the password field
    And I click the login page "Login" button
    Then I should see an error message "Incorrect email or password"
    And I should remain on the login page

  Scenario: Login with incorrect password
    When I enter "test@example.com" in the email field
    And I enter "WrongPassword" in the password field
    And I click the login page "Login" button
    Then I should see an error message "Incorrect email or password"
    And I should remain on the login page