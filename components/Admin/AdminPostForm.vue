<template>
  <v-app>
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
      <v-textarea
        outlined
        name="input-7-4"
        label="文章內容"
        v-model="editedPost.content"
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
