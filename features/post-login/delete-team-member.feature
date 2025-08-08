@regression @post-login @delete-team-member
Feature: Delete Team Member
    As a logged-in user
    I want to delete team members
    So that I can remove unwanted candidates from my team

    Background:
        Given I am logged into CyberRank

    Scenario: Delete a team member successfully
        When I access "Teams" on the sidebar
        Then I should be on the teams page
        When I check if there are any candidate users
        And I click the trash icon for a candidate user
        Then I should see a confirmation popup
        When I click confirm on the popup
        Then the team member should be removed from the list
        And I should see a success message for deletion