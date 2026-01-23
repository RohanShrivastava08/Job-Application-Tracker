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
  serverTimestamp,
} from 'firebase/firestore';

/* Helper */
const jobsCollection = (uid, boardId = 'default') =>
  collection(firestore, 'users', uid, 'boards', boardId, 'jobs');

/* ============================
   GET JOBS
============================ */
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

/* ============================
   ADD JOB
============================ */
export const addJob = async (uid, boardId, job) => {
  if (!uid || !job) return [];

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

  return getJobs(uid, boardId);
};

/* ============================
   UPDATE JOB
============================ */
export const updateJob = async (uid, boardId, jobId, updates) => {
  if (!uid || !jobId) return [];

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

  return getJobs(uid, boardId);
};

/* ============================
   DELETE JOB
============================ */
export const deleteJob = async (uid, boardId, jobId) => {
  if (!uid || !jobId) return [];

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

  return getJobs(uid, boardId);
};
