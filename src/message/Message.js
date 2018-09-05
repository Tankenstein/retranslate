import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Consumer as ContextConsumer } from '../common/context';

const Message = ({ children, params, dangerouslyTranslateInnerHTML }) => (
  <ContextConsumer>
    {translations => {
      if (!dangerouslyTranslateInnerHTML) {
        return translations
          .translateAsParts(children, params)
          .map((translation, index) => <Fragment key={index}>{translation.value}</Fragment>);
      }
      return translations.translateAsParts(dangerouslyTranslateInnerHTML, params).map(
        (translation, index) =>
          !translation.dangerous ? (
            // eslint-disable-next-line react/no-danger
            <span key={index} dangerouslySetInnerHTML={{ __html: translation.value }} />
          ) : (
            <Fragment key={index}>{translation.value}</Fragment>
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
};
Message.defaultProps = {
  children: '',
  params: {},
  dangerouslyTranslateInnerHTML: '',
};

export default Message;
