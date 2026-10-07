
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import {getDatabase} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBJnZv2HeecvG42q3WvS-ZwNDiUA_K3dRc",
    authDomain: "mobile-programming-662cf.firebaseapp.com",
    projectId: "mobile-programming-662cf",
    storageBucket: "mobile-programming-662cf.firebasestorage.app",
    messagingSenderId: "631758588783",
    appId: "1:631758588783:web:60499f18c3b7d7aca2f69a"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

console.log(db);
