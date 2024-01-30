// export default function (context) {
//   if (!context.store.getters.isAuthenicated) {
//     context.redirect("/admin/auth");
//   }
// }
// import { useContext } from 'nuxt3'

export default defineNuxtRouteMiddleware(() => {
  const context = useNuxt()
  if (!context.store.getters.isAuthenicated) {
    context.redirect("/admin/auth")
  }
})