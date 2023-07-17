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
            @previewImgChange="onPreviewImgChange"
            @contentChange="onContentChange"
            :showDelete="false"
            :userData="userData"
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
            post: {
                author: this.userName,
                title: "",
                thumbnail: "",
                content: "",
                previewText: "",
                tags: [],
                previewImgUrl: "",
            },
        };
    },
    middleware: ["check-auth", "auth"],
    // layout: "admin",
    methods: {
        async submitForm(postData) {
            try {
                this.toast.showToast = true;
                this.toast.message = "新增文章中...";
                this.toast.type = "loading";
                const resData = await this.$store.dispatch(
                    "post/addPost",
                    postData
                );
                const postId = resData.id;
                let imgUrl = "";
                if (postData.previewImageFile) {
                    imgUrl = await this.$store.dispatch(
                        "post/uploadPreviewImage",
                        {
                            postId,
                            previewImageFile: postData.previewImageFile,
                        }
                    );
                }
                const updateData = {
                    ...resData,
                    previewImgUrl: imgUrl,
                    id: postId,
                };

                await this.$store.dispatch("post/editPost", updateData);
                setTimeout(() => {
                    this.toast.message = "新增文章成功";
                    this.toast.type = "success";
                }, 2000);
                setTimeout(() => {
                    this.$router.push("/admin");
                }, 3000);
            } catch (error) {
                this.toast.showToast = true;
                this.toast.message = error.message;
                this.toast.type = "error";
            }
        },
        onPreviewImgChange(data) {
            const { previewImageFile, previewImgUrl } = data;
            this.post.previewImageFile = previewImageFile;
            this.post.previewImgUrl = previewImgUrl;
        },
        onContentChange(data) {
            const { content } = data;
            this.post.content = content;
        },
    },
    computed: {
        userData() {
            return this.$store.getters["user/userData"];
        },
        userName() {
            if (!this.userData) return "";
            return this.userData.name || "";
        },
    },
    created() {
        this.$store.dispatch("user/setUserData");
    },
};
</script>


