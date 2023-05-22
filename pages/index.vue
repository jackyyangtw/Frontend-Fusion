<template>
  <div class="home-page">
    <section class="intro" :class="introBg">
      <div class=" rounded-md p-6 min-w-[360px] min-h-[200px]  mx-auto">
        <div class="flex flex-col justify-center items-center h-[200px]">
          <h1 class="text-3xl font-bold mb-4 bg-gradient-to-r text-transparent bg-clip-text
          from-blue-400 to-sky-400
          dark:from-purple-400 dark:to-fuchsia-400 
          ">
            Frontend Fusion - 前端技術融合
          </h1>
          <h2 class="text-lg font-medium mb-2 text-slate-950 dark:text-white">探索最新的前端技術和工具</h2>
        </div>
      </div>
    </section>
    <div class="container">
      <post-list :posts="loadedPosts" admin></post-list>
    </div>
  </div>
</template>

<script>
export default {
  head(){
    return {
      title: 'Frontend Fusion',
      meta:[{ hid: "description", name: "description", content: 'Frontend Fusion' }],
    }
  },
  methods: {
    clearLocalStorage() {
      localStorage.clear();
    }
  },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    },
    isDark(){
      return this.$store.getters['ui/isDark'];
    },
    introBg(){
      if(this.isDark){
        return 'bg-gradient-to-r from-slate-950 to-slate-800'
      }
      return 'bg-gradient-to-r from-slate-100 to-slate-200'
    }
  }
};
</script>

<style scoped>
.intro {
  height: 320px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-position: bottom;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}
</style>
