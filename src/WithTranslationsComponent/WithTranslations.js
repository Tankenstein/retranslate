import React, { PropTypes } from 'react';
import withTranslations from '../withTranslations';
import { TranslationContext } from '../common/PropTypes';

/**
 * Component that wraps the `withTranslations` hoc in a render prop.
 * Using `withTranslations` through a render prop eliminates name collisions
 * on props, as well as makes it easier to use in typed languages such as flow
 * or typescript.
 *
 * render() {
 *   return (
 *     <TranslationProvider>
 *       <WithTranslations>{({ language, translate }) => (
 *        The current language is <em>{ language }</em>.
 *
 *        { translate('with-translations-example.hello-world') }
 *       )</WithTranslations>
 *     </TranslationProvider>
 *   )
 * }
 */
const WithTranslations = withTranslations(({ children, translations }) => (
	children(translations))
);
WithTranslations.displayName = 'WithTranslations';
WithTranslations.propTypes = {
  children: PropTypes.func.isRequired
};
WithTranslations.contextTypes = TranslationContext;

export default WithTranslations;
