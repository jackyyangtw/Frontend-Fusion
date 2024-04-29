<template>
    <div class="min-h-screen bg-slate-100 dark:bg-slate-950" :class="isDark ? 'dark' : 'light'">
        <the-header
            @sidenavToggle="displaySideNav = !displaySideNav"
        ></the-header>
        <the-sidenav
            :show="displaySideNav"
            @close="displaySideNav = false"
        ></the-sidenav>
        <div class="placeholder" :style="placeHolderHeight" v-show="notAtHome"></div>
        <nuxt class="relative z-10"/>
        <aurora-bg></aurora-bg>
        <LoadingSpinner></LoadingSpinner>
    </div>
</template>

<script>
import TheHeader from "../components/Navigation/TheHeader.vue";
import TheSidenav from "../components/Navigation/TheSidenav.vue";
import LoadingSpinner from "../components/UI/LoadingSpinner.vue";
import AuroraBg from '../components/UI/AuroraBg.vue';
export default {
    components: {
        TheHeader,
        TheSidenav,
        LoadingSpinner,
        AuroraBg
    },
    data() {
        return {
            displaySideNav: false,
        };
    },
    computed: {
        isDark() {
            return this.$store.getters["ui/isDark"];
        },
        placeHolderHeight() {
            const headerHeight = this.$store.getters["ui/headerHeight"];
            return `height: ${headerHeight}px`;
        },
        notAtHome() {
            return this.$route.path !== "/";
        },
    },
    created() {
        this.$store.dispatch("ui/initSetDark", this);
        this.$store.dispatch("tag/getTags");
        this.$store.dispatch("initAuth");
        this.$store.dispatch("refreshToken");
        this.$store.commit("post/sortPosts");
    },
};
</script>
<style>
html {
    font-family: "Open Sans", sans-serif;
}

.placeholder {
    height: 0;
}
.container {
    @apply !mx-auto 2xl:!max-w-[1536px];
}
</style>
