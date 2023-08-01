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
            <h2
                class="text-center text-blue-400 dark:text-pink-400 text-3xl font-bold"
            >
                {{ userPosts.length > 0 ? "現有的文章" : "目前沒有文章" }}
            </h2>
            <div class="max-w-[200px] pl-6" v-if="userPosts.length > 2">
                <AppSelect :options="selectOptions" @select="handleSelect" />
            </div>
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
            selectOptions: [
                {
                    name: "最新(預設)",
                    value: "new",
                },
                {
                    name: "最舊",
                    value: "old",
                },
            ],
            selectedOption: "new",
        };
    },
    methods: {
        closeToast() {
            this.toast.showToast = false;
        },
        updatePhoto(showToast) {
            if (showToast.show) {
                this.toast.showToast = true;
                this.toast.message = "更新頭像中...";
                this.toast.type = "loading";
            } else if (showToast.type === "error") {
                this.toast.message = showToast.msg;
                this.toast.type = "error";
            } else if (!showToast.show) {
                setTimeout(() => {
                    this.toast.message = "更新頭像成功!";
                    this.toast.type = "success";
                }, 2000);
                setTimeout(() => {
                    this.toast.showToast = false;
                }, 4000);
            }
        },
        handleSelect(value) {
            this.selectedOption = value;
            if (this.userPosts.length === 0) return;
            if (this.selectedOption === "new") {
                this.$store.commit("user/sortUserPosts", { order: "new" });
            } else if (this.selectedOption === "old") {
                this.$store.commit("user/sortUserPosts", { order: "old" });
            }
        },
    },
    computed: {
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
        if (this.$store.state.user.fetchedUSerCount === 0) {
            this.loadingPosts = true;
            this.loadingCard = true;
        } else {
            this.loadingPosts = false;
            this.loadingCard = false;
        }
        await this.$store.dispatch("user/setUserData", () => {
            setTimeout(() => {
                this.loadingCard = false;
            }, 1000);
        });
        await this.$store.dispatch("user/setUserPosts", () => {
            setTimeout(() => {
                this.loadingPosts = false;
            }, 1000);
        });
        this.$store.commit("user/sortUserPosts", {
            order: this.selectedOption,
        });
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
