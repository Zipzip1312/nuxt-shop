// function for Mock API
const sleep = m => new Promise(r => setTimeout(r, m))
const categories = [
    {
        id: 1,
        title: 'Cats',
        name: 'Cats',
        slug: 'cats',
        metaDescription: 'Meta description',
        description: 'Description',
        image: 'https://source.unsplash.com/300x300/?cat,cats',
        products: []
    },
    {
        id: 2,
        title: 'Dogs',
        name: 'Dogs',
        slug: 'dogs',
        metaDescription: 'Meta description',
        description: 'Description',
        image: 'https://source.unsplash.com/300x300/?dog,dogs',
        products: []
    },
    {
        id: 3,
        title: 'Wolfs',
        name: 'Wolfs',
        slug: 'wolfs',
        metaDescription: 'Meta description',
        description: 'Description',
        image: 'https://source.unsplash.com/300x300/?wolf',
        products: []
    },
    {
        id: 4,
        title: 'Bulls',
        name: 'Bulls',
        slug: 'bulls',
        metaDescription: 'Meta description',
        description: 'Description',
        image: 'https://source.unsplash.com/300x300/?ox',
        products: []
    }
]

function addProductsToCategory(products, productsImages, category) {
    const categoryInner = { ...category, products: [] }
    products.map(p => {
        if (p.category_id === category.id) {
            categoryInner.products.push({
                id: p.id,
                name: p.name,
                slug: p.slug,
                price: p.price,
                // image: `https://source.unsplash.com/300x300/?${p.name}`
                image: productsImages.find(img => img.id === p.id).urls
            })
        }
    })
    return categoryInner
}

export const state = () => ({
    categoriesList: [],
    currentCategory: {}
})
export const mutations = {
    SET_CATEGORIES_LIST(state, categories) {
        state.categoriesList = categories
    },
    SET_CURRENT_CATEGORY(state, category) {
        state.currentCategory = category
    },
    SET_CURRENT_PRODUCT(state, product) {
        state.currentProduct = product
    }
}
export const actions = {
    async getCategoriesList({ commit }) {
        try {
            await sleep(1000)
            await commit('SET_CATEGORIES_LIST', categories)
        } catch (err) {
            console.log(err)
            throw new Error('Internal server error, inform admin')
        }
    },
    async getCurrentCategory({ commit }, { route }) {
        await sleep(1000)
        const category = categories.find((category) => category.slug === route.params.slug)

        const [products, productsImages] = await Promise.all(
            [
                this.$axios.$get('/mock/products.json'),
                this.$axios.$get('/mock/products-images.json')
            ]
        )

        await commit('SET_CURRENT_CATEGORY', addProductsToCategory(products, productsImages, category))
    },
}
