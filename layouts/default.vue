<template>
    <div>
        <div v-if="pending">
            <Pending />
        </div>

        <v-app v-else>
            <Menu />
            <v-main class="pb-10">
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
    </div>
</template>

<script>
import Menu from "~/components/layout/Menu";
import Breadcrumbs from "~/components/layout/Breadcrumbs";
import CartModal from "~~/components/modals/CartModal";
import Footer from "~/components/layout/Footer";
import Pending from "~~/components/common/Pending";
import { mapState } from "vuex";
export default {
    components: {
        Menu,
        Breadcrumbs,
        CartModal,
        Footer,
        Pending,
    },
    computed: {
        meta() {
            return [
                { charset: "utf-8" },
                {
                    name: "viewport",
                    content:
                        "width=device-width, initial-scale=1, shrink-to-fit=no",
                },
                { hid: "description", name: "description", content: "Главная" },
            ];
        },
        ...mapState({
            pending: "pending",
        }),
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
            link: [{ rel: "canonical", href: canonical }],
        };
    },

    mounted() {
        setTimeout(() => {
            this.$store.dispatch("togglePending");
        }, 1000);
    },
};
</script>
