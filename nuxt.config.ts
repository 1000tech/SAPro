import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'
import { readdirSync } from 'fs'

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
        // Route rules help reduce perceived latency by caching SSR responses at the edge
        // - do not cache API routes
        // - enable stale-while-revalidate for frontend pages (adjust seconds as needed)
        routeRules: {
            '/api/**': { cache: false },
            '/admin/**': { cache: false },
            '/**': { swr: 60 },
        },
        // Basic prerender settings: prerender selected pages at build time so their
        // HTML is generated and served immediately from edge while Nitro still hosts /api
        // Generate routes from content folders: content/{de,en,ru} (skip files prefixed with _)
        prerender: {
            crawlLinks: false,
            routes: (() => {
                const contentDir = resolve(__dirname, 'content')
                const locales = ['de', 'en', 'ru']
                const routes: string[] = []
                for (const locale of locales) {
                    const dir = resolve(contentDir, locale)
                    try {
                        const files = readdirSync(dir)
                        for (const f of files) {
                            if (!f.endsWith('.md')) continue
                            if (f.startsWith('_')) continue
                            const name = f.replace(/\.md$/, '')
                            if (name === 'home') {
                                routes.push(locale === 'de' ? '/' : `/${locale}`)
                            } else {
                                routes.push(locale === 'de' ? `/${name}` : `/${locale}/${name}`)
                            }
                        }
                    } catch (e) {
                        // ignore missing folders
                    }
                }
                // Ensure uniqueness
                return Array.from(new Set(routes))
            })(),
        },
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
    content: {
        // Configure @nuxt/content
        sources: {
            content: {
                driver: 'fs',
                base: resolve(__dirname, 'content'),
                prefix: '',
            },
        },
        // Enable markdown parsing
        markdown: {
            toc: {
                depth: 3,
                searchDepth: 3,
            },
        },
        // Enable syntax highlighting
        highlight: {
            theme: 'github-dark',
            preload: ['javascript', 'typescript', 'vue', 'css', 'json', 'bash'],
        },
    },
})
