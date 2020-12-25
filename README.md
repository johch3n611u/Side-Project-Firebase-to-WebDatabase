# 20201211

弊端出現了，也更了解為何需要前端框架將資料與功能做拆分...

依照目前這個狀況 ( 單純用 jq select render ... Unlimited levels ) 要實作儲存與渲染會異常複雜...

應該用 treejs 得到的資訊，

<https://ithelp.ithome.com.tw/questions/10199419>

<https://www.twblogs.net/a/5c0a1e5abd9eee6fb37b69f2>

先從資料結構搞起在依序做功能才會較簡單，

所以目前這個專案從 multiple child todolist 轉為 利用 firebase 做登入驗證，方便做後續其他系統。

## 參考

<https://ithelp.ithome.com.tw/users/20112093/ironman/1854>

## 步驟

意外發現 firebase 還有提供驗證 api 毫不考慮直接試用捨棄原來 JWT 等需要再研究，

![alt](/assets/filebase.png)

1. 帳號申請
2. script 載入
3. 寫入方式
   1. set
   2. push
   3. update


---

## 捨棄版本

![alt](/assets/fail.png)

<https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-%E9%80%8F%E9%81%8E-jwt-%E5%AF%A6%E4%BD%9C%E9%A9%97%E8%AD%89%E6%A9%9F%E5%88%B6-2e64d72594f8>

<https://www.google.com/search?sxsrf=ALeKk01oDDxqz9XcaBDp8NM8R2TLrtCatw%3A1607749066326&ei=yk3UX8C-E9HKmAXa-rbwAg&q=jstree&oq=jstree&gs_lcp=CgZwc3ktYWIQAzICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADICCAA6BAgAEAo6BQgAELEDOggIABCxAxCDAVC5SVjRVGCCWWgAcAB4AIABRIgBqQGSAQEzmAEAoAEBoAECqgEHZ3dzLXdpesABAQ&sclient=psy-ab&ved=0ahUKEwjAy_H_08ftAhVRJaYKHVq9DS4Q4dUDCA0&uact=5>

<https://www.zhihu.com/question/61532959>

# 20201204

需求與進度卡在某個段落，所以決定把 firebase 嘗試串接後就先 close 做別的。

<https://www.playpcesor.com/2012/09/workflowy.html>

<https://basecamp.com/>

slack trallor

找到一個很類似的東西但好像要錢?

<https://www.google.com/search?q=wunderlist&rlz=1C1CHBF_zh-TWTW905TW905&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi1kZyJ1rPtAhULqpQKHe4BBB8Q_AUoAnoECAYQBA&biw=1920&bih=947>

## Firebase

<https://www.google.com/search?q=firebase+%E5%85%8D%E8%B2%BB%E9%A1%8D%E5%BA%A6&oq=firebase+%E5%85%8D%E8%B2%BB%E9%A1%8D%E5%BA%A6&aqs=chrome..69i57.5671j0j1&sourceid=chrome&ie=UTF-8>

<https://medium.com/@erickuo801204/firebase%E7%AD%86%E8%A8%98-1-database-%E8%B3%87%E6%96%99%E5%BA%AB-hosting-%E9%9D%9C%E6%85%8B%E7%B6%B2%E7%AB%99-359cbcb8f8be>

<https://ithelp.ithome.com.tw/articles/10207710>

<https://ithelp.ithome.com.tw/articles/10193707>

## MBO、KPI、OKR

<https://www.google.com/search?q=MBO%E3%80%81KPI%E3%80%81OKR&oq=MBO%E3%80%81KPI%E3%80%81OKR&aqs=chrome..69i57.503j0j1&sourceid=chrome&ie=UTF-8>


