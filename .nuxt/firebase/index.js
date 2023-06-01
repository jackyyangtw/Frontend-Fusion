import createApp from './app.js'

import databaseService from './service.database.js'

const appConfig = {"apiKey":"AIzaSyBY_GSIZmBRcvwqbA6ZXJzFlV3UYoO88os","projectId":"nuxt-blog-b5610","authDomain":"nuxt-blog-b5610.firebaseapp.com","storageBucket":"nuxt-blog-b5610.appspot.com"}

export default async (ctx, inject) => {
  const { firebase, session } = await createApp(appConfig, ctx)

  let servicePromises = []

  if (process.server) {
    servicePromises = [
      databaseService(session, firebase, ctx, inject),

    ]
  }

  if (process.client) {
    servicePromises = [
      databaseService(session, firebase, ctx, inject),

    ]
  }

  const [
    database
  ] = await Promise.all(servicePromises)

  const fire = {
    database: database
  }

    inject('fireModule', firebase)
    ctx.$fireModule = firebase

  inject('fire', fire)
  ctx.$fire = fire
}

function forceInject (ctx, inject, key, value) {
  inject(key, value)
  const injectKey = '$' + key
  ctx[injectKey] = value
  if (typeof window !== "undefined" && window.$nuxt) {
  // If clause makes sure it's only run when ready() is called in a component, not in a plugin.
    window.$nuxt.$options[injectKey] = value
  }
}