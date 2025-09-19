// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    css: ['~/assets/css/style.scss'],

    devtools: { enabled: true },

    future: { compatibilityVersion: 4 },

    googleFonts: {
        display: 'swap',
        download: false,
        families: { 'Noto Sans TC': true },
    },

    i18n: {
        defaultLocale: 'zh-TW',
        langDir: 'language/',
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
        vueI18n: './i18n.config.ts',
    },

    image: {
        presets: { default: { modifiers: { format: 'webp' } } },
        provider: 'ipx',
        quality: 75, // 設定品質
    },

    modules: [
        'nitro-cloudflare-dev',
        '@nuxtjs/i18n',
        '@pinia/nuxt',
        '@nuxt/image',
        '@unocss/nuxt',
        '@nuxtjs/google-fonts',
        '@nuxt/eslint',
    ],

    nitro: {
        cloudflare: {
            deployConfig: true,
            nodeCompat: true,
        },

        preset: 'cloudflare-pages',
    },

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
                minPixelValue: 1,
                propList: ['*'],
                // 更正插件名稱
                rootValue: 16,
            },
        },
    },

    unocss: { nuxtLayers: true },
});
