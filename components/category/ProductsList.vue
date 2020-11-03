<template>
    <v-row>
        <v-col v-for="(product, index) in products" :key="index" cols="6" sm="4" md="3">
            <v-hover>
                <ProductBrief
                    :product="product"
                    slot-scope="{ hover }"
                    :class="`elevation-${hover ? 6 : 2}`"
                />
            </v-hover>
        </v-col>
    </v-row>
</template>

<script>
import ProductBrief from "~~/components/category/ProductBrief";
export default {
    components: { ProductBrief },
    props: {
        products: {
            type: Array,
            required: true
        }
    }
};
</script>
