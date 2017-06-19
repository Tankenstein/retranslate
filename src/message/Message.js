import React, { PropTypes } from 'react';

const Message = ({ children, params, className }, { translations: { translate } }) =>
  <span className={className}>{translate(children, params)}</span>;

Message.displayName = 'Message';
Message.propTypes = {
  children: PropTypes.string.isRequired,
  params: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  className: PropTypes.string,
};
Message.contextTypes = {
  translations: PropTypes.shape({
    translate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Message;
