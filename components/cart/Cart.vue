<template>
    <div>
        <client-only>
            <div class="wrapper">
                <template v-if="getAddedProduct">
                    <p class="subtitle-1 mt-4 mb-2">You've added</p>
                    <CartProductsList :products-from-cart="getAddedProduct" />
                    <div class="my-4" v-if="getProducts.length > 0">Previously added products</div>
                </template>
                <CartProductsList :products-from-cart="getProducts" />
            </div>

            <div class="text-right my-3 text-h6 black--text">
                Total:
                <b>${{ getAmount | round }}</b>
            </div>
        </client-only>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartProductsList from "~~/components/cart/CartProductsList.vue";
import round from "~~/mixins/round.js";
export default {
    props: {
        addedProduct: {
            type: Number,
            default: null
        }
    },
    components: {
        CartProductsList
    },
    mixins: [round],

    computed: {
        ...mapGetters({
            getProductsInCart: "cart/getProductsInCart"
        }),
        getAddedProduct() {
            const product = this.getProductsInCart.find(
                prod => prod.productId === this.addedProduct
            );

            if (product) {
                return [product];
            }

            return null;
        },
        getAmount() {
            let amount = 0;
            if (this.getProductsInCart && this.getProductsInCart.length > 0) {
                this.getProductsInCart.forEach(product => {
                    amount +=
                        parseFloat(product.meta.price) * parseInt(product.qty);
                });
                return amount;
            } else {
                return 0;
            }
        },
        getProducts() {
            if (this.addedProduct) {
                return this.getProductsInCart.filter(
                    prod => prod.productId !== this.addedProduct
                );
            } else {
                return this.getProductsInCart;
            }
        }
    }
};
</script>
