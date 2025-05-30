Feature: Add Products to Cart

  @gui @cart
  Scenario: User adds multiple products to cart and verifies cart details
    Given I launch the browser
    And I navigate to the URL "http://automationexercise.com"
    Then I should see the home page is visible successfully
    When I click on the "Products" button
    And I hover over the first product and click "Add to cart"
    And I click the "Continue Shopping" button
    And I hover over the second product and click "Add to cart"
    And I click the "View Cart" button
    Then I should see both products added to the cart
    And I should see correct prices, quantities and total prices for the products
