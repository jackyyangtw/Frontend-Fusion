## bugs fix:

-   ~如果選擇 light mode 重整後會直接變成 dark mode~
-   ~admin page 的 filtered data 有問題 post id 為 undefined~
-   ~admin/new-post 的 userName 總是 return userData~
-   ~store/user/isManager 需處理等 userData 有值再進行運算~
-   ~postPreview tag undefined~
-   ~google 登入後無法轉跳 admin https://auth.nuxtjs.org/providers/google/~
-   ~google 登入後無法更新 POST，驗證錯誤(401)~
-   ~新增文章時，如果沒有選擇 Tag 也能提交 POST~
-   ~管理者帳號沒有出現管理 TAG~
-   ~如果是帳號密碼登入，userData 會變得很奇怪，導致資料無法正確顯示~
-   新增的 TAG 會有 class 但不會有樣式
-   搜尋的時候需要排除 base64 的 img code


## features:
-   讓使用者可以上傳 preview 圖片
-   使用者回覆功能
-   點選作者名稱可以連到該作者的頁面
-   新增 管理頁面不要一直重複載入資料功能(如果沒有新資料就不要重新載入)
-   ~登入後可編輯個人資料，新增 Post 的時候可以自動帶入姓名~
-   ~新增 Post 圖片上傳功能~
-   ~新增 filter 功能~
-   ~新增可以管理 TAG 的帳號~

## deploy vercel error

https://github.com/orgs/vercel/discussions/103

nuxt:
https://github.com/nuxt/vercel-builder/issues/633

## quill editor 參考文章

https://www.alvinchen.club/2020/09/07/nuxt-js%E4%BD%BF%E7%94%A8quill%E7%B7%A8%E8%BC%AF%E5%99%A8%E4%B8%8A%E5%82%B3%E5%9C%96%E7%89%87%E5%8F%8A%E7%9B%B4%E6%8E%A5%E7%B7%A8%E8%BC%AFhtml/

testing account: jaky2204564@gmail.com
