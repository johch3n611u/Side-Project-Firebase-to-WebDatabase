## 引言

本項目原先想做一個以 OKR KPI 為主的 Todolist 來幫忙管理任務，

單純用 jq select render 與一些功能，

但在處理Unlimited levels 與功能協作時，

遇到狀態管理不太好做的問題，打算從起專案用前端框架處理，

此專案改為練習 Firebase 身分驗證與實時數據庫存取。

# Firebase Employ

* 20201211

<!-- [alt](/assets/firebaseInitialize.png) -->

<https://medium.com/hulis-blog/frontend-engineer-guide-297821512f4e>

可以參考上述文章概述了為何需要用哪些技術，在實作 GTD todolist 時也遇到類似問題，

功能增加 data 變複雜的狀況下 jq 開始難處理，也更了解為何需要前端框架將資料與功能做拆分...

依照目前這個狀況 ( 單純用 jq select render ... Unlimited levels ) 要實作儲存與渲染會異常複雜...

應該用 treejs 得到的資訊，

<https://ithelp.ithome.com.tw/questions/10199419>

<https://www.twblogs.net/a/5c0a1e5abd9eee6fb37b69f2>

先從資料結構搞起，在依序做功能才會較簡單，

所以目前這個專案從 multiple child todolist 轉為 利用 firebase 做登入驗證，方便做後續其他系統。

## 參考

<https://ithelp.ithome.com.tw/users/20112093/ironman/1854>

## 步驟

意外發現 firebase 還有提供驗證 api 毫不考慮直接試用，捨棄原來 JWT，等需要再研究，

![alt](/assets/filebase.png)

### 實時數據庫 Realtime Database

1. 帳號申請
2. script 載入
3. 建立連線 `var db = firebase.database();` <https://firebase.google.com/docs/database/web/start>
4. 指定寫入路徑 ( 第一次寫入若該路徑不存在，則會自動新建一個 )

   ```javascript
   var path = "chinese";
   db.ref(`/${path}`)
   ```

5. 寫入資料 `{function}`
   1. `set` 會直接取代當前路徑中的所有資料。
   2. `update` 不會直接取代路徑中的所有資料，而是修改相關資料而已 // 但資料庫找不到該路徑的話就會自動新增
   3. `push` 一樣是新增資料，但是它不會取代任何資料、也不會更新任何資料，而且會自帶一個隨機產生(依據時間排序)的 key

  `SAS45D64S5AD4:"你好嗎"`

   ```javascript
     db.ref("/chinese/Bob").{function}({
         grade: 80
     })
     .then(function () {
         alert("建立成功");
     }).catch(function () {
          alert("伺服器發生錯誤，請稍後再試");
     });
   ```

