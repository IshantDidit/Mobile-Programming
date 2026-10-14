import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJnZv2HeecvG42q3WvS-ZwNDiUA_K3dRc",
  authDomain: "mobile-programming-662cf.firebaseapp.com",
  projectId: "mobile-programming-662cf",
  storageBucket: "mobile-programming-662cf.firebasestorage.app",
  messagingSenderId: "631758588783",
  appId: "1:631758588783:web:60499f18c3b7d7aca2f69a"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app, "https://mobile-programming-662cf-default-rtdb.asia-southeast1.firebasedatabase.app");

const form = document.getElementById("contactForm");
const status = document.getElementById("statusMessage");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    status.textContent = "Please fill in all fields.";
    return;
  }

  console.log("wait", { name, email, message });

  push(ref(db, "contacts"), {
    name: name,
    email: email,
    message: message
  })
  .then(() => {
    status.textContent = "Data saved successfully!";
    console.log("Data added successfully");
    form.reset();
  })
  .catch((error) => {
    status.textContent = "Error: " + error.message;
    console.error("Error adding data:", error);
  });
});