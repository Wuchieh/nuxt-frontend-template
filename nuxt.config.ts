// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n', '@pinia/nuxt', '@nuxt/image', '@unocss/nuxt', '@nuxtjs/google-fonts'],

  googleFonts: {
    display: 'swap',
    download: false,
    families: {
      'Noto Sans TC': true,
    },
  },

  image: {
    provider: 'ipx',
    presets: {
      default: {
        modifiers: {
          format: 'webp',
          quality: 75, // 設定品質
        },
      },
    },
  },

  i18n: {
    locales: [
      {
        code: 'zh-TW',
        file: 'tw.ts',
        language: 'zh-TW',
        name: '繁體中文',
      },
      {
        code: 'en-US',
        file: 'en.ts',
        language: 'en-US',
        name: 'English',
      },
    ],
    lazy: true,
    langDir: 'language/',
    defaultLocale: 'zh-TW',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
      fallbackLocale: 'zh-TW',
    },
  },

  unocss: {
    nuxtLayers: true,
  },

  postcss: {
    plugins: {
      '@unocss/postcss': {},
      'postcss-preset-env': {
        stage: 1,
        features: {
          'nesting-rules': true,
        },
      },
      'postcss-nested': {},
      'postcss-pxtorem': {
        // 更正插件名稱
        rootValue: 16,
        propList: ['*'],
        exclude: /node_modules/i,
      },
      autoprefixer: {
        overrideBrowserslist: ['last 2 versions', '> 1%'],
      },
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },

  css: ['~/assets/css/style.scss'],
})
