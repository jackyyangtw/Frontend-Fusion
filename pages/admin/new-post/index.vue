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
    head() {
        return {
            title: "新增文章",
        };
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
                this.toast = {
                    showToast: true,
                    message: "新增文章中...",
                    type: "loading",
                };
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

                const uploadedContentImagesFiles =
                    postData.uploadedContentImages;

                if (uploadedContentImagesFiles.length > 0) {
                    this.toast = {
                        showToast: true,
                        message: "正在上傳文章圖片...",
                        type: "loading",
                    };
                    const storageRef = this.$storage.ref(
                        `images/posts/${postId}/content`
                    );
                    // 上傳所有圖片
                    for (
                        let i = 0;
                        i < uploadedContentImagesFiles.length;
                        i++
                    ) {
                        const image = uploadedContentImagesFiles[i];
                        const imageRef = storageRef.child(image.file.name);
                        await imageRef.put(image.file);
                        const url = await imageRef.getDownloadURL();
                        // 替換所有content中的圖片路徑，只替換img tag的src，其他的HTML CODE 字串要保持原樣
                        updateData.content = updateData.content.replace(
                            `src="${image.src}"`,
                            `src="${url}"`
                        );
                    }
                }

                await this.$store.dispatch("post/editPost", updateData);
                setTimeout(() => {
                    this.toast.message = "新增文章成功";
                    this.toast.type = "success";
                }, 2000);
                setTimeout(() => {
                    this.$router.push("/admin");
                }, 3000);
            } catch (error) {
                this.toast = {
                    showToast: true,
                    message: error.message,
                    type: "error",
                };
            }
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
    // layout: "admin",
    created() {
        this.$store.dispatch("user/setUserData");
        this.$store.dispatch("refreshToken");
    },
};
</script>


