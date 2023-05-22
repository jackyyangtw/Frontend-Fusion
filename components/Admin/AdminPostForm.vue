<template>
  <!-- <section class="bg-slate-100 dark:bg-slate-950 flex justify-center items-center">
    <div class="w-full md:min-w-[600px] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <form @submit.prevent="onSave" class="space-y-4 md:space-y-6">
              <AppControlInput type="text" v-model="editedPost.author"
                >作者名稱</AppControlInput
              >
              <AppControlInput type="text" v-model="editedPost.title"
                >文章標題</AppControlInput
              >
              <AppControlInput type="text" v-model="editedPost.thumbnail"
                >預覽縮圖</AppControlInput
              >
              <AppControlInput type="text" v-model="editedPost.previewText"
                >預覽文字</AppControlInput
              >
              <AppControlInput controlType="textarea" v-model="editedPost.content"
                >文章內容</AppControlInput
              >
              <div class="flex">
                <AppButton type="submit" 
                :btnStyle="`
                text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-1/2
                dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800
                `">
                  確認
                </AppButton>
                <AppButton
                  type="button"
                  :btnStyle="`w-1/2 bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-1/2 ml-2`"
                  @click="isLogin = !isLogin"
                  >刪除</AppButton>
              </div>
            </form>
        </div>
    </div>
  </section> -->
  <v-app class="rounded p-5 max-w-[600px] mx-auto">
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="onSave">
      <v-text-field
        v-model="editedPost.author"
        :counter="10"
        :rules="nameRules"
        label="作者名稱"
        required
      ></v-text-field>

      <v-text-field
        v-model="editedPost.title"
        label="文章標題"
        :rules="titleRules"
        required
      ></v-text-field>

      <v-text-field
        v-model="editedPost.thumbnail"
        label="預覽縮圖"
        :rules="urlRules"
        required
      ></v-text-field>

      <v-text-field
        v-model="editedPost.previewText"
        label="預覽文字"
        :rules="[(v) => !!v || '請填入預覽文字']"
        required
      ></v-text-field>
      <!-- 四個checkbox:React,vue,nuxt,javascript，使用者必須至少選擇一個，否則會出錯，用vuetify實作 ，一開始不一定會有資料，需要處理這部分-->
      <v-checkbox
        v-model="editedPost.tags"
        :rules="[(v) => !!v || '請至少選擇一個標籤']"
        :label="tag"
        :value="tag"
        v-for="tag in ['React', 'Vue', 'Nuxt', 'Javascript']"
        :key="tag"
        required
      ></v-checkbox>



      <v-textarea
        outlined
        name="input-7-4"
        label="文章內容"
        v-model="editedPost.content"
        class="mt-5"
      ></v-textarea>
      <v-btn type="submit" color="success" class="mr-3" :disabled="!valid"
        >儲存</v-btn
      >
      <v-btn color="error" @click="dialog = true" class="mr-2"> 刪除 </v-btn>
      <v-btn text @click="onCancel" type="button"> 取消 </v-btn>
    </v-form>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="350">
        <v-card>
          <v-card-title class="text-h5"> 確定要刪除這篇文章嗎? </v-card-title>

          <v-card-text style="color: red; font-weight: 600">
            文章刪除後不可恢復!!
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text @click="dialog = false"> 取消 </v-btn>

            <v-btn text @click="onDelete"> 刪除 </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
import AppButton from "@/components/UI/AppButton.vue";
import AppControlInput from "@/components/UI/AppControlInput.vue";
export default {
  name: "AdminPostForm",
  components: {
    AppButton,
    AppControlInput,
  },
  created() {
    console.log(this.$route);
  },
  data() {
    return {
      editedPost: this.post
        ? { ...this.post }
        : {
            author: "",
            title: "",
            thumbnail: "",
            content: "",
            previewText: "",
          },
      dialog: false,
      isDialogShow: false,
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "請填入作者名稱",
        (v) => (v && v.length <= 10) || "作者名稱必須小於10個字",
      ],
      titleRules: [(v) => !!v || "請填入文章標題"],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      urlRules: [
        (v) => !!v || "請填入縮圖網址",
        (v) =>
          /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
            v
          ) || "此欄位必須為網址",
      ],
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
    };
  },
  props: {
    post: {
      type: Object,
      required: false,
    },
  },
  methods: {
    onSave() {
      this.$emit("submit", this.editedPost);
    },
    onCancel() {
      this.$router.push("/admin");
    },
    onDelete() {
      this.dialog = false;
      this.$emit("delete", this.$route.params.postId);
    },
    showDialog() {
      this.isDialogShow = true;
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style>
.theme--dark.v-application {
  background: rgba(31,41,55,0.6);
}
</style>
