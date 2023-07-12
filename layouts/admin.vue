<template>
    <div>
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
    // middleware: ["check-auth", "auth"],
    data() {
        return {
            displaySideNav: false,
        };
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
