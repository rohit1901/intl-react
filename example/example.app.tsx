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
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
            </div>
            <h1>Selected Locale: {locale}</h1>
            <div className="flex-box">
                <button onClick={() => setLocale("en")} disabled={locale === "en"}>English</button>
                <button onClick={() => setLocale("de")} disabled={locale === "de"}>German</button>
            </div>
            <div>Simple translation: <code>T('hello')</code> results in <pre>{T('hello')}</pre></div>
            <div>Translation with parameters: <code>{`T('user.describe.simple', {name: "John"})`}</code> results
                in <pre>{T('user.describe.simple', {name: "John"})}</pre></div>
            <div>Pluralization: <code>
                {`T('message-count', {count: 5})`}
            </code> results in <pre>{T('message-count', {count: 5})}</pre></div>
            <div>Fallback: <code>
                {`T('fallback.valid')`}
            </code> results in <pre>{T('fallback.valid')}</pre></div>
            {/*Date and Time section*/}
            <div>Date: <code>
                {`T('date')`}
            </code> results in <pre>{T('date')}</pre></div>
            <div>Date UTC: <code>
                {`T('date-utc')`}
            </code> results in <pre>{T('date-utc')}</pre></div>
            <div>Nested Dates (Simple Format):
                <code>
                    {`T('dates.simple')`}
                </code> results in <pre>{T('dates.simple')}</pre></div>
            <div>Nested Dates (Simple Format):
                <code>
                    {`T('dates.nested.simple')`}
                </code> results in <pre>{T('dates.nested.simple')}</pre></div>
            <div>Nested Dates (Complex Format):
                <code>
                    {`T('dates.nested.complex')`}
                </code> results in <pre>{T('dates.nested.complex')}</pre></div>
            <div>Parameters in Dates:
                <code>
                    {`T('dates.parameter', {date: new Date()})`}
                </code> results in <pre>{T('dates.parameter', {date: Date.now()})}</pre></div>

            {/*Missing Keys section*/}
            <div>Missing key: <code>
                {`T('missing.key')`}
            </code> results in <pre>{T('missing.key')}</pre></div>
            <div>Missing key with fallback: <code>
                {`T('fallback.valid')`}
            </code> results in <pre>{T('fallback.valid')}</pre></div>
        </>
    )
}

export default ExampleApp
