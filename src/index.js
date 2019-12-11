import MessageModule from './message';
import ProviderModule from './provider';
import { Consumer as WithTranslationsComponentModule } from './common/context';
import useTranslationsModule from './useTranslations';
import withTranslationsModule from './withTranslations';

export const Message = MessageModule;
export const Provider = ProviderModule;
export const useTranslations = useTranslationsModule;
export const withTranslations = withTranslationsModule;
export const WithTranslations = WithTranslationsComponentModule;
