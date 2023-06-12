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
    addTag(vuexContext, tagData) {
        const addedTag = {
            ...tagData,
        };
        return this.$axios
            .$post(`/tags.json?auth=${vuexContext.rootState.token}`, addedTag)
            .then((data) => {
                vuexContext.commit("addTag", { ...addedTag, id: data.name })
            })
            .catch(err => console.log(err));
    },
    deleteTag(vuexContext, tagId) {
        return this.$axios
            .$delete(`/tags/${tagId}.json?auth=${vuexContext.rootState.token}`)
            .then(() => {
                vuexContext.dispatch("getTags");
            })
            .catch(err => console.log(err));
    },
    getTags(vuexContext) {
        return this.$axios
            .$get(`/tags.json`)
            .then((data) => {
                const tagsArray = [];
                for (const key in data) {
                    tagsArray.push({ ...data[key], id: key });
                }
                vuexContext.commit("getTags", tagsArray);
            })
            .catch((err) => console.log(err));
    }
}

export const getters = {
    tags(state) {
        return state.tags;
    }
}