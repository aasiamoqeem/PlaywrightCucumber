import {setDefaultTimeout, Before, After } from '@cucumber/cucumber';
import { chromium, request } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import globalSetup from '../../config/global-setup';


// Set global step timeout to 60 seconds
setDefaultTimeout(60 * 1000);

Before(async function (scenario) {
  const tags = scenario.pickle.tags.map(tag => tag.name);
  if (tags.includes('@gui')&& !tags.includes('@login')) {
    // GUI Test
    const storageStatePath = path.resolve(__dirname, '../../../authState.json');
    const storageStateExists = fs.existsSync(storageStatePath);
    if (!storageStateExists) {
      //console.log('Storage state not found, running global setup...');
      await globalSetup();
    }
   // console.log('Using existing Storage State');
    this.browser = await chromium.launch({ headless: false, slowMo: 500 }); 
    //{ headless: false, slowMo: 500 }
    const context = await this.browser.newContext({
      storageState: fs.existsSync(storageStatePath) ? storageStatePath : undefined,
    });
    this.page = await context.newPage();
    await this.page.goto(process.env.BASE_URL as string);  
  } 
  else if (tags.includes('@login')) {
    // For login tests, start fresh without storage state
    //console.log('Storage State not in use');
    this.browser = await chromium.launch();
    const context = await this.browser.newContext();
    this.page = await context.newPage();
  }

  if (tags.includes('@api')) {
    // API Test
    this.apiContext = await request.newContext();
  }
});

After(async function (scenario) {
  const tags = scenario.pickle.tags.map(tag => tag.name);

  if (tags.includes('@gui')) {
    await this.page?.close();
    await this.browser?.close();
  }

  if (tags.includes('@api')) {
    await this.apiContext?.dispose();
  }
});
