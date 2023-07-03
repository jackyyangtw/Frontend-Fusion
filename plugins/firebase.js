import firebase from 'firebase/app';
import 'firebase/auth';
// import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

// copy the config from the console https://console.firebase.google.com/u/0/project/sign-11111/settings/general/
const firebaseConfig = {
    apiKey: "AIzaSyBY_GSIZmBRcvwqbA6ZXJzFlV3UYoO88os",
    authDomain: "nuxt-blog-b5610.firebaseapp.com",
    databaseURL: "https://nuxt-blog-b5610-default-rtdb.firebaseio.com",
    projectId: "nuxt-blog-b5610",
    storageBucket: "nuxt-blog-b5610.appspot.com",
    messagingSenderId: "583146395669",
    appId: "1:583146395669:web:a4c72fde19beecba74d61c"
};
let app = null

if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig, {
        'X-Client-Name': 'web',
        'X-Client-Version': '1.0.0'
    })
}

const db = firebase.database();
const storage = firebase.storage();

// const 



export default (ctx, inject) => {
    inject('firebase', firebase)
    inject('db', db)
    inject('storage', storage)
}