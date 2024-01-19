export const state = () => ({
    loadedImages: [],
    cachedImages: {},
});

export const mutations = {
    ADD_IMAGE(state, url) {
        state.loadedImages.push(url);
    },
    SET_CACHED_IMAGE(state, imgSrc) {
        if (!state.cachedImages[imgSrc]) {
            state.cachedImages[imgSrc] = imgSrc;
        }
    },
};

export const getters = {
    loadedImages(state) {
        return state.loadedImages;
    },
    getCachedImage: (state) => (imgSrc) => {
        return state.cachedImages[imgSrc];
    },
};

export const actions = {
    loadImage({ commit, state }, url) {
        if (!state.loadedImages.includes(url)) {
            commit('ADD_IMAGE', url);
        }
    },
    cacheImage({ commit }, imgSrc) {
        commit('SET_CACHED_IMAGE', imgSrc);
    },
};