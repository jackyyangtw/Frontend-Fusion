import { defineStore } from 'pinia'
export const useUiStore = defineStore('ui', {
    state: () => ({
        isDark: true,
        headerHeight: 0,
        loading: false,
        sidebarWidth: 0,
        tags: [],
        errorMsg: null,
    }),
    actions: {
        setDark(payload) {
            if (payload) {
                this.isDark = payload;
            } else {
                this.isDark = !this.isDark;
            }
        },
        setErrorMsg(errorMsg) {
            this.errorMsg = errorMsg;
        },
        initSetDark(Nuxt) {
            if (process.client && document) {
                const localIsDark = localStorage.getItem('isDark');
                localStorage.setItem('isDark', localIsDark);
                if (localIsDark === 'true') {
                    this.setDark(true);
                } else {
                    this.setDark(false);
                }
                if (localIsDark === 'true') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                }
                document.body.classList.add('bg-slate-100', 'dark:bg-slate-950');
                Nuxt.$vuetify.theme.dark = this.isDark;
            }
        },
        toggleDarkMode(Nuxt) {
            this.setDark();
            localStorage.setItem('isDark', state.isDark);
            if (Boolean(state.isDark)) {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
            } else {
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark')
            }
            document.body.classList.add('bg-slate-100', 'dark:bg-slate-950');
            Nuxt.$vuetify.theme.dark = state.isDark;
        },
        setLoading(loading) {
            this.loading = loading;
        },
    },
})
