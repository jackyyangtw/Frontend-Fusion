# Frontend Fusion:
- 使用Nuxt.js開發的SSR網頁應用程式，並進行SEO優化。
- 使用Firebase進行身分驗證與註冊，可使用電子郵件或Gmail登入。
- 使用Firebase即時資料庫存放文章、使用者和標籤資料，並使用Firebase儲存空間存放文章圖片。
- 使用Tailwindcss進行樣式設定。 使用Vuetify的modern form component和vee-validate進行表單驗證。
- 可切換夜間模式和白天模式。
- 有Post搜尋功能。

## bug
- deploy後，文章圖片無法顯示，但開發時卻可以顯示。(nuxt-img provider問題，正式環境沒有ipx provider) (錯誤頁面: https://frontend-fusion-7wf7h007q-jackyyangtw.vercel.app/)(參考: https://v0.image.nuxtjs.org/providers/vercel)

- deploy後進入編輯頁面，content會消失