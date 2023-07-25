export default function (context) {
  if (!context.store.getters.isAuthenicated) {
    context.redirect("/admin/auth");
  }
}
