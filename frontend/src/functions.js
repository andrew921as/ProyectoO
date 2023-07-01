// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ2aq3TLGCNhVa4_KwYtxHsHOL8N7ueuc",
  authDomain: "proyecto-olimpo.firebaseapp.com",
  projectId: "proyecto-olimpo",
  storageBucket: "proyecto-olimpo.appspot.com",
  messagingSenderId: "269752274673",
  appId: "1:269752274673:web:5891cb6f34a8d02b2f2350",
  measurementId: "G-7SSKKQ3L20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
const auth = getAuth();


const  signInGoogle = async()=> signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
		const moreUser = getAdditionalUserInfo(result)
    
    //Comentario
    console.log(moreUser);

    return moreUser
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });



export default signInGoogle
