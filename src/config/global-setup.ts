import { chromium, expect } from 'playwright/test';
import path from 'path';
import fs from 'fs';
import { login } from '../pages/login'; 

const storageStatePath = path.resolve(__dirname, '../../authState.json');
async function globalSetup() {
    if (fs.existsSync(storageStatePath)) {
    console.log('Storage State already exists, skipping login.');
    return;
  }
  console.log('storageState.json not found. Logging in and saving session...');
  const browser = await chromium.launch({headless:false});
  const context = await browser.newContext();
  const page = await context.newPage();

  // Load login data JSON
  const dataPath = path.resolve(__dirname, '../tests/gui/test-data/login.json');
  const loginData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  
  // Find the valid user credentials
  const validUser = loginData.find((u: any) => u.loginType === 'valid');

  const loginPage = new login(page);
  await loginPage.clickLoginLink();
  console.log(validUser.email)

  // Use valid user credentials from JSON
  await loginPage.clickLoginButton(validUser.email, validUser.password);

  // Wait for confirmation
  await expect(loginPage.loggedInText).toBeVisible(); 

  // Save storage state for reuse in tests
  await context.storageState({ path: storageStatePath });

  await browser.close();
  console.log('storageState.json created and saved.');
}

export default globalSetup;
