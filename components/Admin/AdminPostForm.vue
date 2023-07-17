<template>
    <v-app class="rounded p-5 max-w-[750px] mx-auto">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="onSave"
        >
            <v-text-field
                v-model="userName"
                :rules="nameRules"
                label="作者名稱"
                required
                prepend-icon="mdi-account"
            ></v-text-field>

            <v-text-field
                prepend-icon="mdi-format-title"
                v-model="editedPost.title"
                label="文章標題"
                :rules="titleRules"
                required
            ></v-text-field>

            <v-text-field
                prepend-icon="mdi-text"
                v-model="editedPost.previewText"
                label="預覽文字"
                :rules="[(v) => !!v || '請填入預覽文字']"
                required
            ></v-text-field>

            <v-text-field
                prepend-icon="mdi-image"
                v-model="editedPost.thumbnail"
                label="預覽縮圖(網址)"
            ></v-text-field>

            <v-file-input
                show-size
                prepend-icon="mdi-camera"
                label="預覽縮圖(本地上傳)"
                :rules="previewImgRules"
                @change="onPreviewImgChange"
            ></v-file-input>

            <!-- 預覽縮圖(本地上傳)的預覽圖 -->
            <v-img
                v-if="editedPost.previewImgUrl"
                :src="editedPost.previewImgUrl"
                class="mb-5"
                max-width="300"
                max-height="300"
            ></v-img>

            <!-- v-icon -->
            <div class="flex">
                <v-icon class="mr-3">mdi-tag</v-icon>
                <p class="mb-0 text-gray-500 dark:text-gray-300">文章類別</p>
            </div>
            <div class="flex flex-wrap">
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
            <p class="error--text" v-if="checkboxRules">
                {{ checkboxErrMsg }}
            </p>

            <div
                class="quill-editor mb-5 !h-[400px] !text-base"
                :content="editedPost.content"
                v-quill:myQuillEditor="editorOption"
                @change="onEditorChange($event)"
            ></div>

            <input
                type="file"
                id="getFile"
                @change="uploadContentImage($event)"
                class="hidden"
            />

            <div class="pb-5">
                <v-btn
                    type="submit"
                    color="success"
                    class="mr-3"
                    :disabled="checkboxs.length === 0 || !valid"
                    >儲存</v-btn
                >
                <v-btn
                    color="error"
                    @click="dialog = true"
                    class="mr-2"
                    v-if="showDelete"
                >
                    刪除
                </v-btn>
                <v-btn text @click="onCancel" type="button"> 取消 </v-btn>
            </div>
        </v-form>
        <v-row justify="center">
            <v-dialog v-model="dialog" max-width="350">
                <v-card>
                    <v-card-title class="text-h5">
                        確定要刪除這篇文章嗎?
                    </v-card-title>

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
import AppControlInput from "@/components/UI/AppControlInput.vue";
export default {
    name: "AdminPostForm",
    components: {
        AppControlInput,
    },
    data() {
        return {
            timer: null,
            previewImageFile: null,
            editorOption: {
                modules: {
                    toolbar: {
                        container: [
                            [{ header: [1, 2, false] }],
                            ["bold", "italic", "underline"],
                            ["link", "image", "video", "code-block"],
                            [{ color: [] }, { background: [] }],
                        ],
                        handlers: {
                            image: function () {
                                // 取得上傳的圖檔
                                const input =
                                    document.getElementById("getFile");
                                input.click();
                            },
                        },
                    },
                },
            },
            selectedCheckbox: [],
            // postData: this.post
            //     ? { ...this.post }
            //     : {
            //           author: this.userName,
            //           title: "",
            //           thumbnail: "",
            //           content: ``,
            //           previewText: "",
            //           tags: [],
            //           previewImgUrl: "",
            //       },
            editedPost: this.post
                ? { ...this.post }
                : {
                      author: this.userName,
                      title: "",
                      thumbnail: "",
                      content: ``,
                      previewText: "",
                      tags: [],
                      previewImgUrl: "",
                  },
            dialog: false,
            isDialogShow: false,
            valid: false,
            formData: {},
            nameRules: [(v) => !!v || "請填入作者名稱"],
            titleRules: [(v) => !!v || "請填入文章標題"],
            previewImgRules: [],
            urlRules: [
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
        showDelete: {
            type: Boolean,
            required: false,
            default: true,
        },
        userData: {
            type: Object,
            required: false,
        },
    },
    methods: {
        onSave() {
            this.$emit("submit", {
                ...this.editedPost,
                previewImgUrl: "",
                userId: this.$store.getters["user/userData"].id,
                previewImageFile: this.previewImageFile,
            });
        },
        onPreviewImgChange(files) {
            if (!files) {
                this.editedPost.previewImgUrl = "";
                return;
            }
            if (files.size > 200000) {
                this.previewImgRules = [(v) => !!v || "檔案大小不得超過2MB"];
            }
            // 將files轉成base64
            const reader = new FileReader();
            reader.readAsDataURL(files);
            reader.onload = () => {
                console.log("preview img uploaded");
                this.$emit("previewImgChange", {
                    previewImgUrl: reader.result,
                    previewImageFile: files,
                });
                this.editedPost.previewImgUrl = reader.result;
                this.previewImageFile = files;
            };
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
            // this.editedPost.content = html;
            this.$emit("contentChange", html);
        },
        uploadContentImage(e) {
            var form = new FormData();
            form.append("file[]", e.target.files[0]);
            const postId = this.$route.params.postId;
            const fileName = e.target.files[0].name;
            const storageRef = this.$storage.ref(
                `images/posts/${postId}/content/${fileName}`
            );
            const uploadTask = storageRef.put(e.target.files[0]);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // progress
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    // error
                    console.log(error);
                },
                () => {
                    // complete
                    uploadTask.snapshot.ref
                        .getDownloadURL()
                        .then((downloadURL) => {
                            this.myQuillEditor.insertEmbed(
                                this.myQuillEditor.getSelection().index,
                                "image",
                                downloadURL
                            );
                        });
                }
            );
        },
    },
    computed: {
        checkboxRules() {
            return [this.editedPost.tags.length > 0 || "請至少選擇一個Tag"];
        },
        checkboxErrMsg() {
            return this.editedPost.tags.length > 0 ? "" : "請至少選擇一個Tag";
        },
        checkboxs() {
            return this.editedPost.tags
                ? this.editedPost.tags
                : this.selectedCheckbox;
        },
        tags() {
            const tags = this.$store.getters["tag/tags"];
            const tagNames = tags.map((tag) => tag.name);
            return tagNames;
        },
        userName() {
            return this.userData.name;
        },
        // editedPost() {
        //     return this.post
        //         ? { ...this.post }
        //         : {
        //               author: this.userName,
        //               title: "",
        //               thumbnail: "",
        //               content: "",
        //               previewText: "",
        //               tags: [],
        //               previewImgUrl: "",
        //           };
        // },
        // editedPost: {
        //     get() {
        //         return this.postData;
        //     },
        //     set(newVal) {
        //         this.postData = newVal;
        //     },
        // },
    },
    created() {
        this.$store.dispatch("tag/getTags");
    },
};
</script>

<style lang="postcss">
.ql-header,
.ql-editor .ql-blank,
.ql-editor.ql-blank::before {
    @apply text-black dark:!text-white;
}
.ql-editor.ql-blank::before {
    content: "請輸入文章內容...";
}
.ql-toolbar .ql-stroke,
.ql-toolbar .ql-image {
    @apply stroke-black dark:!stroke-white;
}
.ql-fill {
    @apply fill-black dark:!fill-white;
}
.ql-picker-item {
    @apply text-black;
}
.theme--dark.v-application {
    /* background: #141B2A !important; */
    @apply bg-gray-800/[0.6];
}
</style>