import { test, expect } from "./fixtures/fixtures";
import { validateBookingSchema } from "./helpers/bookingSchema";

test.describe("PATCH /booking/:id", () => {
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

  test("partially updates a booking", async ({ request, authToken }) => {
    const updatedBooking = {
      firstname: "James PATCH",
      lastname: "Smith PATCH",
    };

    const response = await request.patch(`/booking/${bookingId}`, {
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
  });
  test("returns 403 when no auth token is provided", async ({ request }) => {
    const response = await request.patch(`/booking/${bookingId}`, {
      data: { firstname: "James Charles" },
    });
    expect(response.status()).toBe(403);
  });
});
