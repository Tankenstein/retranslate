# retranslate

[![CircleCI](https://circleci.com/gh/Tankenstein/retranslate/tree/master.svg?style=shield)](https://circleci.com/gh/Tankenstein/retranslate/tree/master) [![Coverage Status](https://coveralls.io/repos/github/Tankenstein/retranslate/badge.svg)](https://coveralls.io/github/Tankenstein/retranslate)

Real simple translations for react. Lightweight (< 10 KB gzipped) and with no dependencies.

## Usage

First, install retranslate using

- npm: `npm install --save retranslate`
- or yarn: `yarn add retranslate`

Then, start importing and using the following components and functions:

### Provider

retranslate is configured using the `Provider`. You pass `Provider` `messages`, a `language` and a `fallbackLanguage` (just in case). Wrap your application with `Provider` to make retranslate work. The `Provider` takes an optional argument `wrapperElement`, which can be used to configure which element is used to render the provider.

Also available as `TranslationProvider`.

Example use:

```javascript
import { TranslationProvider } from 'retranslate';

const App = () => (
  <TranslationProvider
    messages={{
      en: { key: 'I am a translation in english with a parameter here: {{ parameter }}' },
      et: { key: 'Ma olen eestikeelne tõlge, parameetriga siin: {{ parameter }}' },
    }}
    language="en"
    fallbackLanguage="en"
  >
    // ... your app goes here
  </TranslationProvider>
);
```

### Message

retranslate uses `Message` to actually translate your messages. It uses the children you give it as the key to use to get translations. You can make it not escape the html of the translation, by passing the key in a prop called `dangerouslyTranslateInnerHTML` rather than the children. To add variables, pass them as a map in the `params` prop. You can use react components as variables out of the box.

Example use:

```javascript
import { Message } from 'retranslate';

// assuming there is a key called "greeting" and a provider somewhere up the tree.
const Greeting = ({ name }) => <Message params={{ name }}>greeting</Message>;
```

When the translation is not found, even in the fallback language, the translation key itself will be rendered.

### withTranslations

`withTranslations` is a higher order component that you can use to access translation functionality and language manually.
You get access to a `translate` function, a `translateAsParts` function and the current `language`. The translate function takes a message key and template parameters, and returns a string translation. When using this function, react components passed as parameters will not work, and they'll be stringified. The other function, translateAsParts, returns the internal representation of translation parts. These translation parts have both a value and a property called `dangerous`. If `dangerous` is true, it's a resolved template parameter and you should take special care with it (as these are dynamic).

Example use:

```javascript
import { withTranslations } from 'retranslate';

const GreetingWithLanguage = withTranslations(({ translations: { translate, language } }) =>
  translate('greeting', { name: 'someName', language /* parameters */ }),
);
```

### WithTranslations

`WithTranslations` is a component, similar to the `withTranslations` HOC. Instead of exposing internal functionality as a hoc, it exposes it to a function as a child.

Example use:

```javascript
import { WithTranslations } from 'retranslate';

const Greeting = ({ name }) => (
  <WithTranslations>
    {translations =>
      translations.translate('greeting', { name }))
    }
  </WithTranslations>
);
```

### useTranslations

`useTranslations` is a [React Hook](https://reactjs.org/docs/hooks-intro.html) based on `useContext`, allowing access to translations without component nesting.

Example use:

```javascript
import { useTranslations } from 'retranslate';

const Greeting = ({ name }) => {
  const { translate, language } = useTranslations();
  return <div>{translate('greeting', { name: 'someName', language /* parameters */ })}</div>;
};
```

## Potential questions

- Async loading

  I don't want to build this into retranslate. I would keep handling this on the application side.

- Plurals

  This is something that will be worked on.

- Compiled templates for even better performance

  Also something that will probably be worked on.

## Contributing

Use the `test:build` script to test the library. Make a pull request, and it will be automatically checked by CircleCI, Coveralls, and @Tankenstein. When you make a production code change, make sure to increment the version in `package.json` according to semver. As your branch is merged, a release will automatically be made.

retranslate is licensed under MIT.
