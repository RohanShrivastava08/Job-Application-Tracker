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

/* Helpers */
const jobsCollection = (uid, boardId = 'default') =>
  collection(firestore, 'users', uid, 'boards', boardId, 'jobs');

/* Fetch jobs (paginated) */
export const getJobs = async (
  uid,
  boardId = 'default',
  pageSize = 100,
  lastVisible = null
) => {
  if (!uid) throw new Error('User ID required');

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

  return {
    jobs: snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })),
    lastVisible: snapshot.docs[snapshot.docs.length - 1] || null,
  };
};

/* Add job */
export const addJob = async (uid, boardId, job) => {
  if (!uid || !job) throw new Error('Invalid job data');

  await addDoc(jobsCollection(uid, boardId), {
    company: job.company,
    role: job.role,
    location: job.location,
    status: job.status,
    date: job.date,               // user-entered date
    notes: job.notes || '',       // ALWAYS string
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

/* Update job */
export const updateJob = async (uid, boardId, jobId, updates) => {
  if (!uid || !jobId) throw new Error('Invalid update');

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

/* Delete job  */
export const deleteJob = async (uid, boardId, jobId) => {
  if (!uid || !jobId) throw new Error('Invalid delete');

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
