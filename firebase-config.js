// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6Zo5bFlgFtXR8shh5gmhO8k0kQVCqFC8",
  authDomain: "survey-berlin.firebaseapp.com",
  projectId: "survey-berlin",
  storageBucket: "survey-berlin.firebasestorage.app",
  messagingSenderId: "641538611215",
  appId: "1:641538611215:web:4ddbc54ccdaa9a625c6b7a",
  measurementId: "G-6NCX1PQ5XN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Export for use in other files
export { db, collection, addDoc, getDocs, query, orderBy };
