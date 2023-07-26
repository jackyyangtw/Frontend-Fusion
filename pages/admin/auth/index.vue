<template>
    <div class="admin-auth-page">
        <AppToast
            @closeToast="closeToast"
            :showToast="toast.showToast"
            :type="toast.messageType"
            :message="toast.message"
        />
        <section class="bg-slate-100 dark:bg-slate-950">
            <div
                class="flex flex-col items-center justify-center px-6 mx-auto h-screen lg:py-0"
            >
                <div
                    class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
                >
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1
                            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                        >
                            {{ isLogin ? "登入您的帳號" : "註冊新帳號" }}
                        </h1>
                        <form
                            @submit.prevent="onSubmit"
                            class="space-y-4 md:space-y-6"
                        >
                            <AppControlInput
                                type="text"
                                v-model="name"
                                v-if="!isLogin"
                                :placeholder="`請輸入您的名稱`"
                                >名稱</AppControlInput
                            >
                            <AppControlInput
                                type="email"
                                v-model="email"
                                :placeholder="`請輸入您的電子郵件`"
                                >E-Mail</AppControlInput
                            >
                            <AppControlInput
                                type="password"
                                v-model="password"
                                :placeholder="`請輸入您的密碼`"
                                >密碼</AppControlInput
                            >
                            <div class="flex">
                                <AppButton
                                    type="submit"
                                    :btnStyle="`
                    text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-1/2
                    dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800
                    `"
                                >
                                    {{ isLogin ? "登入" : "註冊" }}
                                </AppButton>
                                <AppButton
                                    type="button"
                                    :btnStyle="`w-1/2 bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-1/2 ml-2`"
                                    @click="isLogin = !isLogin"
                                    >切換至{{
                                        isLogin ? "註冊" : "登入"
                                    }}</AppButton
                                >
                            </div>
                        </form>
                        <div class="!mt-5">
                            <button
                                class="flex justify-center items-center w-full bg-red-500 hover:bg-red-600 rounded-lg"
                                @click="signinWithGoogle"
                            >
                                <img
                                    class="w-10 h-10 mr-2 p-2"
                                    :src="
                                        require(`@/static/images/google-white.svg`)
                                    "
                                />
                                <div>使用Google登入</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "AdminAuthPage",
    // layout: "admin",
    head() {
        return {
            title: "登入/註冊",
        };
    },
    data() {
        return {
            isLogin: true,
            email: "",
            password: "",
            name: "",
            toast: {
                showToast: false,
                messageType: "loading",
                message: "success message",
            },
        };
    },
    middleware: "check-auth",
    methods: {
        async onSubmit() {
            this.toast.showToast = true;
            this.toast.message = "Email登入中...";
            this.toast.messageType = "loading";
            await this.$store.dispatch("authenticateUserWithEMail", {
                isLogin: this.isLogin,
                email: this.email,
                password: this.password,
                name: this.name,
            });
            if (this.errorMsg !== null) {
                setTimeout(() => {
                    this.toast.message = this.errorMsg;
                    this.toast.messageType = "error";
                }, 1000);
                setTimeout(() => {
                    this.toast.showToast = false;
                }, 4000);
            } else {
                setTimeout(() => {
                    this.$router.push("/admin");
                }, 2500);
            }
        },
        async signinWithGoogle() {
            this.toast.showToast = true;
            this.toast.message = "Google登入中...";
            this.toast.messageType = "loading";
            await this.$store.dispatch("signinWithGoogleAction");
            this.toast.showToast = false;
            this.toast.message = "登入成功";
            this.toast.messageType = "success";
        },
        closeToast() {
            this.toast.showToast = false;
        },
    },
    computed: {
        isAuthenicated() {
            return this.$store.getters.isAuthenicated;
        },
        errorMsg() {
            return this.$store.getters["ui/errorMsg"];
        },
    },
    mounted() {
        if (this.isAuthenicated) {
            this.$router.push("/admin");
        }
    },
};
</script>

<style scoped>
.auth-container {
    /* border: 1px solid #ccc; */
    border-radius: 5px;
    box-shadow: 0 2px 2px #ccc;
    width: 300px;
    margin: auto;
    padding: 10px;
    box-sizing: border-box;
}
</style>
