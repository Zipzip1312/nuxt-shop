<template>
    <v-card height="100%" class="hide-overflow d-flex flex-column justify-space-between">
        <nuxt-link :to="`/product/${product.slug}`">
            <v-img
                :lazy-src="require('~/assets/svg/download.svg')"
                :src="product.images.imgL"
                :class="$style.image"
            ></v-img>
        </nuxt-link>

        <div>
            <v-card-title class="text-subtitle-1">
                <nuxt-link
                    :to="`/product/${product.slug}`"
                    class="black--text text-decoration-none"
                >{{ product.name }}</nuxt-link>
            </v-card-title>

            <v-card-text class="black--text text-right text-h6">${{ product.price }}</v-card-text>

            <BuyButton :product="product" block />
        </div>
    </v-card>
</template>

<script>
import BuyButton from "~~/components/common/BuyButton";
export default {
    components: {
        BuyButton
    },
    props: {
        product: {
            type: Object,
            default: () => {}
        }
    }
};
</script>

<style lang="scss" module>
.image {
    max-width: 100%;
    height: auto;
}
</style>
