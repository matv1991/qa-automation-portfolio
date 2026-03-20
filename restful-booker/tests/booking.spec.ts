import { test, expect } from '@playwright/test';

let bookingId: number;

test.beforeEach(async ({ request }) => {
const response = await request.post('/booking', {
    data: {

    "firstname": "Jim",
    "lastname": "Brown",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2018-01-01",
      "checkout": "2019-01-01"
    },
    "additionalneeds": "Breakfast"
  }
})
    const body = await response.json();

    expect(response.status()).toBe(200);
    bookingId = body.bookingid;
});

test.afterEach(async ({ request }) => {
  const authResponse = await request.post('/auth', {
    data: {
      "username": "admin",
      "password": "password123"
    }
  });
  const authBody = await authResponse.json();
  const token = authBody.token;

  const response = await request.delete(`/booking/${bookingId}`, {
    headers: {
      'Cookie': `token=${token}`
    }
  });
  expect(response.status()).toBe(201);
});


test('I am able to trigger the GET /booking request', async ({ request }) => {
const response = await request.get('/booking');
expect(response.status()).toBe(200);
const body = await response.json();
expect(Array.isArray(body)).toBeTruthy();
});

test('I am able to trigger the GET /booking/:id request', async ({ request }) => {
  const listResponse = await request.get('/booking');
  const bookings = await listResponse.json();
  const firstId = bookings[0].bookingid;

  const response = await request.get(`/booking/${firstId}`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('firstname');
  expect(body).toHaveProperty('lastname');
  expect(body).toHaveProperty('totalprice');
  expect(body).toHaveProperty('depositpaid');
  expect(body).toHaveProperty('bookingdates');
  expect(body).toHaveProperty('bookingdates.checkin');
  expect(body).toHaveProperty('bookingdates.checkout');
  expect(body).toHaveProperty('additionalneeds');
});

test('I am able to trigger the POST /booking request', async ({ request }) => {
const response = await request.post('/booking', {
    data: {

    "firstname": "Jim",
    "lastname": "Brown",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2018-01-01",
      "checkout": "2019-01-01"
    },
    "additionalneeds": "Breakfast"
  }
})
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('bookingid');
    expect(body).toHaveProperty('booking');
});

test('I am able to trigger the PUT /booking/:id request', async ({ request }) => {

const updatedBooking = {
  firstname: "James",
  lastname: "Smith",
  totalprice: 222,
  depositpaid: false,
  bookingdates: {
    checkin: "2018-02-01",
    checkout: "2019-02-01"
  },
  additionalneeds: "Lunch"
};

    // Step 1 — Authenticate and retrieve token
    const authResponse = await request.post('/auth', {
        data: {
            "username": "admin",
            "password": "password123"
        }
    });
const authBody = await authResponse.json();
const token = authBody.token;

// Step 2 — Send PUT request with updated booking data and auth token
const response = await request.put(`/booking/${bookingId}`, {
  headers: {
    'Cookie': `token=${token}`
  },
data: updatedBooking
});
  // Step 3 — Assert response status and updated values

    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.firstname).toBe(updatedBooking.firstname);
    expect(body.lastname).toBe(updatedBooking.lastname);
    expect(body.totalprice).toBe(updatedBooking.totalprice);

});
