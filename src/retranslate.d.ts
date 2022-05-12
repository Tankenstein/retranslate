import { ReactNode, FC, ComponentType } from 'react';

export type Parameters = Record<string, ReactNode>;

export type Translate = (key: string, parameters?: Parameters) => string;

export type TranslateAsParts = (
  key: string,
  parameters?: Parameters,
) => [{ dangerous: boolean; value: string }];

export interface Translations {
  translate: Translate;
  translateAsParts: TranslateAsParts;
  language: string;
}

export type Messages = Record<string, Record<string, string>>
export type Config = {
  language?: string;
  fallbackLanguage: string;
  messages: Messages;
}

export type ProviderProps =  { children?: ReactNode; } & Config;
export const Provider: FC<ProviderProps>;
export const TranslationProvider: FC<ProviderProps>;

export interface MessageProps {
  children?: ReactNode;
  params?: Parameters;
  dangerouslyTranslateInnerHTML?: string;
}
export const Message: FC<MessageProps>;

declare function useTranslations(): Translations;

export interface WithTranslationProps {
  translations: Translations;
}
declare function withTranslations<P extends WithTranslationProps>(
  WrappedComponent: ComponentType<P>,
): ReactNode;

export const WithTranslations: FC<{ children: (translations: Translations) => ReactNode }>;

declare function translateWith(config: Config): Translate;
