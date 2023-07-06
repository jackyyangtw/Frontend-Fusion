// import Cookie from "js-cookie";
export default function(context) {
  context.store.dispatch("initAuth", context.req);
}
