<script setup lang="ts">
const { page, slug, locale } = await usePageContent()
</script>

<template>
    <div>
        <h1>{{ page?.title || slug }}</h1>
        <ContentRenderer v-if="page" :value="page" />
        <div v-else>
            <p>Page not found in content for locale "{{ locale }}" and slug "{{ slug }}".</p>
        </div>
    </div>
</template>
