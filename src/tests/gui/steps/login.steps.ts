import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Login } from '../../../pages/login';
import { readFileSync } from 'fs';
import path from 'path';
import '../../../config/env';


interface LoginUser {
  loginType: string;
  email: string;
  password: string;
}

Given('I navigate to the login page', async function () {
  this.loginPage = new Login(this.page);
  await this.loginPage.clickLoginLink();
  // Load test data
  const dataPath = path.resolve(__dirname, '../test-data/login.json');
  this.loginData = JSON.parse(readFileSync(dataPath, 'utf-8')) as LoginUser[];  
  this.attach('Navigated to Login page')
});

When('I login using {string} credentials', async function (loginType: string) {
  const user = this.loginData.find((u: LoginUser) => u.loginType === loginType);
  await this.loginPage.clickLoginButton(user.email, user.password);
  this.loginScenario = loginType;
  this.loggedInEmail = user.email; 
  this.attach(`Login using credentials for user - ${loginType}`, 'text/plain');

});

Then('I should see the {string} login result', async function (loginType: string) {
  if (loginType === 'valid') {
    await expect(this.loginPage.loggedInText).toBeVisible();      
    this.attach(`${this.loggedInEmail} logged in successfully`); 
  } else {
    const errorMessage = this.page.getByText('Your email or password is incorrect!', { exact: false });
    await expect(errorMessage).toBeVisible();
    this.attach(`${this.loggedInEmail} DID NOT log in successfully`);
  }
});
