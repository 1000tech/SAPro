<script setup lang="ts">
import svg from '~/assets/images/logo.svg?url'

useHead({
    link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: svg },
    ],
})
</script>

<template>
    <Menu />

    <main class="flex-1 min-h-screen p-0 bg-white/95 backdrop-blur-md text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors md:ml-72 lg:ml-[300px]">
        <NuxtPage />
    </main>
</template>
