// import Cookie from "js-cookie";
// export default function(context) {
//   context.store.dispatch("initAuth", context.req);
// }

import { useContext } from 'nuxt3'

export default function () {
  const context = useContext()
  context.store.dispatch("initAuth", context.req);
}