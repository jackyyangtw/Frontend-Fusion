<template>
    <div class="sidenav-container">
        <div v-if="show" class="sidenav-backdrop" @click="$emit('close')"></div>
        <transition name="slide-side">
            <div v-if="show" class="sidenav">
                <ul class="nav-list" @click="$emit('close')">
                    <li>
                        <img
                            class="max-w-[60px]"
                            src="/images/site-icon.svg"
                            alt="logo"
                        />
                    </li>
                    <li class="nav-item">
                        <nuxt-link to="/">Fronted Fusion</nuxt-link>
                    </li>
                    <li class="nav-item" v-for="nav in navLinks">
                        <nuxt-link :to="nav.to">{{ nav.title }}</nuxt-link>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "TheSidenav",
    computed: {
        navLinks() {
            return this.$store.getters.navLinks;
        },
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
};
</script>


<style scoped>
.sidenav-container {
    height: 100%;
    width: 100%;
}

.sidenav-backdrop {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    @apply dark:bg-white/[0.1] bg-slate-950/[0.2];
}

.sidenav {
    height: 100%;
    width: 300px;
    z-index: 10000;
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    padding: 30px;
    @apply bg-white dark:bg-slate-950;
}

.slide-side-enter-active,
.slide-side-leave-active {
    transition: all 0.3s ease-out;
}
.slide-side-enter,
.slide-side-leave-to {
    transform: translateX(-100%);
}

.nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.nav-item {
    margin: 20px 0;
}

.nav-item a {
    text-decoration: none;
    font-size: 1.5rem;
    @apply text-black dark:text-white;
}

.nav-item a:hover,
.nav-item a:active {
    @apply text-sky-600 dark:text-pink-400;
}
</style>
