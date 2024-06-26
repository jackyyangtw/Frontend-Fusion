<template>
    <div class="relative z-[2]">
        <button
            @click="toggleSidebar"
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            class="inline-flex items-center mt-5 ml-5 p-2 text-sm text-gray-500 rounded-lg bg-sky-500 dark:bg-pink-600/[0.5] xl:hidden"
        >
            <span class="sr-only">Open sidebar</span>
            <svg
                fill="none"
                class="w-6 h-6 mr-3"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                ></path>
            </svg>
            <p>篩選</p>
        </button>
        <!-- backdrop -->
        <div
            @click="toggleSidebar"
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            class="inset-0 bg-black opacity-50 z-1 w-screen h-screen cursor-pointer xl:hidden"
            :class="{
                fixed: isSidebarOpen,
                hidden: !isSidebarOpen,
            }"
        ></div>
        <aside
            id="default-sidebar"
            ref="sidebar"
            class="fixed left-0 top-0 w-64 h-screen transition-transform -translate-x-full xl:translate-x-0"
            aria-label="Sidebar"
        >
            <div
                class="h-full px-3 py-4 overflow-y-auto bg-slate-200 dark:bg-gray-900 xl:dark:bg-gray-900 z-10"
            >
                <div
                    class="placeholder"
                    :style="{ height: headerHeight + 'px', width: `100%` }"
                ></div>
                <ul class="space-y-2 font-medium">
                    <li @click="selectTag('全部類型')">
                        <a
                            href="#"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            :class="{
                                'bg-gray-100 dark:bg-gray-700':
                                    selectedTag === '全部類型',
                            }"
                        >
                            <span class="ml-3"
                                >全部類型
                                <span
                                    class="font-bold text-sky-600 dark:text-pink-400"
                                    >({{ posts.length }})</span
                                >
                            </span>
                        </a>
                    </li>
                    <li v-for="tag in tags" :key="tag" @click="selectTag(tag)">
                        <a
                            href="#"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            :class="{
                                'bg-gray-100 dark:bg-gray-700':
                                    selectedTag === tag,
                            }"
                            v-if="getPostCount(tag) > 0"
                        >
                            <span class="ml-3"
                                >{{ tag }}
                                <span
                                    class="font-bold text-sky-600 dark:text-pink-400"
                                    >({{ getPostCount(tag) }})</span
                                >
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sidebarWidth: 0,
            isSidebarOpen: false,
        };
    },
    props: {
        selectedTag: {
            type: String,
            default: "全部類型",
        },
        posts: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        getPostCount(tag) {
            return this.posts.filter((post) => {
                return post.tags.includes(tag);
            }).length;
        },
        selectTag(tag) {
            this.$emit("setFilter", tag);
            this.toggleSidebar();
        },
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
            if (this.isSidebarOpen) {
                this.$refs.sidebar.classList.remove("-translate-x-full");
                this.$refs.sidebar.classList.add("translate-x-0");
            } else {
                this.$refs.sidebar.classList.remove("translate-x-0");
                this.$refs.sidebar.classList.add("-translate-x-full");
            }
        },
    },
    computed: {
        headerHeight() {
            return this.$store.getters["ui/headerHeight"];
        },
        tags() {
            return this.$store.getters["tag/tags"].map((tag) => tag.name);
        },
        postCount() {
            return this.posts.length;
        },
    },
    mounted() {
        this.$store.commit(
            "ui/setSidebarWidth",
            this.$refs.sidebar.clientWidth + 20
        );
    },
};
</script>