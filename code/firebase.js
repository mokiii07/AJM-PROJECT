
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'; 


const firebaseConfig = {
  apiKey: "AIzaSyA_GvUW6yq9oQY78ALVC3m_IqNBlhHn14M",
  authDomain: "students-data-72ec6.firebaseapp.com",
  projectId: "students-data-72ec6",
  storageBucket: "students-data-72ec6.firebasestorage.app",
  messagingSenderId: "494197865367",
  appId: "1:494197865367:web:4031a8d15d55b9793562d2",
  measurementId: "G-ZB558QHR1D"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); 

export { db }; 