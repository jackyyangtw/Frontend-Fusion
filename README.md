## bugs fix:
* ~如果選擇light mode重整後會直接變成dark mode~
* ~admin page 的 filtered data 有問題 post id 為undefined~
* ~admin/new-post 的 userName 總是 return userData~
* ~store/user/isManager 需處理等userData有值再進行運算~
* ~postPreview tag undefined~
* 新增的TAG會有class但不會有樣式
* 調整 store/initAuth 需加入用google登入的判斷(如果是google登入就不用考慮tokenExpiration)

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