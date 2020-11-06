<template>
    <v-card outlined>
        <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item
                v-for="(slide,i) in slides"
                :key="i"
                :lazy-src="require('~/assets/svg/download.svg')"
                :src="slide.image"
                reverse-transition="fade-transition"
                transition="fade-transition"
                :to="slide.link"
                nuxt
            ></v-carousel-item>
        </v-carousel>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            slides: [
                {
                    image: "https://source.unsplash.com/1200x400/?cat,cats",
                    link: "/category/cats"
                },
                {
                    image: "https://source.unsplash.com/1200x400/?dog,dogs",
                    link: "/category/dogs"
                },
                {
                    image: "https://source.unsplash.com/1200x400/?wolf,wolfs",
                    link: "/category/wolfs"
                },
                {
                    image: "https://source.unsplash.com/1200x400/?bull,bulls",
                    link: "/category/bulls"
                }
            ]
        };
    }
};
</script>
