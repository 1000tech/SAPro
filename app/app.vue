<script setup lang="ts">
import { useColorMode } from '#imports'
const { data: texts } = useSiteTexts()
const { data: menu } = useMenu()
const localePath = useLocalePath()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
function toggleColorMode(): void {
    colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
    <div class="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
        <header class="p-3 border-b border-gray-300 dark:border-gray-700 flex gap-4 items-center">
            <NuxtLink to="/">{{ texts?.header || 'Home' }}</NuxtLink>
            <nav class="flex gap-3 ml-4">
                <NuxtLink
                    v-for="(item, i) in menu?.items || []"
                    :key="i"
                    :to="localePath(item.path)"
                >{{ item.label }}</NuxtLink>
            </nav>
            <NuxtLink to="/" class="ml-auto">DE</NuxtLink>
            <NuxtLink to="/en">EN</NuxtLink>
            <NuxtLink to="/ru">RU</NuxtLink>
            <ClientOnly>
                <button
                    class="flex items-center gap-2 rounded-md px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                    type="button"
                    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                    @click="toggleColorMode"
                >
                    <Icon v-if="isDark" name="lucide:moon" />
                    <Icon v-else name="lucide:sun" />
                    <span class="hidden sm:inline">{{ isDark ? 'Dark' : 'Light' }}</span>
                </button>
                <template #fallback>
                    <span class="flex items-center gap-2 rounded-md px-3 py-1 opacity-60 select-none">
                        <Icon name="lucide:sun" />
                        <span class="hidden sm:inline">Theme</span>
                    </span>
                </template>
            </ClientOnly>
            <span>
                <a href="/admin/" target="_blank" rel="noopener">Admin</a>
            </span>
        </header>
        <main class="p-4">
            <NuxtPage />
        </main>
        <footer class="p-3 border-t border-gray-300 dark:border-gray-700 mt-6 text-gray-600 dark:text-gray-400">{{ texts?.footer }}</footer>
    </div>
</template>
