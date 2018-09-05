import React from 'react';
import { render as mount } from 'enzyme';

import { Provider as ContextProvider } from '../common/context';
import Message from './Message';

describe('Message', () => {
  function render(message, context) {
    // need the spans otherwise the document has 0 html elements in it.
    return mount(
      <span>
        <ContextProvider value={context}>{message}</ContextProvider>
      </span>,
    );
  }

  it('translates the given message', () => {
    const translateAsParts = jest.fn(() => [
      { dangerous: false, value: 'translated ' },
      { dangerous: true, value: 'value' },
    ]);
    const context = { translateAsParts };
    const component = render(<Message>message.id</Message>, context);
    expect(translateAsParts).toHaveBeenCalledTimes(1);
    expect(translateAsParts).toHaveBeenCalledWith('message.id', {});
    expect(component.text()).toEqual('translated value');
  });

  it('translates with parameters', () => {
    const translateAsParts = jest.fn((key, params) => [
      { dangerous: false, value: 'translated value ' },
      { dangerous: true, value: params.test },
    ]);
    const context = { translateAsParts };
    const component = render(<Message params={{ test: 'hello' }}>message.id</Message>, context);
    expect(translateAsParts).toHaveBeenCalledTimes(1);
    expect(translateAsParts).toHaveBeenCalledWith('message.id', { test: 'hello' });
    expect(component.text()).toEqual('translated value hello');
  });

  it('translates with sanitized html', () => {
    const html = '<h1>this is a heading<b>with bold</b></h1>';
    const translateAsParts = jest.fn(() => [{ dangerous: false, value: html }]);
    const context = { translateAsParts };
    const component = render(<Message>message.id</Message>, context);
    expect(component.html()).toBe(
      '&lt;h1&gt;this is a heading&lt;b&gt;with bold&lt;/b&gt;&lt;/h1&gt;',
    );
  });

  it('allows to translate things as html', () => {
    const translateAsParts = jest.fn(() => [
      { dangerous: false, value: '<h1>some safe html</h1>' },
      { dangerous: true, value: '<span>some sketchy user input</span>' },
    ]);
    const context = { translateAsParts };
    const component = render(<Message dangerouslyTranslateInnerHTML="message.id" />, context);
    expect(component.html()).toBe(
      '<span><h1>some safe html</h1></span>&lt;span&gt;some sketchy user input&lt;/span&gt;',
    );
  });

  it('allows to translate into a string', () => {
    const translateAsParts = jest.fn(() => [
      { dangerous: false, value: 'just some ' },
      { dangerous: true, value: 'text' },
    ]);
    const context = { translateAsParts };
    const component = render(<Message asString>message.id</Message>, context);
    expect(component.html()).toBe('just some text');
  });
});
