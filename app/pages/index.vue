<script setup lang="ts">
const { page } = await usePageContent()
</script>

<template>
    <div>
        <h1>{{ page?.title || 'Home' }}</h1>
        <ContentRenderer v-if="page" :value="page" />
        <div v-else>
            <p>No content yet. Create it in Admin → Pages → new file with slug "home".</p>
        </div>
    </div>
</template>
