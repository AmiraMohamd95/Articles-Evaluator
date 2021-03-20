import { checkForUrl } from "../src/client/js/urlChecker";



describe("Testing the regex URL validation functionality", () => {
  test("Making sure urlChecker is defined", () => {
    expect(checkForUrl).toBeDefined();
});

  test("Making sure a valid URL returns true", () => {
    expect(checkForUrl("www.github.com")).toBeTruthy();
  });

  test("Making sure an invalid URL returns false", () => {
    expect(checkForUrl("Hello There")).toBeFalsy();
  });
});