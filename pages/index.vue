<template>
  <div class="home-page">
    <section class="intro">
      <div class=" rounded-md p-6 min-w-[360px] min-h-[200px]  mx-auto">
        <div class="flex flex-col justify-center items-center h-[200px]">
          <h1 class="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-fuchsia-400 text-transparent bg-clip-text">Frontend Fusion - 前端技術融合</h1>
          <h2 class="text-lg font-medium mb-2 text-white">探索最新的前端技術和工具</h2>
        </div>
      </div>
      <!-- <button @click="clearLocalStorage">clearLocalStorage</button> -->
    </section>
    <post-list :posts="loadedPosts" admin></post-list>
  </div>
</template>

<script>
export default {
  head(){
    return {
      title: 'Home Page',
      meta:[{ hid: "description", name: "description", content: 'Home Page' }],
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
    }
  }
};
</script>

<style scoped>
.intro {
  height: 450px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-position: bottom;
  background-size: cover;
  background-image: url("~assets/images/bg-pink-blue.jpg");
  background-repeat: no-repeat;
  /* background: radial-gradient(rgba(255,255,255,0.3) 0%, rgba(0,0,0,1) 40%); */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
} */

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}
</style>
