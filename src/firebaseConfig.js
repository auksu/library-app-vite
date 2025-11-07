// ./src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase プロジェクト設定
const firebaseConfig = {
  apiKey: "AIzaSyA2f7Jfh1XuXmNwE9-HtXuAcYad7zEKK34",
  authDomain: "library-58afc.firebaseapp.com",
  databaseURL: "https://library-58afc-default-rtdb.firebaseio.com",
  projectId: "library-58afc",
  storageBucket: "library-58afc.appspot.com",
  messagingSenderId: "396494765245",
  appId: "1:396494765245:web:c01f20045daf9aca084bd4"
};

// Firebase 初期化
const app = initializeApp(firebaseConfig);

// Realtime Database を取得
export const db = getDatabase(app);
