@gui @contact
Feature: Contact Us Form Submission

  Scenario Outline: User submits the contact us form successfully
    Given I navigate to the home page
    Then I should see the home page visible successfully
    When I click on the "Contact Us" button
    Then I should see "GET IN TOUCH" visible
    When I enter contact details for "<scenario>"
    And I upload a file "upload.txt"
    And I click the "Submit" button and accept the alert
    Then I should see success message "Success! Your details have been submitted successfully."
    When I click the "Home" button
    Then I should be navigated back to the home page successfully

  Examples:
    | scenario  | filepath             |
    | validUser | upload.txt |
