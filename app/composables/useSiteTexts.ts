import { useI18n } from 'vue-i18n'
import type { AsyncData, NuxtError } from '#app'

export type SiteTexts = {
    header: string
    footer: string
}

export const useSiteTexts = (): AsyncData<SiteTexts | undefined, NuxtError<unknown> | undefined> => {
    const { locale } = useI18n()
    return useAsyncData<SiteTexts>(
        () => `texts-${locale.value}`,
        async () => {
            const doc = await queryContent<SiteTexts>(`/${locale.value}/_texts`).findOne()
            const { header = '', footer = '' } = (doc ?? {}) as Partial<SiteTexts>
            return { header, footer }
        },
        { watch: [locale] },
    )
}
