import { TContext, TProps, UseT } from "./models.ts";
export declare const IntlReactContext: import("react").Context<TContext>;
export declare function IntlReact({ children, languages, defaultLanguage, detectBrowserLanguage, }: TProps): import("react/jsx-runtime").JSX.Element;
export declare function useT(): UseT;
