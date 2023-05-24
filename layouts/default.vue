<template>
  <div class="" :class="isDark ? 'dark' : 'light'">
    <the-header @sidenavToggle="displaySideNav = !displaySideNav"></the-header>
    <the-sidenav :show="displaySideNav" @close="displaySideNav = false"></the-sidenav>
    <div class="placeholder" :style="placeHolderHeight"></div>
    <nuxt/>
    <LoadingSpinner></LoadingSpinner>
  </div>
</template>

<script>
import TheHeader from '../components/Navigation/TheHeader.vue';
import TheSidenav from '../components/Navigation/TheSidenav.vue';
import LoadingSpinner from '../components/UI/LoadingSpinner.vue';
export default {
  components: {
    TheHeader,
    TheSidenav,LoadingSpinner
  },
  data(){
    return {
      displaySideNav: false
    }
  },
  head(){
    return {
      bodyAttrs: {
        class: this.isDark ? 'bg-slate-950' : 'bg-slate-100'
      }
    }
  },
  computed: {
    isDark(){
      return this.$store.getters['ui/isDark'];
    },
    placeHolderHeight(){
      const headerHeight = this.$store.getters['ui/headerHeight'];
      return `height: ${headerHeight}px`;
    }
  },
  asyncData() {
    // 取得localStorage的isDark
    const localIsDark = localStorage.getItem('isDark');
    const isDark = this.$store.getters['ui/isDark'];
    console.log('localIsDark', localIsDark);
  },
}
</script>
<style>
html {
  font-family: 'Open Sans', sans-serif;
}

.placeholder{
  height: 0;
}
</style>
