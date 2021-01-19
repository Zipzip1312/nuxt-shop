<template>
    <div v-if="productsFromCart.length > 0">
        <client-only>
            <v-card class="products-list py-3" outlined>
                <div v-for="(product, index) in productsFromCart" :key="index">
                    <div class="d-flex flex-row">
                        <div class="d-flex align-center px-2">
                            <v-btn
                                color="error"
                                @click.native="onRemoveClickHandler(product)"
                                fab
                                x-small
                                class="remove-product"
                            >
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </div>

                        <div class="image-wrapper d-flex">
                            <img
                                class="product-image"
                                :src="product.meta.images.imgL"
                                onerror="this.src = 'https://via.placeholder.com/300x300'"
                            />
                        </div>

                        <div class="d-flex flex-grow-1 justify-space-between">
                            <div
                                class="product-meta d-flex flex-column justify-space-between align-start flex-sm-row align-sm-center pa-2"
                            >
                                <div class="mb-3 mb-sm-0 pl-1 pl-sm-5">
                                    <nuxt-link
                                        :to="`/product/${product.meta.slug}`"
                                        >{{
                                            product.meta.name | truncate("6")
                                        }}</nuxt-link
                                    >
                                </div>
                                <div
                                    class="product-meta-price d-flex justify-space-between pl-1 pl-sm-5 pr-2"
                                >
                                    <div>${{ product.meta.price }}</div>
                                    <div class="d-flex mx-3">
                                        <b>Qty:</b>
                                        <input
                                            :value="product.qty"
                                            type="number"
                                            :min="1"
                                            :max="1000"
                                            @input.prevent="
                                                onQuantityChangeHandler(
                                                    $event,
                                                    product
                                                )
                                            "
                                            class="text-center"
                                        />
                                    </div>
                                    <div>
                                        ${{
                                            (product.meta.price * product.qty)
                                                | round
                                        }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <v-divider
                        v-if="index < productsFromCart.length - 1"
                        class="my-2"
                    ></v-divider>
                </div>
            </v-card>
        </client-only>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import debounce from "lodash.debounce";
export default {
    props: {
        productsFromCart: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        ...mapActions({
            setProductQuantity: "cart/setProductQuantity",
            removeProduct: "cart/removeProduct",
        }),
        onRemoveClickHandler(product) {
            this.removeProduct(product.productId);
        },
        onQuantityChangeHandler: debounce(function onQuantityChangeHandler(
            e,
            product
        ) {
            const qty = e.target.value;
            this.setProductQuantity({ productId: product.productId, qty });
        },
        400),
    },
};
</script>

<style lang="scss" scope>
.products-list {
    font-size: 1rem;

    .product-meta {
        width: 100%;
    }
}
.image-wrapper {
    max-width: 20%;
}
.product-image {
    width: 100%;
    object-fit: contain;
}
@media (max-width: 599px) {
    .products-list {
        font-size: 0.85rem;

        .remove-product {
            height: 22px;
            width: 22px;
        }

        .product-meta-price {
            width: 100%;
        }
    }
}
@media (max-width: 400px) {
    .products-list {
        font-size: 0.7rem;
    }
}
@media (max-width: 330px) {
    .products-list {
        font-size: 0.65rem;

        .remove-product {
            height: 18px;
            width: 18px;
        }
    }
}
</style>
