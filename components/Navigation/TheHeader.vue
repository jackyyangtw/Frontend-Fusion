<template>
    <div class="h-[60px] fixed z-10 w-full bg-white dark:bg-gray-900">
        <header class="the-header" ref="theHeader">
            <TheSideNavToggle @toggle="$emit('sidenavToggle')" />
            <nuxt-link
                to="/"
                class="logo hidden md:flex text-slate-700 dark:text-white"
            >
                <nuxt-img
                    provider="static"
                    class="max-w-[30px] mr-3"
                    src="/images/site-icon.svg"
                />
                Frontend Fusion
            </nuxt-link>
            <SearchBar></SearchBar>
            <ModeSwitcher></ModeSwitcher>
            <div class="navigation-items">
                <ul class="nav-list">
                    <li class="nav-item">
                        <nuxt-link
                            class="text-slate-700 dark:text-white"
                            to="/posts"
                            >部落格</nuxt-link
                        >
                    </li>
                    <li class="nav-item">
                        <nuxt-link
                            class="text-slate-700 dark:text-white"
                            to="/admin"
                            >管理</nuxt-link
                        >
                    </li>
                </ul>
            </div>
        </header>
    </div>
</template>

<script>
import TheSideNavToggle from "@/components/Navigation/TheSideNavToggle";
import SearchBar from "./SearchBar.vue";
import ModeSwitcher from "@/components/UI/ModeSwitcher";
export default {
    name: "TheHeader",
    components: {
        TheSideNavToggle,
        SearchBar,
        ModeSwitcher,
    },
    mounted() {
        this.$store.commit(
            "ui/setHeaderHeight",
            this.$refs.theHeader.clientHeight
        );
    },
};
</script>


<style scoped>
.header-container {
    height: 60px;
}

.the-header {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20px;
}

.logo {
    margin: 0 10px;
    font-size: 1.3rem;
}

.logo a {
    text-decoration: none;
}

.spacer {
    flex: 1;
}

.navigation-items {
    display: none;
}

@media (min-width: 768px) {
    .navigation-items {
        display: block;
    }
}

.nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
}

.nav-item {
    margin: 0 10px;
}

.nav-item a {
    text-decoration: none;
    /* color: white; */
}

.nav-item a:hover,
.nav-item a:active,
.nav-item a.nuxt-link-active {
    @apply font-bold text-sky-500 dark:text-pink-500;
}
</style>
