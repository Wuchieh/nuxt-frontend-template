// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },

    modules: [
        '@nuxtjs/i18n',
        '@pinia/nuxt',
        '@nuxt/image',
        '@unocss/nuxt',
        '@nuxtjs/google-fonts',
        '@nuxt/eslint',
    ],

    googleFonts: {
        display: 'swap',
        download: false,
        families: { 'Noto Sans TC': true },
    },

    image: {
        presets: {
            default: {
                modifiers: {
                    format: 'webp',
                    quality: 75, // 設定品質
                },
            },
        },
        provider: 'ipx',
    },

    i18n: {
        defaultLocale: 'zh-TW',
        detectBrowserLanguage: {
            alwaysRedirect: true,
            cookieKey: 'i18n_redirected',
            fallbackLocale: 'zh-TW',
            redirectOn: 'root',
            useCookie: true,
        },
        langDir: 'language/',
        lazy: true,
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
        strategy: 'prefix_except_default',
    },

    unocss: { nuxtLayers: true },

    postcss: {
        plugins: {
            '@unocss/postcss': {},
            'autoprefixer': {
                overrideBrowserslist: [
                    'last 2 versions',
                    '> 1%',
                ],
            },
            'postcss-nested': {},
            'postcss-preset-env': {
                features: { 'nesting-rules': true },
                stage: 1,
            },
            'postcss-pxtorem': {
                exclude: /node_modules/i,
                propList: ['*'],
                // 更正插件名稱
                rootValue: 16,
            },
        },
    },

    vite: { css: { preprocessorOptions: { scss: { api: 'modern' } } } },

    css: ['~/assets/css/style.scss'],
});
