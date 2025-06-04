import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Products } from '../../../pages/products';
import '../../../config/env';

When('I search for the product {string}', async function (productName: string) {
  this.productPage = new Products(this.page); 
  await this.productPage.searchProduct(productName);
  this.attach(`Successfully searched Product - ${productName}`);
});

Then('I should see the "SEARCHED PRODUCTS" section visible', async function () {
  await expect (this.productPage.searchHeading).toBeVisible();
  this.attach('SEARCHED PRODUCTS section is visible')
});

Then('I should see all products related to "T-Shirt" are visible', async function () {     
  const totalCount = await this.productPage.totalProducts.count();
  this.attach(`Total Count of Product is - ${totalCount}`);
  await expect(totalCount).toBe(3);
});
