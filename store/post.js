export const state = () => ({
    loadedPosts: [],
})

export const mutations = {
    setPosts(state, posts) {
        state.loadedPosts = posts;
    },
    addPost(state, post) {
        state.loadedPosts.push(post);
    },
    editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
            post => post.id === editedPost.id
        );
        state.loadedPosts[postIndex] = editedPost;
    },
    deletePost(state, deletePost) {
        const deletedIndex = state.loadedPosts.findIndex(
            post => post.id === deletePost
        );
        state.loadedPosts.splice(deletedIndex, 1);
    },
}

export const actions = {
    setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
    },
    addPost(vuexContext, postData) {
        const createdPost = {
            ...postData,
            updatedDate: new Date()
        };
        const signinWithGoogle = vuexContext.rootState.user.signinWithGoogle;
        const commitDataToVuex = (updatedData) => {
            vuexContext.commit("addPost", updatedData);
            vuexContext.commit("user/addUserPost", updatedData, { root: true });
        }
        if (!signinWithGoogle) {
            return this.$axios
                .$post(`/posts.json?auth=${vuexContext.rootState.token}`, createdPost)
                .then(data => {
                    const updatedData = { ...createdPost, id: data.name };
                    this.$axios.$put(`/posts/${data.name}.json?auth=${vuexContext.rootState.token}`,updatedData)
                    commitDataToVuex(updatedData);
                })
                .catch(err => console.log(err));
        } else {
            const db = this.$firebase.firestore;
            const postRef = db.collection("posts").doc();
            return postRef
                .set(createdPost)
                .then(() => {
                    postRef.get().then(doc => {
                        const updatedData = doc.data();
                        updatedData.id = postId;
                        commitDataToVuex(updatedData);
                    })
                })
        }
    },
    editPost(vuexContext, editedPost) {
        const signinWithGoogle = vuexContext.rootState.user.signinWithGoogle;
        const commitDataToVuex = () => {
            vuexContext.commit("editPost", editedPost);
            vuexContext.commit("user/editUserPost", editedPost, { root: true });
        }
        if (!signinWithGoogle) {
            return this.$axios
                .$put(
                    `/posts/${editedPost.id}.json?auth=${vuexContext.rootState.token}`,
                    editedPost
                )
                .then(() => {
                    commitDataToVuex();
                })
                .catch(err => console.log(err));
        } else {
            // put data to firebase using firebase sdk
            const db = this.$firebase.firestore;
            const postRef = db.collection("posts").doc(editedPost.id);
            return postRef
                .update(editedPost)
                .then(() => {
                    commitDataToVuex();
                })
        }
    },
    deletePost(vuexContext, deletePost) {
        const signinWithGoogle = vuexContext.rootState.user.signinWithGoogle;
        const deletePostFromVuex = () => {
            vuexContext.commit("deletePost", deletePost);
            vuexContext.commit("user/deleteUserPost", deletePost, { root: true });
        }
        if (!signinWithGoogle) {
            return this.$axios
                .$delete(
                    `/posts/${deletePost}.json?auth=${vuexContext.rootState.token}`,
                    deletePost
                )
                .then(() => {
                    deletePostFromVuex();
                })
                .catch(err => console.log(err));
        } else {
            const db = this.$firebase.firestore;
            const postRef = db.collection("posts").doc(deletePost);
            return postRef
                .delete()
                .then(() => {
                    deletePostFromVuex();
                })
        }
    },
}

export const getters = {
    loadedPosts(state) {
        return state.loadedPosts;
    }
}