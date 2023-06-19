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
  async signinWithGoogleAction(vuexContext) {
    vuexContext.commit('setSinginWithGoogle', true);
    const provider = new this.$firebase.auth.GoogleAuthProvider();
    try {
      const res = await this.$firebase.auth().signInWithPopup(provider);
      // const res = await this.$firebase.auth().signInWithRedirect(provider);
      const { idToken } = res.credential;
      const { displayName, email, photoURL, uid } = res.user;
      const userData = {
        name: displayName,
        email,
        photoURL,
        id: uid,
      }
      vuexContext.commit('user/setUserData', userData);
      vuexContext.commit('setToken', idToken);
      vuexContext.commit('setSinginWithGoogle', true);
      Cookie.set(`userData`, JSON.stringify(userData));
      Cookie.set('jwt', idToken);
      localStorage.setItem('token', idToken);
      Cookie.set("singinWithGoogle", true);
      localStorage.setItem("singinWithGoogle", true);
  
      await this.$firebase.auth().signInWithRedirect(provider);
    } catch (e) {
      console.log(e);
    }
  },
  initAuth(vuexContext, req) {
    let token;
    let expirationDate;
    if(process.client) {
      vuexContext.commit("setSinginWithGoogle", Boolean(localStorage.getItem("singinWithGoogle")));
    }
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
      console.log('在客戶端')
      token = localStorage.getItem("token");
      if(!vuexContext.state.singinWithGoogle) {
        console.log('沒有google登入')
        expirationDate = localStorage.getItem("tokenExpiration");
      }
    }
    if(!vuexContext.state.singinWithGoogle) {
      console.log('沒有google登入')
      if (new Date().getTime() > +expirationDate || !token) {
        vuexContext.dispatch("onLogout");
        return;
      }
    }
    console.log("token", token);
    vuexContext.commit("setToken", token);
  },
  onLogout(vuexContext) {
    vuexContext.dispatch("clearCookie");
    if (process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("singinWithGoogle");
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
    return Boolean(localStorage.getItem("singinWithGoogle")) || state.singinWithGoogle;
  }
}

