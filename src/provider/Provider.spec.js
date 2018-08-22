import React from 'react';
import { shallow } from 'enzyme';
import Provider from './Provider';

describe('Translation Provider', () => {
  let component;
  let context;
  let props;

  function getNewInstanceContext() {
    context = component.instance().getContext();
  }

  function translate(key, params) {
    return context.translations.translate(key, params);
  }

  beforeEach(() => {
    props = {
      fallbackLanguage: 'hello',
      messages: {},
      language: 'language',
    };
    component = shallow(<Provider {...props} />);
  });

  it('renders children given to it', () => {
    component = shallow(<Provider {...props}>Hello!</Provider>);
    expect(component.text()).toEqual('Hello!');
  });

  it('translates strings in different languages', () => {
    props.language = 'firstLanguage';
    props.messages = {
      firstLanguage: { one: 'firstLanguageOne', two: 'firstLanguageTwo' },
      secondLanguage: { one: 'secondLanguageOne', two: 'secondLanguageTwo' },
    };
    component.setProps(props);
    getNewInstanceContext();
    expect(context.translations.language).toEqual('firstLanguage');
    expect(translate('one')).toEqual([{ dangerous: false, value: 'firstLanguageOne' }]);
    expect(translate('two')).toEqual([{ dangerous: false, value: 'firstLanguageTwo' }]);

    props.language = 'secondLanguage';
    component.setProps(props);
    getNewInstanceContext();
    expect(context.translations.language).toEqual('secondLanguage');
    expect(translate('one')).toEqual([{ dangerous: false, value: 'secondLanguageOne' }]);
    expect(translate('two')).toEqual([{ dangerous: false, value: 'secondLanguageTwo' }]);
  });

  it('falls back to a language where a translation exists if needed', () => {
    props.language = 'firstLanguage';
    props.messages = { fallback: { message: 'hey' } };
    props.fallbackLanguage = 'fallback';
    component.setProps(props);
    getNewInstanceContext();
    expect(translate('message')).toEqual([{ dangerous: false, value: 'hey' }]);
    expect(context.translations.language).toEqual('firstLanguage');
  });

  it('interpolates variables', () => {
    props.messages = { language: { test: 'interpolate {{me}}' } };
    component.setProps(props);
    getNewInstanceContext();
    expect(translate('test', { me: 'this' })).toEqual([
      { dangerous: false, value: 'interpolate ' },
      { dangerous: true, value: 'this' },
    ]);
  });

  it('interpolates variables with whitespace in templates', () => {
    props.messages = {
      language: {
        testTwo: 'interpolate {{this}}',
        testThree: 'interpolate {{ thisToo        }}',
      },
    };
    component.setProps(props);
    getNewInstanceContext();
    expect(translate('testTwo', { this: 'hello' })).toEqual([
      { dangerous: false, value: 'interpolate ' },
      { dangerous: true, value: 'hello' },
    ]);
    expect(translate('testThree', { thisToo: 'hello' })).toEqual([
      { dangerous: false, value: 'interpolate ' },
      { dangerous: true, value: 'hello' },
    ]);
  });

  it('can interpolate react components as variables', () => {
    props.messages = {
      language: {
        test: 'interpolate {{this}}',
      },
    };
    component.setProps(props);
    getNewInstanceContext();
    expect(translate('test', { this: <h1>hello</h1> })).toEqual([
      { dangerous: false, value: 'interpolate ' },
      { dangerous: true, value: <h1>hello</h1> },
    ]);
  });

  it('interpolates multiple variables', () => {
    props.messages = { language: { test: 'interpolate {{ first }} and {{ second }}' } };
    component.setProps(props);
    getNewInstanceContext();
    expect(translate('test', { first: 'this', second: 'that' })).toEqual([
      { dangerous: false, value: 'interpolate ' },
      { dangerous: true, value: 'this' },
      { dangerous: false, value: ' and ' },
      { dangerous: true, value: 'that' },
    ]);
  });

  it('interpolates the same variable multiple times', () => {
    props.messages = { language: { test: '{{ thing }} === {{ thing }}' } };
    component.setProps(props);
    getNewInstanceContext();
    expect(translate('test', { thing: 'hello' })).toEqual([
      { dangerous: true, value: 'hello' },
      { dangerous: false, value: ' === ' },
      { dangerous: true, value: 'hello' },
    ]);
  });

  it('returns the key if no translation found', () => {
    expect(translate('non.existing.thing')).toEqual([
      { dangerous: false, value: 'non.existing.thing' },
    ]);
  });

  it('has a display name', () => {
    expect(Provider.displayName).toEqual('TranslationProvider');
  });
});
