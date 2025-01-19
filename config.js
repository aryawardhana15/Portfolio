// Impor Firebase (gunakan CDN atau module bundler)

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, push, ref } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: ENV.API_KEY,
  authDomain: ENV.AUTH_DOMAIN,
  databaseURL: ENV.DATABASE_URL,
  projectId: ENV.PROJECT_ID,
  storageBucket: ENV.STORAGE_BUCKET,
  messagingSenderId: ENV.MESSAGING_SENDER_ID,
  appId: ENV.APP_ID,
  measurementId: ENV.MEASUREMENT_ID,
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Fungsi untuk menyimpan data ke Firebase
function handleSubmit(event) {
  event.preventDefault(); // Mencegah reload halaman

  // Ambil data dari form
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  // Simpan data ke Firebase Realtime Database
  const contactRef = ref(db, "");
  // console.log(name , email , phone , message);
  console.log({
    name: name,
    email: email,
    phone: phone,
    message: message,
  });
  
  push(contactRef, {
    name: name,
    email: email,
    phone: phone,
    message: message,
  })
    .then(() => {
      alert("Form berhasil dikirim!");
      document.getElementById("contact-form").reset(); // Reset form setelah submit berhasil
    })
    .catch((error) => {
      console.error("Gagal menyimpan data: ", error);
      alert("Terjadi kesalahan saat mengirim data.");
    });
}

const form = document.getElementById("contact-form");
form.addEventListener("submit", handleSubmit);
