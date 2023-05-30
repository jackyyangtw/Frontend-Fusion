export default {
    namespaced: true,
    state: {
        loadedPosts: [],
    },
    mutations: {
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
    },
    actions: {
        setPosts(vuexContext, posts) {
            vuexContext.commit("setPosts", posts);
        },
        addPost(vuexContext, postData) {
            const createdPost = {
                ...postData,
                updatedDate: new Date()
            };
            console.log(createdPost, vuexContext.rootState)
            return this.$axios
                .$post(`/posts.json?auth=${vuexContext.rootState.token}`, createdPost)
                .then(data =>
                    vuexContext.commit("addPost", { ...createdPost, id: data.name })
                )
                .catch(err => console.log(err));
        },
        editPost(vuexContext, editedPost) {
            return this.$axios
                .$put(
                    `/posts/${editedPost.id}.json?auth=${vuexContext.rootState.token}`,
                    editedPost
                )
                .then(() => vuexContext.commit("editPost", editedPost))
                .catch(err => console.log(err));
        },
        deletePost(vuexContext, deletePost) {
            return this.$axios
                .$delete(
                    `/posts/${deletePost}.json?auth=${vuexContext.state.token}`,
                    deletePost
                )
                .then(() => vuexContext.commit("deletePost", deletePost))
                .catch(err => console.log(err));
        },
    },
    getters: {
        loadedPosts(state) {
            return state.loadedPosts;
        },
    }
}