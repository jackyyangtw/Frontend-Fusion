import Cookie from "js-cookie";

interface State {
    token: string | null;
    searchText: string;
    signinWithGoogle: boolean;
    login: boolean;
}

export const state = (): State => ({
    token: null,
    searchText: '',
    signinWithGoogle: false,
    login: false,
});

interface MutationTree<S> {
    [key: string]: (state: S, payload: any) => void;
}

export const mutations: MutationTree<State> = {
    setSearchText(state, searchText: string) {
        state.searchText = searchText;
    },
    setToken(state, token: string) {
        state.token = token;
    },
    clearToken(state) {
        state.token = null;
    },
    setsigninWithGoogle(state, signinWithGoogle: boolean) {
        state.signinWithGoogle = signinWithGoogle;
    }
};

interface ActionTree<S, R> {
    [key: string]: (injectee: ActionContext<S, R>, payload: any) => any;
}

interface ActionContext<S, R> {
    commit: Commit;
    dispatch: Dispatch;
    state: S;
    getters: any;
    rootState: R;
    rootGetters: any;
}

interface Commit {
    (type: string, payload?: any, options?: any): void;
}

interface Dispatch {
    (type: string, payload?: any, options?: any): Promise<any>;
}

export const actions: ActionTree<State, any> = {
    async nuxtServerInit({ dispatch }, context) {
        try {
            const data = await context.app.$axios.$get("/posts.json");
            const postArr: Array<any> = [];
            for (const key in data) {
                postArr.push({ ...data[key], id: key });
            }
            dispatch("post/setPosts", postArr);
        } catch (e) {
            context.error(e);
        }
    },
    async authenticateUserWithEMail({ commit, dispatch }, payload) {
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

            commit('setToken', idToken);
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

            const serUserDataToCookie = (data: any) => {
                Cookie.set(`userData`, JSON.stringify(data));
            }

            const { data: userData } = await this.$axios.get(
                `/users/${localId}.json?auth=${idToken}`
            );

            const initUserData = (userData: any) => {
                serUserDataToCookie(userData)
                commit('user/setUserData', userData);
                dispatch('user/setUserData');
                dispatch('user/setUserPosts');
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
            dispatch('ui/setErrorMsg', error.response.data.error.message);
        }
    },
    async signinWithGoogleAction({ commit, dispatch }) {

        const provider = new this.$auth.GoogleAuthProvider();
        try {
            await this.$authModule.setPersistence(this.$auth.Auth.Persistence.LOCAL);
            const res = await this.$authModule.signInWithPopup(provider);

            const { displayName, email, photoURL, uid } = res.user;
            const user = this.$authModule.currentUser;
            const token = await user.getIdToken();
            const { data: userDataFromFire } = await this.$axios.get(`/users/${uid}.json?auth=${token}`)
            let userData;

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
            commit('user/setUserData', userData);
            commit('setToken', token);
            dispatch('user/setUserPosts');

            await this.$authModule.signInWithRedirect(provider);
            commit('setsigninWithGoogle', true);
        } catch (e) {
            console.log(e);
        }
    },
    initAuth({ commit, dispatch }, req) {
        let token;
        let expirationDate;
        let signinWithGoogle = false;

        if (process.client) {
            signinWithGoogle = Boolean(Cookie.get("signinWithGoogle"));
            commit("setsigninWithGoogle", signinWithGoogle);
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
            dispatch("onLogout");
            return;
        }

        commit("setToken", token);
    },
    refreshToken() {
        console.log('refreshToken')
        const timeout = 3600 * 1000
        const refreshToken = async () => {
            if (!process.client) return;
            const user = this.$authModule.currentUser;
            const token = await user.getIdToken();
            // localStorage.setItem("token", token);
            Cookie.set('jwt', token);
            const expirationTime = new Date().getTime() + timeout;
            // localStorage.setItem("tokenExpiration", expirationTime);
            Cookie.set('tokenExpiration', expirationTime);
        }
        setInterval(refreshToken, timeout);
    },
    onLogout({ dispatch }) {
        dispatch("clearCookie");
    },
    clearCookie({ commit }) {
        Cookie.remove("jwt");
        Cookie.remove("tokenExpiration");
        Cookie.remove("userData");
        Cookie.remove("signinWithGoogle");
        commit("clearToken");
        commit("user/setUserData", null);
        commit("user/setUserPosts", null);
        commit("setsigninWithGoogle", false);
    },
};

interface GetterTree<S, R> {
    [key: string]: (state: S, getters: any, rootState: R, rootGetters: any) => any;
}

export const getters: GetterTree<State, any> = {
    isAuthenicated(state) {
        return state.token != null;
    },
    searchText(state) {
        return state.searchText;
    },
    signinWithGoogle(state) {
        const signinWithGoogle = Boolean(Cookie.get("signinWithGoogle"));
        return signinWithGoogle && state.signinWithGoogle;
    }
};