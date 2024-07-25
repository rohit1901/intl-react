import { createContext, PropsWithChildren, useContext, useState } from "react";
import { initLocale } from "./initLocale";
import { TParams, tr } from "./tr";

type LanguageRecord = {
    [key: string]: string | LanguageRecord;
};
export type LanguageType = {
    [key: string]: string | LanguageRecord | undefined;
};
export type IntlProps = {
    languages: LanguageType;
    defaultLanguage: string;
    detectBrowserLanguage?: boolean;
};
export type IntlContext = {
    locale: string;
    setLocale: (language: string) => void;
    languages: LanguageType;
    defaultLanguage: string;
};
export const IntlReactContext = createContext<IntlContext>({
    locale: "",
    setLocale: () => null,
    languages: {},
    defaultLanguage: "",
});

/**
 * Provider that sets the locale and the languages
 * @description
 * Follow the links for Documentation and examples:
 * - @link https://www.npmjs.com/package/intl-react
 * - @link https://github.com/rohit1901/intl-react
 * @param children {ReactNode} - The children
 * @param languages {LanguageType} - The languages
 * @param defaultLanguage {string} - The default language
 * @param detectBrowserLanguage {boolean} - Detect the browser language
 *
 * @example
 * <IntlReact
 *   languages={{ en: { key: "value" }, de: { key: "wert" } }} defaultLanguage="en" detectBrowserLanguage>
 *   <App />
 * </IntlReact>
 */
export function IntlReact({
                              children,
                              languages,
                              defaultLanguage,
                              detectBrowserLanguage,
                          }: PropsWithChildren<IntlProps>) {
    const [locale, setLocale] = useState(
        initLocale(defaultLanguage, detectBrowserLanguage),
    );
    return (
        <IntlReactContext.Provider
            value={{ locale, setLocale, languages, defaultLanguage }}
        >
            {children}
        </IntlReactContext.Provider>
    );
}

export type UseTranslation = {
    T: <Key extends string, Params extends TParams>(
        key: Key,
        params?: Params,
    ) => string;
} & IntlContext;

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
            params?: Params,
        ) => tr(props, key, params),
    };
}
