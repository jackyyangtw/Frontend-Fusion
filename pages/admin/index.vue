<template>
    <div class="admin-page container">
        <UserCard
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
    methods: {
        onLogout() {
            this.$store.dispatch("onLogout");
            this.$router.push("/admin/auth");
        },
    },
    data() {
        return {
            loadingCard: false,
            loadingPosts: false,
        };
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
