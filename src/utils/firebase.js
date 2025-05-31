// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA5oiY9ktZgsGl2wvm1b4DPQCEnBWxZ_yI",
  authDomain: "pixeltube-52604.firebaseapp.com",
  projectId: "pixeltube-52604",
  storageBucket: "pixeltube-52604.appspot.com",
  messagingSenderId: "558986114317",
  appId: "1:558986114317:web:87d00eca91d2f05e796c44"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };