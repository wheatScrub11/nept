 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-analytics.js";
 import { 
    collection,
    getFirestore,
    addDoc,
    getDocs,
    getDoc,
    doc,
    onSnapshot
} 
from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js"
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyBK59VBN4epusinF4cH3Y7_Rje7jsPjuxY",
   authDomain: "neptune-fs.firebaseapp.com",
   projectId: "neptune-fs",
   storageBucket: "neptune-fs.appspot.com",
   messagingSenderId: "805218435255",
   appId: "1:805218435255:web:1dc1814da8ea64939b8d32",
   measurementId: "G-MLTX07ZPP1"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const db = getFirestore()

export const saveFile = (title, desc, file) =>{
    addDoc(collection(db, "files"), {title, desc, file})
}

export const getFiles = () =>{
    return getDocs(collection(db, "files"))
}
