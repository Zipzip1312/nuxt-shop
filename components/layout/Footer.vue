<template>
    <v-footer class="font-weight-medium">
        <v-col class="text-center" cols="12">
            {{ new Date().getFullYear() }} —
            <strong>{{ app }}</strong>
        </v-col>
    </v-footer>
</template>

<script>
export default {
    data() {
        return {
            app: "Nuxt Shop"
        };
    }
};
</script>
