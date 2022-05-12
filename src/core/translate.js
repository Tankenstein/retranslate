import { renderTemplateParts } from './renderTemplateParts';

export const translateAsParts = config => (key, parameters = {}) => {
  const { language, messages, fallbackLanguage } = config;
  const languageTemplate = messages[language] && messages[language][key];
  const fallbackLanguageTemplate = messages[fallbackLanguage] && messages[fallbackLanguage][key];
  const template = languageTemplate || fallbackLanguageTemplate;

  if (template) return renderTemplateParts(template, parameters);

  return [{ dangerous: false, value: key }];
};

export const translate = config => (key, parameters) =>
  translateAsParts(config)(key, parameters)
    .map(({ value }) => value)
    .join('');
