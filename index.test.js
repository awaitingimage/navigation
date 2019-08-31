import { calculateRoutesStart } from "./index";

test("1 + 1 = 2", () => {
  expect(calculateRoutesStart("A", "B")).toStrictEqual(["A", "C", "D", "B"]);
});

// test("calculateRouteOptions", () => {
//   expect(calculateRouteOptions("A")).toBe(["C"]);
//   expect(calculateRouteOptions("C")).toBe(["D", "F", "A"]);
// });
