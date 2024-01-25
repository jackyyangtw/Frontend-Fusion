const IMAGES_PATH = 'images/posts';
const PREVIEW_IMG_PATH = 'previewImg';
const CONTENT_IMG_PATH = 'content';

export const state = () => ({
    loadedPosts: [],
    isLoadingPosts: true,
})

export const mutations = {
    setPosts(state, posts) {
        state.loadedPosts = posts;
    },
    setIsLoadingPosts(state, isLoadingPosts) {
        state.isLoadingPosts = isLoadingPosts;
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
    sortPosts(state) {
        state.loadedPosts.sort((a, b) => {
            const dateA = new Date(a.updatedDate).getTime();
            const dateB = new Date(b.updatedDate).getTime();
            return dateB - dateA
        });
    },
}


export const actions = {
    setPosts({ commit }, posts) {
        commit("setPosts", posts);
        // commit('setIsLoadingPosts', false);
    },
    async addPost({ commit, rootState }, postData) {
        const createdPost = {
            ...postData,
            updatedDate: new Date(),
        };

        try {
            const data = await this.$axios.$post(`/posts.json?auth=${rootState.token}`, createdPost);
            if (!data) return;

            const updatedData = { ...createdPost, id: data.name };
            await this.$axios.$put(`/posts/${data.name}.json?auth=${rootState.token}`, updatedData);

            commit("addPost", updatedData);
            commit("user/addUserPost", updatedData, { root: true });
            return updatedData;
        } catch (error) {
            console.error(error);
        }
    },
    async editPost({ commit, rootState }, postData) {
        try {
            await this.$axios.$put(`/posts/${postData.id}.json?auth=${rootState.token}`, postData);
            commit("editPost", postData);
            commit("user/editUserPost", postData, { root: true });
        } catch (error) {
            console.error(error);
        }
    },
    async uploadPreviewImage(vuexContext, { postId, previewImageFile }) {
        if (!previewImageFile) return;

        const fileName = postId;
        const storageRef = this.$storage.ref();
        const uploadTask = await storageRef.child(`${IMAGES_PATH}/${postId}/${PREVIEW_IMG_PATH}/${fileName}`).put(previewImageFile);

        return await uploadTask.ref.getDownloadURL();
    },
    async deletePost({ commit, rootState }, deletePostId) {
        const storageRef = this.$storage.ref();
        const previewImgRef = storageRef.child(`${IMAGES_PATH}/${deletePostId}/${PREVIEW_IMG_PATH}`);
        const contentImgRef = storageRef.child(`${IMAGES_PATH}/${deletePostId}/${CONTENT_IMG_PATH}`);
        async function deleteImage(ref) {
            const res = await ref.listAll();
            if (res.items.length === 0) return;
            await Promise.all(res.items.map(item => item.delete()));
        }
        try {
            await this.$axios.$delete(`/posts/${deletePostId}.json?auth=${rootState.token}`);
            await Promise.all([deleteImage(previewImgRef), deleteImage(contentImgRef)]);

            commit('deletePost', deletePostId);
            commit('user/deleteUserPost', deletePostId, { root: true });
        } catch (error) {
            console.error(error);
        }
    },
    async getSinglePost({ rootState }, postId) {
        try {
            const data = await this.$axios.$get(`/posts/${postId}.json?auth=${rootState.token}`);
            if (!data) return;
            return data;
        } catch (error) {
            console.error(error);
        }
    },
}


export const getters = {
    loadedPosts(state) {
        return state.loadedPosts;
    },
    isLoadingPosts(state) {
        return state.isLoadingPosts;
    }
}