<script setup lang="ts">
const { page, slug } = await usePageContent()
</script>

<template>
    <div>
        <div v-if="page">
            <h1>{{ page.title || slug }}</h1>
            <ContentRenderer :value="page" />
        </div>
        <div v-else>
            <!-- Page not found, show error -->
            <Error404 />
        </div>
    </div>
</template>
