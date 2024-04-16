import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import {createPinia} from  'pinia'
import router from './router'

import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

import { getFirestore } from "firebase/firestore/lite"


const firebaseConfig = {
    apiKey: "AIzaSyD6ukl9tb4qtKhBAmjtiwa1ZEqNIvXn80w",
    authDomain: "primer-vue3-6bd53.firebaseapp.com",
    projectId: "primer-vue3-6bd53",
    storageBucket: "primer-vue3-6bd53.appspot.com",
    messagingSenderId: "382571488278",
    appId: "1:382571488278:web:bd4fb7b65db26afa9a0137"
  };


const app1 = initializeApp(firebaseConfig);
const db = getFirestore(app1);

const auth = getAuth();

createApp(App).use(router).use(createPinia()).mount('#app')


export {auth,db}