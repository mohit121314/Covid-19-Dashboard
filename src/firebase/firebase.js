import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcAVklzrsSKH_vnbLYQqw9r2oPJdNxqB4",
    authDomain: "assign-1e4d3.firebaseapp.com",
    databaseURL: "https://assign-1e4d3.firebaseio.com",
    projectId: "assign-1e4d3",
    storageBucket: "assign-1e4d3.appspot.com",
    messagingSenderId: "897953965538",
    appId: "1:897953965538:web:bddb9610dd97b2c9b3c5bb",
    measurementId: "G-R4N1704L2B"
 
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
export default firebase;