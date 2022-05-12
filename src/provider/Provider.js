import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Provider as ContextProvider } from '../common/context';
import { translate, translateAsParts } from '../core';

class Provider extends Component {
  getContext() {
    const { language, messages, fallbackLanguage } = this.props;
    const config = { language, messages, fallbackLanguage };

    return {
      language,
      translateAsParts: translateAsParts(config),
      translate: translate(config),
    };
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
