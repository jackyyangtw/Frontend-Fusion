<template>
    <div class="my-10">
        <AppToast
            :showToast="toast.showToast"
            :message="toast.message"
            :type="toast.type"
            @closeToast="toast.showToast = false"
        ></AppToast>
        <admin-post-form
            @submit="submitForm"
            :showDelete="false"
        ></admin-post-form>
    </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm.vue";
export default {
    components: {
        AdminPostForm,
    },
    data() {
        return {
            toast: {
                showToast: false,
                message: "新增文章成功",
                type: "success",
            },
        };
    },
    middleware: ["check-auth", "auth"],
    methods: {
        async submitForm(postData) {
            this.toast.showToast = true;
            this.toast.message = "新增文章中...";
            this.toast.type = "loading";
            await this.$store.dispatch("post/addPost", postData);
            setTimeout(() => {
                this.toast.message = "新增文章成功";
                this.toast.type = "success";
            }, 2000);
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


