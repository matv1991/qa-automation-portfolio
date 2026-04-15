import { test, expect } from "./fixtures/fixtures";
import { validateBookingSchema } from "./helpers/bookingSchema";

test.describe("PUT /booking/:id", () => {
  let bookingId: number;

  test.beforeEach(async ({ request }) => {
    const response = await request.post("/booking", {
      data: {
        firstname: "Jim",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01",
        },
        additionalneeds: "Breakfast",
      },
    });
    const body = await response.json();

    expect(response.status()).toBe(200);
    bookingId = body.bookingid;
  });

  test.afterEach(async ({ request, authToken }) => {
    const response = await request.delete(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${authToken}`,
      },
    });
    expect(response.status()).toBe(201);
  });

  test("updates all booking fields", async ({ request, authToken }) => {
    const updatedBooking = {
      firstname: "James",
      lastname: "Smith",
      totalprice: 222,
      depositpaid: false,
      bookingdates: {
        checkin: "2018-02-01",
        checkout: "2019-02-01",
      },
      additionalneeds: "Lunch",
    };

    const response = await request.put(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${authToken}`,
      },
      data: updatedBooking,
    });

    const body = await response.json();
    validateBookingSchema(body);
    expect(response.status()).toBe(200);
    expect(body.firstname).toBe(updatedBooking.firstname);
    expect(body.lastname).toBe(updatedBooking.lastname);
    expect(body.totalprice).toBe(updatedBooking.totalprice);
  });

  test("returns 403 when no auth token is provided", async ({ request }) => {
    const response = await request.put(`/booking/${bookingId}`, {
      data: { firstname: "James" },
    });
    expect(response.status()).toBe(403);
  });
});
