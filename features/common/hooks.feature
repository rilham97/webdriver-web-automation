# This file contains reusable background steps that can be imported by other feature files

# For post-login features, use the @authenticated tag on your scenario
# and the hook in hooks.js will automatically log you in

# Example:
# @authenticated
# Scenario: My post-login scenario
#   Given I am on the dashboard page
#   When I perform some action
#   Then I should see the result