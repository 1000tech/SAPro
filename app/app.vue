<script setup lang="ts">
</script>

<template>
    <Menu />

    <main class="main-content bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
        <NuxtPage />
    </main>
</template>

<style lang="stylus">
.main-content
    flex 1
    min-height 100vh
    padding 0
    background rgba(255, 255, 255, 0.95)
    backdrop-filter blur(10px)
    margin-left 0

    @media (min-width: $screen-md)
        margin-left 280px

    @media (min-width: $screen-lg)
        margin-left 300px
</style>
