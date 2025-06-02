@gui @cart
Feature: Add Products to Cart
  
  Scenario: User adds multiple products to cart and verifies cart details
    Given I click on the "Products" button
    Then I should be navigated to the ALL PRODUCTS page successfully
    And I hover over the first product and click "Add to cart"
    And I click the "Continue Shopping" button
    And I hover over the second product and click "Add to cart"
    And I click the "View Cart" button
    Then I should see both products added to the cart
    And I should see correct prices, quantities and total prices for the products
