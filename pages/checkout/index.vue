<template>
    <div>
        <client-only>
            <div v-if="productsInCard.length === 0" class="text-center mt-15">
                <p class="text-h5">There are no products in your cart</p>
                <v-btn outlined large color="primary" to="/" nuxt class="mt-3">Start shopping</v-btn>
            </div>
            <div v-else>
                <v-row>
                    <v-col cols="12" md="6" class="d-flex flex-column">
                        <div class="text-h4 my-4">Order details</div>
                        <CheckoutForm :products="productsInCard" />
                    </v-col>
                    <v-col cols="12" md="6" class="d-flex flex-column">
                        <div class="d-flex justify-space-between align-center">
                            <div class="text-h4 my-4">Products</div>
                            <v-btn @click.prevent="$modal.show('customer-cart')">Manage products</v-btn>
                        </div>
                        <CheckoutProductsList :products="productsInCard" />
                    </v-col>
                </v-row>
            </div>
        </client-only>
    </div>
</template>

<script>
import CheckoutForm from "~~/components/checkout/CheckoutForm";
import CheckoutProductsList from "~~/components/checkout/CheckoutProductsList";
import { mapGetters } from "vuex";
export default {
    components: {
        CheckoutForm,
        CheckoutProductsList
    },
    mounted() {
        this.$store.commit("RESET_BREADCRUMBS");
    },
    computed: {
        ...mapGetters({
            productsInCard: "cart/getProductsInCart"
        })
    },
    head() {
        return {
            title: "Checkout",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Confirm your order"
                }
            ]
        };
    }
};
</script>
