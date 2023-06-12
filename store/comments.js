export const state = () => ({  
    comments: []
})

export const mutations = {
    setComments(state, comments) {
        state.comments = comments
    }
}

export const actions = {
    async getComments(vuexContext, post) {
        const postData = await this.$axios.$get(`/post/${post.id}.json`);
        const comments = postData.comments;
        vuexContext.commit('setComments', comments);
    },
    async addComment(vuexContext, comment) {
        const commentData = {
            ...comment,
            date: new Date()
        }
        await this.$axios.$post(`/post/${comment.postId}/comments.json`, commentData);
        vuexContext.commit('setComments', comment);
    }
}

export const getters = {
    allComments(state) {
        return state.comments
    }
}
