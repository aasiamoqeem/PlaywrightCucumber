@gui @login
Feature: Login functionality

  Scenario Outline: User attempts login with <scenario> credentials
    Given I navigate to the login page
    When I login using "<loginType>" credentials
    Then I should see the "<loginType>" login result

    Examples:
      | loginType |
      | valid    |
      | invalid  |
