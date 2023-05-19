import Vuex from "vuex";
import Cookie from "js-cookie";
import ui from "./ui";
const createStore = () => {
  return new Vuex.Store({
    modules: {ui},
    state: {
      loadedPosts: [],
      token: null,
      searchText:'',
      loading: false
    },
    mutations: {
      setLoading(state, loading) {
        state.loading = loading;
      },
      setSearchText(state, searchText) {
        state.searchText = searchText;
      },
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        state.loadedPosts[postIndex] = editedPost;
      },
      deletePost(state, deletePost) {
        const deletedIndex = state.loadedPosts.findIndex(
          post => post.id === deletePost
        );
        state.loadedPosts.splice(deletedIndex, 1);
      },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      }
    },
    actions: {
      setLoading(vuexContext, loading) {
        vuexContext.commit("setLoading", loading);
      },
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get("/posts.json")
          .then(data => {
            const postArr = [];
            for (const key in data) {
              postArr.push({ ...data[key], id: key });
            }
            vuexContext.commit("setPosts", postArr);
          })
          .catch(e => context.error(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      addPost(vuexContext, postData) {
        const createdPost = {
          ...postData,
          updatedDate: new Date()
        };
        return this.$axios
          .$post(`/posts.json?auth=${vuexContext.state.token}`, createdPost)
          .then(data =>
            vuexContext.commit("addPost", { ...createdPost, id: data.name })
          )
          .catch(err => console.log(err));
      },
      editPost(vuexContext, editedPost) {
        return this.$axios
          .$put(
            `/posts/${editedPost.id}.json?auth=${vuexContext.state.token}`,
            editedPost
          )
          .then(() => vuexContext.commit("editPost", editedPost))
          .catch(err => console.log(err));
      },
      deletePost(vuexContext, deletePost) {
        return this.$axios
          .$delete(
            `/posts/${deletePost}.json?auth=${vuexContext.state.token}`,
            deletePost
          )
          .then(() => vuexContext.commit("deletePost", deletePost))
          .catch(err => console.log(err));
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
            console.log(res);
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
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenicated(state) {
        return state.token != null;
      },
      searchText(state){
        return state.searchText;
      },
      loading(state) {
        return state.loading;
      }
    }
  });
};
export default createStore;
