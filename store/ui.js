export default {
    namespaced: true,
    state() {
        return {
            isDark: true,
            headerHeight: 0
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
                document.body.classList.add('bg-slate-950');
                document.body.classList.remove('bg-slate-100');
            }else{
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
                document.body.classList.add('bg-slate-100');
                document.body.classList.remove('bg-slate-950');
            }
        }

    },
    actions: {
        toggleDarkMode(vuexContext) {
            vuexContext.commit('setDark');
            localStorage.setItem('isDark', vuexContext.state.isDark);
            if(vuexContext.state.isDark){
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
                document.body.classList.add('bg-slate-950');
                document.body.classList.remove('bg-slate-100');
            }else{
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark')
                document.body.classList.add('bg-slate-100');
                document.body.classList.remove('bg-slate-950');
            }
        }
    },
    getters: {
        isDark(state) {
            return state.isDark;
        },
        headerHeight(state) {
            return state.headerHeight;
        }
    }
}