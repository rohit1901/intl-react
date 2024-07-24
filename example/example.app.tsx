import viteLogo from '/vite.svg'
import {useTranslation} from "../src";
import {useTranslation as useTranslationT} from "./useAutocompleteT";

function ExampleApp() {
    const { locale, setLocale } = useTranslation();
    const {T} = useTranslationT();

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
            </div>
            <h1>Selected Locale: {locale}</h1>
            <div className="flex-box">
                <button onClick={() => setLocale("en")} disabled={locale === "en"}>English</button>
                <button onClick={() => setLocale("de")} disabled={locale === "de"}>German</button>
            </div>
            <div>Simple translation: <code>T('hello')</code> results in <pre>{T('hello')}</pre></div>
            <div>Translation with parameters: <code>{`T('user.describe.simple', {name: "John"})`}</code> results in <pre>{T('user.describe.simple', {name: "John"})}</pre></div>
            <div>Pluralization: <code>
                {`T('message-count', {count: 5})`}
            </code> results in <pre>{T('message-count', {count: 5})}</pre></div>
            <div>Fallback: <code>
                {`T('fallback.valid')`}
            </code> results in <pre>{T('fallback.valid')}</pre></div>
            <div>Missing key: <code>
                {`T('missing.key')`}
            </code> results in <pre>{T('missing.key')}</pre></div>
            <div>Missing key with fallback: <code>
                {`T('missing.key', {fallback: "Fallback"})`}
            </code> results in <pre>{T('missing.key', {fallback: "Fallback"})}</pre></div>
            <div>Missing key with fallback and parameters: <code>
                {`T('missing.key', {fallback: "Fallback", name: "John"})`}
            </code> results in <pre>
                {T('missing.key', {fallback: "Fallback", name: "John"})}
            </pre></div>
        </>
    )
}

export default ExampleApp
