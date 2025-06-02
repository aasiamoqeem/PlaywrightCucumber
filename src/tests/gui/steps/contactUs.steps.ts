import { Before, After,Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page, expect } from '@playwright/test';
import { ContactUs } from '../../../pages/contactUs';
import { readFileSync } from 'fs';
import path from 'path';
import '../../../config/env';
import { Dialog } from '@playwright/test'; 



interface contactDetails {
  scenario: string;
  name: string;
  email: string;
  subject: string;
  message: string
}


Given('I should see the home page visible successfully', async function () {
    await expect(this.page).toHaveURL(process.env.BASE_URL as string);
});

When('I click on the "Contact Us" button', async function () {
    this.contactUsPage = new ContactUs(this.page);
    await this.contactUsPage.clickContactUsLink();
    // Load test data
    const dataPath = path.resolve(__dirname, '../test-data/contactUs.json');
    this.contactData = JSON.parse(readFileSync(dataPath, 'utf-8')) as contactDetails[];  

});

Then('I should see "GET IN TOUCH" visible', async function () {
    await expect (this.contactUsPage.getInTouchHeader).toBeVisible();
});

When('I enter contact details for {string}', async function (scenario: string) {
    const details = this.contactData.find((entry: contactDetails) => entry.scenario === scenario);
    if (!details) throw new Error(`Scenario "${scenario}" not found in test data.`);
    await this.contactUsPage.fillDetails(details);
});

When('I upload a file {string}', async function (filepath: string) {
    const absolutePath = path.resolve(__dirname, '../../../uploads', filepath); 
    await this.contactUsPage.uploadFile(absolutePath);    
});

When('I click the "Submit" button and accept the alert', async function () {
  this.page.once('dialog', async (dialog: Dialog) => {
    await dialog.accept();
  });
  await this.contactUsPage.clickSubmitButton();
});


Then('I should see success message {string}', async function (string) {
    await this.contactUsPage.successMessage.waitFor({ state: 'visible'});
    await expect(this.contactUsPage.successMessage).toBeVisible();
});

When('I click the "Home" button', async function () {
    await this.contactUsPage.homeButton.click();
});

Then('I should be navigated back to the home page successfully', async function () {
    await expect(this.page).toHaveURL(process.env.BASE_URL as string);
});