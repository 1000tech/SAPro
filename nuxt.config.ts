import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    modules: [
        '@nuxt/content',
        '@nuxt/eslint',
        '@nuxtjs/i18n',
        '@nuxtjs/seo',
        '@nuxtjs/tailwindcss',
        '@nuxt/icon',
        '@nuxtjs/color-mode',
    ],
    compatibilityDate: '2025-08-22',
    nitro: {
        // Ensure node-fetch polyfills etc are fine on Vercel
        preset: 'vercel',
    },
    runtimeConfig: {
        githubClientId: process.env.GITHUB_CLIENT_ID,
        githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
        oauthRedirectUrl: process.env.OAUTH_REDIRECT_URL ?? '',
        public: {
            locales: ['de', 'en', 'ru'],
        },
    },
    i18n: {
        locales: [
            { code: 'de', iso: 'de-DE' },
            { code: 'en', iso: 'en-US' },
            { code: 'ru', iso: 'ru-RU' },
        ],
        defaultLocale: 'de',
        strategy: 'prefix_except_default',
        detectBrowserLanguage: false,
        compilation: {
            strictMessage: false,
        },
    },
    app: {
        head: {
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            ],
        },
    },
    colorMode: {
        preference: 'system', // default theme
        fallback: 'light',
        classSuffix: '', // use .dark and .light classes without suffix
        storageKey: 'nuxt-color-mode',
    },
    site: {
        url: 'https://sapro-hm.com',
        name: 'SAPro-HM',
    },
    schemaOrg: {
        identity: 'Organization',
    },
    seo: {
        meta: {
            themeColor: [
                { content: '#2c7bc4', media: '' },
            ],
        },
    },
    css: ['../assets/styles/layout.styl'],
    vite: {
        css: {
            preprocessorOptions: {
                stylus: {
                    imports: ['../assets/styles/_vars.styl'],
                },
            },
        },
    },
})
