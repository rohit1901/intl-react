Here's a rephrased and expanded version of the README with additional content and examples:

# intl-react

**intl-react** is a lightweight, powerful i18n provider for React applications. It offers full TypeScript support, autocompletion, zero dependencies, and an intuitive API. Perfect for both web and React Native projects.

## Features

- 🌐 Automatic browser language detection
- 🔢 Smart plural rules for any language
- 🔄 Dynamic translations with multiple keys
- 🗂️ Deep nested key access in JSON translation files
- ⚧️ Gender-aware syntax adaptation
- 📱 React Native compatibility
- 💡 TypeScript autocompletion for translation keys
- 🚀 Performant and lightweight

## Installation

```bash
# Using npm
npm install intl-react

# Using yarn
yarn add intl-react

# Using pnpm
pnpm add intl-react
```

## Quick Start

1. Create your JSON translation files
2. Set up the IntlReact provider
3. Use translations in your components

### 1. Create Translation Files

Example `en.json`:

```json
{
  "greeting": "Hello, __name__!",
  "items": {
    "zero": "No items",
    "one": "One item",
    "many": "__count__ items"
  },
  "weather": {
    "hot": "It's __temperature__°C outside. Stay hydrated!",
    "cold": "It's __temperature__°C outside. Bundle up!"
  },
  "profile": {
    "title": {
      "male": "Mr. __name__",
      "female": "Ms. __name__"
    }
  }
}
```

### 2. Set Up Provider

```jsx
import React from 'react';
import { IntlReact } from 'intl-react';
import en from './locales/en.json';
import es from './locales/es.json';

function App() {
  return (
    <IntlReact 
      languages={{ en, es }} 
      defaultLanguage="en"
      detectBrowserLanguage={true}
    >
      <YourApp />
    </IntlReact>
  );
}

export default App;
```

### 3. Use Translations

```jsx
import React from 'react';
import { useTranslation } from 'intl-react';

function Welcome() {
  const { T, setLocale, locale } = useTranslation();

  return (
    <div>
      <h1>{T('greeting', { name: 'Alice' })}</h1>
      <p>{T('items', { count: 5 })}</p>
      <p>{T('weather.hot', { temperature: 30 })}</p>
      <p>{T('profile.title', { name: 'Johnson', gender: 'male' })}</p>
      
      <p>Current language: {locale}</p>
      <button onClick={() => setLocale('es')}>Switch to Spanish</button>
    </div>
  );
}
```

## Advanced Usage

### Dynamic Values

Use double underscores to denote dynamic values in your translations:

```json
{
  "welcome": "Welcome to __city__, __name__!"
}
```

```jsx
T('welcome', { city: 'Paris', name: 'Alice' })
```

### Pluralization

Use `zero`, `one`, and `many` keys for pluralization:

```json
{
  "apples": {
    "zero": "No apples",
    "one": "One apple",
    "many": "__count__ apples"
  }
}
```

```jsx
T('apples', { count: 0 })  // "No apples"
T('apples', { count: 1 })  // "One apple"
T('apples', { count: 5 })  // "5 apples"
```

### Gender-Aware Translations

Use `male` and `female` keys for gender-specific translations:

```json
{
  "greeting": {
    "male": "Welcome, Mr. __name__",
    "female": "Welcome, Ms. __name__"
  }
}
```

```jsx
T('greeting', { name: 'Smith', gender: 'male' })
T('greeting', { name: 'Johnson', gender: 'female' })
```

### Locale Management

```jsx
const { setLocale, locale } = useTranslation();

// Get current locale
console.log(locale);

// Change locale
setLocale('fr');
```

## React Native Support

intl-react works seamlessly with React Native. Just wrap your app with the provider:

```jsx
import { IntlReact } from 'intl-react';
import en from './locales/en.json';
import fr from './locales/fr.json';

export default function App() {
  return (
    <IntlReact languages={{ en, fr }} defaultLanguage="en">
      <NavigationContainer>{/* ... */}</NavigationContainer>
    </IntlReact>
  );
}
```

Then use it in your components:

```jsx
import { useTranslation } from 'intl-react';
import { Text, Button } from 'react-native';

function MyScreen() {
  const { T, setLocale } = useTranslation();

  return (
    <>
      <Text>{T('greeting', { name: 'User' })}</Text>
      <Button title="Switch to French" onPress={() => setLocale('fr')} />
    </>
  );
}
```

## TypeScript and Autocompletion

For TypeScript projects, create a custom hook for autocompletion:

```typescript
// translate.ts
import { useTranslation as useIntlT, Autocomplete, TParams, tr } from 'intl-react';
import en from './locales/en.json';

type Key = Autocomplete<typeof en>;

export const useTranslation = () => {
  const { locale, languages, defaultLanguage } = useIntlT();
  return {
    T: (key: Key, params?: TParams) =>
      tr({ locale, languages, defaultLanguage }, key, params),
    setLocale: useIntlT().setLocale,
    locale: useIntlT().locale,
  };
};
```

Now use your custom hook for autocompletion:

```tsx
import { useTranslation } from './translate';

function MyComponent() {
  const { T } = useTranslation();
  return <h1>{T('greeting', { name: 'World' })}</h1>;
}
```

## API Reference

### IntlReact Props

| Prop | Type | Description |
|------|------|-------------|
| `languages` | `object` | Object containing all translation JSON files |
| `defaultLanguage` | `string` | Default language code |
| `detectBrowserLanguage` | `boolean` | Automatically detect and use browser language |

### useTranslation Hook

| Method/Property | Type | Description |
|-----------------|------|-------------|
| `T` | `function` | Translation function |
| `setLocale` | `function` | Change current locale |
| `locale` | `string` | Current locale code |

## Best Practices

1. Keep translation keys hierarchical and meaningful
2. Use pluralization for countable items
3. Implement gender-aware translations where applicable
4. Leverage TypeScript for type-safe translations
5. Regularly update and sync translation files across languages

## License

intl-react is MIT licensed. See [LICENSE](LICENSE.md) for details.