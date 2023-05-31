<template>
  <v-app class="rounded p-5 max-w-[750px] mx-auto">
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
      <label class="mb-0 text-gray-500 dark:text-gray-300">文章類別</label>
      <div class="flex">
        <v-checkbox 
          v-model="editedPost.tags" 
          v-for="val in tags" 
          :key="val"
          :value="val" 
          :label="val" 
          :rules="checkboxRules" 
          hide-details
          class="mr-3"
        >
        </v-checkbox>
      </div>
      <p class="error--text" v-if="checkboxRules">{{ checkboxErrMsg }}</p>

      <!-- <v-textarea
        outlined
        name="input-7-4"
        label="文章內容"
        v-model="editedPost.content"
        class="mt-5"
      ></v-textarea> -->
      
      <div class="quill-editor mb-5"
          :content="editedPost.content"
          v-quill:myQuillEditor="editorOption"
          @change="onEditorChange($event)"
          style="height: 500px;"
      >
      </div>


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
    AppControlInput
  },
  data() {
    return {    
      editorOption: {
        // change icon color to red
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ['link',"image",'video',"code-block"],
          ],
        },
      },
      selectedCheckbox: [],
      checkboxVal: ['React','Vue','Nuxt','Javascript'],
      editedPost: this.post
        ? { ...this.post }
        : {
            author: this.userName,
            title: "",
            thumbnail: "",
            content: "",
            previewText: "",
            tags: [],
          },
      dialog: false,
      isDialogShow: false,
      valid: true,
      formData: {},
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
      this.$emit("submit", {
        ...this.editedPost, 
        userId: this.$store.getters['user/userData'].id
      });
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
    onEditorChange({ quill, html, text }) {
      this.editedPost.content = html;
    },
  },
  computed: {
    checkboxRules() {
      return [
        this.editedPost.tags.length > 0 || "請至少選擇一個Tag"
      ];
    },
    checkboxErrMsg() {
      return this.editedPost.tags.length > 0 ? "" : "請至少選擇一個Tag";
    },
    checkboxs() {
      return this.editedPost.tags ? this.editedPost.tags : this.selectedCheckbox;
    },
    tags() {
      // 取出this.$tags的key值，並轉成陣列
      return Object.keys(this.$tags);
      
    },
    userName() {
      const userData = this.$store.getters['user/userData'];
      return userData && userData.name ? userData.name : '';
    },
  },
};
</script>

<style>
.theme--dark.v-application {
  background: rgba(31,41,55,0.6);
}
.ql-header,.ql-editor .ql-blank,.ql-editor.ql-blank::before {
  @apply text-black dark:!text-white
}
.ql-editor.ql-blank::before {
  content: '請輸入文章內容...';
}
.ql-toolbar .ql-stroke,
.ql-toolbar .ql-image {
  @apply stroke-black dark:stroke-white;
}
.ql-fill {
  @apply fill-black dark:fill-white;
}
.ql-picker-item {
  @apply text-black;
}
</style>
