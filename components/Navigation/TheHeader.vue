<template>
<div class="header-container">
  <header class="the-header bg-white dark:bg-gray-900">
    <TheSideNavToggle @toggle="$emit('sidenavToggle')" />
    <div class="logo hidden md:block text-slate-700
    dark:text-white
    ">
      <nuxt-link to="/">Frontend Fusion</nuxt-link>
    </div>
    <!-- <div class="spacer"></div> -->
    <SearchBar></SearchBar>
    <ModeSwitcher></ModeSwitcher>
    <div class="navigation-items">
      <ul class="nav-list">
        <li class="nav-item"><nuxt-link class="text-slate-700 dark:text-white" to="/posts">Blog</nuxt-link></li>
        <!-- <li class="nav-item"><nuxt-link to="/about">About</nuxt-link></li> -->
        <li class="nav-item"><nuxt-link class="text-slate-700 dark:text-white" to="/admin">Admin</nuxt-link></li>
      </ul>
    </div>
  </header>
</div>
</template>

<script>
import TheSideNavToggle from "@/components/Navigation/TheSideNavToggle";
import SearchBar from './SearchBar.vue';
import ModeSwitcher from "@/components/UI/ModeSwitcher";
export default {
  name: "TheHeader",
  components: {
    TheSideNavToggle,SearchBar,ModeSwitcher
  }
};
</script>


<style scoped>
.header-container {
  height: 60px;
}

.the-header {
  width: 100%;
  position: fixed;
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
  color: #38BDF8;
  font-weight: 700;
}
</style>
