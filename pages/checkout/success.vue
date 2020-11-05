<template>
    <div>
        <v-card class="mx-auto mt-10" max-width="350" v-if="orderDetails">
            <v-card-title class="justify-center">Thank you for purchasing</v-card-title>
            <v-card-text class="text-center">
                <p>
                    Our manager will contact you by phone
                    <b>+{{ orderDetails.phone }}</b> to clarify the shipping details
                </p>
                <p>
                    An order confirmation letter has been sent to your e-mail
                    <b>{{ orderDetails.email }}</b>
                </p>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn text block nuxt to="/" color="primary">Buy some more stuff!</v-btn>
            </v-card-actions>
        </v-card>

        <div v-else class="text-center mt-10">
            <h1>No order details</h1>
            <v-btn outlined nuxt to="/" color="primary">Let's buy some stuff!</v-btn>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    computed: {
        ...mapState({
            orderDetails: "orderDetails"
        })
    },
    mounted() {
        this.removeProductsFromCart();
    },
    methods: {
        ...mapActions({
            removeProductsFromCart: "cart/removeProducts",
            resetOrderDetails: "resetOrderDetails"
        })
    },
    beforeDestroy() {
        this.resetOrderDetails();
    }
};
</script>
