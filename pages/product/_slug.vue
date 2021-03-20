<template>
    <v-row>
        <v-col cols="12" sm="6">
            <v-img
                :lazy-src="require('~/assets/svg/download.svg')"
                :src="productImage"
                :class="$style.image"
                @error="imageSrcError()"
            ></v-img>
        </v-col>
        <v-col cols="12" sm="6" class="d-flex flex-column">
            <h1 class="mt-0 mt-xs-3 mb-0 mb-sm-4">{{ product.name }}</h1>
            <div
                class="d-flex flex-row-reverse flex-sm-row align-baseline align-sm-start mb-8 mb-sm-4"
            >
                <div class="mr-auto ml-auto mr-sm-10 ml-sm-0 text-h6">
                    ${{ product.price }}
                </div>
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
        BuyButton,
    },
    data() {
        return {
            productImage: "",
        };
    },
    async asyncData({ app, params, route, error }) {
        try {
            await app.store.dispatch("getCurrentProduct", { route });
        } catch (err) {
            console.log(err);
            return error({
                statusCode: 404,
                message: "Product not found or server not available",
            });
        }
    },
    computed: {
        ...mapState({
            product: "currentProduct",
        }),
    },
    mounted() {
        this.productImage = this.product.images.imgL;
    },
    methods: {
        imageSrcError() {
            this.productImage = `/images/notfound/${this.product.category.name}.jpg`;
        },
    },
    head() {
        return {
            title: this.product.title,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.product.metaDescription,
                },
            ],
        };
    },
};
</script>
<style lang="scss" module>
.image {
    max-width: 100%;
    height: auto;
}
</style>
