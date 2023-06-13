// import Cookie from "js-cookie";
export default function(context) {
  // const isSinginWithGoogle = Boolean(context.req.headers.cookie.split(';').find(c => c.trim().startsWith('singinWithGoogle=')).split('=')[1]);
  // if (isSinginWithGoogle) {
  //   context.store.dispatch("initAuthWithGoogle", context.req);
  //   return;
  // } else {
  //   context.store.dispatch("initAuth", context.req);
  // }
  context.store.dispatch("initAuth", context.req);
}
