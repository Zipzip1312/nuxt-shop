<template>
    <div v-if="breadcrumbs && breadcrumbs.length > 0">
        <v-container>
            <v-breadcrumbs :items="breadcrumbs" class="px-0 py-3 mb-n5">
                <template v-slot:item="{ item }">
                    <v-breadcrumbs-item
                        nuxt
                        :to="item.url"
                        :disabled="item.disabled"
                    >{{ item.title.toUpperCase() }}</v-breadcrumbs-item>
                </template>
            </v-breadcrumbs>
        </v-container>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState({
            breadcrumbs: "breadcrumbs"
        })
    }
};
</script>
