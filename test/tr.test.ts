import { describe, it, expect } from "vitest";
import de from "../src/i18n/de.json";
import en from "../src/i18n/en.json";
import { tr } from "../src";
const contextEn = {
  locale: "en",
  languages: {
    en: {
      ...en,
      fallback: {
        valid: "Connection was successful",
      },
    },
    de,
  },
  defaultLanguage: "en",
};

const contextDe = {
  locale: "de",
  languages: {
    en: {
      ...en,
      fallback: {
        valid: "Connection was successful",
      },
    },
    de,
  },
  defaultLanguage: "en",
};

describe("tr function with multiple languages", () => {
  // English tests
  it("translates a simple key in English", () => {
    const result = tr(contextEn, "hello");
    expect(result).toBe("Hello");
  });

  it("translates with parameters in English", () => {
    const result = tr(contextEn, "user.describe.simple", { name: "John" });
    expect(result).toBe("You are John");
  });

  // German tests
  it("translates a simple key in German", () => {
    const result = tr(contextDe, "hello");
    expect(result).toBe("Hallo");
  });

  it("translates with parameters in German", () => {
    const result = tr(contextDe, "user.describe.simple", { name: "John" });
    expect(result).toBe("Du bist John");
  });

  it("handles pluralization for multiple items in German", () => {
    const result = tr(contextDe, "message-count", { count: 5 });
    expect(result).toBe("Du hast 5 Nachrichten");
  });

  it("handles gender-specific translations in German (female)", () => {
    const result = tr(contextDe, "idiom.sovereign", { gender: "f" });
    expect(result).toBe("Lang lebe die Königin!");
  });
});
describe("tr function extended tests", () => {
  // Fallback to Default Language
  it("falls back to default language if key is missing in selected language", () => {
    const result = tr(contextDe, "fallback.valid"); // Assuming 'feedback.success' is not in 'de.json'
    expect(result).toBe("Connection was successful"); // Assuming this is the translation in 'en.json'
  });

  // Missing Key in All Languages
  it("returns empty string for missing key in all languages", () => {
    const result = tr(contextEn, "nonexistent.key");
    expect(result).toBe("");
  });

  // Pluralization with Unsupported Locale
  it("handles pluralization with unsupported locale", () => {
    const unsupportedLocaleContext = { ...contextEn, locale: "xx" }; // 'xx' is an unsupported locale
    const result = tr(unsupportedLocaleContext, "message-count", { count: 2 });
    expect(result).toBe("You have 2 messages"); // Fallback behavior
  });

  // Parameter Replacement in Nested Keys
  it("replaces parameters in nested translation keys", () => {
    const result = tr(contextDe, "user.describe.complex", {
      name: "Anna",
      hobby: "reading",
    });
    expect(result).toBe("Du bist Anna und du magst reading");
  });

  // Incorrect Parameter Types
  it("handles incorrect parameter types gracefully", () => {
    // @ts-expect-error 'count' should be a number
    const result = tr(contextDe, "message-count", { count: "five" }); // 'count' should be a number
    expect(result).toBe("Du hast five Nachrichten"); // Shows how the function handles incorrect types
  });
});
