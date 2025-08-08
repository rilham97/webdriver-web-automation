@regression @post-login @add-team-member
Feature: Add Team Member
  As a logged-in user
  I want to add team members
  So that I can invite others to join my team

  Background: User is logged in and on dashboard
    Given I am logged into CyberRank
  
  Scenario: Add team member with valid email
    When I access "Teams" on the sidebar
    Then I should be on the teams page
    When I click the Add Team Member button
    Then I should see the add team member dialog
    When I input a random email with gmail.com domain
    And I click the send icon
    And I should see "Invitations sent." success message
    Then the added email should be displayed in the team list
    And the team member should have "(Candidate)" suffix
    And the member status should be "Waiting email"
