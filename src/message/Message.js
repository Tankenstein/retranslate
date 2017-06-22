import React, { PropTypes } from 'react';

const Message = (
  { children, params, className, dangerouslyTranslateInnerHTML },
  { translations: { translate } },
) => {
  if (dangerouslyTranslateInnerHTML) {
    /* eslint-disable react/no-danger */
    return (
      <span
        className={className}
        dangerouslySetInnerHTML={{ __html: translate(dangerouslyTranslateInnerHTML, params) }}
      />
    );
    /* eslint-enable react/no-danger */
  }
  return <span className={className}>{translate(children, params)}</span>;
};

Message.displayName = 'Message';
Message.propTypes = {
  children: PropTypes.string,
  params: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  dangerouslyTranslateInnerHTML: PropTypes.string,
  className: PropTypes.string,
};
Message.contextTypes = {
  translations: PropTypes.shape({
    translate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Message;
