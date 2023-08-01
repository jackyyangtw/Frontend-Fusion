<template>
    <transition name="vagueIn">
        <nuxt-link
            v-if="isMounted"
            class="mx-2 my-4 group w-full md:w-[calc(50%-16px)] 2xl:w-[calc(33.333%-24px)] ease-in duration-300 transition"
            :to="postLink"
        >
            <div
                class="rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700 mx-auto"
            >
                <figure
                    class="post-thumbnail relative h-[180px] md:h-[200px] xl:h-[250px]"
                >
                    <nuxt-img
                        :provider="imgProvider"
                        :preload="index === 0"
                        class="object-cover absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                        :src="previewImg"
                        alt=""
                    />
                </figure>
                <div
                    class="px-6 py-4 group-hover:bg-sky-500/[.1] dark:group-hover:bg-white/[.1] min-h-[150px] flex flex-col justify-center"
                >
                    <div>
                        <h2
                            class="font-bold text-xl mb-2 text-black dark:text-white"
                        >
                            {{ title }}
                        </h2>
                        <p class="text-base pb-1 text-gray-700 dark:text-white">
                            {{ maxPreviewText }}
                        </p>
                        <PostBadge
                            v-for="tag in tags"
                            :key="tag"
                            :badgeName="tag"
                            :classes="getBadgeClass(tag)"
                        ></PostBadge>
                    </div>
                </div>
            </div>
        </nuxt-link>
    </transition>
</template>
<script>
import PostBadge from "../UI/PostBadge.vue";
export default {
    components: {
        PostBadge,
    },
    name: "PostPreview",
    data() {
        return {
            isMounted: false,
        };
    },
    methods: {
        getBadgeClass(tagName) {
            if (process.client) {
                const storeTag = this.$store.getters["tag/tags"];
                const tag = storeTag.find((tag) => tag.name === tagName);
                if (tag) {
                    return tag.style;
                }
            }
        },
    },
    props: {
        id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        previewText: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
        },
        previewImgUrl: {
            type: String,
            required: false,
        },
        index: {
            type: Number,
            required: true,
        },
        updatedDate: {
            type: [String, Date],
            required: true,
        },
    },
    computed: {
        postLink() {
            return this.isAdmin ? "/admin/" + this.id : "/posts/" + this.id;
        },
        previewImg() {
            return (
                this.previewImgUrl ||
                this.thumbnail ||
                `/images/post-preview-picture.png`
            );
        },
        maxPreviewText() {
            const maxNum = 55;
            if (this.previewText.length >= maxNum) {
                return this.previewText.slice(0, maxNum) + "...";
            }
            return this.previewText;
        },
        imgProvider() {
            return this.previewImgUrl || this.thumbnail ? "" : "static";
        },
    },
    mounted() {
        this.isMounted = true;
    },
};
</script>

<style scoped>
a {
    text-decoration: none;
    color: black;
}

.post-thumbnail {
    margin: 0;
    width: 100%;
    overflow: hidden;
}

.badge-style {
    @apply text-xs font-medium mr-2 px-2.5 py-0.5 rounded;
}
</style>