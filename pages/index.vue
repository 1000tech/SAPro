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
</script>

<template>
    <header class="hero-section">
        <div class="hero-content">
            <h1>{{ page?.title || 'Home' }}</h1>
            <p v-if="page?.hero_subtitle" class="hero-subtitle">{{ page.hero_subtitle }}</p>
            <div class="hero-description">
                <ContentRenderer v-if="page" :value="page" />
            </div>
            <div class="hero-buttons">
                <button v-if="page?.hero_buttons?.primary_label" class="btn-primary">{{ page.hero_buttons.primary_label }}</button>
                <button v-if="page?.hero_buttons?.secondary_label" class="btn-secondary">{{ page.hero_buttons.secondary_label }}</button>
            </div>
        </div>
        <div class="hero-image">
            <Icon name="fa-solid:home" style="color: #3790d8; animation: pulse 2s infinite;" />
        </div>
    </header>

    <section class="services-overview">
        <h2>{{ page?.services_title }}</h2>
        <div class="services-grid">
            <div v-for="(s, idx) in (page?.services || [])" :key="idx" class="service-card">
                <Icon :name="s.icon ?? ''" />
                <h3>{{ s.title }}</h3>
                <p>{{ s.description }}</p>
            </div>
        </div>
    </section>

    <section class="why-choose-us">
        <h2>{{ page?.why_title }}</h2>
        <div class="features-grid">
            <div v-for="(f, idx) in (page?.features || [])" :key="idx" class="feature">
                <Icon :name="f.icon ?? ''" />
                <h4>{{ f.title }}</h4>
                <p>{{ f.text }}</p>
            </div>
        </div>
    </section>

    <section class="cta-section">
        <div class="cta-content">
            <h2>{{ page?.cta_title }}</h2>
            <p>{{ page?.cta_text }}</p>
            <div class="cta-buttons">
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
    padding 2rem 1.5rem
    display flex
    flex-direction column
    text-align center
    align-items center
    min-height 60vh
    border 2px solid #3790d8
    border-radius 0 0 15px 15px
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
        padding 4rem 3rem

    @media (min-width: $screen-lg)
        flex-direction row
        text-align left

.hero-content
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
            font-size 3rem

.hero-subtitle
    font-size 1.2rem
    color #2c7bc4
    font-weight 600
    margin-bottom 1.5rem

.hero-description
    font-size 1.1rem
    color #555
    margin-bottom 2rem
    line-height 1.7

.hero-buttons
    display flex
    gap 1rem
    flex-wrap wrap
    flex-direction column
    align-items center

    button
        text-transform uppercase

    @media (min-width: $screen-md)
        flex-direction row
        align-items initial

.hero-image
    flex 1
    display flex
    justify-content center
    align-items center
    margin-left 0
    margin-top 2rem

    .iconify
        font-size 8rem
        color #3790d8
        opacity 0.3

        @media (min-width: $screen-lg)
            font-size 12rem

    @media (min-width: $screen-lg)
        margin-left 2rem
        margin-top 0

.btn-primary, .btn-secondary, .btn-outline
    padding 1rem 2rem
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

    @media (min-width: $screen-md)
        width auto
        max-width none

.btn-primary
    background linear-gradient(45deg, #3790d8, #2c5aa0)
    color white
    position relative
    overflow hidden
    text-transform uppercase
    letter-spacing 1px
    font-family 'Courier New', monospace

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
    font-family 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif

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

        @media (min-width: $screen-lg)
            font-size 2.5rem

    // Tablet and up
    @media (min-width: $screen-md)
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
    padding 2rem 1.5rem
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
        margin-bottom 3rem
        font-weight 700

        @media (min-width: $screen-lg)
            font-size 2.5rem

    @media (min-width: $screen-md)
        padding 4rem 3rem

.features-grid
    display grid
    grid-template-columns repeat(auto-fit, minmax(250px, 1fr))
    gap 2rem
    max-width 1000px
    margin 0 auto

.feature
    text-align center
    padding 2rem

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

    @media (min-width: $screen-md)
        padding 4rem 3rem

.cta-content
    h2
        font-size 2rem
        margin-bottom 1rem
        font-weight 700

        @media (min-width: $screen-lg)
            font-size 2.5rem

    p
        font-size 1.2rem
        margin-bottom 2rem
        opacity 0.9

.cta-buttons
    display flex
    gap 1rem
    justify-content center
    flex-wrap wrap

    .btn-primary
        background-color #feeacf
        color #3790d8

        &:hover
            background-color #f5dbb8

    .btn-outline
        border-color white
        color white

        &:hover
            background-color white
            color #3790d8

    flex-direction column
    align-items center

    @media (min-width: $screen-md)
        flex-direction row
        align-items initial
</style>
