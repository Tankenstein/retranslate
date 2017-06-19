import React, { Component, PropTypes } from 'react';

import { TranslationContext } from '../common/PropTypes';

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
  getChildContext() {
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
    return <div>{this.props.children}</div>;
  }
}

Provider.displayName = 'TranslationProvider';

Provider.propTypes = {
  language: PropTypes.string,
  fallbackLanguage: PropTypes.string.isRequired,
  messages: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.string,
  ]),
};

Provider.childContextTypes = TranslationContext;

export default Provider;
