import { test, expect } from "./fixtures/fixtures";
import { validateBookingSchema } from "./helpers/bookingSchema";

test.describe("GET /booking/:id", () => {
  test("returns the correct booking details", async ({ request }) => {
    const listResponse = await request.get("/booking");
    const bookings = await listResponse.json();
    const firstId = bookings[0].bookingid;

    const response = await request.get(`/booking/${firstId}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    validateBookingSchema(body);
    expect(body).toHaveProperty("firstname");
    expect(body).toHaveProperty("lastname");
    expect(body).toHaveProperty("totalprice");
    expect(body).toHaveProperty("depositpaid");
    expect(body).toHaveProperty("bookingdates");
    expect(body).toHaveProperty("bookingdates.checkin");
    expect(body).toHaveProperty("bookingdates.checkout");
  });

  test("returns 404 for a non-existent booking ID", async ({ request }) => {
    const response = await request.get(`/booking/99999999999`);
    expect(response.status()).toBe(404);
  });
});
