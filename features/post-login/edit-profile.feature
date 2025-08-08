@regression @post-login @edit-profile
Feature: Edit Profile
  As a logged-in user
  I want to edit my profile
  So that I can update my photo and nickname

  Background: User is logged in and on dashboard
    Given I am logged into CyberRank
  
  Scenario: Edit profile photo and nickname
    When I click on the user email in the navbar
    Then I should see the user settings dropdown
    When I click on "User Settings" in the dropdown
    Then I should be on the user settings page
    And I should see the General tab is selected
    When I click on the profile photo edit button
    And I upload a random test image
    Then I should see the photo upload success message
    When I click on the nickname edit button
    And I enter a unique nickname
    And I click the save nickname button
    Then the nickname should be updated successfully