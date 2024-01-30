// import Vue from 'vue'
// import Vuetify from 'vuetify/lib'

// Vue.use(Vuetify)

import { createVuetify } from "vuetify/lib/framework.mjs"
const vuetify = createVuetify({
  theme: {
    dark: true,
  },
})

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.app.use(vuetify)
})

// export default new Vuetify({
//   theme: { dark: true },
// })