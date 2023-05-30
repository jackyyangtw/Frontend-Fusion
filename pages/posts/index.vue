<template>
  <div class="posts-page container">
    <post-list :posts="loadedPosts"></post-list>
  </div>
</template>

<script>
export default {
  computed: {
    loadedPosts() {
      return this.$store.getters['post/loadedPosts']
    }
  }

}
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

