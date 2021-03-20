const imageminMozjpeg = require('imagemin-mozjpeg')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: 'universal',
    ...(!isDev && {
        modern: 'client'
    }),

    head: {
        htmlAttrs: {
            lang: 'en'
        },
        title: 'Nuxt Shop',
        meta: [
            { hid: 'description', name: 'description', content: 'Online shop' }
        ],
        link: [
            { rel: 'shortcut icon', href: 'favicon.ico' }
        ]
    },
    rootDir: __dirname,
    // serverMiddleware: ['~/serverMiddleware/setHeaders'],
    router: {
        middleware: ['resetBreadcrumbs'],
        prefetchLinks: false,
        scrollBehavior(to, from, savedPosition) {
            return { x: 0, y: 0 }
        }

    },
    loading: { color: '#1867c0', height: '4px' },
    css: [
        'normalize.css',
        './assets/scss/global-styles.scss'
    ],
    plugins: [
        { src: '~~/plugins/vue-modal.js', mode: 'client' },
        { src: '~~/plugins/filters.js' },
        { src: '~~/plugins/vuelidate.js' },
    ],
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        'nuxt-trailingslash-module',
        'nuxt-webfontloader',
        'cookie-universal-nuxt',
        '@nuxtjs/style-resources',
        '@nuxtjs/vuetify',
        '@nuxtjs/pwa',
        ['nuxt-vuex-localstorage', {
            ...(isDev && {
                mode: 'debug'
            }),
            localStorage: ['cart'] //  If not entered, "localStorage" is the default value
        }]
    ],

    webfontloader: {
        events: false,
        google: {
            families: ['Montserrat:400,500,600:cyrillic&display=swap']
        },
        timeout: 5000
    },
    styleResources: {
        // your settings here
        // scss: ['./assets/scss/global-variables.scss'], // alternative: scss
        less: [],
        stylus: []
    },
    /*
    ** Axios module configuration
    */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        browserBaseURL: (isDev) ? process.env.BASE_URL : 'https://nuxt-pwa-shop.herokuapp.com'
    },
    render: {
        // http2: {
        //     push: true,
        //     pushAssets: (req, res, publicPath, preloadFiles) => preloadFiles
        //     .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
        //   },
        compressor: true,
        resourceHints: false,
        etag: false,
        static: {
            etag: false
        }
    },
    pwa: {
        icon: {
            iconSrc: './static/logo512.png'
        },
        manifest: {
            lang: 'en',
            short_name: 'NuxtSHOP',
            name: 'NuxtSHOP',
            start_url: '/',
            display: 'standalone',
            theme_color: '#ffffff'
        },
        workbox: {
            /* workbox options */
            dev: false,
            offlineStrategy: 'StaleWhileRevalidate',
            runtimeCaching: [
                {
                    urlPattern: 'https://nuxt-pwa-shop.herokuapp.com/images/.*',
                    handler: 'cacheFirst',
                    method: 'GET',
                    strategyOptions: {
                        cacheName: 'giphy',
                        cacheExpiration: {
                            maxEntries: 100,
                            maxAgeSeconds: 60 * 60 * 24 * 10
                        }
                    }
                }
            ]
        }
    },
    /*
    ** Build configuration
    */
    build: {
        optimizeCss: false,
        filenames: {
            app: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
            chunk: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
            css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash].css',
            img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
            font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
            video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
        },
        ...(!isDev && {
            html: {
                minify: {
                    collapseBooleanAttributes: true,
                    decodeEntities: true,
                    minifyCSS: true,
                    minifyJS: true,
                    processConditionalComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    trimCustomFragments: true,
                    useShortDoctype: true
                }
            }
        }),
        splitChunks: {
            layouts: true,
            pages: true,
            commons: true
        },
        optimization: {
            minimize: !isDev
        },
        ...(!isDev && {
            extractCSS: {
                ignoreOrder: true
            }
        }),
        transpile: ['vue-lazy-hydration', 'intersection-observer'],
        postcss: {
            plugins: {
                ...(!isDev && {
                    cssnano: {
                        preset: ['advanced', {
                            autoprefixer: false,
                            cssDeclarationSorter: false,
                            zindex: false,
                            discardComments: {
                                removeAll: true
                            }
                        }]
                    }
                })
            },
            ...(!isDev && {
                preset: {
                    browsers: 'cover 99.5%',
                    autoprefixer: true
                }
            }),

            order: 'cssnanoLast'
        },
        extend(config, ctx) {
            const ORIGINAL_TEST = '/\\.(png|jpe?g|gif|svg|webp)$/i'
            const vueSvgLoader = [
                {
                    loader: 'vue-svg-loader',
                    options: {
                        svgo: false
                    }
                }
            ]
            const imageMinPlugin = new ImageminPlugin({
                pngquant: {
                    quality: '5-30',
                    speed: 7,
                    strip: true
                },
                jpegtran: {
                    progressive: true

                },
                gifsicle: {
                    interlaced: true
                },
                plugins: [
                    imageminMozjpeg({
                        quality: 70,
                        progressive: true
                    })

                ]
            })
            if (!ctx.isDev) config.plugins.push(imageMinPlugin)

            config.module.rules.forEach(rule => {
                if (rule.test.toString() === ORIGINAL_TEST) {
                    rule.test = /\.(png|jpe?g|gif|webp)$/i
                    rule.use = [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 1000,
                                name: ctx.isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]'
                            }
                        }
                    ]
                }
            })
            //  Create the custom SVG rule
            const svgRule = {
                test: /\.svg$/,
                oneOf: [
                    {
                        resourceQuery: /inline/,
                        use: vueSvgLoader
                    },
                    {
                        resourceQuery: /data/,
                        loader: 'url-loader'
                    },
                    {
                        resourceQuery: /raw/,
                        loader: 'raw-loader'
                    },
                    {
                        loader: 'file-loader' // By default, always use file-loader
                    }
                ]
            }

            config.module.rules.push(svgRule) // Actually add the rule
        }
    }
}
