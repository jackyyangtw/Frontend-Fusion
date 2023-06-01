<template>
  <div class="xl:flex items-start">
    <div class="sidebar-placeholder hidden xl:block h:10" :style="{width: sidebarWidth + 'px'}"></div>
    <post-filter :posts="loadedPosts" :selectedTag="selectedTag" @setFilter="setFilter"></post-filter>
    <post-list :posts="filteredPosts"></post-list>
  </div>
</template>

<script>
import PostFilter from '../../components/Posts/PostFilter.vue'
export default {
  components: {
    PostFilter
  },
  data(){
    return {
      selectedTag: '全部類型'
    }
  },
  computed: {
    loadedPosts() {
      return this.$store.getters['post/loadedPosts']
    },
    filteredPosts() {
      if (this.selectedTag === '全部類型') {
        return this.loadedPosts
      }
      return this.loadedPosts.filter(post => {
        return post.tags.includes(this.selectedTag)
      })
    },
    sidebarWidth() {
      return this.$store.getters['ui/sidebarWidth']
    }
  },
  methods: {
    getSidebarWidth(width) {
      console.log(width)
      return this.sidebarWidth = width
    },
    setFilter(tag) {
      this.selectedTag = tag
    },
    setAllTag(tag) {
      this.selectedTag = tag
    }
  },

}
</script>

<style scoped>
/* .posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
} */
</style>

