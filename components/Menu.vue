<script setup lang="ts">
import logo from '~/assets/images/logo.svg?url'
import { useColorMode } from '#imports'

const { data: menu } = useMenu()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const { locale } = useI18n()
const locales = ['de', 'en', 'ru'] as const
const route = useRoute()
function toggleColorMode(): void {
    colorMode.preference = isDark.value ? 'light' : 'dark'
}

// mobile menu state
const isOpen = ref(false)
function toggleMenu(): void {
    isOpen.value = !isOpen.value
}
function closeMenu(): void {
    isOpen.value = false
}
</script>

<template>
    <div class="menu-wrapper">
        <!-- burger button (mobile only) -->
        <button
            type="button"
            class="burger-btn md:hidden fixed top-3 right-3 z-[900] bg-gray-800 text-gray-100 p-2 rounded-md shadow transition-colors"
            :aria-label="isOpen ? 'Close menu' : 'Open menu'"
            @click="toggleMenu"
        >
            <Icon :name="isOpen ? 'lucide:x' : 'lucide:menu'" class="block w-5 h-5" />
        </button>

        <aside class="sidebar" :class="{ open: isOpen }" @click="isOpen && closeMenu()">
            <header class="logo">
                <!-- internal close button so user can close when sidebar is above the external burger -->
                <button
                    v-if="isOpen"
                    type="button"
                    class="md:hidden absolute top-4 right-4 bg-transparent text-white p-2 rounded-md"
                    aria-label="Close menu"
                    @click="toggleMenu"
                >
                    <Icon name="lucide:x" class="w-5 h-5" />
                </button>
                <NuxtLink
                    :to="localePath('/')"
                    class="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    prefetch
                    prefetch-on="interaction"
                    @click="closeMenu"
                >
                    <img
                        :src="logo"
                        alt="SAPro Logo"
                        class="w-8 h-8"
                    >
                    <h2>
                        {{ 'SAPro-HM' }}
                    </h2>
                </NuxtLink>
            </header>

            <nav class="nav-menu">
                <h3>
                    <Icon :name="menu?.services_icon ?? 'lucide:layers'" class="inline-block w-5 h-5 mr-1" />
                    {{ menu?.services_title }}
                </h3>
                <div class="flex flex-col gap-2">
                    <NuxtLink
                        v-for="(item, i) in menu?.items || []"
                        :key="i"
                        :to="localePath(item.path)"
                        class="menu-link"
                        :class="route.path === localePath(item.path) ? 'bg-blue-500/30 pointer-events-none' : ''"
                        prefetch
                        prefetch-on="interaction"
                        @click="closeMenu"
                    >
                        <Icon
                            :name="item.icon ?? 'lucide:chevron-right'"
                            class="inline-block w-4 h-4 mr-3 shrink-0"
                        />
                        {{ item.label }}
                    </NuxtLink>
                </div>
            </nav>

            <footer class="contact-info">
                <h3>
                    <Icon :name="menu?.contact_icon ?? 'lucide:phone'" class="inline-block w-5 h-5 mr-1" />
                    {{ menu?.contact_title }}
                </h3>
                <p>
                    <span class="tech-indicator" />
                    <a
                        :href="`tel:${menu?.phone || ''}`"
                        class="contact-link"
                        :aria-label="menu?.phone ? `Call ${menu.phone}` : 'Call'"
                    >
                        {{ menu?.phone }}
                    </a>
                </p>
                <p>
                    <span class="tech-indicator" />
                    <a
                        :href="`mailto:${menu?.email || ''}`"
                        class="contact-link"
                        :aria-label="menu?.email ? `Email ${menu.email}` : 'Email'"
                    >
                        {{ menu?.email }}
                    </a>
                </p>
            </footer>

            <div class="footer-controls flex items-center gap-1">
                <NuxtLink
                    v-for="(loc, index) in locales"
                    :key="loc"
                    :to="switchLocalePath(loc)"
                    :class="['rounded-md p-2 hover:bg-gray-700', {
                        'bg-gray-700': locale === loc,
                        'ml-auto': index === 0
                    }]"
                    prefetch
                    prefetch-on="interaction"
                    @click="closeMenu"
                >
                    {{ loc.toUpperCase() }}
                </NuxtLink>
                <ClientOnly>
                    <button
                        class="flex items-center rounded-md p-3 hover:bg-gray-700"
                        type="button"
                        @click="closeMenu; toggleColorMode()"
                    >
                        <Icon v-if="isDark" name="lucide:moon" />
                        <Icon v-else name="lucide:sun" />
                    </button>
                    <template #fallback>
                        <span class="flex items-center gap-2 rounded-md p-2 opacity-60 select-none">
                            <Icon name="lucide:sun" />
                        </span>
                    </template>
                </ClientOnly>
            </div>
        </aside>
    </div>
