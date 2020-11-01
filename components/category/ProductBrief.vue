<template>
    <div :class="$style.wrapper">
        <nuxt-link :to="`/product/${product.slug}`">
            <p>{{ product.name }}</p>
            <img :src="product.image" />
        </nuxt-link>
        <p>Price {{ product.price }}</p>
    </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            default: () => {}
        }
    }
};
</script>

<style lang="scss" module>
.wrapper {
    display: flex;
    flex-direction: column;
}
</style>
