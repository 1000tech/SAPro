import { useI18n } from 'vue-i18n'
import type { AsyncData, NuxtError } from '#app'

export type SiteTexts = {
    error_404_title: string
    error_404_description: string
    error_404_button: string
}

export const useSiteTexts = (): AsyncData<SiteTexts | undefined, NuxtError<unknown> | undefined> => {
    const { locale } = useI18n()
    return useAsyncData<SiteTexts>(
        () => `texts-${locale.value}`,
        async () => {
            const doc = await queryContent<SiteTexts>(`/${locale.value}/_texts`).findOne()
            const {
                error_404_title = '',
                error_404_description = '',
                error_404_button = '',
            } = (doc ?? {}) as Partial<SiteTexts>
            return {
                error_404_title,
                error_404_description,
                error_404_button,
            }
        },
        { watch: [locale] },
    )
}
