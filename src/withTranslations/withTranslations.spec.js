import React from 'react';
import { mount } from 'enzyme';

import { Provider as ContextProvider } from '../common/context';
import withTranslations from './withTranslations';

describe('withTranslations higher order component', () => {
  let testContext;
  let TestComponent;
  let WrappedTestComponent;
  let mountedTree;

  function mountWithContext(component) {
    return mount(<ContextProvider value={testContext}>{component}</ContextProvider>);
  }

  function mountTree(propsPassedToWrappedComponent = {}) {
    WrappedTestComponent = withTranslations(TestComponent);
    mountedTree = mountWithContext(<WrappedTestComponent {...propsPassedToWrappedComponent} />);
  }

  beforeEach(() => {
    testContext = {
      translations: {
        language: 'language',
        translate: jest.fn(),
      },
    };
    TestComponent = () => <span>Test</span>;
    mountTree();
  });

  it('renders the wrapped component', () => {
    expect(mountedTree.find(TestComponent).length).toBe(1);
    expect(mountedTree.text()).toEqual('Test');
  });

  it('passes translations from context to props', () => {
    const { language, translate } = testContext.translations;
    const getTranslationsProp = () => mountedTree.find(TestComponent).prop('translations');

    expect(getTranslationsProp().language).toEqual(language);
    expect(translate).not.toHaveBeenCalled();
    getTranslationsProp().translate('key', { theseAreParams: true });
    expect(translate).toHaveBeenCalledTimes(1);
    expect(translate).toHaveBeenLastCalledWith('key', { theseAreParams: true });
  });

  it('passes through all of the props given to the wrapped component', () => {
    const propsPassedToWrappedComponent = {
      iAmABoolean: true,
      className: 'dat-boy',
      testPerson: {
        name: 'John Doe',
        age: 10,
      },
      function: jest.fn(),
    };

    mountTree(propsPassedToWrappedComponent);
    const testComponentProp = propName => mountedTree.find(TestComponent).prop(propName);

    expect(testComponentProp('iAmABoolean')).toBe(true);
    expect(testComponentProp('testPerson')).toBe(propsPassedToWrappedComponent.testPerson);
    expect(testComponentProp('testPerson')).toEqual(propsPassedToWrappedComponent.testPerson);
    expect(testComponentProp('function')).toBe(propsPassedToWrappedComponent.function);
    expect(testComponentProp('className')).toBe(propsPassedToWrappedComponent.className);
  });

  it("has a spiffy displayName that wraps the given component's name", () => {
    const wrappedComponentName = () => mountedTree.find(WrappedTestComponent).name();
    expect(
      [
        'withTranslations(Component)', // in newer versions of node, it's called TestComponent
        'withTranslations(TestComponent)',
      ].indexOf(wrappedComponentName()) !== -1,
    ).toBe(true);

    function NamedTestComponent() {
      return <span>Test</span>;
    }
    TestComponent = NamedTestComponent;
    mountTree();
    expect(wrappedComponentName()).toEqual('withTranslations(NamedTestComponent)');

    TestComponent.displayName = 'DisplayNamedComponent';
    mountTree();
    expect(wrappedComponentName()).toEqual('withTranslations(DisplayNamedComponent)');
  });
});
