import Cookie from "js-cookie";

export const state = () => ({
  token: null,
  searchText: '',
  singinWithGoogle: false,
})

export const mutations = {
  setSearchText(state, searchText) {
    state.searchText = searchText;
  },
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
  },
  setSinginWithGoogle(state, singinWithGoogle) {
    state.singinWithGoogle = singinWithGoogle;
  }
}

export const actions = {
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
    // payload.isLogin 是從 auth頁面tab傳過來的，判斷是否為登入模式
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
  async signinWithGoogle(vuexContext) {
    vuexContext.commit('setSinginWithGoogle', true);
    const provider = new this.$firebase.auth.GoogleAuthProvider();
    this.$firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { idToken } = result.credential;
        const { displayName, email, photoURL, uid } = result.user;
        const userData = {
          name: displayName,
          email,
          photoURL,
          id: uid,
        }
        vuexContext.commit('user/setUserData', userData);
        Cookie.set(`userData`, JSON.stringify(userData));
        vuexContext.commit('setToken', idToken);
        Cookie.set('jwt', idToken);
        localStorage.setItem('token', idToken);
        Cookie.set("singinWithGoogle", true);
        localStorage.setItem("singinWithGoogle", true);

        // this.$firebase.auth().setPersistence(this.$firebase.auth.Auth.Persistence.SESSION);
        return this.$firebase.auth().signInWithRedirect(provider);

      })
      .then(() => {
        this.$router.push("/")
      })
      .catch((e) => {
        // this.$snotify.error(e.message);
        console.log(e);
      });
  },
  initAuthWithGoogle(vuexContext, req) {
    let token;
    if(req) {
      token = req.headers.cookie
      .split(";")
      .find(cookie => cookie.trim().startsWith("jwt="))
      .split("=")[1];
    }
    vuexContext.commit("setToken", token);
    let userData;
    if (process.client) {
      userData = Cookie.get("userData");
    }
    if (userData) {
      vuexContext.commit("user/setUserData", userData);
    }
  },
  initAuth(vuexContext, req) {
    console.log('initAuth')
    let token;
    let expirationDate;
    if (req) {
      if (!req.headers.cookie) return;
      token = req.headers.cookie
        .split(";")
        .find(cookie => cookie.trim().startsWith("jwt="))
        .split("=")[1];
      expirationDate = req.headers.cookie
        .split(";")
        .find(cookie => cookie.trim().startsWith("tokenExpiration="))
        ?.split("=")[1];
    } else if (process.client) {
      token = localStorage.getItem("token");
      if(!vuexContext.state.singinWithGoogle) {
        expirationDate = localStorage.getItem("tokenExpiration");
      }
    }
    if(!vuexContext.state.singinWithGoogle) {
      if (new Date().getTime() > +expirationDate || !token) {
        vuexContext.dispatch("onLogout");
        return;
      }
    }
    vuexContext.commit("setToken", token);
  },
  onLogout(vuexContext) {
    vuexContext.dispatch("clearCookie");
    if (process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
    }
  },
  clearCookie(vuexContext) {
    Cookie.remove("jwt");
    Cookie.remove("tokenExpiration");
    Cookie.remove("userData");
    Cookie.remove("singinWithGoogle");
    vuexContext.commit("clearToken");
    vuexContext.commit("user/setUserData", null);
    vuexContext.commit("user/setUserPosts", null);
    vuexContext.commit("setSinginWithGoogle", false);
  },
}

export const getters = {
  isAuthenicated(state) {
    return state.token != null;
  },
  searchText(state) {
    return state.searchText;
  },
  singinWithGoogle(state) {
    return state.singinWithGoogle;
  }
}

