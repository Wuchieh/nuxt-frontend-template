export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'tw',
  strategy: 'prefix_except_default',
  defaultLocale: 'tw',
  messages: {
    en: {
      welcome: 'Welcome',
      test: 'Test',
    },
    tw: {
      welcome: '歡迎',
      test: '測試',
    },
  },
}))
