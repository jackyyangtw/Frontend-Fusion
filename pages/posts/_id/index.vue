<template>
  <div class="single-post-page container">
    <div class=" w-full md:w-[60%] lg:w-[750px] mx-auto">
      <section class="post">
        <h1 class="post-title text-slate-950 dark:text-white text-4xl font-black pb-3">{{ loadedPost.title }}</h1>
        <p class="post-content text-slate-950 dark:text-white text-xl font-light">{{ loadedPost.previewText }}</p>
        <div class="post-details mb-5">
          <div class="text-gray-400 dark:text-gray-500 mr-3">
            Last updated on {{ loadedPost.updatedDate | date }}
          </div>
          <div class="text-gray-400 dark:text-gray-500">Written by {{ loadedPost.author }}</div>
        </div>
        <div class="ql-snow">
          <div class="post-content text-slate-950 dark:text-white ql-editor !p-0 !leading-8" v-html="loadedPost.content"></div>
        </div>
      </section>
      <section class="comments mt-20">
        <!-- <comment-form :post="loadedPost" /> -->
        <!-- <comment-list :comments="loadedPost.comments" /> -->
      </section>
    </div>
  </div>
</template>

<script>
import CommentForm from '~/components/Posts/CommentForm.vue'
import CommentList from '~/components/Posts/CommentList.vue'
export default {
  components: {
    CommentForm,CommentList
  },
  head(){
    return {
      title: this.loadedPost.title,
      meta: [
        {
          hid: 'description', // unique id for this meta
          name: 'description', 
          content: this.loadedPost.previewText
        },
        {
          hid: 'author',
          name: 'author', 
          content: this.loadedPost.author
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          json: this.structuredData,
        }
      ]
    }
  },
  asyncData(context) {
    const getStructuredData = (postData) => {
      return {
        "@context": "http://schema.org",
        "@type": "Article",
        "headline": postData.title,
        "image": "https://example.com/article-image.jpg",
        "author": {
          "@type": "Person",
          "name": postData.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "Jacky",
          "logo": {
            "@type": "ImageObject",
            "url": "https://example.com/publisher-logo.jpg"
          }
        },
        "datePublished": "2022-05-01T08:00:00+08:00",
        "dateModified": "2022-05-10T10:00:00+08:00",
        "articleBody": postData.previewText
      }
    }
    if (context.payload) {
      return {
        loadedPost: context.payload.postData,
        structuredData: getStructuredData(context.payload.postData),
      };
    }
    return context.app.$axios
      .$get(`/posts/${context.params.id}.json`)
      .then(data => {
        return {
          loadedPost: data,
          structuredData: getStructuredData(data)
        };
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>

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
  @apply flex flex-col md:flex-row text-sm
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

</style>
