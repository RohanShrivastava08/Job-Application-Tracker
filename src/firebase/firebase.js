import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
} from 'firebase/firestore';

// 🔐 Firebase Config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// 🔑 Auth Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// 👉 Sign In Methods
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    throw error;
  }
};

export const signInWithGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    return result.user;
  } catch (error) {
    console.error('Error during GitHub sign-in:', error);
    throw error;
  }
};

// 🔓 Sign Out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('Sign-out successful');
  } catch (error) {
    console.error('Error during sign-out:', error);
  }
};

// 📁 Firestore Helper Functions

// 🔄 Get all jobs for user
export const getJobs = async (uid) => {
  const jobsRef = collection(firestore, 'users', uid, 'jobs');
  const snapshot = await getDocs(jobsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// ➕ Add a new job
export const addJob = async (uid, jobData) => {
  const jobsRef = collection(firestore, 'users', uid, 'jobs');
  await addDoc(jobsRef, {
    ...jobData,
    createdAt: new Date().toISOString(),
  });
  return getJobs(uid);
};

// ✏️ Update existing job
export const updateJob = async (uid, jobId, updates) => {
  const jobRef = doc(firestore, 'users', uid, 'jobs', jobId);
  await updateDoc(jobRef, updates);
  return getJobs(uid);
};

// ❌ Delete a job
export const deleteJob = async (uid, jobId) => {
  const jobRef = doc(firestore, 'users', uid, 'jobs', jobId);
  await deleteDoc(jobRef);
  return getJobs(uid);
};

export { auth, firestore, onAuthStateChanged };
