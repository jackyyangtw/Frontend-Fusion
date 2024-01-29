// import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor/dist/ssr'
// import 'highlight.js/styles/monokai-sublime.css'
// Vue.use(VueQuillEditor)
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.app.use(VueQuillEditor)
})