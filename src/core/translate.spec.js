import { translateAsParts, translate } from './translate';

const fallbackLanguage = 'en';
const messages = Object.freeze({
  en: {
    first: 'First message.',
    second: 'Second message with param {{ first }}.',
    third: 'Third message with params {{ second }} and {{ third }}.',
    missing: 'Current language is {{ language }}.',
  },
  et: {
    first: 'Esimene sõnum',
    second: 'Teine sõnum parameetriga {{ first }}.',
    third: 'Kolmas sõnum parameetritega {{ second }} ja {{ third }}.',
  },
});

describe('translateAsParts', () => {
  it('should translate simple keys to et language correctly', () => {
    const given = {
      config: { messages, fallbackLanguage, language: 'et' },
      key: 'first',
    };

    const when = translateAsParts(given.config)(given.key);
    const then = [{ dangerous: false, value: 'Esimene sõnum' }];

    expect(when).toEqual(then);
  });

  it('should translate dangerous key to et language correctly', () => {
    const given = {
      config: { messages, fallbackLanguage, language: 'et' },
      key: 'second',
      params: { first: 'test' },
    };

    const when = translateAsParts(given.config)(given.key, given.params);
    const then = [
      { dangerous: false, value: 'Teine sõnum parameetriga ' },
      { dangerous: true, value: 'test' },
      { dangerous: false, value: '.' },
    ];

    expect(when).toEqual(then);
  });

  it('should translate multiple dangerous key to et language correctly', () => {
    const given = {
      config: { messages, fallbackLanguage, language: 'et' },
      key: 'third',
      params: { second: 'test', third: 'foo' },
    };

    const when = translateAsParts(given.config)(given.key, given.params);
    const then = [
      { dangerous: false, value: 'Kolmas sõnum parameetritega ' },
      { dangerous: true, value: 'test' },
      { dangerous: false, value: ' ja ' },
      { dangerous: true, value: 'foo' },
      { dangerous: false, value: '.' },
    ];

    expect(when).toEqual(then);
  });

  it('should fallback the translation of the missing key', () => {
    const given = {
      config: { messages, fallbackLanguage, language: 'et' },
      key: 'missing',
      params: { language: 'English' },
    };

    const when = translateAsParts(given.config)(given.key, given.params);
    const then = [
      { dangerous: false, value: 'Current language is ' },
      { dangerous: true, value: 'English' },
      { dangerous: false, value: '.' },
    ];

    expect(when).toEqual(then);
  });

  it('should remove missing param part', () => {
    const given = {
      config: { messages, fallbackLanguage, language: 'en' },
      key: 'second',
      params: {},
    };

    const when = translateAsParts(given.config)(given.key, given.params);
    const then = [
      { dangerous: false, value: 'Second message with param ' },
      { dangerous: false, value: '.' },
    ];

    expect(when).toEqual(then);
  });
});

describe('translate', () => {
  it('should translate string', () => {
    const given = {
      config: { messages, fallbackLanguage, language: 'et' },
      key: 'third',
      params: { second: 'foo', third: 'bar' },
    };

    const when = translate(given.config)(given.key, given.params);
    const then = 'Kolmas sõnum parameetritega foo ja bar.';

    expect(when).toEqual(then);
  });
});
