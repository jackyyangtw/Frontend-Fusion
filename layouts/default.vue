<template>
  <div :class="isDark ? 'dark' : 'light'">
    <the-header @sidenavToggle="displaySideNav = !displaySideNav"></the-header>
    <the-sidenav
      :show="displaySideNav"
      @close="displaySideNav = false"
    ></the-sidenav>
    <div class="placeholder" :style="placeHolderHeight"></div>
    <nuxt />
    <LoadingSpinner></LoadingSpinner>
  </div>
</template>

<script>
import TheHeader from "../components/Navigation/TheHeader.vue";
import TheSidenav from "../components/Navigation/TheSidenav.vue";
import LoadingSpinner from "../components/UI/LoadingSpinner.vue";
export default {
  components: {
    TheHeader,
    TheSidenav,
    LoadingSpinner,
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
  },
  created() {
    // 依照loacalStorage isDark值來決定是否要切換成深色模式
    if (process.client) {
      this.$store.commit("ui/initSetDark");
      this.$vuetify.theme.dark = this.isDark;
      // this.$store.dispatch("user/setUserData");
      this.$store.dispatch("user/setUserPosts");
      this.$store.dispatch("tag/getTags");
    }
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
