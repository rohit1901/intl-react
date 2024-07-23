import { createContext, useState, useContext } from "react";
import { initLocale } from "./initLocale.ts";
import { TContext, TParams, TProps, UseT } from "./models.ts";
import { tr } from "./tr.tsx";
export const IntlReactContext = createContext<TContext>({
    locale: "",
    setLocale: () => null,
    languages: {},
    defaultLanguage: "",
});

export function IntlReact({
                          children,
                          languages,
                          defaultLanguage,
                          detectBrowserLanguage,
                      }: TProps) {
    const [locale, setLocale] = useState(
        initLocale(defaultLanguage, detectBrowserLanguage)
    );
    return (
        <IntlReactContext.Provider
            value={{ locale, setLocale, languages, defaultLanguage }}
>
    {children}
    </IntlReactContext.Provider>
);
}
export function useTranslation(): UseT {
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