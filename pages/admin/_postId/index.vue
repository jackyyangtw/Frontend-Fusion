<template>
    <div class="admin-post-page" data-app>
        <AppToast
            :showToast="toast.showToast"
            :message="toast.message"
            :type="toast.type"
        />
        <section class="update-form">
            <admin-post-form
                :post="loadedPost"
                :showDelete="true"
                @submit="updatePost"
                @delete="deletePost"
            ></admin-post-form>
        </section>
    </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm.vue";
export default {
    components: { AdminPostForm },
    middleware: ["check-auth", "auth"],
    head() {
        return {
            title: `${this.loadedPost.title} - Admin`,
        };
    },
    data() {
        return {
            toast: {
                showToast: false,
                message: "",
                type: "success",
            },
        };
    },
    asyncData(context) {
        return context.app.$axios
            .$get(`/posts/${context.params.postId}.json`)
            .then((data) => {
                return {
                    loadedPost: { ...data, id: context.params.postId },
                    dialog: false,
                };
            })
            .catch((err) => console.log(err));
    },
    methods: {
        async updatePost(updatedPost) {
            this.toast.showToast = true;
            this.toast.message = "文章更新中...";
            this.toast.type = "loading";
            await this.$store.dispatch("post/editPost", updatedPost);
            setTimeout(() => {
                this.toast.message = "文章更成功!";
                this.toast.type = "success";
            }, 1000);
            setTimeout(() => {
                this.$router.push("/admin");
            }, 3000);
        },
        async deletePost(deleteId) {
            this.toast.showToast = true;
            this.toast.message = "文章刪除中...";
            this.toast.type = "loading";
            await this.$store.dispatch("post/deletePost", deleteId);
            setTimeout(() => {
                this.toast.message = "文章已刪除";
                this.toast.type = "success";
            }, 1000);
            setTimeout(() => {
                this.$router.push("/admin");
            }, 3000);
        },
    },
    created() {
        this.$store.dispatch("user/setUserData");
    },
};
</script>

<style scoped>
.update-form {
    width: 90%;
    margin: 20px auto;
}
</style>
