<template>
    <div class="mx-2 block my-4 group w-full md:w-[calc(50%-16px)] 2xl:w-[calc(33.333%-24px)] ease-in duration-300 transition relative">
        <transition name="vagueIn">
            <nuxt-link
                v-if="isMounted"
                :to="postLink"
                >
                <div
                class="rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700 mx-auto"
                @mouseenter.self="setShowButtons"
                @mouseleave.self="setShowButtons"
                >
                    <figure class="post-thumbnail relative h-[200px] xl:h-[250px]">
                        <nuxt-img
                            class="object-cover absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                            :provider="imgProvider"
                            :preload="index === 0 || index === 1"
                            :src="cachedPreviewImg"
                            :key="id"
                            fit="cover"
                            width="1792"
                            height="1024"
                            alt=""
                            @load="handleLoad(previewImg)"
                        />
                    </figure>
                    <div
                        class="px-6 py-4 group-hover:bg-sky-500/[.1] dark:group-hover:bg-white/[.1] min-h-[220px] flex flex-col justify-center"
                    >
                        <div>
                            <div class="flex items-center pb-1">
                                <img
                                    class="w-8 h-8 mr-3 rounded-full"
                                    :src="
                                        photoURL ||
                                        require('/static/images/no-user-image.gif')
                                    "
                                    alt="user icon"
                                />
                                <p class="text-sm text-gray-700 dark:text-white">
                                    {{ author }} •
                                    {{ dateString }}
                                </p>
                            </div>
                            <h2
                                class="font-bold text-xl mb-2 text-black dark:text-white line-clamp-2"
                            >
                                {{ maxTitleText }}
                            </h2>
                            <p class="text-base pb-1 text-gray-700 dark:text-white line-clamp-2">
                                {{ maxPreviewText }}
                            </p>
                            <div class="mt-2">
                                <PostBadge
                                    v-for="tag in tags"
                                    :key="tag"
                                    :badgeName="tag"
                                    :classes="getBadgeClass(tag)"
                                ></PostBadge>
                            </div>
                        </div>
                    </div>
                </div>
            </nuxt-link>
        </transition>
        <transition name="fade">
            <div 
                class="z-10 buttons absolute inset-0 left-0 top-0 flex justify-center items-center bg-black/[0.5] dark:bg-black/[0.7]" 
                v-show="onAdminRoute && showButtons"
                @mouseenter.self="setShowButtons"
                @mouseleave.self="setShowButtons"
            >
                <nuxt-link
                    :to="`/admin/${id}`"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3"
                >
                    編輯
                </nuxt-link>
                <nuxt-link
                    :to="`/posts/${id}`"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    前往預覽
                </nuxt-link>
            </div>
        </transition>
    </div>
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
            showButtons: false,
        };
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
        photoURL: {
            type: String,
            required: false,
        },
        author: {
            type: String,
            required: true,
        },
    },
    methods: {
        setShowButtons() {
            this.showButtons = !this.showButtons;
        },
        getBadgeClass(tagName) {
            if (process.client) {
                const storeTag = this.$store.getters["tag/tags"];
                const tag = storeTag.find((tag) => tag.name === tagName);
                if (tag) {
                    return tag.style;
                }
            }
        },
        handleLoad(src) {
            // this.$store.dispatch('image/loadImage', src);
            this.$store.dispatch('image/cacheImage', src);
        },
    },
    computed: {
        onAdminRoute() {
            return this.$route.path.includes("/admin");
        },
        dateString() {
            return new Date(this.updatedDate).toLocaleString("zh-TW", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
        },
        postLink() {
            return this.isAdmin ? "/admin/" + this.id : "/posts/" + this.id;
        },
        previewImg() {
            return (
                this.previewImgUrl ||
                this.thumbnail ||
                process.env.DEFAULT_PREVIEW_IMG_URL
            );
        },
        cachedPreviewImg() {
            const cachedImg = this.$store.getters['image/getCachedImage'](this.previewImg);
            return cachedImg || this.previewImg;
        },
        maxPreviewText() {
            const maxNum = 55;
            if (this.previewText.length >= maxNum) {
                return this.previewText.slice(0, maxNum) + "...";
            }
            return this.previewText;
        },
        maxTitleText() {
            const maxNum = 50;
            if (this.title.length >= maxNum) {
                return this.title.slice(0, maxNum) + "...";
            }
            return this.title;
        },
        imgProvider() {
            const hasImg = this.previewImgUrl || this.thumbnail;
            if (process.env.NODE_ENV === "production") {
                return hasImg ? "" : "static";
            } else {
                return hasImg ? "ipx" : "static";
            }
        },
    },
    mounted() {
        this.isMounted = true;
    },
};
</script>

<style scoped>
.post-thumbnail {
    margin: 0;
    width: 100%;
    overflow: hidden;
}

.badge-style {
    @apply text-xs font-medium mr-2 px-2.5 py-0.5 rounded;
}
</style>