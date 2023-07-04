// Import the functions you need from the SDKs you need
"use client";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider,
  signInWithPopup 
} from "firebase/auth";
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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, app, provider, signInWithPopup};
// const auth = getAuth();

// const  signInGoogle = async()=> signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
// 		const moreUser = getAdditionalUserInfo(result)
    
//     //Comentario
//     console.log(moreUser);

//     return moreUser
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });



// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDJ2aq3TLGCNhVa4_KwYtxHsHOL8N7ueuc",
//   authDomain: "proyecto-olimpo.firebaseapp.com",
//   projectId: "proyecto-olimpo",
//   storageBucket: "proyecto-olimpo.appspot.com",
//   messagingSenderId: "269752274673",
//   appId: "1:269752274673:web:5891cb6f34a8d02b2f2350",
//   measurementId: "G-7SSKKQ3L20"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth();

// let provider, analytics, credentialFromError;

// const initializeClientSideObjects = async () => {
//   if (typeof window !== 'undefined') {
//     const { getAnalytics } = await import('firebase/analytics');
//     const { GoogleAuthProvider } = await import('firebase/auth');

//     provider = new GoogleAuthProvider();
//     analytics = getAnalytics(app);
//     credentialFromError = GoogleAuthProvider.credentialFromError;
//   }
// };

// initializeClientSideObjects();

// const signInGoogle = async () => signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
// 		const moreUser = getAdditionalUserInfo(result)
    
//     //Comentario
//     console.log(moreUser);

//     return moreUser
//     // tu código aquí
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData ? error.customData.email : null;
//     // The AuthCredential type that was used.
//     const credential = credentialFromError(error);
//     // ...
//   });

// export default signInGoogle;





// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyDJ2aq3TLGCNhVa4_KwYtxHsHOL8N7ueuc",
//   authDomain: "proyecto-olimpo.firebaseapp.com",
//   projectId: "proyecto-olimpo",
//   storageBucket: "proyecto-olimpo.appspot.com",
//   messagingSenderId: "269752274673",
//   appId: "1:269752274673:web:5891cb6f34a8d02b2f2350",
//   measurementId: "G-7SSKKQ3L20"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth();

// let provider, analytics;

// const initializeClientSideObjects = async () => {
//   if (typeof window !== 'undefined') {
//     const { getAnalytics } = await import('firebase/analytics');
//     const { GoogleAuthProvider } = await import('firebase/auth');

//     provider = new GoogleAuthProvider();
//     analytics = getAnalytics(app);
//   }
// };

// initializeClientSideObjects();

// const signInGoogle = async () => signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
// 		const moreUser = getAdditionalUserInfo(result)
    
//     //Comentario
//     console.log(moreUser);

//     return moreUser
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData ? error.customData.email : null; // verifica si 'customData' existe
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });

// export default signInGoogle;
