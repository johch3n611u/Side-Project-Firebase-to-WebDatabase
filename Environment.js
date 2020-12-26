// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
function FireBaseBuilder() {

    var firebaseConfig = {
        apiKey: "AIzaSyA0HTv4SIfnnbEptOuSnf8wmOGmgMJ0bgE",
        authDomain: "justdo-1165.firebaseapp.com",
        projectId: "justdo-1165",
        storageBucket: "justdo-1165.appspot.com",
        messagingSenderId: "865876645704",
        appId: "1:865876645704:web:81d74f5362557c9cfcc57d",
        measurementId: "G-XS9L7WPC9W"
    };

    // Initialize Firebase
    function InitializeDB() {
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
        console.log('FireBaseBuilder Ready')
        return firebase.database();
    }

    return InitializeDB
}

// 閉包
// function outer() {
//    var a = 10;

//    function addNum(b) {
//        a = a + 1;
//        return a + b;
//    }

//    function addNum2(b) {
//        a = a + 1;
//        return a + b;
//    }
//    return addNum;
// }

// var myFun1 = outer();
// var myFun2 = outer();