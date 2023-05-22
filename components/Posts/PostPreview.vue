<template>
    <nuxt-link class="m-2 group w-full md:w-[46%] lg:w-[31.333%]" :to="postLink">
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700">
            <figure class="post-thumbnail" :style="{ backgroundImage: `url(${thumbnail})` }">
                <div class="w-full h-full font-blod bg-white/[0.9] flex justify-center items-center" v-if="!thumbnail">目前沒有圖片</div>
            </figure>
            <div class="px-6 py-4 group-hover:bg-grey-800/[.1] dark:group-hover:bg-white/[.1]">
                <h2 class="font-bold text-xl mb-2 text-black dark:text-white">{{ title }}</h2>
                <p class="text-base pb-1 text-gray-700 dark:text-white">
                    {{ previewText }}
                </p>
                <span class="bg-green-100 text-green-800 badge-style dark:bg-green-900 dark:text-green-300">Vue</span>
                <span class="bg-yellow-100 text-yellow-800 badge-style dark:bg-yellow-900 dark:text-yellow-300">JavaScript</span>
                <span class="bg-blue-100 text-blue-800 badge-style dark:bg-blue-900 dark:text-blue-300">React</span>
                <span class="bg-green-100 text-green-800 badge-style dark:bg-green-900 dark:text-green-300">Nuxt</span>
            </div>
        </div>
    </nuxt-link>
</template>

<script>
export default {
    name: 'PostPreview',
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
        isAdmin: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        postLink(){
            return this.isAdmin ? '/admin/' + this.id : '/posts/' + this.id
        }
    }
}
</script>

<style scoped>
.post-preview {
    /* width: 90%; */
}

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