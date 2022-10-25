import create from "zustand";
// Di sini kita akan import beberapa fungsi dari package firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Di sini kita akan import beberapa fungsi dari package firebase/auth
// Firebase ini sebenarnya memungkinkan kita untuk bisa login dengan banyak sekali
// Provider (Google, Github, Meta, dsb).

import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopup,
    signOut,
} from "firebase/auth";

// Initialize Firebase

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyAnidfEuW2cQmpn-bvsupUPnLsY0I5-fes",
  
    authDomain: "paragon-2149e.firebaseapp.com",
  
    databaseURL: "https://paragon-2149e.firebaseio.com",
  
    projectId: "paragon-2149e",
  
    storageBucket: "paragon-2149e.appspot.com",
  
    messagingSenderId: "180528495348",
  
    appId: "1:180528495348:web:1d7415ea295b17dde0bca1",
  
    measurementId: "G-ZS21VXW6GD"
  
  };

// Inisialisasi Firebase dan menggunakan Authentcation
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");

// slice
const sliceFirebase = (set) => ({
    auth : auth,
    user : null,
    error : null,
    isLoading: false,
    // Fungsi untuk Register
    // Kita gunakan versi async / await untuk memudahkan yah
    registerWithEmailAndPass : async (email, password) => {
        set({ isLoading: true })
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            set({
                isLoading: false,
                user: response.user,
            });
        } catch (err) {
            set({
                isLoading: false,
                error: err,
            });
        }
    },

    // Fungsi untuk Login
    // Kita gunakan versi async / await untuk memudahkan yah
    signInWithEmailAndPass : async (email, password) => {
        set({ isLoading: true })
        // Dokumentasi: https://firebase.google.com/docs/auth/web/password-auth#sign_in_a_user_with_an_email_address_and_password
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            set({
                isLoading: false,
                user: userCredential.user,
            });
        } catch (err) {
            set({
                isLoading: false,
                error: err,
            });
        }
    },

    signInWithGoogle : async () => {
        set({ isLoading: true })
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            set({
                isLoading: false,
                user: userCredential.user,
            });
        } catch (err) {
            set({
                isLoading: false,
                error: err,
            });
        }
    },

    // Fungsi untuk reset Password
    resetPassword : async (email) => {
        set({ isLoading: true })
        // Dokumentasi: https://firebase.google.com/docs/reference/js/auth.md#sendpasswordresetemail
        try {
            await sendPasswordResetEmail(auth, email);

            set({
                isLoading: false
            });
        } catch (err) {
            set({
                isLoading: false,
                error: err,
            });
        }
    },

    // Fungsi untuk sign out
    keluarDariApps : async () => {
        set({ isLoading: true })
        // Dokumentasi: https://firebase.google.com/docs/auth/web/password-auth#next_steps
        try {
            await signOut(auth);
            set({
                isLoading: false,
                user: null,
            });
        } catch (err) {
            set({
                isLoading: false,
                error: err,
            });
        }
    },
    resetError : () => {
        set({
            error: null,
        });
    }
});
// hooks
const useFirebaseStore = create(sliceFirebase);


// selector
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.user;
export const selectError = (state) => state.error;
export const selectResetError = (state) => state.resetError;
export const selectIsLoading = (state) => state.isLoading;
export const selectRegisterWithEmailAndPass = (state) => state.registerWithEmailAndPass;
export const selectSignInWithEmailAndPass = (state) => state.signInWithEmailAndPass;
export const selectSignInWithGoogle = (state) => state.signInWithGoogle;
export const selectKeluarDariApps = (state) => state.keluarDariApps;


// export
export default useFirebaseStore;
