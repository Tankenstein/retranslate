import React from 'react';

import { Consumer as ContextConsumer } from '../common/context';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withTranslations(WrappedComponent) {
  const WithTranslations = props => (
    <ContextConsumer>
      {({ translations }) => {
        const wrappedProps = {
          // translations are passed first, so user can override.
          translations,
          ...props,
        };
        return <WrappedComponent {...wrappedProps} />;
      }}
    </ContextConsumer>
  );

  WithTranslations.displayName = `withTranslations(${getDisplayName(WrappedComponent)})`;

  return WithTranslations;
}
