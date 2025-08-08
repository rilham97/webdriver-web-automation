@regression @post-login @edit-report
Feature: Edit Report
  As a logged-in user
  I want to edit report settings
  So that I can update report information

  Background: User is logged in and on dashboard
    Given I am logged into CyberRank
  
  Scenario: Edit report name and description with unique values
    When I click on the first report card in the dashboard
    And I click on the settings icon for the report
    Then I should be on the report settings page
    When I clear the Name field and enter a unique report name
    And I clear the Description field and enter a unique report description
    And I click the Save button
    Then I should see a success message
    And the Name field should contain the new report name
    And the Description field should contain the new report description