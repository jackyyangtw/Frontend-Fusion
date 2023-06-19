export default function(context) {
  if (!context.store.getters.isAuthenicated) {
    console.log('redirect to /admin/auth')
    context.redirect("/admin/auth");
  }
}
