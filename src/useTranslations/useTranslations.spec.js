import React from 'react';
import { mount } from 'enzyme';

import { Provider as ContextProvider } from '../common/context';
import useTranslations from './useTranslations';

describe('useTranslations context hook', () => {
  let testContext;
  let TestComponent;
  let mountedTree;

  function mountWithContext() {
    mountedTree = mount(
      <ContextProvider value={testContext}>
        <TestComponent />
      </ContextProvider>,
    );
  }

  beforeEach(() => {
    testContext = {
      language: 'es',
      translate: jest.fn().mockReturnValueOnce('hola'),
    };
  });

  it('provides the language', () => {
    TestComponent = () => {
      const { language } = useTranslations();
      return <div>{language}</div>;
    };
    mountWithContext();

    expect(mountedTree.find(TestComponent).length).toBe(1);
    expect(mountedTree.text()).toEqual('es');
  });

  it('allows translations', () => {
    TestComponent = () => {
      const { translate } = useTranslations();
      return <div>{translate('greeting')}</div>;
    };
    mountWithContext();

    expect(mountedTree.find(TestComponent).length).toBe(1);
    expect(mountedTree.text()).toEqual('hola');
  });
});
