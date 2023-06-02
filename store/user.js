import Cookie from "js-cookie";
export default {
    namespaced: true,
    state() {
        return {
            userData: null,
            userPosts: [],
        }
    },
    mutations: {
        setUserData(state, userData) {
            state.userData = userData;
        },
        setUserPosts(state, userPosts) {
            state.userPosts = userPosts;
        },
        addUserPost(state, userPost) {
            state.userPosts.push(userPost);
        },
        deleteUserPost(state, deletePost) {
            const deletedIndex = state.userPosts.findIndex(
                post => post.id === deletePost
            );
            state.userPosts.splice(deletedIndex, 1);
        },
        setIsManager(state, isManager) {
            state.isManager = isManager;
        }

    },
    actions: {
        setUserData(vuexContext) {
            if (process.client) {
                const userDataString = Cookie.get('userData');
                if (!userDataString) return;
                const userData = JSON.parse(userDataString);
                vuexContext.commit("setUserData", userData);
                vuexContext.commit("setIsManager", userData.isManager);
            } else {
                vuexContext.commit("setUserData", '');
            }
        },
        async setUserPosts(vuexContext) {
            if (vuexContext.state.userData) {
                const userId = vuexContext.state.userData.id;
                if (userId) {
                    const userPosts = await this.$axios.$get(`/posts.json`);
                    const filteredPosts = Object.values(userPosts).filter(post => post.userId === userId);
                    vuexContext.commit("setUserPosts", filteredPosts);
                }
            }
        }
    },
    getters: {
        userData(state) {
            return state.userData;
        },
        userPosts(state) {
            return state.userPosts;
        },
        isManager(state) {
            return false;
        }
    }
}