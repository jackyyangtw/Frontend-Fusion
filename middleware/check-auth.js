// import Cookie from "js-cookie";
// export default function(context) {
//   context.store.dispatch("initAuth", context.req);
// }

// import { useContext } from 'nuxt3'

export default defineNuxtRouteMiddleware(() => {
  const context = useNuxt()
  context.store.dispatch("initAuth", context.req);
})