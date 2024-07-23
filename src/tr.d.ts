import { TParams, TrContext } from "./models.ts";
export declare function tr<Key extends string, Params extends TParams>({ locale, languages, defaultLanguage }: TrContext, key: Key, params?: Params): string;
