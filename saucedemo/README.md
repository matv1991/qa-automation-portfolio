# SauceDemo Automation Suite

End-to-end test automation suite for [SauceDemo](https://www.saucedemo.com/) 
built with Playwright and TypeScript.

## Approach

Tests are written using a Gherkin-style comment structure (Given/When/Then) 
followed by the Playwright implementation. This reflects my background in 
manual test case design and documents test intent alongside the automation code.

## Test coverage

- Login — happy path and negative scenarios
- Inventory — add to cart, remove from cart, sorting
- Checkout — happy path purchase flow

## How to run

Navigate into the project folder:
```
cd saucedemo
```

Install dependencies:
```
npm install
```

Run all tests:
```
npx playwright test
```

View test report:
```
npx playwright show-report
```

## Tech stack

- [Playwright](https://playwright.dev/)
- TypeScript
- Page Object Model
- GitHub Actions CI