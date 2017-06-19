import React, { PropTypes } from 'react';

const Message = (
  { children, params, className, dangerouslyTranslateInnerHtml },
  { translations: { translate } },
) => {
  if (dangerouslyTranslateInnerHtml) {
    /* eslint-disable react/no-danger */
    return (
      <span
        className={className}
        dangerouslySetInnerHTML={{ __html: translate(dangerouslyTranslateInnerHtml, params) }}
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
  dangerouslyTranslateInnerHtml: PropTypes.string,
  className: PropTypes.string,
};
Message.contextTypes = {
  translations: PropTypes.shape({
    translate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Message;
