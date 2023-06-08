<template>
  <div class="container text-center">
    <h2 class="text-2xl text-sky-500 dark:text-pink-500 font-bold">Tag管理</h2>
    <!-- <div class="p-3 min-w-[80px] mr-3 text-center relative bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-300">test</div> -->
    <v-app>
      <v-sheet width="50%" class="mx-auto mt-5 p-5">
        <p class="text-2xl text-sky-500 dark:text-pink-500 font-bold text-left">
          新增Tag
        </p>
        <v-form @submit.prevent="addTag">
          <v-text-field v-model="tag.name" label="Tag 名稱"></v-text-field>

          <v-text-field
            v-model="tag.style"
            label="Tag 樣式(tailwindcss class name)"
          ></v-text-field>

          <v-btn
            type="submit"
            class="ml-[10px] focus:outline-none text-white bg-sky-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >新增</v-btn
          >
        </v-form>
      </v-sheet>
      <div class="mt-10 mx-auto w-[50%] text-left">
        <h3>現有TAG:</h3>
        <div class="flex flex-wrap mt-5">
          <div
            class="p-3 min-w-[80px] mr-3 text-center relative mb-3"
            v-for="item in tags"
            :key="item.id"
            :class="item.style"
          >
            <span>{{ item.name }}</span>
            <!-- delete icon -->
            <div
              @click="deleteTag(item.id)"
              class="cursor-pointer absolute p-[5px] right-[-10px] top-[-10px] bg-gray-200 dark:bg-gray-800 w-[20px] h-[20px] rounded-full"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 12h-15"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <v-row justify="center">
        <v-dialog v-model="openDialog" max-width="350">
          <v-card>
            <v-card-title class="text-h5"> 確定要刪除這個Tag嗎? </v-card-title>

            <v-card-text class="red--text text-left text-md">
              Tag刪除後不可恢復!!
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text @click="openDialog = false"> 取消 </v-btn>

              <v-btn text @click="onDelete"> 刪除 </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-app>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tag: {
        name: "",
        style: "",
      },
      selectedTagId: "",
      openDialog: false,
    };
  },
  middleware: ["check-auth", "auth"],
  methods: {
    addTag() {
      const tagData = { ...this.tag };
      this.$store.dispatch("tag/addTag", tagData);
      this.tag.name = "";
      this.tag.style = "";
    },
    getTags() {
      this.$store.dispatch("tag/getTags");
    },
    deleteTag(id) {
      this.selectedTagId = id;
      this.openDialog = true;
    },
    onDelete() {
      this.$store.dispatch("tag/deleteTag", this.selectedTagId);
      this.openDialog = false;
      this.selectedTagId = "";
    },
  },
  computed: {
    tags() {
      return this.$store.getters["tag/tags"];
    },
    // selectedTag() {
    //   return this.tags.find((tag) => tag.id === this.selectedTagId);
    // },
  },
  created() {
    this.getTags();
  },
};
</script>

<style scoped>
.theme--dark.v-application {
  /* background: #141B2A !important; */
  @apply bg-slate-950;
}
.theme--light.v-application {
  /* background: #141B2A !important; */
  @apply bg-slate-100;
}
.theme--dark.v-sheet {
  /* background: #141B2A !important; */
  @apply bg-gray-800/[0.6];
}
.theme--dark.v-sheet.v-card {
  /* background: #141B2A !important; */
  @apply bg-gray-800;
}
</style>