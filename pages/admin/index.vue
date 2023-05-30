<template>
  <div class="admin-page container">
    <section class="new-post">
      <AppButton :btnStyle="`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`" @click="$router.push('/admin/new-post')"
        >新增文章</AppButton
      >
      <AppButton :btnStyle="`ml-[10px] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`" @click="onLogout"
        >登出</AppButton
      >
    </section>
    <section class="pt-8">
      <h1 class="text-center text-blue-400 dark:text-pink-400 text-3xl font-bold">現有的文章</h1>
      <post-list isAdmin :posts="loadedPosts"></post-list>
    </section>
  </div>
</template>

<script>
export default {
  // layout: "admin",
  middleware: ["check-auth", "auth"],
  methods: {
    onLogout() {
      this.$store.dispatch("onLogout");
      this.$router.push("/admin/auth");
    }
  },
  computed: {
    loadedPosts() {
      return this.$store.getters['post/loadedPosts'];
    }
  }
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  /* border-bottom: 2px solid #ccc; */
  padding-bottom: 10px;
}

/* .existing-posts h1 {
  text-align: center;
} */
</style>
