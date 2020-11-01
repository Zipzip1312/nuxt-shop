<template>
    <div>
        <h1>{{ category.name }}</h1>
        <p>{{ category.description }}</p>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
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
