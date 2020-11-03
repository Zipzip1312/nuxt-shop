<template>
    <v-row>
        <v-col cols="12" sm="6">
            <a :href="product.images.imgXL" target="_blank">
                <v-img
                    :lazy-src="require('~/assets/svg/download.svg')"
                    :src="product.images.imgL"
                    :class="$style.image"
                ></v-img>
            </a>
        </v-col>
        <v-col cols="12" sm="6" class="d-flex flex-column">
            <h1 class="mt-0 mt-xs-3">{{ product.name }}</h1>
            <div class="d-flex flex-column flex-sm-row align-start align-sm-center mb-4">
                <div class="mr-10 text-h6">${{ product.price }}</div>
                <BuyButton :product="product" class="mt-5 mt-sm-auto" />
            </div>
            <div class="mb-2">{{ product.description }}</div>
        </v-col>

        <v-col cols="12">
            <h2 class="mt-10">Customers also buy</h2>
            <ProductsList :products="product.alsoBuyProducts" />

            <h2 class="mt-10">Interesting goods</h2>
            <ProductsList :products="product.interestingProducts" />
        </v-col>
    </v-row>
</template>

<script>
import { mapState } from "vuex";
import ProductsList from "~~/components/category/ProductsList";
import BuyButton from "~~/components/common/BuyButton";
export default {
    components: {
        ProductsList,
        BuyButton
    },
    async asyncData({ app, params, route, error }) {
        try {
            await app.store.dispatch("getCurrentProduct", { route });
        } catch (err) {
            console.log(err);
            return error({
                statusCode: 404,
                message: "Product not found or server not available"
            });
        }
    },
    computed: {
        ...mapState({
            product: "currentProduct"
        })
    },
    head() {
        return {
            title: this.product.title,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.product.metaDescription
                }
            ]
        };
    }
};
</script>
<style lang="scss" module>
.image {
    max-width: 100%;
    height: auto;
    cursor: zoom-in;
}
</style>
