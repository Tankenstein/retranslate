import React from 'react';
import { shallow, mount } from 'enzyme';
import Provider from './Provider';

describe('Translation Provider', () => {
  let component;
  let context;
  let props;

  function getNewInstanceContext() {
    context = new Provider(props).getChildContext();
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
    getNewInstanceContext();
  });

  it('renders children given to it', () => {
    component = shallow(<Provider {...props}>Hello!</Provider>);
    expect(component.text()).toEqual('Hello!');
  });

  it('renders using span as wrapper', () => {
    component = shallow(<Provider {...props} wrapperElement="span">Hello!</Provider>);
    expect(component.text()).toEqual('Hello!');
    expect(component.type()).toEqual('span');
  });

  it('renders using a function component as wrapper', () => {
    function Wrapper({ children }) {
      return <div className="function-wrapper">{ children }</div>
    }
    component = shallow(<Provider {...props} wrapperElement={Wrapper}>Hello!</Provider>);
    expect(component.html()).toEqual(
      '<div class="function-wrapper">Hello!</div>'
    );
  });
  it('renders using a class component as wrapper', () => {
    class Wrapper extends React.Component {
      render() {
        return <div className="class-wrapper">{ this.props.children }</div>
      }
    }
    component = mount(<Provider {...props} wrapperElement={Wrapper}>Hello!</Provider>);
    expect(component.html()).toEqual(
      '<div class="class-wrapper">Hello!</div>'
    );
  });

  it('translates strings in different languages', () => {
    props.language = 'firstLanguage';
    props.messages = {
      firstLanguage: { one: 'firstLanguageOne', two: 'firstLanguageTwo' },
      secondLanguage: { one: 'secondLanguageOne', two: 'secondLanguageTwo' },
    };
    getNewInstanceContext();
    expect(context.translations.language).toEqual('firstLanguage');
    expect(translate('one')).toEqual('firstLanguageOne');
    expect(translate('two')).toEqual('firstLanguageTwo');

    props.language = 'secondLanguage';
    getNewInstanceContext();
    expect(context.translations.language).toEqual('secondLanguage');
    expect(translate('one')).toEqual('secondLanguageOne');
    expect(translate('two')).toEqual('secondLanguageTwo');
  });

  it('falls back to a language where a translation exists if needed', () => {
    props.language = 'firstLanguage';
    props.messages = { fallback: { message: 'hey' } };
    props.fallbackLanguage = 'fallback';
    getNewInstanceContext();
    expect(translate('message')).toEqual('hey');
    expect(context.translations.language).toEqual('firstLanguage');
  });

  it('interpolates variables', () => {
    props.messages = { language: { test: 'interpolate {{me}}' } };
    getNewInstanceContext();
    expect(translate('test', { me: 'this' })).toEqual('interpolate this');
  });

  it('interpolates variables with whitespace in templates', () => {
    props.messages = {
      language: {
        testTwo: 'interpolate {{this}}',
        testThree: 'interpolate {{ thisToo        }}',
      },
    };
    getNewInstanceContext();
    expect(translate('testTwo', { this: 'hello' })).toEqual('interpolate hello');
    expect(translate('testThree', { thisToo: 'hello' })).toEqual('interpolate hello');
  });

  it('interpolates multiple variables', () => {
    props.messages = { language: { test: 'interpolate {{ first }} and {{ second }}' } };
    getNewInstanceContext();
    expect(translate('test', { first: 'this', second: 'that' })).toEqual(
      'interpolate this and that',
    );
  });

  it('interpolates the same variable multiple times', () => {
    props.messages = { language: { test: '{{ thing }} === {{ thing }}' } };
    getNewInstanceContext();
    expect(translate('test', { thing: 'hello' })).toEqual('hello === hello');
  });

  it('returns the key if no translation found', () => {
    expect(translate('non.existing.thing')).toEqual('non.existing.thing');
  });

  it('has a display name', () => {
    expect(Provider.displayName).toEqual('TranslationProvider');
  });
});
