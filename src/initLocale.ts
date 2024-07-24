/**
 * Get the browser language if it is available or return the default language
 * @param defaultLanguage {string} - The default language
 * @returns {string} - The browser language
 */
const getBrowserLanguage = (defaultLanguage: string): string => {
  if (typeof navigator !== "undefined") {
    return navigator.language.split("-")[0];
  }
  return defaultLanguage;
};
/**
 * Initialize the locale based on the default language and the browser language
 * @param defaultLanguage {string} - The default language
 * @param detectBrowserLanguage {boolean} - Detect the browser language
 * @returns {string} - The locale
 */
export const initLocale = (
  defaultLanguage: string,
  detectBrowserLanguage: boolean = false,
): string => {
  if (detectBrowserLanguage) return getBrowserLanguage(defaultLanguage);
  return defaultLanguage;
};
