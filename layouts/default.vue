<template>
  <div class="">
    <the-header @sidenavToggle="displaySideNav = !displaySideNav"></the-header>
    <the-sidenav :show="displaySideNav" @close="displaySideNav = false"></the-sidenav>
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
  }
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
