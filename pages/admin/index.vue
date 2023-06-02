<template>
  <div class="admin-page container">
    <section class="new-post">
      <p class="text-black text-2xl dark:text-white pr-6">
        <span class="text-sky-500 dark:text-pink-500 font-bold">Hello, </span>
        <span
          class="inline-block underline decoration-sky-500 dark:decoration-pink-500"
        >
          {{ userData.name }}</span
        >
      </p>
      <AppButton
        :btnStyle="`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`"
        @click="$router.push('/admin/new-post')"
        >新增文章</AppButton
      >
      <AppButton
        v-if="isManager"
        :btnStyle="`ml-[10px] focus:outline-none text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-red-900`"
        @click="$router.push('/admin/tag')"
        >Tag管理</AppButton
      >
      <AppButton
        :btnStyle="`ml-[10px] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`"
        @click="onLogout"
        >登出</AppButton
      >
    </section>
    <section class="pt-8">
      <h1
        class="text-center text-blue-400 dark:text-pink-400 text-3xl font-bold"
      >
        {{ userPosts.length > 0 ? "現有的文章" : "目前沒有文章" }}
      </h1>
      <post-list isAdmin :posts="userPosts"></post-list>
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
    },
  },
  computed: {
    loadedPosts() {
      return this.$store.getters["post/loadedPosts"];
    },
    userPosts() {
      return this.$store.getters["user/userPosts"] || [];
    },
    userData() {
      return this.$store.getters["user/userData"] || "";
    },
    isManager() {
      return this.$store.getters["user/isManager"];
    },
  },
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  padding-bottom: 10px;
  @apply flex justify-center items-center;
}
</style>
