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
                    image: "/images/slide-cats.jpeg",
                    link: "/category/cats"
                },
                {
                    image: "/images/slide-dogs.jpeg",
                    link: "/category/dogs"
                },
                {
                    image: "/images/slide-wolfs.jpeg",
                    link: "/category/wolfs"
                },
                {
                    image: "/images/slide-bulls.jpeg",
                    link: "/category/bulls"
                }
            ]
        };
    }
};
</script>
