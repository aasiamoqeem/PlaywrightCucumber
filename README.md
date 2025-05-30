# PlaywrightCucumber

## 📦 Installation & Dependencies
npm install -D playwright @cucumber/cucumber ts-node typescript @playwright/test
npm install -D allure-playwright
npx playwright install

npm dotenv
### Prerequisites

- Node.js (v16 or later recommended)
- npm

### Run tests in Parallel
npx cucumber-js --parallel 4

### Allure Report
npx allure generate ./allure-results --clean && npx allure open


