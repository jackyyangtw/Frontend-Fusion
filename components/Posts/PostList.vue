<template>
    <section
        class="w-full pt-0 lg:pt-6 p-6 flex flex-wrap items-center justify-start container mx-auto"
    >
        <div
            class="w-full pt-0 lg:pt-6 p-6 flex flex-wrap items-center justify-start container mx-auto"
            v-if="loadingPosts"
        >
            <PostPreviewSkeleton v-for="i in posts.length" :key="i" />
        </div>
        <post-preview
            v-else
            v-for="(post, index) in posts"
            :is-admin="isAdmin"
            :key="post.id"
            :id="post.id"
            :title="post.title"
            :previewText="post.previewText"
            :thumbnail="post.thumbnail"
            :tags="post.tags"
            :previewImgUrl="post.previewImgUrl"
            :updatedDate="post.updatedDate"
            :index="index"
            :photoURL="post.photoURL"
            :author="post.author"
        >
        </post-preview>
    </section>
</template>

<script>
import PostPreview from "../Posts/PostPreview.vue";
import PostPreviewSkeleton from "../UI/PostPreviewSkeleton.vue";
export default {
    components: { PostPreview, PostPreviewSkeleton },
    props: {
        isAdmin: {
            type: Boolean,
            required: false,
        },
        posts: {
            type: Array,
            required: true,
            default: () => [],
        },
        loadingPosts: {
            type: Boolean,
            required: false,
        },
    },
};
</script>
