// import Cookie from "js-cookie";
export default function(context) {
  // const issigninWithGoogle = Boolean(context.req.headers.cookie.split(';').find(c => c.trim().startsWith('signinWithGoogle=')).split('=')[1]);
  // if (issigninWithGoogle) {
  //   context.store.dispatch("initAuthWithGoogle", context.req);
  //   return;
  // } else {
  //   context.store.dispatch("initAuth", context.req);
  // }
  context.store.dispatch("initAuth", context.req);
  // if(issigninWithGoogle) {
  //   context.router.push('/admin')
  // }
}
