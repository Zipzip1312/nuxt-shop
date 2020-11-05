<template>
    <v-card class="flex-grow-1">
        <v-form v-model="valid" @submit.prevent="onSubmit">
            <v-container>
                <v-row class="pa-5">
                    <v-col cols="12">
                        <v-text-field
                            v-model="form.name"
                            :rules="nameRules"
                            label="First name"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            v-model="form.phone"
                            :rules="phoneRules"
                            label="Phone"
                            required
                        ></v-text-field>
                        <span class="text--disabled" style="font-size: 12px;">Format: 380123456789</span>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            v-model="form.email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="mt-auto">
                        <div class="d-flex align-center justify-space-between">
                            <v-btn
                                class="px-10"
                                type="submit"
                                color="primary"
                                large
                                :disabled="!valid"
                            >Order</v-btn>

                            <div class="text-right text-h6 black--text">
                                Total:
                                <b>${{ getAmount | round }}</b>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props: {
        products: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            valid: false,
            form: {
                name: "",
                phone: "",
                email: ""
            },
            nameRules: [v => !!v || "Name is required"],
            phoneRules: [
                v => !!v || "Phone is required",
                v => /380+\d{9}$/.test(v) || "Phone must match the format"
            ],
            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+/.test(v) || "E-mail must be valid"
            ]
        };
    },
    computed: {
        getAmount() {
            let amount = 0;

            this.products.forEach(product => {
                amount +=
                    parseFloat(product.meta.price) * parseInt(product.qty);
            });

            return amount;
        }
    },
    methods: {
        ...mapActions(["setOrderDetails"]),
        onSubmit() {
            const orderDetails = {
                ...this.form,
                products: this.products
            };

            this.setOrderDetails(orderDetails);

            // send order details to the server

            this.$router.push({ name: "checkout-success" });
        }
    }
};
</script>
