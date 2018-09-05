import React from 'react';
import { mount } from 'enzyme';
import { WithTranslations, Provider } from '.';

const messages = {
  en: {},
};

describe('WithTranslations', () => {
  it('should call the render function with a translations object', () => {
    const childFunc = jest.fn();
    childFunc.mockReturnValue(<h1>foo</h1>);
    mount(
      <Provider messages={messages} language="en">
        <WithTranslations>{childFunc}</WithTranslations>
      </Provider>,
    );
    expect(childFunc).toBeCalled();
    const argument = childFunc.mock.calls[0][0];
    expect(argument.language).toBe('en');
    expect(argument.translate).toBeDefined();
  });

  it('should render the return value of the render function', () => {
    const rendered = mount(
      <Provider messages={messages} language="en">
        <WithTranslations>{() => <h1>Test</h1>}</WithTranslations>
      </Provider>,
    );
    expect(rendered.html()).toEqual('<h1>Test</h1>');
  });
});
