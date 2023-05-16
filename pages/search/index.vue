<template>
    <div>
        <p>Key Words: {{this.searchText}}</p>
        <div v-if="hasPosts">
            <PostList :posts="searchedPosts"></PostList>
        </div>
        <div v-else>
            No posts found
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

<style lang="scss" scoped>

</style>