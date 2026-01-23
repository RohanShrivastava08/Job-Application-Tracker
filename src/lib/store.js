import { firestore } from '../firebase/firebase';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

/* ---------------- Helpers ---------------- */

const jobsCollection = (uid, boardId = 'default') =>
  collection(firestore, 'users', uid, 'boards', boardId, 'jobs');

/* ---------------- One-time Fetch (BACKWARD SAFE) ---------------- */

export const getJobs = async (
  uid,
  boardId = 'default',
  pageSize = 500,
  lastVisible = null
) => {
  if (!uid) return [];

  try {
    let q = query(
      jobsCollection(uid, boardId),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );

    if (lastVisible) {
      q = query(
        jobsCollection(uid, boardId),
        orderBy('createdAt', 'desc'),
        startAfter(lastVisible),
        limit(pageSize)
      );
    }

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('getJobs failed:', error);
    return [];
  }
};

/* ---------------- Realtime Subscription ---------------- */

export const subscribeToJobs = (
  uid,
  boardId = 'default',
  onChange,
  pageSize = 500
) => {
  if (!uid) return () => {};

  const q = query(
    jobsCollection(uid, boardId),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const jobs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      onChange(jobs);
    },
    (error) => {
      console.error('Realtime jobs listener error:', error);
      onChange([]);
    }
  );

  return unsubscribe;
};

/* ---------------- CRUD ---------------- */

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
