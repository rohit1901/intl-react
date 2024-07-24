import {createContext, useState, useContext, PropsWithChildren} from "react";
import { initLocale } from "./initLocale";
import { IntlContext, TParams, IntlProps, UseTranslation } from "./models";
import { tr } from "./tr";
export const IntlReactContext = createContext<IntlContext>({
    locale: "",
    setLocale: () => null,
    languages: {},
    defaultLanguage: "",
});

/**
 * Provider that sets the locale and the languages
 * @param children {ReactNode} - The children
 * @param languages {Record<string, Record<string, string>>} - The languages
 * @param defaultLanguage {string} - The default language
 * @param detectBrowserLanguage {boolean} - Detect the browser language
 * @example
 * <IntlReact
 *   languages={{ en: { key: "value" }, fr: { key: "valeur" } }} defaultLanguage="en" detectBrowserLanguage>
 *   <App />
 * </IntlReact>
 * @link ../example/example.main.ts
 */
export function IntlReact({
                          children,
                          languages,
                          defaultLanguage,
                          detectBrowserLanguage,
                      }: PropsWithChildren<IntlProps>) {
    const [locale, setLocale] = useState<string>(
        initLocale(defaultLanguage, detectBrowserLanguage)
    );
    return (
        <IntlReactContext.Provider
            value={{ locale, setLocale, languages, defaultLanguage }}>
            {children}
        </IntlReactContext.Provider>
    );
}

/**
 * Hook that returns the translation function and the current locale.
 * @returns {UseTranslation} - The translation function and the current locale
 * @example
 * const { T, locale } = useTranslation();
 * T("key");
 * @example
 * const { T, locale } = useTranslation();
 * T("key", {
 *    name: "John",
 *    age: 30
 *    });
 */
export function useTranslation(): UseTranslation {
    const { setLocale, ...props } = useContext(IntlReactContext);
    return {
        ...props,
        setLocale,
        T: <Key extends string, Params extends TParams>(
            key: Key,
            params?: Params
        ) => tr(props, key, params),
    };
}