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
                :userData="userData"
                @submit="updatePost"
                @delete="deletePost"
                @previewImgChange="onPreviewImgChange"
            ></admin-post-form>
        </section>
    </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm.vue";
export default {
    components: { AdminPostForm },
    middleware: ["check-auth", "auth"],
    lauout: "admin",
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
            isPreviewImgChange: false,
        };
    },
    asyncData(context) {
        return context.app.$axios
            .$get(`/posts/${context.params.postId}.json`)
            .then((data) => {
                return {
                    loadedPost: {
                        ...data,
                        id: context.params.postId,
                        previewImgUrl: data.previewImgUrl
                            ? data.previewImgUrl
                            : "",
                    },
                    dialog: false,
                };
            })
            .catch((err) => console.log(err));
    },
    methods: {
        async updatePost(updatedPost) {
            let updateData;
            try {
                this.toast.showToast = true;
                this.toast.message = "文章更新中...";
                this.toast.type = "loading";

                let imgUrl;
                if (this.isPreviewImgChange) {
                    imgUrl = await this.$store.dispatch(
                        "post/uploadPreviewImage",
                        {
                            postId: updatedPost.id,
                            previewImageFile: updatedPost.previewImageFile,
                        }
                    );
                } else {
                    imgUrl = this.loadedPost.previewImgUrl;
                }
                updateData = {
                    ...updatedPost,
                    previewImgUrl: imgUrl,
                };

                await this.$store.dispatch("post/editPost", updateData);
                setTimeout(() => {
                    this.toast.message = "文章更成功!";
                    this.toast.type = "success";
                }, 1000);
                setTimeout(() => {
                    this.$router.push("/admin");
                }, 3000);
            } catch (err) {
                console.log(err);
            }
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
        onPreviewImgChange(data) {
            console.log("previewImgChange");
            const { previewImageFile, previewImgUrl } = data;
            this.loadedPost.previewImageFile = previewImageFile;
            this.loadedPost.previewImgUrl = previewImgUrl;
        },
    },
    computed: {
        userData() {
            return this.$store.getters["user/userData"];
        },
    },
    watch: {
        "loadedPost.previewImgUrl": function (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.isPreviewImgChange = true;
            }
        },
    },
    created() {
        this.$store.dispatch("user/setUserData");
    },
    mounted() {
        // 取得firebase storage images/posts/:postId 下的所有檔案，然後刪除
        // const storage = this.$storage;
        // const storageRef = storage.ref();
        // const listRef = storageRef.child(
        //     `images/posts/${this.loadedPost.id}/previewImg`
        // );
        // listRef.listAll().then((res) => {
        //     console.log(res.items);
        //     res.items.forEach((itemRef) => {
        //         itemRef.delete();
        //     });
        // });
    },
};
</script>

<style scoped>
.update-form {
    width: 90%;
    margin: 20px auto;
}
</style>
