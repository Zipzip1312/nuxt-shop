// function for Mock API
const sleep = m => new Promise(r => setTimeout(r, m))
const categories = [
    {
        cName: 'Cats',
        cSlug: 'cats',
        cImage: 'https://source.unsplash.com/300x300/?cat,cats'
    },
    {
        cName: 'Dogs',
        cSlug: 'dogs',
        cImage: 'https://source.unsplash.com/300x300/?dog,dogs'
    },
    {
        cName: 'Wolfs',
        cSlug: 'wolfs',
        cImage: 'https://source.unsplash.com/300x300/?wolf'
    },
    {
        cName: 'Bulls',
        cSlug: 'bulls',
        cImage: 'https://source.unsplash.com/300x300/?ox'
    }
]

export const state = () => ({
    categoriesList: []
})
export const mutations = {
    SET_CATEGORIES_LIST(state, categories) {
        state.categoriesList = categories
    }
}
export const actions = {
    async getCategoriesList({ commit }) {
        try {
            await sleep(1000)
            await commit('SET_CATEGORIES_LIST', categories)
        } catch (err) {
            console.log(err)
            throw new Error('Internal server error, inform administrator')
        }
    }
}
