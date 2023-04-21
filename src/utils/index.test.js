import { calcDistance } from "./index";

test("caluclate distance between two coordinates", () => {
  expect(
    calcDistance(51.129888, 0.274971, 51.433302, -0.156824, "M")
  ).toBeLessThan(42);
});
