import { test, expect } from "./fixtures/fixtures";
import { validateBookingSchema } from "./helpers/bookingSchema";

test.describe("POST /booking", () => {
  test("creates a new booking and returns its ID", async ({
    request,
    authToken,
  }) => {
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
    validateBookingSchema(body.booking);

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty("bookingid");
    expect(body).toHaveProperty("booking");

    // cleans up created booking
    await request.delete(`/booking/${body.bookingid}`, {
      headers: {
        Cookie: `token=${authToken}`,
      },
    });
  });

  test("returns 500 when required fields are missing", async ({ request }) => {
    const response = await request.post("/booking", {
      data: {},
    });
    expect(response.status()).toBe(500);
  });
});
