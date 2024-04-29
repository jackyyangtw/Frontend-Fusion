export const state = () => ({
    isDark: true,
    headerHeight: 0,
    loading: false,
    sidebarWidth: 0,
    tags: [],
    errorMsg: null,
})

export const mutations = {
    setDark(state, payload) {
        if (payload) {
            state.isDark = payload;
        } else {
            state.isDark = !state.isDark;
        }
    },
    setErrorMsg(state, errorMsg) {
        state.errorMsg = errorMsg;
    },
    setHeaderHeight(state, height) {
        state.headerHeight = height;
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
    setSidebarWidth(state, height) {
        state.sidebarWidth = height;
    }
}

export const actions = {
    setErrorMsg(vuexContext, errorMsg) {
        vuexContext.commit("setErrorMsg", errorMsg);
    },
    initSetDark(vuexContext, Nuxt) {
        if (process.client) {
            const { state, commit } = vuexContext;
            const localIsDark = localStorage.getItem('isDark');
            localStorage.setItem('isDark', localIsDark);
            if (localIsDark === 'true') {
                commit('setDark', true);
            } else {
                commit('setDark', false);
            }
            if (localIsDark === 'true') {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
                // document.body.classList.add('bg-slate-950');
            } else {
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
                // document.body.classList.add('bg-slate-100');
            }
            // document.body.classList.add('bg-slate-100', 'dark:bg-slate-950');
            Nuxt.$vuetify.theme.dark = state.isDark;
        }
    },
    toggleDarkMode(vuexContext, Nuxt) {
        const { state, commit } = vuexContext;
        commit('setDark');
        localStorage.setItem('isDark', state.isDark);
        if (Boolean(state.isDark)) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark')
        }
        // document.body.classList.add('bg-slate-100', 'dark:bg-slate-950');
        Nuxt.$vuetify.theme.dark = state.isDark;
    },
    setLoading(vuexContext, loading) {
        vuexContext.commit("setLoading", loading);
    },
}

export const getters = {
    isDark(state) {
        return state.isDark;
    },
    headerHeight(state) {
        return state.headerHeight;
    },
    loading(state) {
        return state.loading;
    },
    sidebarWidth(state) {
        return state.sidebarWidth;
    },
    tags(state) {
        return state.tags;
    },
    errorMsg(state) {
        return state.errorMsg;
    }

}
