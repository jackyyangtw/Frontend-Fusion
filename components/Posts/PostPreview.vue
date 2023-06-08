<template>
    <nuxt-link class="m-2 group w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-24px)]" :to="postLink">
        <div class="rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700 mx-auto">
            <figure class="post-thumbnail" :style="{ backgroundImage: `url(${thumbnail})` }">
                <div class="w-full h-full font-blod bg-white/[0.9] flex justify-center items-center" v-if="!thumbnail">目前沒有圖片</div>
            </figure>
            <div class="px-6 py-4 group-hover:bg-sky-500/[.1] dark:group-hover:bg-white/[.1]">
                <h2 class="font-bold text-xl mb-2 text-black dark:text-white">{{ title }}</h2>
                <p class="text-base pb-1 text-gray-700 dark:text-white">
                    {{ previewText }}
                </p>
                <PostBadge v-for="tag in tags" :key="tag.id" :badgeName="tag.name" :classes="getBadgeClass(tag.name)"></PostBadge>
            </div>
        </div>
    </nuxt-link>
</template>
<script>
import PostBadge from '../UI/PostBadge.vue';
export default {
    components: { 
        PostBadge 
    },
    name: 'PostPreview',
    methods: {
        getBadgeClass(tagName) {
            // return this.$tags[tagName];
            if(!this.storeTags) {
                return '';
            } else {
                const tag = this.storeTags.find(tag => tag.name === tagName);
                // return tag.style;
            }
        }
    },
    props: {
        id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        previewText: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        postLink(){
            return this.isAdmin ? '/admin/' + this.id : '/posts/' + this.id
        },
    }
}
</script>

<style scoped>


a {
    text-decoration: none;
    color: black;
}



.post-thumbnail {
  margin: 0;
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
  background-image: url(http://rocketai.org/wp-content/uploads/2021/06/Hi-Tech-Platforms-Information-Services.jpg);
}

.badge-style {
    @apply text-xs font-medium mr-2 px-2.5 py-0.5 rounded;
}


</style>