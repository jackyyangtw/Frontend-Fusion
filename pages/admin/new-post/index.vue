<template>
  <div class="mt-5">
    <admin-post-form @submit="submitForm"></admin-post-form>
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

</style>