</template>

<style lang="stylus">
.sidebar
    width 100%
    max-width 100%
    transform translateX(-100%)
    transition transform $time ease
    background linear-gradient(145deg, #000, #1a1a2e)
    color white
    padding 2rem 1.5rem
    border-right 2px solid #3790d8
    box-shadow 0 0 20px rgba(55, 144, 216, 0.3)
    position fixed
    height 100vh
    overflow-y auto
    z-index 1000
    display flex
    flex-direction column

    h3
        display flex
        align-items center
        color #feeacf
        font-weight 600
        margin 1rem 0 0.6rem 0
        letter-spacing 0.5px
        gap 0.5rem

    &.open
        transform translateX(0)

    &::-webkit-scrollbar
        width 6px

    &::-webkit-scrollbar-track
        background rgba(255,255,255,0.1)

    &::-webkit-scrollbar-thumb
        background rgba(255,255,255,0.3)
        border-radius 3px

        &:hover
            background rgba(255,255,255,0.5)

    @media (min-width $screen-md)
        width 300px
        max-width 300px
        transform none

.footer-controls
    margin-top auto
    border-top 2px solid rgba(255,255,255,0.12)
    padding-top 1rem

.logo
    display flex
    align-items center
    margin-bottom 1.1rem
    padding-bottom 1.5rem
    border-bottom 2px solid rgba(255,255,255,0.2)

    .iconify
        font-size 2rem
        margin-right 0.5rem
        color #feeacf

    h2
        font-size 1.5rem
        font-weight 600

.nav-menu
    ul
        list-style none
        margin-bottom 1rem

    li
        margin-bottom 0.25rem

    .iconify
        color $blue

    .menu-link
        display flex
        align-items center
        gap 0.6rem
        color white
        text-decoration none
        padding 0.7rem 0.75rem
        border-radius 8px
        transition all 0.18s ease
        font-size 0.95rem

        &:hover
            background-color rgba(255,255,255,0.06)
            transform translateX(4px)

        svg
            width 1.05rem
            height 1.05rem
            flex: 0 0 auto

        .iconify
            margin-right 0.1rem
            width 18px
            text-align center
            color $white

.contact-info
    margin 1.75rem 0
    padding 1rem 0 1.5rem
    border-top 2px solid rgba(255,255,255,0.12)

    p
        font-size 0.85rem
        margin-bottom 0.45rem
        padding 0 1rem
        display flex
        align-items center

    .iconify
        color $blue

.tech-indicator
    display inline-block
    width 8px
    height 8px
    background #4caf50
    border-radius 50%
    margin-right 8px
    animation pulse 2s infinite

.menu-wrapper
    /* ensure wrapper doesn't interfere on desktop */
    position relative

/* mobile: show sidebar off-canvas when closed, open when .open class applied */
.sidebar
    &.open
        transform translateX(0)

@media (min-width $screen-md)
    .menu-wrapper .burger-btn
        display none
</style>
