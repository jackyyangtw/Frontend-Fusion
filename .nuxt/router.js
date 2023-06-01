import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7dcc6a72 = () => interopDefault(import('..\\pages\\about\\index.vue' /* webpackChunkName: "pages/about/index" */))
const _11797d70 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _52816b28 = () => interopDefault(import('..\\pages\\posts\\index.vue' /* webpackChunkName: "pages/posts/index" */))
const _1a6c44a6 = () => interopDefault(import('..\\pages\\search\\index.vue' /* webpackChunkName: "pages/search/index" */))
const _08e3e270 = () => interopDefault(import('..\\pages\\admin\\auth\\index.vue' /* webpackChunkName: "pages/admin/auth/index" */))
const _1a5200ba = () => interopDefault(import('..\\pages\\admin\\new-post\\index.vue' /* webpackChunkName: "pages/admin/new-post/index" */))
const _d2ad092c = () => interopDefault(import('..\\pages\\admin\\_postId\\index.vue' /* webpackChunkName: "pages/admin/_postId/index" */))
const _ef3ab3a4 = () => interopDefault(import('..\\pages\\posts\\_id\\index.vue' /* webpackChunkName: "pages/posts/_id/index" */))
const _1169a91a = () => interopDefault(import('..\\pages\\search\\_searchText\\index.vue' /* webpackChunkName: "pages/search/_searchText/index" */))
const _687192d5 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _7dcc6a72,
    name: "about"
  }, {
    path: "/admin",
    component: _11797d70,
    name: "admin"
  }, {
    path: "/posts",
    component: _52816b28,
    name: "posts"
  }, {
    path: "/search",
    component: _1a6c44a6,
    name: "search"
  }, {
    path: "/admin/auth",
    component: _08e3e270,
    name: "admin-auth"
  }, {
    path: "/admin/new-post",
    component: _1a5200ba,
    name: "admin-new-post"
  }, {
    path: "/admin/:postId",
    component: _d2ad092c,
    name: "admin-postId"
  }, {
    path: "/posts/:id",
    component: _ef3ab3a4,
    name: "posts-id"
  }, {
    path: "/search/:searchText",
    component: _1169a91a,
    name: "search-searchText"
  }, {
    path: "/",
    component: _687192d5,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
