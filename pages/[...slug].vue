<script setup lang="ts">
const { page, slug } = await usePageContent()

// SEO Meta
const seoTitle = computed<string>(() => {
    const p = unref(page)
    return `${String(p?.title ?? slug)}`
})
const seoDescription = computed<string>(() => {
    const p = unref(page)
    // prefer explicit description, then hero_subtitle, else empty
    return String(p?.hero_subtitle ?? '')
})
useSeoMeta({
    title: seoTitle,
    ogTitle: seoTitle,
    description: seoDescription,
    ogDescription: seoDescription,
})
</script>

<template>
    <template v-if="page">
        <div class="flex flex-col gap-8">
            <header class="inner-hero border border-[#3790d8] rounded-b-xl py-10 px-4 md:p-10">
                <div class="inner-hero__content flex flex-col gap-4 max-w-[600px]">
                    <h1 class="text-2xl md:text-2.25xl font-extrabold text-[#2c7bc4]">
                        {{ page.title || slug }}
                    </h1>
                    <p v-if="page.hero_subtitle" class="inner-hero__subtitle text-[#555] dark:text-gray-300 text-base opacity-90">
                        {{ page.hero_subtitle }}
                    </p>
                </div>
            </header>

            <!-- Rich text content from Markdown -->
            <section class="prose-content max-w-[900px] leading-8 text-[#333] dark:text-[#e5e7eb] px-4 md:px-10">
                <ContentRenderer :value="page" />
            </section>
        </div>
    </template>
    <template v-else>
        <!-- Page not found, show error -->
        <Error404 />
    </template>
</template>

<style lang="stylus">
.inner-hero
    background linear-gradient(135deg, rgba(55, 144, 216, 0.08), rgba(254, 234, 207, 0.5))

.inner-hero__content
    h1
        font-size 1.875rem
        font-weight 800
        color #2c7bc4
        text-shadow 0 0 8px rgba(55, 144, 216, 0.25)
        @media (min-width $screen-md)
            font-size 2.25rem

.inner-hero__subtitle
    color #345
    font-size 1.05rem
    opacity .9

.prose-content
    line-height 1.8
    .dark &
        color #e5e7eb

    h2, h3
        color #2c7bc4
        margin-top 1.5rem
        margin-bottom .75rem
        font-weight 700
        font-size 1.4rem
    p
        margin 0 0 1rem
</style>
