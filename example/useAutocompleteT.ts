import {
  TParams,
  tr,
  useTranslation as useTranslationIntl,
  UseTranslation,
} from "../src";
import en from "../src/i18n/en.json";

type KeyPrefix<T extends string> = T extends "" ? "" : `.${T}`;
type Suffix = "zero" | "one" | "two" | "few" | "many" | "female" | "male";
type DynamicSuffix = Partial<Record<Suffix, string>>;
export type KeyPath<T> = (
  T extends DynamicSuffix
    ? ""
    : T extends object
      ? {
          [K in Exclude<keyof T, symbol>]: `${K}${KeyPrefix<KeyPath<T[K]>>}`;
        }[Exclude<keyof T, symbol>]
      : ""
) extends infer D
  ? Extract<D, string>
  : never;
export type Autocomplete<schema> = KeyPath<schema>;
type Key = Autocomplete<typeof en>;
type AutocompleteHookType = Omit<UseTranslation, "T"> & {
  T: (key: Key, params?: TParams) => string;
};
/**
 * Hook that returns the translation function and the current locale with AutoComplete.
 * @description
 * Autocomplete is a feature that is supported by typescript and the editor for better code completion.
 * NOTE: This is a custom hook that wraps the useTranslation hook. Make sure to import it from the correct path (intl/useAutocompleteT.ts) if
 * there's a need for autocomplete otherwise use the useTranslation hook from intl/index.ts
 * @returns {AutocompleteHookType} - The translation function and the current locale.
 */
export const useTranslation = (): AutocompleteHookType => {
  const props = useTranslationIntl();
  return {
    ...props,
    T: (key: Key, params?: TParams) => tr({ ...props }, key, params),
  };
};
