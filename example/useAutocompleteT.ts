import {
  useTranslation as useTranslationIntl,
  Autocomplete,
  TParams,
  tr,
} from "../src";
import en from "../src/i18n/en.json";

type Key = Autocomplete<typeof en>;

export const useTranslation = () => {
  const { locale, languages, defaultLanguage } = useTranslationIntl();
  return {
    T: (key: Key, params?: TParams) =>
      tr({ locale, languages, defaultLanguage }, key, params),
  };
};
