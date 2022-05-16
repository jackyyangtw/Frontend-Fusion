export default function(context) {
  console.log("[just-auth]");
  if (!context.store.getters.isAuthenicated) {
    context.redirect("/admin/auth");
  }
}
