export default {
    namespaced: true,
    state() {
        return {
            isDark: true,
            headerHeight: 0,
            loading: false,
            sidebarWidth: 0,
        }
    },
    mutations: {
        setDark(state) {
            state.isDark = !state.isDark;
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

    },
    actions: {
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
    },
    getters: {
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
        }
        
    }
}