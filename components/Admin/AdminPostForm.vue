<template>
  <v-app>
    <form @submit.prevent="onSave">
      <app-control-input v-model="editedPost.author"
        >作者名稱</app-control-input
      >
      <app-control-input v-model="editedPost.title">標題</app-control-input>
      <app-control-input v-model="editedPost.thumbnail"
        >預覽縮圖</app-control-input
      >
      <app-control-input
        control-type="textarea"
        v-model="editedPost.previewText"
        >預覽文字</app-control-input
      >
      <app-control-input control-type="textarea" v-model="editedPost.content"
        >文章內容</app-control-input
      >
      <app-button type="submit">儲存</app-button>
      <app-button
        type="button"
        style="margin-left: 10px"
        btn-style="cancel"
        @click="onCancel"
        >取消</app-button
      >
    </form>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="350">
        <v-card>
          <v-card-title class="text-h5"> 確定要刪除這篇文章嗎? </v-card-title>

          <v-card-text class="red" color="error">
            文章刪除後不可恢復!!
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog = false">
              取消
            </v-btn>

            <v-btn color="primary" text @click="onDelete"> 刪除 </v-btn>
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
  },
};
</script>
