<template>
    <div>
        <client-only>
            <modal
                name="customer-cart"
                transition="pop-out"
                width="95%"
                height="auto"
                :max-width="800"
                :pivot-y="0.5"
                :reset="true"
                :scrollable="true"
                :adaptive="true"
                classes="v--modal-cart"
                @before-open="beforeOpen"
            >
                <v-card class="customer-cart">
                    <v-btn
                        class="customer-cart-close"
                        color="blue-grey lighten-5"
                        @click="$modal.hide('customer-cart')"
                        fab
                        small
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>

                    <v-card-text>
                        <div v-if="getProductsInCart.length === 0">
                            <v-subheader>There are no products yet, but this can be easily fixed :)</v-subheader>
                        </div>

                        <template v-else>
                            <Cart :addedProduct="addedProduct" />

                            <div
                                class="d-flex flex-column-reverse flex-sm-row justify-space-between"
                            >
                                <v-btn
                                    outlined
                                    color="primary"
                                    @click.prevent="$modal.hide('customer-cart')"
                                    class="mt-3"
                                >Continue shopping</v-btn>

                                <v-btn
                                    depressed
                                    color="success"
                                    nuxt
                                    to="/checkout"
                                    class="mt-3 px-6"
                                    @click="$modal.hide('customer-cart')"
                                >To checkout</v-btn>
                            </div>
                        </template>
                    </v-card-text>
                </v-card>
            </modal>
        </client-only>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Cart from "~~/components/cart/Cart";
export default {
    components: {
        Cart
    },
    data() {
        return {
            addedProduct: null,
            defaults: {
                addedProduct: null
            }
        };
    },

    computed: {
        ...mapGetters({
            getProductsInCart: "cart/getProductsInCart"
        })
    },

    watch: {
        $route: function() {
            this.$modal.hide("customer-cart");
        },
        getProductsInCart: function(newVal, oldVal) {
            if (oldVal.length > 0) {
                if (this.getProductsInCart.length === 0) {
                    this.$modal.hide("customer-cart");
                }
            }
        }
    },
    methods: {
        async beforeOpen(event) {
            if (!event.params) {
                event.params = {};
            }
            if (event.params.addedProduct) {
                this.addedProduct = event.params.addedProduct;
            } else {
                this.addedProduct = this.defaults.addedProduct;
            }
        }
    }
};
</script>

<style lang="scss">
.customer-cart {
    position: relative;
    &-close {
        position: absolute;
        top: 0.9em;
        right: 0.9em;
        z-index: 1;
    }
}
.v--modal-cart {
    overflow: auto;
    margin-top: 1rem;
    height: auto !important;
}
</style>
