<template>
    <v-card
        height="100%"
        class="hide-overflow d-flex flex-column justify-space-between"
    >
        <nuxt-link :to="`/product/${product.slug}`" aria-label="Product">
            <v-img
                :lazy-src="require('~/assets/svg/download.svg')"
                :src="productImage"
                :class="$style.image"
                @error="imageSrcError(product)"
            ></v-img>
        </nuxt-link>
        <div
            class="d-flex flex-column justify-space-between"
            style="height: 100%"
        >
            <v-card-title class="text-subtitle-1 mb-auto">
                <nuxt-link
                    :to="`/product/${product.slug}`"
                    class="black--text text-decoration-none"
                    :class="$style.link"
                    >{{ product.name }}</nuxt-link
                >
            </v-card-title>

            <v-card-text class="black--text text-right text-h6 align-self-end"
                >${{ product.price }}</v-card-text
            >

            <BuyButton :product="product" block />
        </div>
    </v-card>
</template>

<script>
import BuyButton from "~~/components/common/BuyButton";
import mock from "../../utils/mockServer";
export default {
    components: {
        BuyButton,
    },
    props: {
        product: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            productImage: this.product.images.imgL,
        };
    },
    methods: {
        imageSrcError(product) {
            const categorySlug = window.location.href.split("/").reverse()[0];
            const categories = mock.categories.map(({ slug }) => slug);
            let imageSrc = "https://via.placeholder.com/300x300";

            if (categories.includes(categorySlug)) {
                const category =
                    categorySlug[0].toUpperCase() + categorySlug.slice(1);
                imageSrc = `/images/notfound/${category}.jpg`;
            } else if (product.category.name) {
                imageSrc = `/images/notfound/${product.category.name}.jpg`;
            }

            this.productImage = imageSrc;
        },
    },
};
</script>

<style lang="scss" module>
.image {
    max-width: 100%;
    height: auto;
}
.link {
    word-break: normal;
}
</style>
