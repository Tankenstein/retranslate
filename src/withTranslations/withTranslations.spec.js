import React, { Component } from 'react';
import { mount } from 'enzyme';
import withTranslations from './withTranslations';
import { TranslationContext } from '../common/PropTypes';

describe('withTranslations higher order component', () => {
  let testContext;
  let TestComponent;
  let WrappedTestComponent;
  let mountedTree;

  class TestParentContextProvider extends Component {
    getChildContext() {
      return testContext;
    }

    render() {
      return <div>{this.props.children}</div>;
    }
  }

  TestParentContextProvider.childContextTypes = TranslationContext;

  function mountWithContext(component) {
    return mount(
      <TestParentContextProvider>
        {component}
      </TestParentContextProvider>
    );
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

  it('has a spiffy displayName that wraps the given component\'s name', () => {
    const wrappedComponentName = () => mountedTree.find(WrappedTestComponent).name();
    expect(wrappedComponentName()).toEqual('withTranslations(Component)');

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
