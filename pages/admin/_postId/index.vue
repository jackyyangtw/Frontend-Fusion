<template>
  <div class="admin-post-page">
    <section class="update-form">
      <admin-post-form
        :post="loadedPost"
        @submit="updatePost"
      ></admin-post-form>
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm.vue";
export default {
  components: { AdminPostForm },
  layout: "admin",
  middleware: ["check-auth", "auth"],
  asyncData(context) {
    return context.app.$axios
      .$get(`/posts/${context.params.postId}.json`)
      .then(data => {
        console.log(data);
        return {
          loadedPost: { ...data, id: context.params.postId }
        };
      })
      .catch(err => console.log(err));
  },
  methods: {
    updatePost(updatedPost) {
      this.$store
        .dispatch("editPost", updatedPost)
        .then(() => this.$router.push("/admin"));
    }
  }
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
