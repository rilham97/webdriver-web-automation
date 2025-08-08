@regression @pre-login @language
Feature: Change Language
  As a user
  I want to change the website language
  So that I can use the website in my preferred language
  
  Scenario: Change language from English to Indonesian
    Given I am on the CyberRank login page
    When I click the language selector button
    And I select "Indonesian" from the language dropdown
    Then the language should be changed to Indonesian
    And I should see "Masuk" as the login page heading
    And I should see "E-mail" as the email field label
    And I should see "Kata sandi" as the password field label