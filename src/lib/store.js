import { firestore } from '../firebase/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

// Utility: Safe UUID generator fallback
const generateUUID = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 10);

// -------------------------
// Board Management
// -------------------------

export const getBoards = async (uid) => {
  if (!uid) throw new Error('User ID is required');
  const boardsRef = collection(firestore, 'users', uid, 'boards');
  const snapshot = await getDocs(boardsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addBoard = async (uid, name) => {
  if (!uid) throw new Error('User ID is required');
  if (!name) throw new Error('Board name is required');

  const boardsRef = collection(firestore, 'users', uid, 'boards');
  const newBoard = {
    name,
    createdAt: new Date().toISOString(),
  };
  await addDoc(boardsRef, newBoard);
  return getBoards(uid);
};

// -------------------------
// Job Management
// -------------------------

export const getJobs = async (uid, boardId = 'default') => {
  if (!uid) throw new Error('User ID is required');
  if (!boardId) throw new Error('Board ID is required');

  const jobsRef = collection(firestore, 'users', uid, 'boards', boardId, 'jobs');
  const snapshot = await getDocs(jobsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addJob = async (uid, boardId, job) => {
  if (!uid) throw new Error('User ID is required');
  if (!boardId) throw new Error('Board ID is required');
  if (!job) throw new Error('Job data is required');

  const jobsRef = collection(firestore, 'users', uid, 'boards', boardId, 'jobs');
  const newJob = {
    ...job,
    createdAt: new Date().toISOString(),
    notes: job.notes || [],
    tags: job.tags || [],
  };
  await addDoc(jobsRef, newJob);
  return getJobs(uid, boardId);
};

export const updateJob = async (uid, boardId, jobId, updates) => {
  if (!uid || !boardId || !jobId || !updates)
    throw new Error('All parameters are required for updateJob');

  const jobRef = doc(firestore, 'users', uid, 'boards', boardId, 'jobs', jobId);
  await updateDoc(jobRef, updates);
  return getJobs(uid, boardId);
};

export const deleteJob = async (uid, boardId, jobId) => {
  if (!uid || !boardId || !jobId)
    throw new Error('All parameters are required for deleteJob');

  const jobRef = doc(firestore, 'users', uid, 'boards', boardId, 'jobs', jobId);
  await deleteDoc(jobRef);
  return getJobs(uid, boardId);
};

// -------------------------
// Notes & Tags
// -------------------------

export const addNote = async (uid, boardId, jobId, noteText) => {
  if (!uid || !boardId || !jobId || !noteText)
    throw new Error('All parameters are required for addNote');

  const jobRef = doc(firestore, 'users', uid, 'boards', boardId, 'jobs', jobId);
  const jobSnapshot = await getDoc(jobRef);
  const currentNotes = jobSnapshot.data()?.notes || [];
  const note = {
    id: generateUUID(),
    text: noteText,
    createdAt: new Date().toISOString(),
  };
  await updateDoc(jobRef, { notes: [...currentNotes, note] });
};

export const addTag = async (uid, boardId, jobId, tag) => {
  if (!uid || !boardId || !jobId || !tag)
    throw new Error('All parameters are required for addTag');

  const jobRef = doc(firestore, 'users', uid, 'boards', boardId, 'jobs', jobId);
  const jobSnapshot = await getDoc(jobRef);
  const currentTags = jobSnapshot.data()?.tags || [];
  const updatedTags = Array.from(new Set([...currentTags, tag]));
  await updateDoc(jobRef, { tags: updatedTags });
};

export const removeTag = async (uid, boardId, jobId, tag) => {
  if (!uid || !boardId || !jobId || !tag)
    throw new Error('All parameters are required for removeTag');

  const jobRef = doc(firestore, 'users', uid, 'boards', boardId, 'jobs', jobId);
  const jobSnapshot = await getDoc(jobRef);
  const currentTags = jobSnapshot.data()?.tags || [];
  const updatedTags = currentTags.filter(t => t !== tag);
  await updateDoc(jobRef, { tags: updatedTags });
};

// -------------------------
// Job Templates
// -------------------------

export const JOB_TEMPLATES = {
  'Tech Role': {
    role: 'Software Engineer',
    tags: ['Remote', 'Tech'],
    resumeVersion: 'Technical',
  },
  'Startup Role': {
    role: 'Full Stack Developer',
    tags: ['Startup', 'Fast-paced'],
    resumeVersion: 'Startup',
  },
  'Marketing Role': {
    role: 'Digital Marketing Manager',
    tags: ['Marketing', 'Creative'],
    resumeVersion: 'Marketing',
  },
};
