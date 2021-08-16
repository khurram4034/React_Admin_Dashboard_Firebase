import firebase from 'firebase';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyCN1kVBrbKdifrTg61MZ7_9j67V7Sc4E98",
    authDomain: "curd-admin-dashboard.firebaseapp.com",
    projectId: "curd-admin-dashboard",
    storageBucket: "curd-admin-dashboard.appspot.com",
    messagingSenderId: "217206629065",
    appId: "1:217206629065:web:703099534446a0df362318"
};
// Initialize Firebase
const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();