<template>
    <div class="home-page">
        <section
            class="intro bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-950 dark:to-slate-800"
        >
            <div class="rounded-md p-6 min-w-[360px] min-h-[200px] mx-auto">
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
            <post-list :posts="loadedPosts" admin></post-list>
        </div>
    </div>
</template>

<script>
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
    computed: {
        loadedPosts() {
            return this.$store.getters["post/loadedPosts"];
        },
        isDark() {
            return this.$store.getters["ui/isDark"];
        },
    },
};
</script>

<style scoped>
.intro {
    height: 320px;
    position: relative;
    padding: 30px;
    box-sizing: border-box;
    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (min-width: 768px) {
    .intro h1 {
        font-size: 2rem;
    }
}
</style>
