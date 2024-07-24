import { PropsWithChildren } from "react";
import { IntlContext, IntlProps, UseTranslation } from "./models.ts";
export declare const IntlReactContext: import("react").Context<IntlContext>;
export declare function IntlReact({ children, languages, defaultLanguage, detectBrowserLanguage, }: PropsWithChildren<IntlProps>): import("react/jsx-runtime").JSX.Element;
export declare function useTranslation(): UseTranslation;
