import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _930f622a = () => interopDefault(import('..\\pages\\about\\index.vue' /* webpackChunkName: "pages/about/index" */))
const _4a2561e9 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _0f6b2ee5 = () => interopDefault(import('..\\pages\\posts\\index.vue' /* webpackChunkName: "pages/posts/index" */))
const _60caef58 = () => interopDefault(import('..\\pages\\search\\index.vue' /* webpackChunkName: "pages/search/index" */))
const _54de16fe = () => interopDefault(import('..\\pages\\admin\\auth\\index.vue' /* webpackChunkName: "pages/admin/auth/index" */))
const _c5fa58ac = () => interopDefault(import('..\\pages\\admin\\manage-tags\\index.vue' /* webpackChunkName: "pages/admin/manage-tags/index" */))
const _bde33e48 = () => interopDefault(import('..\\pages\\admin\\new-post\\index.vue' /* webpackChunkName: "pages/admin/new-post/index" */))
const _796ed47c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _6456e1de = () => interopDefault(import('..\\pages\\admin\\_postId\\index.vue' /* webpackChunkName: "pages/admin/_postId/index" */))
const _3c00b556 = () => interopDefault(import('..\\pages\\posts\\_id\\index.vue' /* webpackChunkName: "pages/posts/_id/index" */))
const _0c0d482c = () => interopDefault(import('..\\pages\\search\\_searchText\\index.vue' /* webpackChunkName: "pages/search/_searchText/index" */))

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
    component: _930f622a,
    name: "about"
  }, {
    path: "/admin",
    component: _4a2561e9,
    name: "admin"
  }, {
    path: "/posts",
    component: _0f6b2ee5,
    name: "posts"
  }, {
    path: "/search",
    component: _60caef58,
    name: "search"
  }, {
    path: "/admin/auth",
    component: _54de16fe,
    name: "admin-auth"
  }, {
    path: "/admin/manage-tags",
    component: _c5fa58ac,
    name: "admin-manage-tags"
  }, {
    path: "/admin/new-post",
    component: _bde33e48,
    name: "admin-new-post"
  }, {
    path: "/",
    component: _796ed47c,
    name: "index"
  }, {
    path: "/admin/:postId",
    component: _6456e1de,
    name: "admin-postId"
  }, {
    path: "/posts/:id",
    component: _3c00b556,
    name: "posts-id"
  }, {
    path: "/search/:searchText",
    component: _0c0d482c,
    name: "search-searchText"
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
