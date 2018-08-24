import PropTypes from 'prop-types';
import withTranslations from '../withTranslations';

const WithTranslations = withTranslations(({ children, translations }) => children(translations));
WithTranslations.displayName = 'WithTranslations';
WithTranslations.propTypes = {
  children: PropTypes.func.isRequired,
};

export default WithTranslations;
