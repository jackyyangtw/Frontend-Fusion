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
        return this.$axios
            .$post(`/posts.json?auth=${vuexContext.rootState.token}`, createdPost)
            .then(data => {
                vuexContext.commit("addPost", { ...createdPost, id: data.name })
                vuexContext.commit("user/addUserPost", { ...createdPost, id: data.name }, { root: true })
                this.$axios.$put(`/posts/${data.name}.json?auth=${vuexContext.rootState.token}`, { ...createdPost, id: data.name })
            })
            .catch(err => console.log(err));
    },
    editPost(vuexContext, editedPost) {
        return this.$axios
            .$put(
                `/posts/${editedPost.id}.json?auth=${vuexContext.rootState.token}`,
                editedPost
            )
            .then(() => {
                vuexContext.commit("editPost", editedPost);
                vuexContext.commit("user/editUserPost", editedPost, { root: true });
            })
            .catch(err => console.log(err));
    },
    deletePost(vuexContext, deletePost) {
        return this.$axios
            .$delete(
                `/posts/${deletePost}.json?auth=${vuexContext.rootState.token}`,
                deletePost
            )
            .then(() => {
                vuexContext.commit("deletePost", deletePost);
                vuexContext.commit("user/deleteUserPost", deletePost, { root: true });
            })
            .catch(err => console.log(err));
    },
}

export const getters = {
    loadedPosts(state) {
        return state.loadedPosts;
    }
}