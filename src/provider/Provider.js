import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Provider as ContextProvider } from '../common/context';
import { renderTemplateParts } from '../core/renderTemplateParts';

class Provider extends Component {
  getContext() {
    const { language } = this.props;
    return {
      language,
      translateAsParts: this.translateAsParts.bind(this),
      translate: this.translate.bind(this),
    };
  }

  translateAsParts(key, parameters = {}) {
    const { language, messages, fallbackLanguage } = this.props;
    if (messages[language] && messages[language][key]) {
      return renderTemplateParts(messages[language][key], parameters);
    }
    if (messages[fallbackLanguage] && messages[fallbackLanguage][key]) {
      return renderTemplateParts(messages[fallbackLanguage][key], parameters);
    }
    return [{ dangerous: false, value: key }];
  }

  translate(key, parameters) {
    return this.translateAsParts(key, parameters)
      .map(({ value }) => value)
      .join('');
  }

  render() {
    const { children } = this.props;
    return <ContextProvider value={this.getContext()}>{children}</ContextProvider>;
  }
}

Provider.displayName = 'TranslationProvider';

Provider.propTypes = {
  language: PropTypes.string,
  fallbackLanguage: PropTypes.string.isRequired,
  messages: PropTypes.objectOf(PropTypes.objectOf(PropTypes.node)).isRequired,
  children: PropTypes.node,
};

Provider.defaultProps = {
  language: '',
  children: '',
};

export default Provider;
