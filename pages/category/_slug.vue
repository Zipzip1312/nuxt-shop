<template>
    <div>
        <h1>{{ category.name }}</h1>
        <p>{{ category.description }}</p>
        <v-row>
            <v-col v-for="product in category.products" :key="product.id" cols="6" sm="4" md="3">
                <v-hover>
                    <ProductBrief
                        :product="product"
                        slot-scope="{ hover }"
                        :class="`elevation-${hover ? 6 : 2}`"
                    />
                </v-hover>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import ProductBrief from "~~/components/category/ProductBrief";
import { mapState } from "vuex";
export default {
    components: { ProductBrief },
    async asyncData({ app, params, route, error }) {
        try {
            await app.store.dispatch("getCurrentCategory", { route });
        } catch (err) {
            console.log(err);
            return error({
                statusCode: 404,
                message: "Категория не найдена или сервер не доступен"
            });
        }
    },
    computed: {
        ...mapState({
            category: "currentCategory"
        })
    },
    head() {
        return {
            title: this.category.title,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.category.metaDescription
                }
            ]
        };
    }
};
</script>

<style lang="scss" module>
</style>
