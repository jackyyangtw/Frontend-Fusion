import Cookie from "js-cookie";

export const state = () => ({
    token: null,
    userId: null,
    isManager: false,
})

export const mutations = {
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
    },
    editUserPost(state, editedPost) {
        const postIndex = state.userPosts.findIndex(
            post => post.id === editedPost.id
        );
        state.userPosts[postIndex] = editedPost;
    },
}

export const actions = {
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
    },
}

export const getters = {
    userData(state) {
        return state.userData;
    },
    userPosts(state) {
        return state.userPosts;
    },
    // isManager(state) {
    //     return state.userData.manager;
    // }
}

