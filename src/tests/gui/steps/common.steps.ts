import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Products } from '../../../pages/products';
import '../../../config/env';

Given('I click on the "Products" button', async function () {
  this.productPage = new Products(this.page); 
  await this.productPage.clickProductLink();
  this.attach('Proucts link clicked')
});

Then('I should be navigated to the ALL PRODUCTS page successfully', async function () {
  const expectedUrl = `${process.env.BASE_URL}products`;
  await expect(this.page).toHaveURL(expectedUrl);
  this.attach("Navigated to Products URL successfully");
});
