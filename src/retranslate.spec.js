// This file does end to end tests of retranslate.
import React from 'react';
import { mount } from 'enzyme';

import { Message, Provider, withTranslations } from '.';

describe('retranslate', () => {
  const CustomThing = withTranslations(({ translations: { language, translate } }) => (
    <h1>{translate('fourth', { language })}</h1>
  ));

  /* eslint-disable */
  const TestApp = ({ language }) => {
    /* eslint-enable */
    const messages = {
      en: {
        first: 'First message.',
        second: 'Second message with param {{ first }}.',
        third: 'Third message with params {{ second }} and {{ third }}.',
        fourth: 'Current language is {{ language }}.',
      },
      et: {
        first: 'Esimene sõnum',
        second: 'Teine sõnum parameetriga {{ first }}.',
        third: 'Kolmas sõnum parameetritega {{ second }} ja {{ third }}.',
        fourth: 'Hetke keel on {{ language }}.',
      },
      englishWithSomeMissingStrings: {
        second: 'Second, but different message with param {{ first }}.',
        third: 'Third message with params {{ second }} and {{ third }}.',
      },
    };
    return (
      <div>
        <Provider messages={messages} language={language} fallbackLanguage="en">
          <CustomThing />
          <Message>first</Message>
          <Message params={{ first: 'test' }}>second</Message>
          <Message params={{ second: 'hello', third: 'world' }}>third</Message>
          <Message>missing.string</Message>
        </Provider>
      </div>
    );
  };

  let app;
  const englishApp =
    '<div><h1>Current language is en.</h1>First message.Second message with param test.Third message with params hello and world.missing.string</div>';
  const estonianApp =
    '<div><h1>Hetke keel on et.</h1>Esimene sõnumTeine sõnum parameetriga test.Kolmas sõnum parameetritega hello ja world.missing.string</div>';
  const englishWithSomeMissingStringsApp =
    '<div><h1>Current language is englishWithSomeMissingStrings.</h1>First message.Second, but different message with param test.Third message with params hello and world.missing.string</div>';
  const fallbackLanguageApp =
    '<div><h1>Current language is oops!.</h1>First message.Second message with param test.Third message with params hello and world.missing.string</div>';

  function mountWithLanguage(language) {
    app = mount(<TestApp language={language} />);
  }

  it('creates english applications', () => {
    mountWithLanguage('en');
    expect(app.html()).toEqual(englishApp);
  });

  it('uses the fallback language in applications when something is amiss', () => {
    mountWithLanguage('oops!');
    expect(app.html()).toEqual(fallbackLanguageApp);
  });

  it('creates estonian applications', () => {
    mountWithLanguage('et');
    expect(app.html()).toEqual(estonianApp);
  });

  it('uses strings from the fallback language when the main one fails', () => {
    mountWithLanguage('englishWithSomeMissingStrings');
    expect(app.html()).toEqual(englishWithSomeMissingStringsApp);
  });
});
