import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration from your Firebase Console
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,  // Accessing environment variables correctly
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// GitHub Auth Provider
const githubProvider = new GithubAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log('User signed in with Google: ', result.user);
    return result.user;
  } catch (error) {
    console.error('Error during Google Sign-in: ', error);
    return null;
  }
};

export const signInWithGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    console.log('User signed in with GitHub: ', result.user);
    return result.user;
  } catch (error) {
    console.error('Error during GitHub Sign-in: ', error);
    return null;
  }
};

// Sign out
export const signOutUser = () => {
  signOut(auth)
    .then(() => {
      console.log('User signed out');
    })
    .catch((error) => {
      console.error('Error signing out: ', error);
    });
};

// Monitor auth state change (e.g., for showing user data after login)
export const monitorAuthState = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export { auth, firestore };
