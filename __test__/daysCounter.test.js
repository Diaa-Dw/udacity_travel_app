import daysCounter from "../src/client/js/daysCounter";

describe("daysCounter", () => {
  // Mocking the Date to ensure consistency in tests
  const mockDate = new Date("2025-01-25");
  global.Date = class extends Date {
    constructor(date) {
      return date ? super(date) : mockDate;
    }
  };

  test("should return correct days for a future date in the same month", () => {
    const inputDate = "2025-01-30";
    expect(daysCounter(inputDate)).toBe(5);
  });

  test("should return correct days for a future date in a different month", () => {
    const inputDate = "2025-02-05";
    expect(daysCounter(inputDate)).toBe(11);
  });

  test("should return 0 if the input date is today", () => {
    const inputDate = "2025-01-25";
    expect(daysCounter(inputDate)).toBe(0);
  });

  test("should return a negative number for a past date", () => {
    const inputDate = "2025-01-20";
    expect(daysCounter(inputDate)).toBe(-5);
  });
});
