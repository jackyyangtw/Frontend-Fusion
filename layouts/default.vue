<template>
  <div class="" :class="isDark ? 'dark' : 'light'">
    <the-header @sidenavToggle="displaySideNav = !displaySideNav"></the-header>
    <the-sidenav :show="displaySideNav" @close="displaySideNav = false"></the-sidenav>
    <div class="placeholder" :class="placeHolderHeight"></div>
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
      // theHeader height 存到 store，在這裡取出來
      console.log(this.$refs.theHeader)
      // let headerHeight = document.querySelector('.the-header').offsetHeight + 'px';
      // return `h-${headerHeight}`;
    }
  },
}
</script>
<style>
html {
  font-family: 'Open Sans', sans-serif;
}

body {
  margin: 0;
}
</style>
