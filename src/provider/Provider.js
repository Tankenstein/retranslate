import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Provider as ContextProvider } from '../common/context';

function gatherMatchesForKey(template, key) {
  const variablePositions = [];
  const variablePattern = new RegExp(`{{\\s*${key}\\s*}}`);
  const match = template.match(variablePattern);
  if (match) {
    variablePositions.push({
      key,
      position: match.index,
      length: match[0].length,
    });
    const offset = match.index + match.length;
    const remainingTemplate = template.slice(offset);
    const childMatches = gatherMatchesForKey(remainingTemplate, key);
    childMatches.forEach(childMatch => {
      variablePositions.push({
        key,
        position: childMatch.position + offset,
        length: childMatch.length,
      });
    });
  }
  return variablePositions;
}

function renderTemplateIntoTemplateParts(template, params) {
  const variablePositions = Object.keys(params)
    .map(key => gatherMatchesForKey(template, key))
    .reduce((result, keyMatches) => result.concat(keyMatches), [])
    .sort((p1, p2) => p1.position - p2.position);
  const result = [];
  let remainingOffset = 0;
  variablePositions.forEach(({ key, position, length }) => {
    result.push({ dangerous: false, value: template.slice(remainingOffset, position) });
    result.push({ dangerous: true, value: params[key] });
    remainingOffset = position + length;
  });
  const leftover = template.slice(remainingOffset);
  if (leftover.length) {
    result.push({ dangerous: false, value: leftover });
  }
  return result.filter(translation => translation.value);
}

class Provider extends Component {
  getContext() {
    const { language } = this.props;
    return {
      translations: {
        language,
        translateAsParts: this.translateAsParts.bind(this),
        translate: this.translate.bind(this),
      },
    };
  }

  translateAsParts(key, parameters = {}) {
    const { language, messages, fallbackLanguage } = this.props;
    if (messages[language] && messages[language][key]) {
      return renderTemplateIntoTemplateParts(messages[language][key], parameters);
    }
    if (messages[fallbackLanguage] && messages[fallbackLanguage][key]) {
      return renderTemplateIntoTemplateParts(messages[fallbackLanguage][key], parameters);
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
