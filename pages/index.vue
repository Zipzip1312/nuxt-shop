<template>
    <div>
        <Slider class="mb-5" />
        <CategoriesList :categories="categories" />
    </div>
</template>

<script>
import Slider from "~~/components/common/Slider";
import CategoriesList from "~~/components/common/CategoriesList";
import { mapState } from "vuex";
export default {
    components: {
        Slider,
        CategoriesList,
    },
    async asyncData({ app, route, params, error, store }) {
        try {
            await store.dispatch("getCategoriesList");
            await store.dispatch("togglePending");
        } catch (err) {
            console.log(err);
            return error({
                statusCode: 404,
                message: "Categories not found or server not available",
            });
        }
    },
    computed: {
        ...mapState({
            categories: "categoriesList",
        }),
    },
};
</script>
