// function for Mock API
import mock from '../utils/mockServer'

// const sleep = m => new Promise(r => setTimeout(r, m))
const sleep = m => new Promise(r => r())

export const state = () => ({
    categoriesList: [],
    currentCategory: {},
    currentProduct: {
        alsoBuyProducts: [],
        interestingProducts: []
    },
    breadcrumbs: [],
    orderDetails: null,
    pending: true
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
    },
    SET_BREADCRUMBS(state, crumbs) {
        state.breadcrumbs = crumbs
    },
    RESET_BREADCRUMBS(state) {
        state.breadcrumbs = []
    },
    SET_ORDER_DETAILS(state, order) {
        state.orderDetails = order
    },
    RESET_ORDER_DETAILS(state) {
        state.orderDetails = null
    },
    TOGGLE_PENDING(state) {
        state.pending = !state.pending
    }
}
export const actions = {
    async getCategoriesList({ commit }) {
        try {
            await sleep(1000)
            await commit('SET_CATEGORIES_LIST', mock.categories)
        } catch (err) {
            console.log(err)
            throw new Error('Internal server error, inform admin')
        }
    },

    async getCurrentCategory({ commit, dispatch }, { route }) {
        await sleep(1000)
        const category = mock.categories.find((category) => category.slug === route.params.slug)

        const [products, productsImages] = await Promise.all(
            [
                this.$axios.$get('/mock/products.json'),
                this.$axios.$get('/mock/products-images.json')
            ]
        )

        const crumbs = mock.getBreadcrumbs('category', route, category)
        await dispatch('setBreadcrumbs', crumbs)

        await commit('SET_CURRENT_CATEGORY', mock.addProductsToCategory(products, productsImages, category))
    },

    async getCurrentProduct({ commit, dispatch }, { route }) {
        // simulate api work
        await sleep(50)
        const productSlug = route.params.slug
        const [products, productsImages, alsoBuyProducts, interestingProducts] = await Promise.all(
            [
                this.$axios.$get('/mock/products.json'),
                this.$axios.$get('/mock/products-images.json'),
                dispatch('getProductsListRandom'),
                dispatch('getProductsListRandom')
            ]
        )

        const product = mock.getProduct(products, productsImages, productSlug)
        await commit('SET_CURRENT_PRODUCT', { ...product, alsoBuyProducts, interestingProducts })

        const crumbs = mock.getBreadcrumbs('product', route, product)
        await dispatch('setBreadcrumbs', crumbs)
    },

    async setBreadcrumbs({ commit }, data) {
        await commit('SET_BREADCRUMBS', data)
    },

    async getProductsListRandom({ commit }) {
        // simulate api work
        await sleep(50)
        const [products, productsImages] = await Promise.all(
            [
                this.$axios.$get('/mock/products.json'),
                this.$axios.$get('/mock/products-images.json')
            ]

        )

        const idsArray = (mock.sampleSize(products, 4)).map(p => p.id)

        return mock.getProductsByIds(products, productsImages, idsArray)
    },

    async setOrderDetails({ commit }, orderDetails) {
        await commit('SET_ORDER_DETAILS', orderDetails)
    },

    async resetOrderDetails({ commit }) {
        await commit('RESET_ORDER_DETAILS')
    },

    async togglePending({ commit }) {
        await commit('TOGGLE_PENDING')
    }
}
