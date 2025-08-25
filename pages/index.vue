<script setup lang="ts">
interface HeroButtons { primary_label?: string; secondary_label?: string }
interface Service { icon?: string; title?: string; description?: string }
interface Feature { icon?: string; title?: string; text?: string }
interface CtaButton { label: string; href?: string; variant?: 'primary' | 'outline' | string }
interface HomePage {
    type?: string
    title?: string
    hero_subtitle?: string
    hero_buttons?: HeroButtons
    services_title?: string
    services?: Service[]
    why_title?: string
    features?: Feature[]
    cta_title?: string
    cta_text?: string
    cta_buttons?: CtaButton[]
}

const { page: rawPage } = await usePageContent()
const page = computed<HomePage | undefined>(() => rawPage.value as unknown as HomePage | undefined)
const localePath = useLocalePath()

// SEO Meta
const seoTitle = computed(() => `${page.value?.title || 'Home'}`)
const seoDescription = computed(() => page.value?.hero_subtitle || 'Welcome to our homepage')
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
    <header class="hero-section p-8 px-6 md:p-12 lg:p-16 border-2 border-[#3790d8] rounded-b-[15px] flex flex-col text-center items-center gap-8 min-h-[60vh] relative overflow-hidden">
        <div class="hero-content relative flex-1 max-w-[600px]">
            <h1 class="text-2xl md:text-2.5xl lg:text-2.8xl font-bold text-[#3790d8] mb-4 leading-tight font-mono relative z-2">{{ page?.title || 'Home' }}</h1>
            <p v-if="page?.hero_subtitle" class="hero-subtitle text-lg text-[#2c7bc4] font-semibold mb-6">{{ page.hero_subtitle }}</p>
            <div class="hero-description text-base text-[#555] mb-8 leading-7">
                <ContentRenderer v-if="page" :value="page" />
            </div>
            <div class="hero-buttons flex gap-4 flex-wrap flex-col items-center md:flex-row md:items-start">
                <button v-if="page?.hero_buttons?.primary_label" class="btn-primary uppercase">{{ page.hero_buttons.primary_label }}</button>
                <button v-if="page?.hero_buttons?.secondary_label" class="btn-secondary uppercase">{{ page.hero_buttons.secondary_label }}</button>
            </div>
        </div>
    <div class="hero-image flex-1 flex justify-center items-center">
            <Icon name="fa-solid:home"/>
        </div>
    </header>

    <section class="services-overview py-8 px-6 md:py-16 md:px-12">
        <h2 class="text-center text-2xl lg:text-2.2xl text-[#3790d8] mb-12 font-bold">{{ page?.services_title }}</h2>
        <div class="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            <div v-for="(s, idx) in (page?.services || [])" :key="idx" class="service-card bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl text-center shadow-lg border border-[#3790d8] relative overflow-hidden hover:scale-105 hover:shadow-2xl hover:border-[#feeacf] transition-all">
                <Icon :name="s.icon ?? ''" />
                <h3 class="text-lg text-[#3790d8] mb-4 font-semibold">{{ s.title }}</h3>
                <p class="text-[#666] leading-6">{{ s.description }}</p>
            </div>
        </div>
    </section>

    <section class="why-choose-us py-8 px-6 md:py-16 md:px-12">
        <h2 class="text-center text-2xl lg:text-2.2xl text-[#3790d8] mb-12 font-bold">{{ page?.why_title }}</h2>
        <div class="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1000px] mx-auto">
            <div v-for="(f, idx) in (page?.features || [])" :key="idx" class="feature text-center p-8">
                <Icon :name="f.icon ?? ''" />
                <h4 class="text-base text-[#3790d8] mb-2 font-semibold">{{ f.title }}</h4>
                <p class="text-[#666]">{{ f.text }}</p>
            </div>
        </div>
    </section>

    <section class="cta-section py-8 px-6 md:py-16 md:px-12 bg-gradient-to-br from-[#3790d8] to-[#2c7bc4] text-center text-white">
        <div class="cta-content">
            <h2 class="text-2xl lg:text-2.2xl mb-4 font-bold">{{ page?.cta_title }}</h2>
            <p class="text-lg mb-8 opacity-90">{{ page?.cta_text }}</p>
            <div class="cta-buttons flex gap-4 justify-center flex-wrap flex-col items-center md:flex-row md:items-start">
                <template v-for="(b, idx) in (page?.cta_buttons || [])" :key="idx">
                    <NuxtLink
                        v-if="b?.href && b.href.startsWith('/')"
                        :to="localePath(b.href)"
                        :class="b.variant === 'outline' ? 'btn-outline' : 'btn-primary'"
                    >
                        {{ b.label }}
                    </NuxtLink>
                    <a
                        v-else
                        :href="b?.href"
                        target="_blank"
                        rel="noopener"
                        :class="b?.variant === 'outline' ? 'btn-outline' : 'btn-primary'"
                    >
                        {{ b.label }}
                    </a>
                </template>
            </div>
        </div>
    </section>
</template>

<style lang="stylus">
.hero-section
    background linear-gradient(135deg, rgba(55, 144, 216, 0.1), rgba(254, 234, 207, 0.8))
    display flex
    flex-direction column
    text-align center
    align-items center
    position relative
    overflow hidden

    &::before
        content ''
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        background linear-gradient(45deg, transparent, rgba(55, 144, 216, 0.1), transparent)
        animation scan 3s linear infinite

    @media (min-width: $screen-md)
        padding 2.8rem

    @media (min-width: $screen-lg)
        flex-direction row
        text-align left

.hero-content
    position relative
    flex 1
    max-width 600px

    h1
        font-size 2rem
        font-weight 700
        color #3790d8
        margin-bottom 1rem
        line-height 1.2
        font-family 'Courier New', monospace
        text-shadow 0 0 10px rgba(55, 144, 216, 0.5)
        position relative
        z-index 2

        @media (min-width: $screen-md)
            font-size 2.5rem

        @media (min-width: $screen-lg)
            font-size 2.8rem

.hero-subtitle
    font-size 1.2rem
    color #2c7bc4
    font-weight 600
    margin-bottom 1.5rem

.hero-description
    font-size 1rem
    color #555
    margin-bottom 2rem
    line-height 1.7

.hero-buttons
    display flex
    flex-wrap wrap
    flex-direction column
    align-items center

    button
        text-transform uppercase

    @media (min-width $screen-md)
        flex-direction row
        align-items initial

.hero-image
    flex 1
    display flex
    justify-content center
    align-items center

    .iconify
        font-size 8rem
        color #3790d8
        opacity 0.8

        @media (min-width $screen-lg)
            font-size 12rem

.btn-primary, .btn-secondary, .btn-outline
    padding 1rem 1.5rem
    border none
    border-radius 8px
    font-size 1rem
    font-weight 600
    cursor pointer
    transition all 0.3s ease
    text-decoration none
    display inline-block
    text-align center
    width 100%
    max-width 300px
    font-family 'Courier New', monospace

    @media (min-width $screen-md)
        width auto
        max-width none

.btn-primary
    background linear-gradient(45deg, #3790d8, #2c5aa0)
    color white
    position relative
    overflow hidden
    text-transform uppercase
    letter-spacing 1px

    &::before
        content ''
        position absolute
        top 0
        left -100%
        width 100%
        height 100%
        background linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)
        transition left 0.5s ease

    &:hover::before
        left 100%

    &:hover
        background linear-gradient(45deg, #2c7bc4, #2c5aa0)
        transform translateY(-2px)
        box-shadow 0 5px 15px rgba(55, 144, 216, 0.3)

.btn-secondary, .btn-outline
    background-color transparent
    color #3790d8
    border 2px solid #3790d8

    &:hover
        background-color #3790d8
        color white

.services-overview
    padding 2rem 1.5rem

    h2
        text-align center
        font-size 2rem
        color #3790d8
        margin-bottom 3rem
        font-weight 700

        @media (min-width $screen-lg)
            font-size 2.2rem

    // Tablet and up
    @media (min-width $screen-md)
        padding 4rem 3rem

.services-grid
    display grid
    grid-template-columns repeat(auto-fit, minmax(280px, 1fr))
    gap 2rem
    max-width 1200px
    margin 0 auto

.service-card
    background linear-gradient(145deg, #fff, #f8f9fa)
    padding 2rem
    border-radius 12px
    text-align center
    box-shadow 0 5px 20px rgba(0,0,0,0.1)
    transition all 0.3s ease
    border 1px solid #3790d8
    position relative
    overflow hidden

    &::before
        content ''
        position absolute
        top 0
        left -100%
        width 100%
        height 100%
        background linear-gradient(90deg, transparent, rgba(55, 144, 216, 0.1), transparent)
        transition left 0.5s ease

    &:hover::before
        left 100%

    &:hover
        transform translateY(-5px) scale(1.02)
        box-shadow 0 10px 25px rgba(55, 144, 216, 0.3)
        border-color #feeacf

    .iconify
        font-size 3rem
        color #3790d8
        margin-bottom 1.5rem

    h3
        font-size 1.4rem
        color #3790d8
        margin-bottom 1rem
        font-weight 600

    p
        color #666
        line-height 1.6

.why-choose-us
    .light &
        background linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)
    .dark &
        background linear-gradient(135deg, #071018 0%, #0b1218 100%)
        border 1px solid rgba(255,255,255,0.04)
        box-shadow 0 4px 20px rgba(2,6,12,0.6)
        color #e6eef8
    h2
        text-align center
        font-size 2rem
        color #3790d8
        font-weight 700
        @media (min-width $screen-lg)
            font-size 2.2rem

.features-grid
    display grid
    grid-template-columns repeat(auto-fit, minmax(250px, 1fr))

.feature
    text-align center

    .iconify
        font-size 2.5rem
        color #3790d8
        margin-bottom 1rem

    h4
        font-size 1.2rem
        color #3790d8
        margin-bottom 0.5rem
        font-weight 600

    p
        color #666

.cta-section
    padding 2rem 1.5rem
    background linear-gradient(135deg, #3790d8 0%, #2c7bc4 100%)
    text-align center
    color white

    @media (min-width $screen-md)
        padding 4rem 3rem

.cta-content
    h2
        font-size 2rem
        margin-bottom 1rem
        font-weight 700

        @media (min-width $screen-lg)
            font-size 2.2rem

    p
        font-size 1.2rem
        margin-bottom 2rem
        opacity 0.9

.cta-buttons
    display flex
    gap 1rem
    justify-content center
    flex-wrap wrap
    flex-direction column
    align-items center

    .btn-primary
        &:hover
            background-color #f5dbb8

    .btn-outline
        border-color white
        color white

        &:hover
            background-color white
            color #3790d8

    @media (min-width $screen-md)
        flex-direction row
        align-items initial
</style>
