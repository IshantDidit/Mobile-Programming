import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  get,
  child
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyBJnZv2HeecvG42q3WvS-ZwNDiUA_K3dRc",
  authDomain: "mobile-programming-662cf.firebaseapp.com",
  projectId: "mobile-programming-662cf",
  storageBucket: "mobile-programming-662cf.firebasestorage.app",
  messagingSenderId: "631758588783",
  appId: "1:631758588783:web:60499f18c3b7d7aca2f69a"
};


const app = initializeApp(firebaseConfig);

const db = getDatabase(
  app,
  "https://mobile-programming-662cf-default-rtdb.asia-southeast1.firebasedatabase.app"
);


// Write user data
function writeUserData(
  userId,
  firstname,
  lastname,
  email,
  phone,
  address,
  city,
  age,
  gender,
  occupation
) {

  set(ref(db, "users/" + userId), {
    id: userId,
    fname: firstname,
    lname: lastname,
    email: email,
    phone: phone,
    address: address,
    city: city,
    age: age,
    gender: gender,
    occupation: occupation
  })
  .then(() => {
    console.log("User added successfully");
  })
  .catch((error) => {
    console.error("Error adding user:", error);
  });

}

window.writeUserData = writeUserData;


// Read user data
function readUser(userId) {

  const dbRef = ref(db);

  get(child(dbRef, "users/" + userId))
    .then((snapshot) => {

      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("User not found");
      }

    })
    .catch((error) => {
      console.error("Error reading user:", error);
    });

}

window.readUser = readUser;