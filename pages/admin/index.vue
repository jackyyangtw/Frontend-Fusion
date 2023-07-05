<template>
    <div class="admin-page container">
        <AppToast
            :showToast="toast.showToast"
            :message="toast.message"
            :type="toast.type"
            @closeToast="closeToast"
        />
        <UserCard
            @showToast="updatePhoto"
            :userData="userData"
            :isManager="isManager"
            :loadingCard="loadingCard"
        />

        <section class="pt-8">
            <h1
                class="text-center text-blue-400 dark:text-pink-400 text-3xl font-bold"
            >
                {{ userPosts.length > 0 ? "現有的文章" : "目前沒有文章" }}
            </h1>
            <post-list
                isAdmin
                :posts="userPosts"
                :loadingPosts="loadingPosts"
            ></post-list>
        </section>
    </div>
</template>

<script>
import UserCard from "../../components/Admin/UserCard.vue";

export default {
    // layout: "admin",
    head() {
        return {
            title: "管理者頁面",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "管理者頁面",
                },
            ],
        };
    },
    components: {
        UserCard,
    },
    middleware: ["check-auth", "auth"],
    data() {
        return {
            loadingCard: false,
            loadingPosts: false,
            toast: {
                showToast: false,
                message: "",
                type: "success",
            },
        };
    },
    methods: {
        closeToast() {
            this.toast.showToast = false;
        },
        updatePhoto(showToast) {
            if (showToast.show) {
                this.toast.showToast = true;
                this.toast.message = "更新圖片中...";
                this.toast.type = "loading";
            } else if (showToast.type === "error") {
                this.toast.message = showToast.msg;
                this.toast.type = "error";
            } else if (!showToast.show) {
                setTimeout(() => {
                    this.toast.message = "更新圖片成功!";
                    this.toast.type = "success";
                }, 2000);
                setTimeout(() => {
                    this.toast.showToast = false;
                }, 4000);
            }
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
            return this.$store.getters["user/userData"] || {};
        },
        isManager() {
            return this.userData.isManager || false;
        },
    },
    async created() {
        // 加入條件，只在第一次載入時才會執行
        this.loadingCard = true;
        this.loadingPosts = true;
        await this.$store.dispatch("user/setUserData");
        setTimeout(() => {
            this.loadingCard = false;
            this.loadingPosts = false;
        }, 1000);
    },
};
</script>

<style scoped lang="postcss">
.admin-page {
    padding: 20px;
}

.new-post {
    text-align: center;
    padding-bottom: 10px;
    @apply flex justify-center items-center;
}
</style>
