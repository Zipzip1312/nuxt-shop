<template>
    <div>
        <client-only>
            <div v-if="getProductsInCard.length === 0" class="text-center mt-15">
                <p class="text-h5">There are no products in your cart</p>
                <v-btn outlined large color="primary" to="/" nuxt class="mt-3">Start shopping</v-btn>
            </div>
            <div v-else>
                <h1>ORDERING</h1>
                <v-row>
                    <v-col cols="12" md="6">
                        <CheckoutForm />
                    </v-col>
                    <v-col cols="12" md="6">
                        <CheckoutProductsList />
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
            getProductsInCard: "cart/getProductsInCart"
        })
    }
};
</script>
