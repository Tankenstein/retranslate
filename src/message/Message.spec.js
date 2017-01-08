import React from 'react';
import { shallow } from 'enzyme';

import Message from './Message';

describe('Message', () => {
  it('translates the given message', () => {
    const translate = jest.fn(() => 'translated value');
    const context = { translations: { translate } }
    const component = shallow(<Message>message.id</Message>, { context });
    expect(translate).toHaveBeenCalledTimes(1);
    expect(translate).toHaveBeenCalledWith('message.id', undefined);
    expect(component.text()).toEqual('translated value');
  });

  it('translates with parameters', () => {
    const translate = jest.fn((key, params) => `translated value ${params.test}`);
    const context = { translations: { translate } };
    const component = shallow(
      <Message params={{ test: 'hello' }}>message.id</Message>, { context });
    expect(translate).toHaveBeenCalledTimes(1);
    expect(translate).toHaveBeenCalledWith('message.id', { test: 'hello' });
    expect(component.text()).toEqual('translated value hello');
  });

  it('adds given classes to its children', () => {
    const translate = jest.fn(() => 'message');
    const context = { translations: { translate } };
    const component = shallow(
      <Message className="test-class">message.id</Message>, { context });
    expect(component.hasClass('test-class')).toBe(true);
  });
});
