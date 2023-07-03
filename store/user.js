import Cookie from "js-cookie";

export const state = () => ({
    // isManager: false,
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

            const res = await this.$axios.get(`/users/${userData.id}.json`);
            // const currentUser = Object.values(dbUserData.data).find(user => {
            //     return Object.values(user)[0].id === userData.id;
            // })
            const dbUserData = res.data;
            const isManager = dbUserData.isManager;
            vuexContext.commit("setUserData", {...userData, isManager});
        } else {
            vuexContext.commit("setUserData", '');
        }
    },
    async setUserPosts(vuexContext) {
        const userDataString = Cookie.get('userData');
        if (!userDataString) return;
        const userData = JSON.parse(userDataString);

        if (process.client && userData) {
            const userId = userData.id;
            if (userId) {
                const userPosts = await this.$axios.$get(`/posts.json`);
                const filteredPosts = Object.values(userPosts).filter(post => post.userId === userId);
                vuexContext.commit("setUserPosts", filteredPosts);
            }
        }
    },
    // async updateUserPhoto(vuexContext, photo) {
    //     const storageRef = this.$storage.ref();
    //     const uid = vuexContext.state.userData.id;
    //     const stickerRef = storageRef.child(
    //         `user-sticker/${uid}`
    //     );
    //     stickerRef.put(photo).then(() => {
    //         // get root state token
    //         const token = vuexContext.rootState.token;

    //         stickerRef.getDownloadURL().then((url) => {
    //             this.$axios.$put(`/users/${uid}.json?auth=${token}`, {
    //                 photoUrl: url
    //             }).then(() => {
    //                 vuexContext.commit("setUserData", {...vuexContext.state.userData, photo: url});
    //             });
    //         });
    //     });
    // },
}

export const getters = {
    userData(state) {
        return state.userData;
    },
    userPosts(state) {
        return state.userPosts;
    },
    isManager(state) {
        return state.userData?.isManager;
    }
}

