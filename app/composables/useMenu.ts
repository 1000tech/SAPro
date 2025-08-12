import { useI18n } from 'vue-i18n'
import type { AsyncData, NuxtError } from '#app'

export type MenuItem = {
    label: string
    path: string
}

export type MenuData = {
    items: MenuItem[]
}

export const useMenu = (): AsyncData<MenuData | undefined, NuxtError<unknown> | undefined> => {
    const { locale } = useI18n()
    const normalizePath = (p?: string): string => {
        // Explicitly handle undefined, null, and empty string to satisfy strict boolean expressions
        if (p === undefined || p === null || p === '') return '/'
        // keep external or anchor links as is
        if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('#')) return p
        return p.startsWith('/') ? p : `/${p}`
    }
    return useAsyncData<MenuData>(
        () => `menu-${locale.value}`,
        async () => {
            const data = await queryContent<MenuData>(`/${locale.value}/_menu`).findOne()
            const menu = (data as unknown as MenuData) ?? { items: [] }
            const normalized: MenuData = {
                items: (menu.items ?? []).map((it) => ({ ...it, path: normalizePath(it.path) })),
            }
            return normalized
        },
        { watch: [locale] },
    )
}
