<template>
    <section class="featured-posts">
        <post-preview
            :is-admin="isAdmin" 
            v-for="post in posts"
            :key="post.id"
            :id="post.id"
            :title="post.title"
            :previewText="post.previewText"
            :thumbnail="post.thumbnail"
        >
        </post-preview>
    </section>
</template>

<script>
import PostPreview from '../Posts/PostPreview.vue';
export default {
    components: { PostPreview },
    props: {
        isAdmin: {
            type: Boolean,
            required: false
        },
        posts: {
            type: Array,
            required: true
        }
    },
}
</script>

<style scoped>

.featured-posts {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}
</style>