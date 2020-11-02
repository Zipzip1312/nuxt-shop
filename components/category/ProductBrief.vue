<template>
    <v-card height="100%" class="hide-overflow d-flex flex-column justify-space-between">
        <nuxt-link :to="`/product/${product.slug}`">
            <v-img
                :lazy-src="require('~/assets/svg/download.svg')"
                :src="product.image.imgL"
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

            <v-btn block large tile color="warning" class="white--text" @click="addToCart">
                Add to cart
                <v-icon class="ml-2">mdi-cart</v-icon>
            </v-btn>
        </div>
    </v-card>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        addToCart() {
            console.log("Adding to cart: ", this.product.name);
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
