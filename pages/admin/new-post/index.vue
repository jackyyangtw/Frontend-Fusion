<template>
  <div class="admin-new-post-page">
    <section class="new-post-from">
      <admin-post-form @submit="submitForm"></admin-post-form>
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm.vue";
export default {
  components: {
    AdminPostForm
  },
  middleware: ["check-auth", "auth"],
  methods: {
    submitForm(postData) {
      this.$store
        .dispatch("addPost", postData)
        .then(() => this.$router.push("/admin"));
    }
  }
};
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
