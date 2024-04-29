<template>
    <div class="home-page">
        <section
            class="banner relative intro bg-slate-100 dark:bg-slate-950"
        >
            <AuroraBg />
            <div class="w-full" :style="placeHolderHeight"></div>
            <div class="rounded-md p-6 min-w-[360px] min-h-[200px] mx-auto" style="z-index: 3;">
                <div
                    class="flex flex-col justify-center items-center h-[200px]"
                >
                    <h1
                        class="text-3xl font-bold mb-4 text-blue-400 dark:text-pink-400"
                    >
                        Frontend Fusion - 前端技術融合
                    </h1>
                    <h2
                        class="text-lg font-medium mb-2 text-slate-950 dark:text-slate-50"
                    >
                        探索最新的前端技術和工具
                    </h2>
                </div>
            </div>
        </section>
        <div class="container mx-auto">
            <post-list :posts="loadedPosts" :loadingPosts="isLoadingPosts" admin></post-list>
        </div>
    </div>
</template>

<script>
import PostPreviewSkeleton from '../components/UI/PostPreviewSkeleton.vue';
import AuroraBg from '../components/UI/AuroraBg.vue';
export default {
    head() {
        return {
            title: "Frontend Fusion",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Frontend Fusion",
                },
            ],
        };
    },
    components: {
        PostPreviewSkeleton,AuroraBg
    },
    computed: {
        loadedPosts() {
            return this.$store.getters["post/loadedPosts"];
        },
        isDark() {
            return this.$store.getters["ui/isDark"];
        },
        isLoadingPosts() {
            return this.$store.getters["post/isLoadingPosts"];
        },
        placeHolderHeight() {
            const headerHeight = this.$store.getters["ui/headerHeight"];
            return `height: ${headerHeight}px`;
        },
    },
    mounted() {
        this.$store.commit("post/setIsLoadingPosts", false);
    },
};
</script>

<style scoped>
.intro {
    height: 400px;
    position: relative;
    padding: 30px;
    box-sizing: border-box;
    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

@media (min-width: 768px) {
    .intro h1 {
        font-size: 2rem;
    }
}


</style>
