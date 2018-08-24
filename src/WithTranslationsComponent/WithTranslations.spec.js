import React from 'react';
import { render } from 'enzyme';
import WithTranslations from './WithTranslations';
import Provider from '../provider';

const messages = {
  en: {},
};

describe('WithTranslations', () => {
  it('should call the render function with a translations object', () => {
    const childFunc = jest.fn();
    childFunc.mockReturnValue(<h1>foo</h1>);
    render(
      <Provider messages={messages} language="en" fallbackLanguage="en">
        <WithTranslations>{childFunc}</WithTranslations>
      </Provider>,
    );
    expect(childFunc).toBeCalled();
    const argument = childFunc.mock.calls[0][0];
    expect(argument.language).toBe('en');
    expect(argument.translate).toBeDefined();
  });

  it('should render the return value of the render function', () => {
    const rendered = render(
      <div>
        <Provider messages={messages} language="en" fallbackLanguage="en">
          <WithTranslations>{() => <h1>Test</h1>}</WithTranslations>
        </Provider>
      </div>,
    );
    expect(rendered.html()).toEqual('<h1>Test</h1>');
  });
});
