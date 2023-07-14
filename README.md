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
-  ~新增POST會有問題~
-   新增的 TAG 會有 class 但不會有樣式
-   隔一天後cookie data會被刪除，但是依然保持登入狀態
-   重整頁面後應該要重新抓userData，可以在最外層抓，而不是在每個頁面抓(目前admin兩個表單頁面都有手動寫抓資料)
-   新增post的時候如果有上傳preview圖片，會有問題。如果是更新之後再上傳preview圖片就沒問題


## features:
-   ~讓使用者可以上傳 preview 圖片~
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

## Google login
https://www.letswrite.tw/firebase-auth-google-fb/


## upload post preview image
1. 取得使用者上傳的圖片轉為base64，並且顯示在畫面上
2. 等form submit的時候，把base64轉為blob，並且上傳到firebase storage
3. 等firebase storage上傳完成後，再把圖片的url放到post的資料庫中

## nuxt firebase
[Title](https://firebase.nuxtjs.org/guide/usage.html)