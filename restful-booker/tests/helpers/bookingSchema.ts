import { expect } from "../fixtures/fixtures";

export function validateBookingSchema(body: any) {
  expect(typeof body.firstname).toBe("string");
  expect(typeof body.lastname).toBe("string");
  expect(typeof body.totalprice).toBe("number");
  expect(typeof body.depositpaid).toBe("boolean");
  expect(typeof body.bookingdates).toBe("object");
  expect(typeof body.bookingdates.checkin).toBe("string");
  expect(typeof body.bookingdates.checkout).toBe("string");
}
