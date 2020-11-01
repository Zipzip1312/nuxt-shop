<template>
    <div>
        <h2>Categories</h2>
        <div :class="$style.wrapper">
            <div v-for="category in categories" :key="category.slug" :class="$style.block">
                <nuxt-link :to="`/category/${category.slug}`">
                    <p>{{ category.name }}</p>
                    <img :src="category.image" />
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        categories: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style lang="scss" module>
.wrapper {
    display: flex;
}
.block {
    display: flex;
    flex-direction: column;
}
</style>
