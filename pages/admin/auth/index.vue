<template>
  <div class="admin-auth-page">
    <section class="bg-slate-100 dark:bg-slate-950">
      <div class="flex flex-col items-center justify-center px-6 mx-auto h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <form @submit.prevent="onSubmit" class="space-y-4 md:space-y-6">
                  <AppControlInput type="email" v-model="email"
                    >E-Mail Address</AppControlInput
                  >
                  <AppControlInput type="password" v-model="password"
                    >Password</AppControlInput
                  >
                  <div class="flex">
                    <AppButton type="submit" 
                    :btnStyle="`
                    text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-1/2
                    dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800
                    `">
                      {{ isLogin ? "Login" : "Sign Up" }}
                    </AppButton>
                    <AppButton
                      type="button"
                      :btnStyle="`w-1/2 bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-1/2 ml-2`"
                      @click="isLogin = !isLogin"
                      >Switch to {{ isLogin ? "Signup" : "Login" }}</AppButton
                    >
                  </div>
                </form>
            </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "AdminAuthPage",
  // layout: "admin",
  data() {
    return {
      isLogin: true,
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("authenciateUser", {
          isLogin: this.isLogin,
          email: this.email,
          password: this.password
        })
        .then(() => this.$router.push("/admin"));
    }
  }
};
</script>

<style scoped>
.admin-auth-page {
  /* padding: 20px; */
}

.auth-container {
  /* border: 1px solid #ccc; */
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>
