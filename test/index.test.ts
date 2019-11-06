import validateCFDI from "../src";

test("Test default return", async () => {
  const result = await validateCFDI(
    "LAN8507268IA",
    "LAN7008173R5",
    5800.0,
    "8E4B62EE-3CD3-4874-B75E-F6C0C443A0FB"
  );
  expect(result).toBe("test");
});
