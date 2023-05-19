export default {
    namespaced: true,
    state() {
        return {
            isDark: true,
        }
    },
    mutations: {
        setDark(state) {
            state.isDark = !state.isDark;
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
        }
    }
}