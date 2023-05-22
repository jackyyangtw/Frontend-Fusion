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
        }

    },
    actions: {
        toggleDarkMode(vuexContext) {
            console.log('exceute toggleDarkMode')
            vuexContext.commit('setDark');
            localStorage.setItem('isDark', vuexContext.state.isDark);
            if(vuexContext.state.isDark){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark')
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