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
                // const imgUrl = await this.uploadPreviewImage(
                //     postId,
                //     postData.previewImageFile
                // );
                const imgUrl = await this.$store.dispatch(
                    "post/uploadPreviewImage",
                    {
                        postId,
                        imgFile: postData.previewImageFile,
                    }
                );
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
        // async uploadPreviewImage(postId, imgFile) {
        //     // 上傳圖片到firebase storage 路徑: images/posts/:postId/previewImg/:fileName
        //     const fileName = imgFile.name;
        //     const storageRef = this.$storage.ref();
        //     try {
        //         const uploadTask = await storageRef
        //             .child(`images/posts/${postId}/previewImg/${fileName}`)
        //             .put(imgFile);
        //         return await uploadTask.ref.getDownloadURL();
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },
    },
    created() {
        this.$store.dispatch("user/setUserData");
    },
};
</script>


