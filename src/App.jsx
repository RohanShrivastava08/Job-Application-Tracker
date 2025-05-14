import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutGrid, Clock } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import {
  getJobs,
  addJob,
  updateJob,
  deleteJob
} from './lib/store';
import { auth, signInWithGoogle, signInWithGitHub } from './firebase/firebase';

import JobModal from './components/JobModal';
import JobCard from './components/JobCard';
import Dashboard from './components/Dashboard';
import TimelineView from './components/TimelineView';
import EmptyState from './components/EmptyState';
import Header from './components/Header';
import Footer from './components/Footer';
import SignInModal from './components/SignInModal';

const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected'];
const SORT_OPTIONS = [
  { label: 'Date Applied', value: 'date' },
  { label: 'Company Name', value: 'company' },
];

function App() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [view, setView] = useState('kanban');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isDark, setIsDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [user, setUser] = useState(null);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setJobs(getJobs());
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const filteredJobs = jobs
    .filter(job =>
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      return a.company.localeCompare(b.company);
    });

  const handleAddJob = (job) => {
    const newJobs = addJob(job); // Add job to storage
    setJobs(newJobs); // Update local state
    setIsModalOpen(false); // Close modal
    setEditingJob(null); // Clear editing job
  };

  const handleUpdateJob = (jobId, updates) => {
    const newJobs = updateJob(jobId, updates); // Update job in storage
    setJobs(newJobs); // Update local state
  };

  const handleDeleteJob = (jobId) => {
    const newJobs = deleteJob(jobId); // Delete job from storage
    setJobs(newJobs); // Update local state
  };

  const handleEditJob = (job) => {
    setEditingJob(job); // Set the job to be edited
    setIsModalOpen(true); // Open modal
  };

  const handleLogout = async () => {
    await auth.signOut(); // Sign out user
    setUser(null); // Clear user state
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(); // Sign in with Google
      setIsSignInModalOpen(false); // Close sign-in modal
    } catch (error) {
      console.error('Google sign-in failed:', error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInWithGitHub(); // Sign in with GitHub
      setIsSignInModalOpen(false); // Close sign-in modal
    } catch (error) {
      console.error('GitHub sign-in failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        isDark={isDark}
        onThemeToggle={() => setIsDark(!isDark)}
        user={user}
        handleLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-6 py-24">
        <Dashboard jobs={jobs} />

        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60" size={20} />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-1/4 pl-10 pr-4 py-2 bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                Sort by: {option.label}
              </option>
            ))}
          </select>

          <div className="flex rounded-lg border bg-card">
            <button
              onClick={() => setView('kanban')}
              className={`p-2 ${view === 'kanban' ? 'bg-primary text-primary-foreground' : 'hover:bg-foreground/5'} rounded-l-lg`}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setView('timeline')}
              className={`p-2 ${view === 'timeline' ? 'bg-primary text-primary-foreground' : 'hover:bg-foreground/5'} rounded-r-lg`}
            >
              <Clock size={20} />
            </button>
          </div>

          {user && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors"
            >
              Add Job
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {view === 'kanban' ? (
            <motion.div
              key="kanban"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              {STATUSES.map(status => (
                <div key={status} className="space-y-4">
                  <h2 className="font-medium text-lg">{status}</h2>
                  <div className="space-y-4">
                    <AnimatePresence>
                      {filteredJobs.filter(job => job.status === status).length === 0 ? (
                        <EmptyState status={status} />
                      ) : (
                        filteredJobs
                          .filter(job => job.status === status)
                          .map(job => (
                            <JobCard
                              key={job.id}
                              job={job}
                              onStatusChange={handleUpdateJob}
                              onDelete={handleDeleteJob}
                              onEdit={handleEditJob}
                              onClose={() => handleDeleteJob(job.id)} // Close card handler
                            />
                          ))
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <TimelineView
              jobs={filteredJobs}
              onStatusChange={handleUpdateJob}
              onDelete={handleDeleteJob}
              onEdit={handleEditJob}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer />

      <JobModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingJob(null);
        }}
        onSubmit={handleAddJob}
        job={editingJob}
        title={editingJob ? "Edit Job" : "Add Job"} // Dynamic title for Add/Edit
      />

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onGoogleSignIn={handleGoogleSignIn}
        onGithubSignIn={handleGithubSignIn}
      />
    </div>
  );
}

export default App;
