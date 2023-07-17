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
    // addPost(vuexContext, postData) {
    //     // let resData;
    //     const createdPost = {
    //         ...postData,
    //         updatedDate: new Date()
    //     };
    //     const signinWithGoogle = vuexContext.rootState.user.signinWithGoogle;
    //     const commitDataToVuex = (updatedData) => {
    //         vuexContext.commit("addPost", updatedData);
    //         vuexContext.commit("user/addUserPost", updatedData, { root: true });
    //     }
    //     if (!signinWithGoogle) {
    //         this.$axios
    //             .$post(`/posts.json?auth=${vuexContext.rootState.token}`, createdPost)
    //             .then(data => {
    //                 const updatedData = { ...createdPost, id: data.name };
    //                 this.$axios.$put(`/posts/${data.name}.json?auth=${vuexContext.rootState.token}`, updatedData).then((data) => {
    //                     commitDataToVuex(updatedData);
    //                     // resData = data;
    //                 })
    //             })
    //             .catch(err => console.log(err));
    //     } else {
    //         const db = this.$firebase.firestore;
    //         const postRef = db.collection("posts").doc();
    //         postRef
    //             .set(createdPost)
    //             .then(() => {
    //                 postRef.get().then(doc => {
    //                     const updatedData = doc.data();
    //                     // resData = updatedData;
    //                     updatedData.id = postId;
    //                     commitDataToVuex(updatedData);
    //                 })
    //             })
    //     }
    //     // return resData;
    // },
    async addPost(vuexContext, postData) {
        const createdPost = {
            ...postData,
            updatedDate: new Date()
        };
        const signinWithGoogle = vuexContext.rootState.signinWithGoogle;
        console.log(signinWithGoogle);
        const commitDataToVuex = (updatedData) => {
            vuexContext.commit("addPost", updatedData);
            vuexContext.commit("user/addUserPost", updatedData, { root: true });
        };
        try {
            const data = await this.$axios.$post(`/posts.json?auth=${vuexContext.rootState.token}`, createdPost);
            console.log(data);
            if (!data) return;
            const updatedData = { ...createdPost, id: data.name };
            await this.$axios.$put(`/posts/${data.name}.json?auth=${vuexContext.rootState.token}`, updatedData);
            commitDataToVuex(updatedData);
            return updatedData;
            // if (!signinWithGoogle) {
            // } else {
            //     const db = this.$firebase.firestore;
            //     const postRef = db.collection("posts").doc();
            //     await postRef.set(createdPost);
            //     const doc = await postRef.get();
            //     const updatedData = doc.data();
            //     updatedData.id = postRef.id;
            //     commitDataToVuex(updatedData);
            //     return updatedData;
            // }
        } catch (error) {
            console.log(error);
        }
    },
    async editPost(vuexContext, postData) {
        // const signinWithGoogle = vuexContext.rootState.signinWithGoogle;
        const commitDataToVuex = (updatedData) => {
            vuexContext.commit("editPost", updatedData);
            vuexContext.commit("user/editUserPost", updatedData, { root: true });
        };
        console.log(postData);
        try {
            await this.$axios.$put(`/posts/${postData.id}.json?auth=${vuexContext.rootState.token}`, postData);
            commitDataToVuex(postData);
        } catch (error) {
            console.log(error);
        }
    },
    async uploadPreviewImage(vuexContext, payload) {
        // 上傳圖片到firebase storage 路徑: images/posts/:postId/previewImg/:fileName
        if (!payload.previewImageFile) return;
        const fileName = payload.postId;
        const storageRef = this.$storage.ref();
        try {
            const uploadTask = await storageRef
                .child(`images/posts/${payload.postId}/previewImg/${fileName}`)
                .put(payload.previewImageFile);
            return await uploadTask.ref.getDownloadURL();
        } catch (error) {
            console.log(error);
        }
    },
    async deletePost(vuexContext, deletePostId) {
        const storageRef = this.$storage.ref();
        const previewImgRef = storageRef.child(`images/posts/${deletePostId}/previewImg`);
        const contentImgRef = storageRef.child(`images/posts/${deletePostId}/content`);

        try {
            await this.$axios.$delete(`/posts/${deletePostId}.json?auth=${vuexContext.rootState.token}`);

            const deleteImage = async (ref) => {
                const res = await ref.listAll();
                if (res.items.length === 0) return;
                await Promise.all(res.items.map(item => item.delete()));
            };

            await Promise.all([deleteImage(previewImgRef), deleteImage(contentImgRef)]);

            vuexContext.commit("deletePost", deletePostId);
            vuexContext.commit("user/deleteUserPost", deletePostId, { root: true });
        } catch (error) {
            console.error(error);
        }
    }
}

export const getters = {
    loadedPosts(state) {
        return state.loadedPosts;
    }
}