import Vuex from "vuex";
import Cookie from "js-cookie";
import ui from "./ui";
import post from "./post";
import user from './user'
const createStore = () => {
  return new Vuex.Store({
    modules: { ui, post },
    state: {
      token: null,
      searchText: '',

    },
    mutations: {
      setSearchText(state, searchText) {
        state.searchText = searchText;
      },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get("/posts.json")
          .then(data => {
            const postArr = [];
            for (const key in data) {
              postArr.push({ ...data[key], id: key });
            }
            vuexContext.commit("post/setPosts", postArr);
          })
          .catch(e => context.error(e));
      },
      authenciateUser(vuexContext, payload) {
        let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`;
        if (!payload.isLogin) {
          authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`;
        }
        return this.$axios
          .$post(authUrl, {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
          })
          .then(res => {
            vuexContext.commit("setToken", res.idToken);
            localStorage.setItem("token", res.idToken);
            localStorage.setItem(
              "tokenExpiration",
              new Date().getTime() + Number.parseInt(res.expiresIn) * 1000
            );
            Cookie.set("jwt", res.idToken);
            Cookie.set(
              "tokenExpiration",
              new Date().getTime() + Number.parseInt(res.expiresIn) * 1000
            );
            // if(!payload.isLogin) {
            //   try {
            //     this.$axios.post('/users.json', {
            //       name: payload.name,
            //       email: payload.email,
            //       password: payload.password
            //     })
            //     const userRef = this.$fire.database.ref('users').push()
            //     userRef.set({
            //       name: payload.name,
            //       email: payload.email,
            //       password: payload.password
            //     })
            //   } catch (error) {
            //     console.log(error)
            //   }
            // }
            return this.$axios.$post("http://localhost:3000/api/track-data", {
              data: "Authenticated!! "
            });
          })
          .catch(err => console.log(err.response.data.error.message));
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (req) {
          if (!req.headers.cookie) return;
          console.log(req.headers);
          token = req.headers.cookie
            .split(";")
            .find(cookie => cookie.trim().startsWith("jwt="))
            .split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find(cookie => cookie.trim().startsWith("tokenExpiration="))
            .split("=")[1];
        } else if (process.client) {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }
        if (new Date().getTime() > +expirationDate || !token) {
          console.log("there is no token");
          vuexContext.dispatch("onLogout");
          return;
        }
        vuexContext.commit("setToken", token);
      },
      onLogout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("tokenExpiration");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      }
    },
    getters: {
      isAuthenicated(state) {
        return state.token != null;
      },
      searchText(state) {
        return state.searchText;
      },
    }
  });
};
export default createStore;
