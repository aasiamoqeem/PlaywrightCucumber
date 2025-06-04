import { setDefaultTimeout, Before, After, Status } from '@cucumber/cucumber';
import { chromium, request } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import globalSetup from '../../config/global-setup';

// Set global step timeout to 60 seconds
setDefaultTimeout(60 * 1000);

Before(async function (scenario) {
  const tags = scenario.pickle.tags.map(tag => tag.name);

  if (tags.includes('@gui')) {
    // For all GUI tests (including login), create browser & page with video recording
    const storageStatePath = path.resolve(__dirname, '../../../authState.json');
    const storageStateExists = fs.existsSync(storageStatePath);

    if (tags.includes('@login')) {
      // Login tests: fresh context, no storage state, but video recording enabled
      this.browser = await chromium.launch({ headless: false, slowMo: 500 });
      const context = await this.browser.newContext({
        recordVideo: {
          dir: 'test-results/videos/',
          size: { width: 1280, height: 720 },
        },
      });
      this.page = await context.newPage();
      await this.page.goto(process.env.BASE_URL as string);
    } else {
      // Other GUI tests: use storage state if available + video recording
      if (!storageStateExists) {
        await globalSetup();
      }
      this.browser = await chromium.launch({ headless: false, slowMo: 500 });
      const context = await this.browser.newContext({
        storageState: storageStateExists ? storageStatePath : undefined,
        recordVideo: {
          dir: 'test-results/videos/',
          size: { width: 1280, height: 720 },
        },
      });
      this.page = await context.newPage();
      await this.page.goto(process.env.BASE_URL as string);
    }
  }

  if (tags.includes('@api')) {
    this.apiContext = await request.newContext();
  }
});

After(async function (scenario) {
  const tags = scenario.pickle.tags.map(tag => tag.name);

  if (tags.includes('@gui')) {
    if (this.page) {
      // Always take screenshot and attach
      const screenshot = await this.page.screenshot({ fullPage: true });
      this.attach(screenshot, 'image/png');

      // Close page and browser 
      await this.page.close();
      await this.browser?.close();

      // Attach video BEFORE closing page
      const videoPath = await this.page.video()?.path();
      if (videoPath && fs.existsSync(videoPath)) {
        const videoBuffer = fs.readFileSync(videoPath);
        this.attach(videoBuffer, 'video/webm');
      }

      
    }
  }

  if (tags.includes('@api')) {
    await this.apiContext?.dispose();
  }
});
