@api
Feature: Pet Operations

  Scenario: Get a list of available pets
    Given the API endpoint is "/pet/findByStatus?status=available"
    When I fetch pets
    Then the response status code should be 200
    And the response should contain atleast one pet


  Scenario: Update pets using JSON test data
    Given I load pet test data from "test-data/pets.json"
    When I update each pet with its new name
    Then each pet update response status should be 200      

  Scenario: Delete a pet by ID
    Given a pet with ID 1001
    When I send a DELETE request
    Then the response status code should be 200