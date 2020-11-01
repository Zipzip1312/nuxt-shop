// function for Mock API
const sleep = m => new Promise(r => setTimeout(r, m))
const categories = [
    {
        title: 'Cats',
        name: 'Cats',
        slug: 'cats',
        metaDescription: 'Meta description',
        description: 'Description',
        image: 'https://source.unsplash.com/300x300/?cat,cats'
    },
    {
        title: 'Dogs',
        name: 'Dogs',
        slug: 'dogs',
        metaDescription: 'Meta description',
        description: 'Description',
        image: 'https://source.unsplash.com/300x300/?dog,dogs'
    },
    {
        title: 'Wolfs',
        name: 'Wolfs',
        slug: 'wolfs',
        metaDescription: 'Meta description',
        description: 'Description',
        image: 'https://source.unsplash.com/300x300/?wolf'
    },
    {
        title: 'Bulls',
        name: 'Bulls',
        slug: 'bulls',
        metaDescription: 'Meta description',
        description: 'Description',
        image: 'https://source.unsplash.com/300x300/?ox'
    }
]

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
        const category = categories.find((category) => category.slug === route.params.category)
        await commit('SET_CURRENT_CATEGORY', category)
    }
}
