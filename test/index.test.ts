import { validate } from "../src";

test("Test default return", () => {
  const result = validate();
  expect(result).toBe("test");
});
