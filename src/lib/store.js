import { firestore } from '../firebase/firebase';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

/* Helpers */
const jobsCollection = (uid, boardId = 'default') =>
  collection(firestore, 'users', uid, 'boards', boardId, 'jobs');

/* ------------------------------ */
/* REALTIME JOB SUBSCRIPTION      */
/* ------------------------------ */
export const subscribeToJobs = (uid, boardId = 'default', callback) => {
  if (!uid) return () => {};

  const q = query(
    jobsCollection(uid, boardId),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const jobs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(jobs);
    },
    (error) => {
      console.error('Realtime jobs error:', error);
    }
  );
};

/* ------------------------------ */
/* ADD JOB                        */
/* ------------------------------ */
export const addJob = async (uid, boardId, job) => {
  if (!uid || !job) return;

  await addDoc(jobsCollection(uid, boardId), {
    company: job.company,
    role: job.role,
    location: job.location,
    status: job.status || 'Wishlist',
    date: job.date,
    notes: job.notes || '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

/* ------------------------------ */
/* UPDATE JOB                     */
/* ------------------------------ */
export const updateJob = async (uid, boardId, jobId, updates) => {
  if (!uid || !jobId) return;

  const jobRef = doc(
    firestore,
    'users',
    uid,
    'boards',
    boardId,
    'jobs',
    jobId
  );

  await updateDoc(jobRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

/* ------------------------------ */
/* DELETE JOB                     */
/* ------------------------------ */
export const deleteJob = async (uid, boardId, jobId) => {
  if (!uid || !jobId) return;

  const jobRef = doc(
    firestore,
    'users',
    uid,
    'boards',
    boardId,
    'jobs',
    jobId
  );

  await deleteDoc(jobRef);
};
