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

/**
 * Fetch all boards for a user
 * @param {string} uid - User ID
 * @returns {Promise<Array>}
 */
export const getBoards = async (uid) => {
  if (!uid) throw new Error('User ID is required');
  const boardsRef = collection(firestore, 'users', uid, 'boards');
  const snapshot = await getDocs(boardsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Add a new board for a user
 * @param {string} uid - User ID
 * @param {string} name - Board name
 * @returns {Promise<Array>} Updated list of boards
 */
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

/**
 * Fetch jobs for a user and board
 * @param {string} uid - User ID
 * @param {string} boardId - Board ID (default: 'default')
 * @returns {Promise<Array>}
 */
export const getJobs = async (uid, boardId = 'default') => {
  if (!uid) throw new Error('User ID is required');
  if (!boardId) throw new Error('Board ID is required');

  const jobsRef = collection(firestore, 'users', uid, 'boards', boardId, 'jobs');
  const snapshot = await getDocs(jobsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Add a new job to a board
 * @param {string} uid - User ID
 * @param {string} boardId - Board ID
 * @param {object} job - Job details object
 * @returns {Promise<Array>} Updated list of jobs
 */
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
    feedback: job.feedback || null,
  };
  await addDoc(jobsRef, newJob);
  return getJobs(uid, boardId);
};

/**
 * Update an existing job
 * @param {string} uid - User ID
 * @param {string} boardId - Board ID
 * @param {string} jobId - Job ID
 * @param {object} updates - Fields to update
 * @returns {Promise<Array>} Updated list of jobs
 */
export const updateJob = async (uid, boardId, jobId, updates) => {
  if (!uid) throw new Error('User ID is required');
  if (!boardId) throw new Error('Board ID is required');
  if (!jobId) throw new Error('Job ID is required');
  if (!updates) throw new Error('Update data is required');

  const jobRef = doc(firestore, 'users', uid, 'boards', boardId, 'jobs', jobId);
  await updateDoc(jobRef, updates);
  return getJobs(uid, boardId);
};

/**
 * Delete a job
 * @param {string} uid - User ID
 * @param {string} boardId - Board ID
 * @param {string} jobId - Job ID
 * @returns {Promise<Array>} Updated list of jobs
 */
export const deleteJob = async (uid, boardId, jobId) => {
  if (!uid) throw new Error('User ID is required');
  if (!boardId) throw new Error('Board ID is required');
  if (!jobId) throw new Error('Job ID is required');

  const jobRef = doc(firestore, 'users', uid, 'boards', boardId, 'jobs', jobId);
  await deleteDoc(jobRef);
  return getJobs(uid, boardId);
};

// -------------------------
// Notes, Tags, Feedback Management
// -------------------------

/**
 * Add a note to a job
 * @param {string} uid - User ID
 * @param {string} boardId - Board ID
 * @param {string} jobId - Job ID
 * @param {string} noteText - Note content
 */
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

/**
 * Add a tag to a job (avoiding duplicates)
 * @param {string} uid - User ID
 * @param {string} boardId - Board ID
 * @param {string} jobId - Job ID
 * @param {string} tag - Tag text
 */
export const addTag = async (uid, boardId, jobId, tag) => {
  if (!uid || !boardId || !jobId || !tag)
    throw new Error('All parameters are required for addTag');

  const jobRef = doc(firestore, 'users', uid, 'boards', boardId, 'jobs', jobId);
  const jobSnapshot = await getDoc(jobRef);
  const currentTags = jobSnapshot.data()?.tags || [];
  const updatedTags = Array.from(new Set([...currentTags, tag]));
  await updateDoc(jobRef, { tags: updatedTags });
};

/**
 * Remove a tag from a job
 * @param {string} uid - User ID
 * @param {string} boardId - Board ID
 * @param {string} jobId - Job ID
 * @param {string} tag - Tag to remove
 */
export const removeTag = async (uid, boardId, jobId, tag) => {
  if (!uid || !boardId || !jobId || !tag)
    throw new Error('All parameters are required for removeTag');

  const jobRef = doc(firestore, 'users', uid, 'boards', boardId, 'jobs', jobId);
  const jobSnapshot = await getDoc(jobRef);
  const currentTags = jobSnapshot.data()?.tags || [];
  const updatedTags = currentTags.filter(t => t !== tag);
  await updateDoc(jobRef, { tags: updatedTags });
};

/**
 * Add or update feedback for a job
 * @param {string} uid - User ID
 * @param {string} boardId - Board ID
 * @param {string} jobId - Job ID
 * @param {object} feedback - Feedback details
 */
export const addFeedback = async (uid, boardId, jobId, feedback) => {
  if (!uid || !boardId || !jobId || !feedback)
    throw new Error('All parameters are required for addFeedback');

  const jobRef = doc(firestore, 'users', uid, 'boards', boardId, 'jobs', jobId);
  await updateDoc(jobRef, {
    feedback: {
      ...feedback,
      createdAt: new Date().toISOString(),
    },
  });
};

// -------------------------
// Job Templates (Static Data)
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
