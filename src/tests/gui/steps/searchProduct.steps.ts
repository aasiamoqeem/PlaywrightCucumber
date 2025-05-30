import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { searchProduct } from '../../../pages/searchProduct';
import { readFileSync } from 'fs';
import path from 'path';
import '../../../config/env';

Given('I click on the "Products" button', async function (buttonName: string) {
  this.searchPage = new searchProduct(this.page);
  await this.searchPage.productLink.click();
});

Then('I should be navigated to the ALL PRODUCTS page successfully', async function () {
  await expect(this.page).toHaveURL(process.env.BASE_URL as string);
});

When('I search for the product {string}', async function (productName: string) {
  // Implementation here
});

Then('I should see the {string} section visible', async function (sectionName: string) {
  // Implementation here
});

Then('I should see all products related to {string} are visible', async function (productName: string) {
  // Implementation here
});
