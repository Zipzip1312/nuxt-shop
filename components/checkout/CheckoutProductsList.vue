<template>
    <v-card :class="$style.list">
        <v-container>
            <div v-for="(product, index) in products" :key="index">
                <v-card class="d-flex flex-row">
                    <div :class="$style.image" class="d-flex">
                        <img
                            class="product-image"
                            :src="product.meta.images.imgL"
                            :data-category="product.meta.category.name"
                            onerror="this.src = `/images/notfound/${this.dataset.category}.jpg`"
                        />
                    </div>

                    <div class="d-flex flex-grow-1 justify-space-between">
                        <div
                            class="product-meta d-flex flex-column justify-space-between align-start pa-2 flex-grow-1"
                        >
                            <div class="mb-5 pl-1 pl-sm-5">
                                <nuxt-link
                                    :to="`/product/${product.meta.slug}`"
                                    >{{
                                        product.meta.name | truncate("6")
                                    }}</nuxt-link
                                >
                            </div>
                            <div
                                class="product-meta-price d-flex justify-space-between pl-1 pl-sm-5 pr-2 w-100"
                            >
                                <div :class="$style.price">
                                    ${{ product.meta.price }}
                                </div>
                                <div>
                                    <b>Qty: {{ product.qty }}</b>
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
                </v-card>

                <v-divider
                    v-if="index < products.length - 1"
                    class="my-2"
                ></v-divider>
            </div>
        </v-container>
    </v-card>
</template>

<script>
export default {
    props: {
        products: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style lang="scss" module>
.list {
    max-height: 450px;
    overflow: auto;
}
.image {
    max-width: 30%;
}
.price {
    min-width: 100px;
}
</style>
