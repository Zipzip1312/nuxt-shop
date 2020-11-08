<template>
    <v-app>
        <Menu />
        <v-main class="grey lighten-2 pb-10">
            <Breadcrumbs />
            <v-container>
                <transition name="fade" mode="out-in">
                    <nuxt />
                </transition>
            </v-container>
            <CartModal />
        </v-main>
        <Footer />
    </v-app>
</template>

<script>
import Menu from "~/components/layout/Menu";
import Breadcrumbs from "~/components/layout/Breadcrumbs";
import CartModal from "~~/components/modals/CartModal";
import Footer from "~/components/layout/Footer";
export default {
    components: {
        Menu,
        Breadcrumbs,
        CartModal,
        Footer
    },
    computed: {
        meta() {
            return [
                { charset: "utf-8" },
                {
                    name: "viewport",
                    content:
                        "width=device-width, initial-scale=1, shrink-to-fit=no"
                },
                { hid: "description", name: "description", content: "Главная" }
            ];
        }
    },

    head() {
        const domain = "https://nuxt-shop.com";
        const canonical = `${domain}${this.$route.path
            .toLowerCase()
            .replace(/\/$/, "")}`;
        return {
            meta: [...this.meta],
            script: [
                // { src: 'https://markknol.github.io/console-log-viewer/console-log-viewer.js' }
            ],
            link: [{ rel: "canonical", href: canonical }]
        };
    }
};
</script>
