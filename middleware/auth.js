// export default function (context) {
//   if (!context.store.getters.isAuthenicated) {
//     context.redirect("/admin/auth");
//   }
// }
import { useContext } from 'nuxt3'

export default function () {
  const context = useContext()
  if (!context.store.getters.isAuthenicated) {
    context.redirect("/admin/auth")
  }
}