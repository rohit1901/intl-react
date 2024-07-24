import {TParams, TrContext} from "./models";

/**
 * Get the plural form based on the count and locale
 * @param count {number} - The count to determine the plural form
 * @param locale {string} - The locale to determine the plural form
 */
const getPlural = (count: number, locale: string): string => {
    if (typeof Intl !== "object" || typeof Intl.PluralRules !== "function") {
        console.error("Intl or Intl.PluralRules is not supported");
        return "other"; // Fallback to 'other' if Intl is not supported
    }

    const pluralRules = new Intl.PluralRules(locale);
    return pluralRules.select(count);
};

/**
 * Translate the key to the corresponding translation
 * @param locale {string} - The current locale
 * @param languages {any} - The languages object
 * @param defaultLanguage {string} - The default language
 * @param key {string} - The key to translate
 * @param params {TParams} - The parameters to replace in the translation
 */
export function tr<Key extends string, Params extends TParams>(
    { locale, languages, defaultLanguage }: TrContext,
    key: Key,
    params?: Params
): string {
    const currentLocale = !languages[locale] ? defaultLanguage : locale;
    const modifiedKey: string = modifyKeyForPluralAndGender(key, currentLocale, params);
    let [result, translationFound] = navigateThroughKeys(languages, modifiedKey, currentLocale);

    if (!translationFound && currentLocale !== defaultLanguage) {
        result = getFallbackTranslation(languages, modifiedKey, defaultLanguage);
    }

    if (!result) {
        console.warn(`IntlReact: Missing translation for ${key}`);
        return "";
    }

    return params
        ? result
            .split("__")
            .map((word: string) => params[word] || word)
            .join("")
        : result;
}

/**
 * Function to modify the key based on the plural
 * @param key {string} - The key to modify
 * @param locale {string} - The current locale
 * @param params {TParams} - The parameters to replace in the translation
 */
function modifyKeyForPluralAndGender<Key extends string, Params extends TParams>(
    key: Key,
    locale: string,
    params?: Params,
): string {
    let modifiedKey: string = key;
    // NOTE: count could be 0, so we need to check if it's not undefined
    if (params?.count !== undefined) {
        const pluralForm = getPlural(params.count, locale);
        modifiedKey += params.count === 0 ? ".zero" : pluralForm === "other" ? ".many" : `.${pluralForm}`;
    }
    if (params?.gender) {
        modifiedKey += params.gender === "m" ? ".male" : ".female";
    }
    return modifiedKey;
}

/**
 * Function to navigate through the keys to get the translation
 * @param languages {any} - The languages object
 * @param key {string} - The key to translate
 * @param locale {string} - The current locale
 */
function navigateThroughKeys<Key extends string>(languages: any, key: Key, locale: string): [string, boolean] {
    let result = languages[locale];
    let translationFound = false;
    key.split(".").forEach((k: string) => {
        if (result && typeof result === "object" && result[k]) {
            result = result[k];
            translationFound = true;
        } else {
            result = null;
            translationFound = false;
        }
    });
    return [typeof result === "string" ? result : "", translationFound];
}

/**
 * Function to get the fallback translation
 * @param languages {any} - The languages object
 * @param key {string} - The key to translate
 * @param defaultLanguage {string} - The default language
 */
function getFallbackTranslation<Key extends string>(
    languages: any,
    key: Key,
    defaultLanguage: string
): string {
    const [result, _] = navigateThroughKeys(languages, key, defaultLanguage);
    return result;
}