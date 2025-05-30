Feature: Product Search Functionality

  @gui @search
  Scenario: User searches for a product and views the results
    Given I click on the "Products" button
    Then I should be navigated to the ALL PRODUCTS page successfully
    When I search for the product "T-Shirt"
    Then I should see the "SEARCHED PRODUCTS" section visible
    And I should see all products related to "T-Shirt" are visible
