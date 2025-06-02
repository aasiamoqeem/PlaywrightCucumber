import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Products } from '../../../pages/products';
import { Cart } from '../../../pages/cart';
import '../../../config/env';

Then('I hover over the first product and click "Add to cart"', async function(){
  this.productPage = new Products(this.page); 
  await expect(this.productPage.product1).toBeVisible();
  await this.productPage.product1.scrollIntoViewIfNeeded();
  await this.productPage.product1.hover();
  await this.productPage.addtoCart1.scrollIntoViewIfNeeded();
  await this.productPage.addtoCart1.click();
});

Then('I click the "Continue Shopping" button', async function(){
  await this.productPage.continueShoppingButton.click();
});

Then('I hover over the second product and click "Add to cart"', async function(){
  await this.productPage.product2.hover();
  await this.productPage.addtoCart2.click();
});

Then('I click the "View Cart" button', async function(){
  this.cartPage = new Cart(this.page); 
  await this.cartPage.viewCart.click();
});

Then('I should see both products added to the cart', async function(){
  await expect(this.cartPage.product1Row).toContainText('Blue Top');
  await expect(this.cartPage.product2Row).toContainText('Men Tshirt');
});

Then('I should see correct prices, quantities and total prices for the products', async function(){
    // Product 1
  await expect(this.cartPage.product1Price).toHaveText('Rs. 500');
  await expect(this.cartPage.product1Quantity).toHaveText('1');
  await expect(this.cartPage.product1Total).toHaveText('Rs. 500');

  // Product 2
  await expect(this.cartPage.product2Price).toHaveText('Rs. 400');
  await expect(this.cartPage.product2Quantity).toHaveText('1');
  await expect(this.cartPage.product2Total).toHaveText('Rs. 400');

  await this.cartPage.product2Delete.click();
  await this.cartPage.product1Delete.click();
});
