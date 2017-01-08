import React from 'react';

import { TranslationContext } from '../common/PropTypes';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withTranslations(WrappedComponent) {
  const WithTranslations = (props, context) => {
    const wrappedProps = {
      translations: context.translations, // translations are passed first, so user can override.
      ...props,
    };
    return <WrappedComponent {...wrappedProps} />;
  };

  WithTranslations.displayName = `withTranslations(${getDisplayName(WrappedComponent)})`;
  WithTranslations.contextTypes = TranslationContext;

  return WithTranslations;
}
