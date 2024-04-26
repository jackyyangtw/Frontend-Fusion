<template>
    <div>
        <div class="container mx-auto" v-if="hasPosts">
            <p class="text-style">
                關鍵字:
                <span class="text-sky-600 dark:text-pink-400">{{
                    this.searchText
                }}</span>
            </p>
        </div>
        <div class="container mx-auto" v-if="hasPosts">
            <PostList :posts="searchedPosts"></PostList>
        </div>
        <div class="container mx-auto" v-else>
            <div class="text-style">沒有找到任何文章</div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import PostList from "../../components/Posts/PostList.vue";
export default {
    head() {
        return {
            title: "搜尋文章:" + this.searchText,
        };
    },
    components: {
        PostList,
    },
    data() {
        return {
            searchedPosts: [],
        };
    },
    updated() {
        this.$store.dispatch("ui/setLoading", false);
    },
    created() {
        this.$store.dispatch("ui/setLoading", false);
        const searchText = this.$store.getters.searchText;
        this.setSearchedPosts(searchText);
    },
    computed: {
        ...mapState(["searchText"]),
        hasPosts() {
            return this.searchedPosts.length > 0;
        },
    },
    methods: {
        setSearchedPosts(posts) {
            if (!this.searchText) {
                return;
            }
            this.searchedPosts = this.$store.getters["post/loadedPosts"].filter(
                (post) => {
                    return (
                        post.title
                            .toLowerCase()
                            .includes(posts.toLowerCase()) ||
                        post.content
                            .toLowerCase()
                            .includes(posts.toLowerCase()) ||
                        post.previewText
                            .toLowerCase()
                            .includes(posts.toLowerCase())
                    );
                }
            );
        },
    },
    mounted() {
        this.$watch("searchText", () => {
            this.setSearchedPosts(this.searchText);
        });
    },
};
</script>

<style scoped>
.text-style {
    @apply text-slate-950 dark:text-white text-center text-2xl font-medium;
}
</style>