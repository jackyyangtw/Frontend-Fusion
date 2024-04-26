<template>
    <div class="single-post-page container">
        <div class="w-full xl:w-[900px] mx-auto">
            <section class="post">
                <div class="mb-5 rel lg:min-h-[514px]">
                    <BannerSkeleton
                        v-if="isLoadingBanner"
                        class="w-full h-[300px] md:h-[400px] lg:h-[500px]"
                    />
                    <transition v-else name="fade">                    
                        <nuxt-img
                            preload
                            class="object-cover"
                            alt=""
                            :provider="imgProvider"
                            :src="previewImg"
                            placeholder
                            sizes="100vw"
                        />
                    </transition>
                </div>
                <div class="flex justify-between">
                    <h1
                        class="post-title text-sky-600 dark:text-pink-400 text-4xl font-bold pb-2"
                    >
                        {{ loadedPost.title }}
                    </h1>
                    <nuxt-link v-if="isAuthor" :to="`/admin/${postId}`" aria-label="edit icon">
                        <label
                            for="photo"
                            class="cursor-pointer w-10 h-10 p-2 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-slate-300"
                        >
                                <img
                                    :src="
                                        require('@/static/images/edit-pen-icon.svg')
                                    "
                                    alt=""
                                />
                        </label>
                    </nuxt-link>
                </div>
                <h2
                    class="post-content text-black dark:text-white text-xl font-bold pb-3"
                >
                    {{ loadedPost.previewText }}
                </h2>
                <div class="post-details mb-5">
                    <div class="text-gray-400 dark:text-gray-500 mr-3">
                        Last updated on {{ loadedPost.updatedDate | date }}
                    </div>
                    <div class="text-gray-400 dark:text-gray-500 mr-5">
                        Written by &nbsp;
                        <a
                            :href="'mailto:' + userEmail"
                            class="italic text-gray-500 dark:text-gray-400 hover:text-gray-600"
                        >
                            {{ loadedPost.author }}@{{ userEmailMain }}</a
                        >
                    </div>
                </div>
                <div class="ql-snow">
                    <div
                        class="post-content text-slate-950 dark:text-white ql-editor !p-0 !leading-8"
                        v-html="loadedPost.content"
                    ></div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import CommentForm from "~/components/Posts/CommentForm.vue";
import CommentList from "~/components/Posts/CommentList.vue";
import BannerSkeleton from "@/components/UI/BannerSkeleton.vue";
export default {
    components: {
        CommentForm,
        CommentList,BannerSkeleton
    },
    head() {
        return {
            title: this.loadedPost.title,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.loadedPost.previewText,
                },
                {
                    hid: "author",
                    name: "author",
                    content: this.loadedPost.author,
                },
            ],
            script: [
                {
                    type: "application/ld+json",
                    json: this.structuredData,
                },
            ],
        };
    },
    asyncData(context) {
        const getStructuredData = (postData) => {
            return {
                "@context": "http://schema.org",
                "@type": "Article",
                headline: postData.title,
                image: postData.previewImgUrl || postData.thumbnail || "",
                author: {
                    "@type": "Person",
                    name: postData.author,
                },
                datePublished: postData.updatedDate || "",
                url: context.req
                    ? `https://${context.req.headers.host}${context.route.path}`
                    : "",
                description: postData.previewText,
            };
        };
        if (context.payload) {
            return {
                loadedPost: context.payload.postData,
                structuredData: getStructuredData(context.payload.postData),
            };
        }
        return context.app.$axios
            .$get(`/posts/${context.params.id}.json`)
            .then((data) => {
                return {
                    loadedPost: data,
                    structuredData: getStructuredData(data),
                };
            })
            .catch((err) => console.log(err));
    },
    data() {
        return {
            isLoadingBanner: true,
        };
    },
    computed: {
        isAuthor() {
            return this.loadedPost.userId === this.userData.id;
        },
        postId() {
            return this.$route.params.id;
        },
        userEmail() {
            return this.userData.email || "";
        },
        userEmailMain() {
            const email = this.userData.email;
            if (!email) return "";
            return email.split("@")[0];
        },
        userData() {
            return this.$store.getters["user/userData"] || "";
        },
        previewImg() {
            return (
                this.loadedPost.previewImgUrl ||
                this.loadedPost.thumbnail ||
                process.env.DEFAULT_PREVIEW_IMG_URL
            );
        },
        imgProvider() {
            const hasImg =
                this.loadedPost.previewImgUrl || this.loadedPost.thumbnail;
            if (process.env.NODE_ENV === "production") {
                return "static";
            } else {
                return hasImg ? "ipx" : "static";
            }
        },
    },
    created() {
        this.$store.dispatch("user/setUserData");
    },
    mounted() {
        this.isLoadingBanner = false;
    },
};
</script>

<style scoped lang="postcss">
.single-post-page {
    padding: 30px;
    box-sizing: border-box;
}

.post-title {
    margin: 0;
}

.post-details {
    padding: 5px 0;
    box-sizing: border-box;
    @apply flex flex-col md:flex-row text-sm;
}

@media (min-width: 768px) {
    .post-details {
        flex-direction: row;
    }
}
</style>