6. 除錯 [firebase.database is not a function](https://stackoverflow.com/questions/38248723/firebase-database-is-not-a-function)
7. 刪除資料 `{function}`
    1. `set` 可以透過寫入空資料的方式來刪除該節點。
    2. `remove` 用法也一樣，指定要刪除的路徑即可
8. 取得資料 `{function}`
    1. `on` 會即時更新，也就是在背景待命只要`資料庫一變動`，就會抓取到最新資料。
    > 雖然 on 很方便，但免費額度的限制下，同時間只允許 100 個連線源。
    2. `once` 顧名思義只會取得一次，也就是執行時會從資料庫取得最新資料，但往後的更新將不會連動到 client 端的資料，除非再執行一次。

   ```javascript
   db.ref("chinese/Bob").{function}('value', function (snapshot) {
       var data = snapshot.val();
       console.log(data);
   });
   ```

   callback function 中，會有一個參數用來接收從資料庫取出的值，大多習慣會命名為 snapshot

9. 因為這是非同步事件，所以想要對取得的資料進行後續操作時，記得寫在 callback function 中。
10. 排序資料 `{function}`
     1. orderByChild(): 針對特定子節點做排序，參數帶入想要排序的欄位就好。
     2. orderByKey(): 不用帶入參數，依據資料的 key 來做排序。
     3. orderByValue(): 不用帶入參數，依據路徑下的值來做排序。

   ```javascript
   db.ref("chinese/Bob").{function}.once('value', function (snapshot) {
      snapshot.forEach(function (item) { // PS. orderBy 撈到的資料記得用 forEach 取出
          console.log(item.key + " " + item.val());
      })
   });
   // 針對每個人的成績做排序，將成績由低到高印出。
   db.ref("chinese").orderByChild("grade").once('value', function (snapshot) {
      snapshot.forEach(function (item) { // PS. orderBy 撈到的資料記得用 forEach 取出
          console.log(item.key + " " + item.val());
      })
   });
   ```

11. 區間限制
     1. startAt: 大於等於。
     2. endAt: 小於等於。
     3. equalTo: 等於。

   ```javascript
   db.ref("chinese").orderByChild("grade").startAt(60).endAt(100).once('value', function (snapshot) {
       snapshot.forEach(function (item) {
           console.log(item.key + " " + item.val().grade);
       })
   });
   ```

12. 比數限制
     1. limitToFirst(): 從頭開始的前幾筆。
     2. limitToLast(): 最尾端的幾筆。

   ```javascript
   db.ref("chinese").orderByChild("grade").limitToFirst(1).once('value', function (snapshot) {
       snapshot.forEach(function (item) {
           console.log(item.key + " " + item.val().grade);
       })
   });
   ```

## 身分驗證 Authentication <https://firebase.google.com/docs/auth/web/start?hl=zh-cn>

* 後端得處理
  * 使用者帳號新增
  * 密碼安全
  * 資料修改
  * 權限控制
  * token
  * 支援各大平台登入(Google、FB、Github...)
  * more...

13. 平台開通 => 平台客制功能(驗證信內容/手動新增帳號...) => 程式碼

```javascript
// 註冊
firebase.auth().createUserWithEmailAndPassword(email, password)
.then(() => {
    ...
})
.catch((error) => {
    console.log(error.message);
});

//驗證信箱
//寄送重設密碼信
//更改 Email
//刪除帳戶
//<https://firebase.google.com/docs/auth/web/manage-users>

// 登入
firebase.auth().signInWithEmailAndPassword(email, password)
.then(() => {
    ...
})
.catch((error) => {
   // `在註冊時，記得一定要有 catch 來處理錯誤，因為 Firebase 會檢查 Email 是否符合格式、或是密碼長度是否足夠...等等。`
  console.log(error.message);
});

// 登入成功
var user = firebase.auth().currentUser;
// 如果有登入狀態的話，會回傳一個包含該使用者資料的物件，沒有則回傳 null。
// firebase.auth().currentUser 只會取得當前的登入狀態，也就是如果登出後，它也不會改變。
// onAuthStateChanged 即時收到使用者當前的登入狀態，它會在登入狀態變動時執行 callback function，有點像是 Realtime database 的 on 功能。
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});
if (user) {
  // User is signed in.
} else {
  // No user is signed in.
}

// 更新資料
var user = firebase.auth().currentUser;

user.updateProfile({
    displayName: "new_hbdoy",
    photoURL: "https://hbdoy.tw/profile.jpg"
})
.then(() => {
    ...
})
.catch((error) => {
    ...
});

```

14. 權限規則 `父層的規則會覆蓋過子層`
    1. read: 限制讀取的權限
    2. write 限制寫入的權限
    3. validate: 資料驗證(ex: 要寫入的成績是不是在 0~100 之間)
15. auth: 登入狀態

```JSON
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

16. 指定路徑
    1. root: 資料庫頂層
    2. child: 可以指定路徑
    3. exists(): 指定路徑之資料是否存在`e.g. chinese 成績中，是否存在 Tony 這個人 root.child("chinese/Tony").exists()`

17. 資料

newData: 使用者 set/push/update 時帶上的資料。

e.g. 要修改 Bob 成績，但是在寫入時先驗證 grade 欄位的值是否在 0 ~ 100 之間

```JSON
{
  "rules": {
    "chinese": {
      "Bob":{
          ".write": "newData.child('grade').val() >= 0
          && newData.child('grade').val() <= 100
          && newData.child('grade').isNumber()"
      }
    }
  }
}
// same
{
  "rules": {
    "chinese": {
      "Bob":{
        "grade":{
          ".write": "newData.val() >= 0
          && newData.val() <= 100
          && newData.isNumber()"
        }
      }
    }
  }
}
```

18. 模糊參數

上面的範例中，我們限制了 Bob 的成績不能寫入 0~100 範圍外的數字，但是我們不確定每次寫入的人是誰，總不可能把資料庫所有的人名都寫上去，所以可以使用 $ 來指定不確定的傳入值。

EX: 使用 $student 來接收使用者寫入的人名，就算我們不知道那個人名是誰，但是限制了它 grade 欄位的值必須在 0~100 之間。

```JSON
{
  "rules": {
    "chinese":{
      "$student": {
        ".write": "newData.child('grade').val() >= 0
          && newData.child('grade').val() <= 100
          && newData.child('grade').isNumber()"
      }
    }
  }
}
```

19. 還有一些關於權限更複雜的應用，但到這邊感覺如果要考慮後期的維護與使用者資料的取得等等，感覺還是要依靠後端才是正確選擇 ...

應用範例

綜合以上所學，我可以一開始註冊的時候，就順便建立一個 user 欄位來存放所有註冊的 Email、uid，然後設定他是否為 admin。

接著限定只有登入且為 admin 才能夠寫入資料

```JSON
{
  "rules": {
    ".read": "true",
    ".write": "auth != null
    && data.child('/user/'+ auth.uid + '/admin').val() == true"
  }
}
```

20. 登出 <https://ithelp.ithome.com.tw/articles/10200185>

```javascript
firebase.auth().signOut().then(function() {
    alert('已登出');
    var user = firebase.auth().currentUser;
    console.log(user)
});
```

### 原理

* 必須引入所有包含 app 分析 database 驗證 等等的函式庫才可以正常使用 firebase
* <https://stackoverflow.com/questions/40563140/error-no-firebase-app-default-has-been-created-call-firebase-app-initiali/49200816>
* 必須利用 config 初始化 app，才能使用驗證，所以沒辦法把一些 config 存在雲上
* 但可以利用 database role 去管控資料存取

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
