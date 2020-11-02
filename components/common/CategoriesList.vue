<template>
    <v-row>
        <v-col v-for="category in categories" :key="category.slug" cols="6" sm="4" md="3">
            <nuxt-link :to="`/category/${category.slug}`" class="text-decoration-none">
                <v-hover>
                    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 6 : 2}`">
                        <v-img
                            :lazy-src="require('~/assets/svg/download.svg')"
                            :src="category.image"
                            :class="$style.image"
                        ></v-img>
                        <v-card-title class="justify-center">{{ category.name }}</v-card-title>
                    </v-card>
                </v-hover>
            </nuxt-link>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: {
        categories: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style lang="scss" module>
.image {
    max-width: 100%;
    height: auto;
}
</style>
