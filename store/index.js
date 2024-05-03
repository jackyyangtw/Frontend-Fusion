import Cookie from "js-cookie";

export const state = () => ({
  token: null,
  searchText: '',
  signinWithGoogle: false,
  navLinks: [
    { title: '分類', to: '/posts' },
    { title: '管理', to: '/admin' },
  ]
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
  setsigninWithGoogle(state, signinWithGoogle) {
    state.signinWithGoogle = signinWithGoogle;
  }
}

export const actions = {
  async nuxtServerInit(vuexContext, context) {
    try {
      vuexContext.commit("post/setIsLoadingPosts", true);
      const data = await context.app.$axios.$get("/posts.json");
      const postArr = [];
      for (const key in data) {
        postArr.push({ ...data[key], id: key });
      }
      vuexContext.dispatch("post/setPosts", postArr);
    } catch (e) {
      context.error(e);
    }
  },
  async authenticateUserWithEMail(vuexContext, payload) {
    // payload.isLogin 是從 auth頁面tab傳過來的，判斷是否為登入模式
    const authUrl = payload.isLogin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`;

    try {
      const res = await this.$axios.post(authUrl, {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      });

      if (res.status !== 200) {
        throw new Error('認證失敗');
      }

      const { data } = res
      const { idToken, expiresIn, localId } = data;

      vuexContext.commit('setToken', idToken);
      Cookie.set('jwt', idToken);
      Cookie.set(
        'tokenExpiration',
        new Date().getTime() + Number.parseInt(expiresIn) * 1000
      );

      const commitData = {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        id: localId,
      };

      const serUserDataToCookie = (data) => {
        Cookie.set(`userData`, JSON.stringify(data));
      }

      const { data: userData } = await this.$axios.get(
        `/users/${localId}.json?auth=${idToken}`
      );

      const initUserData = (userData) => {
        serUserDataToCookie(userData)
        vuexContext.commit('user/setUserData', userData);
        vuexContext.dispatch('user/setUserData');
        vuexContext.dispatch('user/setUserPosts');
      }

      if (!payload.isLogin) {
        await this.$axios.put(
          `/users/${localId}.json?auth=${idToken}`, commitData
        );
        initUserData(commitData);
      } else if (payload.isLogin && userData) {
        initUserData(userData);
      }

    } catch (error) {
      vuexContext.dispatch('ui/setErrorMsg', error.response.data.error.message);
    }
  },
  async signinWithGoogleAction(vuexContext) {

    const provider = new this.$auth.GoogleAuthProvider();
    try {
      await this.$authModule.setPersistence(this.$auth.Auth.Persistence.LOCAL);
      const res = await this.$authModule.signInWithPopup(provider);

      const { displayName, email, photoURL, uid } = res.user;
      const user = this.$authModule.currentUser;
      const token = await user.getIdToken();
      const { data: userDataFromFire } = await this.$axios.get(`/users/${uid}.json?auth=${token}`)
      let userData;

      // 檢查是否有該用戶資料，沒有就新增
      if (!userDataFromFire) {
        userData = {
          name: displayName,
          email,
          photoURL,
          id: uid,
        }
        await this.$axios.put(
          `/users/${uid}.json?auth=${token}`,
          userData
        );
      } else {
        userData = userDataFromFire;
      }

      Cookie.set(`userData`, JSON.stringify(userData));
      Cookie.set('jwt', token);
      Cookie.set("signinWithGoogle", true);
      vuexContext.commit('user/setUserData', userData);
      vuexContext.commit('setToken', token);
      vuexContext.dispatch('user/setUserPosts');

      await this.$authModule.signInWithRedirect(provider);
      vuexContext.commit('setsigninWithGoogle', true);
    } catch (e) {
      console.log(e);
    }
  },
  initAuth(vuexContext, req) {
    let token;
    let expirationDate;
    let signinWithGoogle = false;

    if (process.client) {
      signinWithGoogle = Boolean(Cookie.get("signinWithGoogle"));
      vuexContext.commit("setsigninWithGoogle", signinWithGoogle);
    }

    if (req && req.headers.cookie) {
      token = req.headers.cookie
        .split(";")
        .find(cookie => cookie.trim().startsWith("jwt="))
        ?.split("=")[1];
      expirationDate = req.headers.cookie
        .split(";")
        .find(cookie => cookie.trim().startsWith("tokenExpiration="))
        ?.split("=")[1];
    } else if (process.client) {
      token = Cookie.get("jwt");
      expirationDate = Cookie.get("tokenExpiration");
      if (signinWithGoogle) {
        this.$authModule.onAuthStateChanged(async (user) => {
          if (user) {
            const token = await user.getIdToken();
            Cookie.set('jwt', token);
            const expirationTime = new Date().getTime() + 3600 * 1000;
            Cookie.set('tokenExpiration', expirationTime);
          }
        });
      }
    }
    if (!signinWithGoogle && new Date().getTime() > +expirationDate) {
      vuexContext.dispatch("onLogout");
      return;
    }

    vuexContext.commit("setToken", token);
  },
  refreshToken({ commit }) {
    const timeout = 1000 * 3600;
    const refreshToken = async () => {
      if (!process.client) return;
      this.$authModule.onAuthStateChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken();
          Cookie.set('jwt', token);
          const expirationTime = new Date().getTime() + timeout;
          Cookie.set('tokenExpiration', expirationTime);
          commit("setToken", token);
        }
      });
    }
    const tokenExpiration = Cookie.get('tokenExpiration');
    if (tokenExpiration && new Date().getTime() < tokenExpiration) {
      refreshToken();
    }
    setInterval(refreshToken, timeout + 1000);
  },
  onLogout(vuexContext) {
    vuexContext.dispatch("clearCookie");
  },
  clearCookie(vuexContext) {
    Cookie.remove("jwt");
    Cookie.remove("tokenExpiration");
    Cookie.remove("userData");
    Cookie.remove("signinWithGoogle");
    vuexContext.commit("clearToken");
    vuexContext.commit("user/setUserData", null);
    vuexContext.commit("user/setUserPosts", null);
    vuexContext.commit("setsigninWithGoogle", false);
  },
}

export const getters = {
  isAuthenicated(state) {
    return state.token != null;
  },
  searchText(state) {
    return state.searchText;
  },
  signinWithGoogle(state) {
    const signinWithGoogle = Boolean(Cookie.get("signinWithGoogle"));
    return signinWithGoogle && state.signinWithGoogle;
  },
  navLinks(state) {
    return state.navLinks;
}
}
