const STORAGE_KEY = 'job-applications';
const BOARDS_KEY = 'job-boards';

// Board management
export const getBoards = () => {
  const boards = localStorage.getItem(BOARDS_KEY);
  return boards ? JSON.parse(boards) : [{
    id: 'default',
    name: 'My Job Search',
    createdAt: new Date().toISOString()
  }];
};

export const saveBoards = (boards) => {
  localStorage.setItem(BOARDS_KEY, JSON.stringify(boards));
};

export const addBoard = (name) => {
  const boards = getBoards();
  const newBoard = {
    id: crypto.randomUUID(),
    name,
    createdAt: new Date().toISOString()
  };
  const newBoards = [...boards, newBoard];
  saveBoards(newBoards);
  return newBoards;
};

// Job management
export const getJobs = (boardId = 'default') => {
  const jobs = localStorage.getItem(`${STORAGE_KEY}-${boardId}`);
  return jobs ? JSON.parse(jobs) : [];
};

export const saveJobs = (jobs, boardId = 'default') => {
  localStorage.setItem(`${STORAGE_KEY}-${boardId}`, JSON.stringify(jobs));
};

export const checkDuplicate = (company, role, boardId = 'default') => {
  const jobs = getJobs(boardId);
  return jobs.find(job => 
    job.company.toLowerCase() === company.toLowerCase() && 
    job.role.toLowerCase() === role.toLowerCase()
  );
};

export const addJob = (job, boardId = 'default') => {
  const jobs = getJobs(boardId);
  const newJobs = [...jobs, { 
    ...job, 
    id: crypto.randomUUID(),
    notes: [],
    tags: [],
    feedback: null,
    createdAt: new Date().toISOString()
  }];
  saveJobs(newJobs, boardId);
  return newJobs;
};

export const updateJob = (jobId, updates, boardId = 'default') => {
  const jobs = getJobs(boardId);
  const newJobs = jobs.map(job => 
    job.id === jobId ? { ...job, ...updates } : job
  );
  saveJobs(newJobs, boardId);
  return newJobs;
};

export const deleteJob = (jobId, boardId = 'default') => {
  const jobs = getJobs(boardId);
  const newJobs = jobs.filter(job => job.id !== jobId);
  saveJobs(newJobs, boardId);
  return newJobs;
};

export const addNote = (jobId, note, boardId = 'default') => {
  const jobs = getJobs(boardId);
  const newJobs = jobs.map(job => 
    job.id === jobId 
      ? { 
          ...job, 
          notes: [...(job.notes || []), { 
            id: crypto.randomUUID(),
            text: note,
            createdAt: new Date().toISOString()
          }]
        } 
      : job
  );
  saveJobs(newJobs, boardId);
  return newJobs;
};

export const addFeedback = (jobId, feedback, boardId = 'default') => {
  const jobs = getJobs(boardId);
  const newJobs = jobs.map(job => 
    job.id === jobId 
      ? { 
          ...job, 
          feedback: {
            ...feedback,
            createdAt: new Date().toISOString()
          }
        } 
      : job
  );
  saveJobs(newJobs, boardId);
  return newJobs;
};

export const addTag = (jobId, tag, boardId = 'default') => {
  const jobs = getJobs(boardId);
  const newJobs = jobs.map(job => 
    job.id === jobId 
      ? { 
          ...job, 
          tags: [...new Set([...(job.tags || []), tag])]
        } 
      : job
  );
  saveJobs(newJobs, boardId);
  return newJobs;
};

export const removeTag = (jobId, tag, boardId = 'default') => {
  const jobs = getJobs(boardId);
  const newJobs = jobs.map(job => 
    job.id === jobId 
      ? { 
          ...job, 
          tags: (job.tags || []).filter(t => t !== tag)
        } 
      : job
  );
  saveJobs(newJobs, boardId);
  return newJobs;
};

// Job templates
export const JOB_TEMPLATES = {
  'Tech Role': {
    role: 'Software Engineer',
    tags: ['Remote', 'Tech'],
    resumeVersion: 'Technical'
  },
  'Startup Role': {
    role: 'Full Stack Developer',
    tags: ['Startup', 'Fast-paced'],
    resumeVersion: 'Startup'
  },
  'Marketing Role': {
    role: 'Digital Marketing Manager',
    tags: ['Marketing', 'Creative'],
    resumeVersion: 'Marketing'
  }
};