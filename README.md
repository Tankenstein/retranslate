retranslate
===========
[![CircleCI](https://circleci.com/gh/Tankenstein/retranslate/tree/master.svg?style=shield)](https://circleci.com/gh/Tankenstein/retranslate/tree/master) [![Coverage Status](https://coveralls.io/repos/github/Tankenstein/retranslate/badge.svg)](https://coveralls.io/github/Tankenstein/retranslate)

Real simple translations for react. Lightweight (7.51 KB gzipped) and with no dependencies. Has 100% test coverage.

## Usage

First, install retranslate using
+ npm: `npm install --save retranslate`
+ or yarn: `yarn add retranslate`

Then, import `Provider` and `Message`

```javascript
import { Message, Provider as TranslationProvider } from 'retranslate';
```

### Provider

retranslate is configured using the `Provider`. You pass `Provider` translations, a language and a fallback language (just in case).

### Message

retranslate uses `Message` to actually translate your messages.

## Things left to do

Finish the docs, stuff to do on the library side, like better templating.

## Contributing

TODO: add this section.

retranslate is licensed under MIT.
