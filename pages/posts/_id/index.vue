<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title text-white text-4xl font-black pb-3">{{ loadedPost.title }}</h1>
      <p class="post-content text-white text-xl font-light">{{ loadedPost.previewText }}</p>
      <div class="post-details mb-5">
        <div class="post-detail text-gray-500 mr-3">
          Last updated on {{ loadedPost.updatedDate | date }}
        </div>
        <div class="post-detail text-gray-500">Written by {{ loadedPost.author }}</div>
      </div>
      <p class="post-content text-white">{{ loadedPost.content }}</p>
    </section>
  </div>
</template>

<script>
export default {
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
        structuredData: getStructuredData(context.payload.postData)
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
  /* text-align: center; */
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px 0;
  box-sizing: border-box;
  /* border-bottom: 3px solid #ccc; */
  display: flex;
  /* justify-content: center;
  align-items: center;
  flex-direction: column; */
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  /* color: rgb(88, 88, 88); */
  /* margin: 0 10px; */
}

/* .post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
} */
</style>
