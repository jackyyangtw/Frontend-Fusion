<template>
    <div class="h-[60px] fixed z-20 w-full">
        <div class="glass" ref="glassRef"
        ></div>
        <header class="the-header" ref="theHeader">
            <TheSideNavToggle @toggle="$emit('sidenavToggle')" />
            <nuxt-link
                to="/"
                class="logo hidden md:flex text-slate-700 dark:text-white"
            >
                <img
                    class="max-w-[30px] mr-3"
                    src="/images/site-icon.svg"
                    alt="logo"
                />
                Frontend Fusion
            </nuxt-link>
            <SearchBar></SearchBar>
            <ModeSwitcher></ModeSwitcher>
            <div class="navigation-items">
                <ul class="nav-list">
                    
                    <li class="nav-item" v-for="nav in navLinks" :key="nav">
                        <nuxt-link
                            class="text-slate-700 dark:text-white"
                            :to="nav.to"
                            >{{nav.title}}</nuxt-link
                        >
                    </li>
                    <!-- <li class="nav-item">
                        <nuxt-link
                            class="text-slate-700 dark:text-white"
                            to="/admin"
                            >管理</nuxt-link
                        >
                    </li> -->
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
    computed: {
        isPostsPage() {
            return this.$route.name === "posts";
        },
        isDark() {
            return this.$store.getters["ui/isDark"];
        },
        navLinks() {
            return this.$store.getters.navLinks
        },
    },
    watch: {
        isPostsPage(newValue) {
            const glassRef = this.$refs.glassRef;
            if (newValue === true) {
                glassRef.classList.add("active");
            } else {
                glassRef.classList.remove("active");
            }
        },
    },
    mounted() {
        this.$store.commit(
            "ui/setHeaderHeight",
            this.$refs.theHeader.clientHeight
        );
        window.addEventListener("scroll", () => {
            const glassRef = this.$refs.glassRef;
            if(this.isPostsPage) return;
            glassRef.classList.toggle(
                "active",
                window.scrollY > 0
            );
        });
    },
};
</script>


<style scoped>
.glass {
    background: transparent;
    backdrop-filter: blur(10px);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    border-bottom: solid 1px rgba(0,0,0,0.1);
}
html.dark .glass {
    border-bottom: solid 1px rgba(255,255,255, 0.1);
}
html .glass.active {
    background: rgba(255, 255, 255, 0.8);
}

html.dark .glass.active {
    background: rgba(2, 6, 23, 0.8);
}

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
    @apply font-bold text-sky-600 dark:text-pink-400;
}
</style>
