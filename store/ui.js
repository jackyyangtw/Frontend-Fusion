export const state = () => ({
    isDark: true,
    headerHeight: 0,
    loading: false,
    sidebarWidth: 0,
    tags: [],
})

export const mutations = {
    setDark(state) {
        state.isDark = !state.isDark;
    },
    addTag(state, tags) {
        state.tags = tags;
    },
    setHeaderHeight(state, height) {
        state.headerHeight = height;
    },
    initSetDark(state) {
        if(localStorage.getItem('isDark') === null){
            localStorage.setItem('isDark', state.isDark);
        }else{
            state.isDark = localStorage.getItem('isDark') === 'true';
        }
        if(state.isDark){
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        }else{
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        }
        document.body.classList.add('bg-slate-100', 'dark:bg-slate-950');
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
    setSidebarWidth(state, height) {
        state.sidebarWidth = height;
    }
}

export const actions = {
    toggleDarkMode(vuexContext) {
        vuexContext.commit('setDark');
        localStorage.setItem('isDark', vuexContext.state.isDark);
        if(vuexContext.state.isDark){
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        }else{
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark')
        }
        document.body.classList.add('bg-slate-100', 'dark:bg-slate-950');
    },
    setLoading(vuexContext, loading) {
        vuexContext.commit("setLoading", loading);
    },
    addTag(vuexContext, tagData) {
        const addedTag = {
            ...tagData,
        };
        return this.$axios
            .$post(`/tags.json?auth=${vuexContext.rootState.token}`, addedTag)
            .then(() => {
                vuexContext.commit("addTag", { ...addedTag })
            })
            .catch(err => console.log(err));
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
    }
}
