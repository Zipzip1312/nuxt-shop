<template>
    <div>
        <h1 class="mt-0">{{ category.name }}</h1>
        <p>{{ category.description }}</p>
        <ProductsList :products="category.products" />
    </div>
</template>

<script>
import ProductsList from "~~/components/category/ProductsList";
import { mapState } from "vuex";
export default {
    components: { ProductsList },
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
