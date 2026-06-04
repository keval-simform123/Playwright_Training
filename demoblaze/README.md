# Demoblaze Playwright Assignment

Playwright + TypeScript automation assignment for [https://www.demoblaze.com](https://www.demoblaze.com)

---

## Topics Covered

- **Page Object Model (POM)** – Each page of the site has its own class
- **Creating Page Classes** – BasePage, HomePage, LoginPage, SignupPage, ProductPage, CartPage, ContactPage
- **Reusable Methods** – Common actions like `waitAndClick`, `getText`, `isVisible` defined in BasePage
- **Framework Folder Structure** – Organized into `pages/`, `tests/`, and `utils/`

---

## Folder Structure

```
demoblaze-playwright/
├── pages/
│   ├── BasePage.ts         # Shared reusable methods
│   ├── HomePage.ts         # Home page actions
│   ├── LoginPage.ts        # Login modal actions
│   ├── SignupPage.ts       # Signup modal actions
│   ├── ProductPage.ts      # Product detail page actions
│   ├── CartPage.ts         # Cart page actions
│   └── ContactPage.ts      # Contact modal actions
├── tests/
│   ├── homepage.test.ts    # Home page tests
│   ├── login.test.ts       # Login tests
│   ├── signup.test.ts      # Signup tests
│   ├── product.test.ts     # Product page tests
│   ├── cart.test.ts        # Cart tests
│   └── contact.test.ts     # Contact tests
├── utils/
│   └── testData.ts         # Test data (credentials, product names, etc.)
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json
└── package.json
```

---

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install

# 3. Run all tests
npm test

# 4. Run tests in headed mode (see the browser)
npm run test:headed

# 5. View HTML report after tests
npm run report
```

---

## Notes

- Tests run on **Chromium** by default
- The `testuser_demo` account must exist on demoblaze for login tests to pass
- Cart tests add a real product and go through checkout flow
