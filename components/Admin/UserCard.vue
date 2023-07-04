<template>
    <div>
        <UserCardSkeleton v-if="loadingCard" />
        <div
            v-else
            class="w-full mt-5 max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
            <div class="flex flex-col items-center py-10">
                <div class="relative">
                    <div class="overflow-hidden">
                        <img
                            class="w-24 h-24 mb-3 rounded-full"
                            :src="
                                userData.photoURL ||
                                require('@/assets/images/no-user-image.gif')
                            "
                            alt="user photo"
                        />
                    </div>

                    <form class="absolute right-[-15px] top-[-15px]">
                        <label
                            for="photo"
                            class="cursor-pointer w-10 h-10 p-2 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-slate-300"
                            ><img
                                :src="
                                    require('@/assets/images/edit-pen-icon.svg')
                                "
                                alt=""
                        /></label>
                        <input
                            id="photo"
                            type="file"
                            accept="image/*"
                            class="absolute top-0 right-0 w-0 h-0 opacity-0"
                            @change="onPhotoChange"
                        />
                    </form>
                </div>

                <h5
                    class="mb-1 text-xl font-medium text-gray-900 dark:text-white"
                >
                    {{ userData.name }}
                </h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                    @{{ userData.email ? userData.email.split("@")[0] : "" }}
                </span>
                <div class="flex mt-4 space-x-3 md:mt-6">
                    <AppButton
                        :btnStyle="`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`"
                        @click="$router.push('/admin/new-post')"
                        >新增文章</AppButton
                    >
                    <div v-show="isManager">
                        <AppButton
                            :btnStyle="`focus:outline-none text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-900`"
                            @click="$router.push('/admin/manage-tags')"
                            >Tag管理</AppButton
                        >
                    </div>
                    <AppButton
                        :btnStyle="`focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`"
                        @click="onLogout"
                        >登出</AppButton
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserCardSkeleton from "../UI/UserCardSkeleton.vue";
export default {
    components: {
        UserCardSkeleton,
    },
    props: {
        userData: {
            type: Object,
            required: true,
            validator: (value) => {
                return typeof value === "object" && value !== null;
            },
        },
        isManager: {
            type: Boolean,
            required: true,
        },
        loadingCard: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        onLogout() {
            this.$store.dispatch("onLogout");
            this.$router.push("/admin/auth");
        },
        onPhotoChange(e) {
            const file = e.target.files[0];
            if (!file && !navigator.onLine) return;
            if (file.type !== "image/jpeg" && file.type !== "image/png") {
                alert("請上傳jpg或png檔案");
                return;
            }
            this.$store.dispatch("user/updateUserPhoto", file);
        },
    },
};
</script>
