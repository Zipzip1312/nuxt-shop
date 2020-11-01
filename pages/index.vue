<template>
    <div>
        <h1 class="title">Nuxt Shop</h1>
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

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>
