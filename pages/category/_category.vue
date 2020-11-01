<template>
    <div>
        <h1>{{ category.name }}</h1>
        <p>{{ category.description }}</p>
        <div :class="$style.productList">
            <div v-for="product in category.products" :key="product.id">
                <ProductBrief :product="product" />
            </div>
        </div>
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
.productList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>
