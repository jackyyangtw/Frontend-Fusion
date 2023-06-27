## bugs fix:
* ~如果選擇light mode重整後會直接變成dark mode~
* ~admin page 的 filtered data 有問題 post id 為undefined~
* ~admin/new-post 的 userName 總是 return userData~
* ~store/user/isManager 需處理等userData有值再進行運算~
* ~postPreview tag undefined~
* ~google 登入後無法轉跳admin https://auth.nuxtjs.org/providers/google/~
* ~google登入後無法更新POST，驗證錯誤(401)~
* ~新增文章時，如果沒有選擇Tag也能提交POST~
* 新增的TAG會有class但不會有樣式
* 管理者帳號沒有出現管理TAG

// firebase.auth().signInWithPopup 會產生popup 需要reload，抵銷error
// signInWithRedirect 則會失去login data，因為page reload
// 目前狀況是兩個一起用的話可以解決，但是無法direct 到 /admin

## features:
* 讓使用者可以上傳preview圖片
* 使用者回覆功能
* ~登入後可編輯個人資料，新增Post的時候可以自動帶入姓名~
* ~新增Post圖片上傳功能~
* ~新增filter功能~
* ~新增可以管理TAG的帳號~

## deploy vercel error
https://github.com/orgs/vercel/discussions/103

nuxt:
https://github.com/nuxt/vercel-builder/issues/633

## quill editor參考文章
https://www.alvinchen.club/2020/09/07/nuxt-js%E4%BD%BF%E7%94%A8quill%E7%B7%A8%E8%BC%AF%E5%99%A8%E4%B8%8A%E5%82%B3%E5%9C%96%E7%89%87%E5%8F%8A%E7%9B%B4%E6%8E%A5%E7%B7%A8%E8%BC%AFhtml/