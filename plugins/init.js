// import 

export default defineNuxtPlugin(async nuxtapp => {
    try {
        vuexContext.commit("post/setIsLoadingPosts", true);
        const data = await context.app.$axios.$get("/posts.json");
        const postArr = [];
        for (const key in data) {
            postArr.push({ ...data[key], id: key });
        }
        vuexContext.dispatch("post/setPosts", postArr);
    } catch (e) {
        context.error(e);
    }
})