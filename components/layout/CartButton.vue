<template>
    <client-only>
        <v-btn
            depressed
            @click.prevent="onClickHandler"
            class="btn-cart mr-n2 mr-sm-n0"
            aria-label="Cart"
        >
            <v-icon>mdi-cart</v-icon>
            <v-badge v-if="productsQuantity > 0" :content="productsQuantity" color="error"></v-badge>
        </v-btn>
    </client-only>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState({
            products: state => state.cart.products
        }),
        productsQuantity() {
            if (this.products) {
                return this.products.length;
            } else return 0;
        }
    },
    methods: {
        onClickHandler() {
            this.$modal.show("customer-cart");
        }
    }
};
</script>

