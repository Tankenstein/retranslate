import PropTypes from 'prop-types';

export const TranslationContext = {
  translations: PropTypes.shape({
    translate: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
  }).isRequired,
};
