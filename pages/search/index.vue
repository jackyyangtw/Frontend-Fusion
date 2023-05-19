<template>
    <div>
        <div class="container mt-5">
            <p class="text-style">
                Key Words: 
                <span class="text-sky-500 dark:text-pink-500">{{this.searchText}}</span>
            </p>
        </div>
        <div v-if="hasPosts">
            <PostList :posts="searchedPosts"></PostList>
        </div>
        <div class="container" v-else>
            <div class="text-style">
                No posts found
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import PostList from '../../components/Posts/PostList.vue';
    export default {
        components: {
            PostList
        },
        data() {
            return {
                searchedPosts: []
            };
        },
        updated(){
            this.$store.dispatch("setLoading", false)
        },
        created() {
            this.$store.dispatch("setLoading", false)
            const searchText = this.$store.getters.searchText;
            this.setSearchedPosts(searchText)
        },
        computed: {
            ...mapState(["searchText"]),
            hasPosts() {
                return this.searchedPosts.length > 0;
            }
        },
        methods: {
            setSearchedPosts(posts) {
                if(!this.searchText) {
                    return;
                }
                this.searchedPosts = this.$store.getters.loadedPosts.filter(post => {
                    return post.title.toLowerCase().includes(posts.toLowerCase()) || post.content.toLowerCase().includes(posts.toLowerCase());
                });
                
            }
        },
        mounted() {
            this.$watch("searchText", () => {
                    this.setSearchedPosts(this.searchText);
                }
            );
        }
        
    }
</script>

<style scoped>
.text-style {
    @apply text-slate-950 dark:text-white text-center text-2xl font-medium;
}
</style>