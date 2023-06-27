import Cookie from "js-cookie";

export const state = () => ({
  token: null,
  searchText: '',
  signinWithGoogle: false,
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
    vuexContext.commit('setsigninWithGoogle', true);
    const provider = new this.$firebase.auth.GoogleAuthProvider();
    try {
      const res = await this.$firebase.auth().signInWithPopup(provider);

      const { displayName, email, photoURL, uid } = res.user;
      const userData = {
        name: displayName,
        email,
        photoURL,
        id: uid,
      }
      const user = this.$firebase.auth().currentUser;
      const token = await user.getIdToken();

      vuexContext.commit('user/setUserData', userData);
      vuexContext.commit('setToken', token);
      vuexContext.commit('setsigninWithGoogle', true);
      Cookie.set(`userData`, JSON.stringify(userData));
      Cookie.set('jwt', token);
      localStorage.setItem('token', token);
      Cookie.set("signinWithGoogle", true);
      localStorage.setItem("signinWithGoogle", true);
  
      await this.$firebase.auth().signInWithRedirect(provider);
    } catch (e) {
      console.log(e);
    }
  },
  initAuth(vuexContext, req) {
    let token;
    let expirationDate;
    if(process.client) {
      vuexContext.commit("setsigninWithGoogle", Boolean(localStorage.getItem("signinWithGoogle")));
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
      if(!vuexContext.state.signinWithGoogle) {
        console.log('沒有google登入')
        expirationDate = localStorage.getItem("tokenExpiration");
      }
    }
    if(!vuexContext.state.signinWithGoogle) {
      console.log('沒有google登入')
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
      localStorage.removeItem("signinWithGoogle");
    }
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
    return Boolean(localStorage.getItem("signinWithGoogle")) || state.signinWithGoogle;
  }
}

