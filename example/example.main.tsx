import React from 'react'
import ReactDOM from 'react-dom/client'
import {IntlReact} from "../src";
import en from "../src/i18n/en.json";
import de from "../src/i18n/de.json";
import ExampleApp from "./example.app";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <IntlReact languages={{en, de}} defaultLanguage="en">
            <ExampleApp />
        </IntlReact>
    </React.StrictMode>,
)
