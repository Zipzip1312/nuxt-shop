<template>
    <div>
        <h2>Categories</h2>
        <div :class="$style.wrapper">
            <div v-for="category in categories" :key="category.slug" :class="$style.block">
                <nuxt-link :to="`/category/${category.slug}`">
                    <p>{{ category.name }}</p>
                    <img v-lazy="category.image" :class="$style.image" />
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
.image {
    width: 100%;
    min-height: 300px;
    max-width: 400px;
    max-height: 400px;
}
</style>
