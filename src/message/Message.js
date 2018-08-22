import React from 'react';
import PropTypes from 'prop-types';

import { Consumer as ContextConsumer } from '../common/context';

const Message = ({ children, params }) => (
  <ContextConsumer>
    {({ translations }) => translations.translate(children, params)}
  </ContextConsumer>
);

Message.displayName = 'Message';
Message.propTypes = {
  children: PropTypes.string,
  params: PropTypes.objectOf(PropTypes.node),
};

export default Message;
