<template>
    <div class="text-center mt-10">
        <h1 v-if="error.statusCode === 404">Page not found</h1>
        <h1 v-else>An error occurred</h1>
        <nuxt-link to="/" class="text-h6">Back to the home page</nuxt-link>
    </div>
</template>

<script>
export default {
    layout: "default",
    props: ["error"]
};
</script>

<style>
</style>
