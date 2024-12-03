import { i18nBuilder } from 'keycloakify/login'
import type { ThemeName } from '../kc.gen'

const { useI18n, ofTypeI18n } = i18nBuilder
  .withThemeName<ThemeName>()
  .withCustomTranslations({
    en: {
      loginTitleHtml: 'Welcome to {0}',
      loginSubtitleHtml: 'Please enter your credentials to login or create an account',
      doLogIn: 'Continue with Email',
      'identity-provider-login-label': 'or'
    },
    ru: {
      loginTitleHtml: 'Добро пожаловать в {0}',
      loginSubtitleHtml: 'Пожалуйста введите свои учётные данные или создайте аккаунт',
      doLogIn: 'Продолжить с почтой',
      'identity-provider-login-label': 'или'
    }
  })
  .build()

export type I18n = typeof ofTypeI18n
export { useI18n }
