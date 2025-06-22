// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    build: { transpile: ['vuetify'] },

    compatibilityDate: '2024-04-03',

    css: [
        'vuetify/styles',
        '@mdi/font/css/materialdesignicons.css',
        '~/assets/css/style.scss',
    ],

    devtools: { enabled: true },

    // when enabling ssr option you need to disable inlineStyles and maybe devLogs
    features: {
        devLogs: true,
        inlineStyles: true,
    },

    future: { compatibilityVersion: 4 },

    googleFonts: {
        display: 'swap',
        download: false,
        families: { 'Noto Sans TC': true },
    },

    i18n: {
        bundle: { optimizeTranslationDirective: false },
        defaultLocale: 'zh-TW',
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
        vueI18n: './i18n.config.ts',
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

    modules: [
        '@nuxt/fonts',
        '@nuxtjs/i18n',
        '@pinia/nuxt',
        '@nuxt/image',
        '@unocss/nuxt',
        '@nuxtjs/google-fonts',
        '@nuxt/eslint',
    ],

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

    // when enabling/disabling ssr option, remember to update ssr option in plugins/0100.vuetify.ts
    ssr: true,

    unocss: { nuxtLayers: true },

    vite: {
        css: { preprocessorOptions: { scss: { api: 'modern' } } },
        ssr: { noExternal: ['vuetify'] },
    },

    vuetify: {
        autoImport: true,

        styles: { configFile: 'assets/settings.scss' },
    },
});
