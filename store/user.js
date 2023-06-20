import Cookie from "js-cookie";

export const state = () => ({
    isManager: false,
    userData: null,
    userPosts: [],
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
    async setUserData(vuexContext) {
        if (process.client) {
            const userDataString = Cookie.get('userData');
            if (!userDataString) return;
            const userData = JSON.parse(userDataString);

            // const dbUserData = await this.$axios.get(`/users.json`);
            // const managerObj = Object.values(dbUserData.data).find(user => {
            //     return Object.values(user)[0].manager === true;
            // })
            // console.log(Object.values(managerObj)[0].manager);

            vuexContext.commit("setUserData", userData);
            // vuexContext.commit("setIsManager", Object.values(managerObj)[0].manager);
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
}

