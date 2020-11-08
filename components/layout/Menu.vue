<template>
    <div class="menu">
        <v-app-bar app>
            <v-toolbar flat color="transparent" class="container py-0">
                <nuxt-link to="/" class="text-decoration-none">
                    <v-toolbar-title class="black--text">Nuxt Shop</v-toolbar-title>
                </nuxt-link>
                <v-spacer></v-spacer>
                <v-toolbar-items class="hidden-xs-only">
                    <v-btn
                        v-for="link in navLinks"
                        :key="link.title"
                        :to="link.route"
                        nuxt
                        depressed
                    >
                        <v-icon left dark>{{ link.icon }}</v-icon>
                        {{ link.title }}
                    </v-btn>
                </v-toolbar-items>

                <v-toolbar-items>
                    <CartButton />
                </v-toolbar-items>
            </v-toolbar>
            <v-app-bar-nav-icon @click="drawer = !drawer" class="d-sm-none mr-3"></v-app-bar-nav-icon>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" fixed temporary>
            <v-list dense nav>
                <v-list-item v-for="link in navLinks" :to="link.route" :key="link.title">
                    <v-list-item-icon v-if="link.icon">
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>{{ link.title }}</v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import CartButton from "~~/components/layout/CartButton";
export default {
    components: {
        CartButton
    },
    data() {
        return {
            drawer: null,
            navLinks: [
                {
                    title: "Cats",
                    route: "/category/cats",
                    icon: "mdi-cat"
                },
                {
                    title: "Dogs",
                    route: "/category/dogs",
                    icon: "mdi-dog"
                },
                {
                    title: "Wolfs",
                    route: "/category/wolfs",
                    icon: "mdi-paw"
                },
                {
                    title: "Bulls",
                    route: "/category/bulls",
                    icon: "mdi-cow"
                }
            ]
        };
    }
};
</script>

<style lang="scss">
.menu .v-toolbar__content {
    padding: 0;
}
</style>
