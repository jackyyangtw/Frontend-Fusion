import Vuex from "vuex";
import Cookie from "js-cookie";
import ui from "./ui";
import post from "./post";
import user from './user';
import tag from './tag';
// import { json } from "body-parser";
const createStore = () => {
  return new Vuex.Store({
    modules: { ui, post, user, tag },
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
      },

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
      async authenticateUser(vuexContext, payload) {
        const authUrl = payload.isLogin
          ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`
          : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`;

        try {
          const { data } = await this.$axios.post(authUrl, {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          });

          const { idToken, expiresIn, localId } = data;

          vuexContext.commit('setToken', idToken);
          localStorage.setItem('token', idToken);
          localStorage.setItem(
            'tokenExpiration',
            new Date().getTime() + Number.parseInt(expiresIn) * 1000
          );
          Cookie.set('jwt', idToken);
          Cookie.set(
            'tokenExpiration',
            new Date().getTime() + Number.parseInt(expiresIn) * 1000
          );

          if (!payload.isLogin) {
            const commitData = {
              name: payload.name,
              email: payload.email,
              password: payload.password,
              id: localId,
            };

            await this.$axios.post(
              `/users/${localId}.json?auth=${idToken}`,
              commitData
            );

            vuexContext.commit('user/setUserData', commitData);
            Cookie.set(`userData`, JSON.stringify(commitData));
          }

          const { data: userData } = await this.$axios.get(
            `/users/${localId}.json?auth=${idToken}`
          );

          Object.values(userData).forEach((item) => {
            const userData = { ...item, id: localId };
            Cookie.set(`userData`, JSON.stringify(userData));
          });


          vuexContext.dispatch('user/setUserData');

          vuexContext.dispatch('user/setUserPosts');
        } catch (error) {
          console.log(error);
        }
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
          vuexContext.dispatch("onLogout");
          return;
        }
        vuexContext.commit("setToken", token);
      },
      onLogout(vuexContext) {
        Cookie.remove("jwt");
        Cookie.remove("tokenExpiration");
        Cookie.remove("userData");
        vuexContext.commit("clearToken");
        vuexContext.commit("user/setUserData", null);
        vuexContext.commit("user/setUserPosts", null);
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
