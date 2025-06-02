# PlaywrightCucumber

## 📦 Installation & Dependencies
npm install -D playwright @cucumber/cucumber ts-node typescript @playwright/test
npm install -D allure-playwright
npx playwright install
npm install --save-dev dotenv

### Prerequisites

- Node.js (v16 or later recommended)
- npm

### Run tests in Parallel
npx cucumber-js --parallel 4

### Allure Report
npm install --save-dev @cucumber/cucumber @cucumber/messages allure-cucumberjs
npm install -g allure-commandline
npx allure serve allure-results



