# Restful Booker API Test Suite

End-to-end test automation suite for [Restful-booker](https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-PartialUpdateBooking) 
built with Playwright and TypeScript.

## Approach

Before each test I create a a new booking (POST /booking)
Afterwards I test all requests that can interact with the created booking
Finally I delete all created entries (DELETE /booking/:id)

## Test coverage

- GET all /booking
- GET /booking/:id
- POST /booking
- PUT /booking/:id
- PATCH /booking/:id
- DELETE /booking/:id

## How to run

Navigate into the project folder:
```
cd restful-booker
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
- GitHub Actions CI