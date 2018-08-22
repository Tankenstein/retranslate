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
    const translate = jest.fn(() => 'translated value');
    const context = { translations: { translate } };
    const component = render(<Message>message.id</Message>, context);
    expect(translate).toHaveBeenCalledTimes(1);
    expect(translate).toHaveBeenCalledWith('message.id', undefined);
    expect(component.text()).toEqual('translated value');
  });

  it('translates with parameters', () => {
    const translate = jest.fn((key, params) => `translated value ${params.test}`);
    const context = { translations: { translate } };
    const component = render(<Message params={{ test: 'hello' }}>message.id</Message>, context);
    expect(translate).toHaveBeenCalledTimes(1);
    expect(translate).toHaveBeenCalledWith('message.id', { test: 'hello' });
    expect(component.text()).toEqual('translated value hello');
  });

  it('translates with sanitized html', () => {
    const html = '<h1>this is a heading<b>with bold</b></h1>';
    const translate = jest.fn(() => html);
    const context = { translations: { translate } };
    const component = render(<Message>message.id</Message>, context);
    expect(component.html()).toBe(
      '&lt;h1&gt;this is a heading&lt;b&gt;with bold&lt;/b&gt;&lt;/h1&gt;',
    );
  });

  /*
  it('can translate dangerously into unsanitized html', () => {
    const html = '<h1>this is a heading<b>with bold</b></h1>';
    const translate = jest.fn(() => html);
    const context = { translations: { translate } };
    const component = render(<Message dangerouslyTranslateInnerHTML="message.id" />, { context });
    expect(component.html()).toBe(`<span>${html}</span>`);
  });
  */
});
