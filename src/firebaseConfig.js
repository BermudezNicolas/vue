
import { initializeApp } from "firebase/app";
import {
  browserSessionPersistence,
  getAuth, 
  setPersistence
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6ukl9tb4qtKhBAmjtiwa1ZEqNIvXn80w",
  authDomain: "primer-vue3-6bd53.firebaseapp.com",
  projectId: "primer-vue3-6bd53",
  storageBucket: "primer-vue3-6bd53.appspot.com",
  messagingSenderId: "382571488278",
  appId: "1:382571488278:web:bd4fb7b65db26afa9a0137"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


setPersistence(auth, browserSessionPersistence)
export {auth}