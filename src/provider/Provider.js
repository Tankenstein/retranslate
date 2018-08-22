import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Provider as ContextProvider } from '../common/context';

function interpolateTemplate(template, params) {
  const additionalParameterPattern = /\{\{.*\}\}/g;
  const createVariableReplacePattern = variable => new RegExp(`{{\\s*${variable}\\s*}}`, 'g');
  return Object.keys(params)
    .reduce(
      (replacedString, key) =>
        replacedString.replace(createVariableReplacePattern(key), params[key]),
      template,
    )
    .replace(additionalParameterPattern, '');
}

class Provider extends Component {
  getContext() {
    const { language } = this.props;
    return { translations: { language, translate: this.translate.bind(this) } };
  }

  translate(key, parameters = {}) {
    const { language, messages, fallbackLanguage } = this.props;
    if (messages[language] && messages[language][key]) {
      return interpolateTemplate(messages[language][key], parameters);
    } else if (messages[fallbackLanguage] && messages[fallbackLanguage][key]) {
      return interpolateTemplate(messages[fallbackLanguage][key], parameters);
    }
    return key;
  }

  render() {
    return <ContextProvider value={this.getContext()}>{this.props.children}</ContextProvider>;
  }
}

Provider.displayName = 'TranslationProvider';

Provider.propTypes = {
  language: PropTypes.string,
  fallbackLanguage: PropTypes.string.isRequired,
  messages: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  children: PropTypes.node,
};

export default Provider;
