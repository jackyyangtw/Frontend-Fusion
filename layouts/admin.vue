<template>
    <div class="relative">
        <the-header
            @sidenavToggle="displaySideNav = !displaySideNav"
        ></the-header>
        <the-sidenav
            :show="displaySideNav"
            @close="displaySideNav = false"
        ></the-sidenav>
        <nuxt />
    </div>
</template>

<script>
import TheHeader from "../components/Navigation/TheHeader.vue";
import TheSidenav from "../components/Navigation/TheSidenav.vue";
export default {
    components: {
        TheHeader,
        TheSidenav,
    },
    data() {
        return {
            displaySideNav: false,
        };
    },
    created() {
        this.$store.dispatch("user/setUserData");
        this.$store.dispatch("ui/initSetDark", this);
        this.$store.dispatch("tag/getTags");
        this.$store.dispatch("initAuth");
    },
};
</script>

<style>
html {
    font-family: "Open Sans", sans-serif;
}

body {
    margin: 0;
}
</style>
