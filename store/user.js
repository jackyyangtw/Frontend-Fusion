export default {
    namespaced: true,
    state() {
        return {
            userData: null,
        }
    },
    mutations: {
        setUserData(state, userData) {
            state.userData = userData;
        }
    },
    actions: {
        setUserData(vuexContext, userData) {
            return this.$axios.$get(`/users/${userData.localId}.json?auth=${userData.idToken}`)
                .then(data => {
                    vuexContext.commit("setUserData", data);
                })
                .catch(err => console.log(err));
        }
    },
    getters: {
        userData(state) {
            return state.userData;
        }
    }
}