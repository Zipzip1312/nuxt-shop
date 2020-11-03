<template>
    <div v-if="product">
        <client-only>
            <v-btn
                large
                tile
                :block="block"
                color="warning"
                v-if="!isProductAdded"
                @click.prevent="buyClickHandler"
                class="white--text"
            >
                Add to cart
                <v-icon class="ml-2">mdi-cart</v-icon>
            </v-btn>
            <v-btn
                v-else
                large
                tile
                :block="block"
                color="success"
                @click.prevent="addedClickHandler"
                class="white--text"
            >
                <v-icon class="mr-2">mdi-check</v-icon>added to cart
            </v-btn>
        </client-only>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    props: {
        product: {
            type: Object,
            required: true
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters({
            getProductsInCart: "cart/getProductsInCart"
        }),
        isProductAdded() {
            return this.getProductsInCart.find(
                p => p.productId === this.product.id
            );
        }
    },
    methods: {
        ...mapActions({
            addProduct: "cart/addProduct"
        }),
        buyClickHandler() {
            this.addProduct(this.product.id);
            this.$modal.show("customer-cart", {
                addedProduct: this.product.id
            });
        },
        addedClickHandler() {
            this.$modal.show("customer-cart", {
                addedProduct: this.product.id
            });
        }
    }
};
</script>

<style lang="scss">
@media (max-width: 660px) {
    .v-btn.v-btn--block {
        font-size: 0.7rem;
        padding: 0 5px !important;

        .v-icon.v-icon {
            font-size: 16px;
        }
    }
}
</style>
