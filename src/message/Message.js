import React from 'react';
import PropTypes from 'prop-types';

import { Consumer as ContextConsumer } from '../common/context';

const Message = ({ children, params, dangerouslyTranslateInnerHTML, asString }) => (
  <ContextConsumer>
    {({ translations }) => {
      if (asString) {
        return translations
          .translate(children, params)
          .map(translation => translation.value)
          .join('');
      }
      if (!dangerouslyTranslateInnerHTML) {
        return translations.translate(children, params).map(translation => translation.value);
      }
      return translations.translate(dangerouslyTranslateInnerHTML, params).map(
        translation =>
          !translation.dangerous ? (
            // eslint-disable-next-line react/no-danger
            <span dangerouslySetInnerHTML={{ __html: translation.value }} />
          ) : (
            translation.value
          ),
      );
    }}
  </ContextConsumer>
);

Message.displayName = 'Message';
Message.propTypes = {
  children: PropTypes.string,
  params: PropTypes.objectOf(PropTypes.node),
  dangerouslyTranslateInnerHTML: PropTypes.string,
  asString: PropTypes.bool,
};
Message.defaultProps = {
  children: '',
  params: {},
  dangerouslyTranslateInnerHTML: '',
  asString: false,
};

export default Message;
