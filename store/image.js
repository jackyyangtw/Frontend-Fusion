function transformIpxUrl(url) {
    // /_ipx/_
    if (url.includes("/images/")) {
        return url.replace("/images/", "/_ipx/_/images/");
    }
    return url;
}

export const state = () => ({
    cachedImages: [],
});

export const mutations = {
    ADD_IMAGE_TO_CACHE(state, imageUrl) {
        if (!state.cachedImages.includes(imageUrl)) {
            state.cachedImages.push(imageUrl);
        }
    },
};

export const actions = {
    cacheImage({ commit }, imageUrl) {
        // const transformedUrl = transformIpxUrl(imageUrl);
        commit("ADD_IMAGE_TO_CACHE", imageUrl);
    },
};

export const getters = {
    isImageCached: (state) => (imageUrl) => {
        return state.cachedImages.includes(imageUrl);
    },
    getCachedImage: (state) => (imageUrl) => {
        return state.cachedImages.find((img) => img === imageUrl) || null;
    },
};
