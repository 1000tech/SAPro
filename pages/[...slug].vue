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
    // ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',
})
</script>

<template>
    <template v-if="page">
    <div class="flex flex-col gap-8">
            <header class="inner-hero bg-gradient-to-br from-[#3790d8]/10 to-[#feeacf]/50 border border-[#3790d8] rounded-b-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-4 md:gap-8 items-center">
                <div class="inner-hero__content">
                    <h1 class="text-2xl md:text-2.25xl font-extrabold text-[#2c7bc4] mb-1">{{ page.title || slug }}</h1>
                    <p v-if="page.hero_subtitle" class="inner-hero__subtitle text-[#345] text-base opacity-90 mt-1">{{ page.hero_subtitle }}</p>
                </div>
            </header>

            <!-- Rich text content from Markdown -->
            <section class="prose-content max-w-[900px] leading-8 text-[#333] dark:text-[#e5e7eb] px-8">
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
    border 1px solid #3790d8
    border-radius 0 0 12px 12px
    display grid
    grid-template-columns 1fr
    align-items center

    @media (min-width: $screen-md)
        grid-template-columns 1.2fr 0.8fr

.inner-hero__content
    h1
        font-size 1.875rem
        font-weight 800
        color #2c7bc4
        margin 0 0 .25rem
        text-shadow 0 0 8px rgba(55, 144, 216, 0.25)
        @media (min-width: $screen-md)
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
