import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

export default async (context, inject) => {
    Vue.use(Vuetify)
    new Vuetify({})
}
