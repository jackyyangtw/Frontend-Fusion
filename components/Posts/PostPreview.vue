<template>
    <nuxt-link class="post-preview" :to="postLink">
        <!-- <article>
            <figure class="post-thumbnail" :style="{ backgroundImage: `url(${thumbnail})` }"></figure>
            <div class="post-content">
                <h1>{{ title }}</h1>
                <p>{{ previewText }}</p>
            </div>
        </article> -->
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <figure class="post-thumbnail" :style="{ backgroundImage: `url(${thumbnail})` }"></figure>
            <div class="px-6 py-4">
                <h2 class="font-bold text-xl mb-2">{{ title }}</h2>
                <p class="text-gray-700 text-base">
                    {{ previewText }}
                </p>
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
        }
    }
}
</script>

<style scoped>
.post-preview {
    width: 90%;
}

a {
    text-decoration: none;
    color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

.post-thumbnail {
  margin: 0;
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
  background-image: url(http://rocketai.org/wp-content/uploads/2021/06/Hi-Tech-Platforms-Information-Services.jpg);
}

/* .post-content {
  padding: 10px;
  text-align: center;
}

a:hover .post-content,
a:active .post-content {
  background-color: #ccc;
} */
</style>