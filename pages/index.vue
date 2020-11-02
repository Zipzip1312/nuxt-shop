<template>
    <div>
        <h1>Nuxt Shop</h1>
        <CategoriesList :categories="categories" />
    </div>
</template>

<script>
import CategoriesList from "~~/components/common/CategoriesList";
import { mapState } from "vuex";
export default {
    components: {
        CategoriesList
    },
    async asyncData({ app, route, params, error, store }) {
        try {
            await store.dispatch("getCategoriesList");
        } catch (err) {
            console.log(err);
            return error({
                statusCode: 404,
                message: "Categories not found or server not available"
            });
        }
    },
    computed: {
        ...mapState({
            categories: "categoriesList"
        })
    }
};
</script>
