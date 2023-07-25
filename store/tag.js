export const state = () => ({
    tags: [],
})

export const mutations = {
    addTag(state, tag) {
        state.tags.push(tag);
    },
    getTags(state, tags) {
        state.tags = tags;
    }
}

export const actions = {
    async addTag(vuexContext, tagData) {
        const addedTag = {
            ...tagData,
        };
        try {
            const data = await this.$axios.$post(`/tags.json?auth=${vuexContext.rootState.token}`, addedTag);
            vuexContext.commit("addTag", { ...addedTag, id: data.name });
        } catch (err) {
            console.log(err);
        }
    },
    async deleteTag(vuexContext, tagId) {
        try {
            await this.$axios.$delete(`/tags/${tagId}.json?auth=${vuexContext.rootState.token}`);
            await vuexContext.dispatch("getTags");
        } catch (err) {
            console.log(err);
        }
    },
    async getTags(vuexContext) {
        try {
            const data = await this.$axios.$get(`/tags.json`);
            const tagsArray = [];
            for (const key in data) {
                tagsArray.push({ ...data[key], id: key });
            }
            vuexContext.commit("getTags", tagsArray);
        } catch (err) {
            console.log(err);
        }
    }
}

export const getters = {
    tags(state) {
        return state.tags;
    }
}