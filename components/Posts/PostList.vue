<template>
    <section class="p-6 flex flex-wrap items-center justify-start">
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
