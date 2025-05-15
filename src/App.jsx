import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutGrid, Clock } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate, Routes, Route } from 'react-router-dom';

import { getJobs, addJob, updateJob, deleteJob } from './lib/store';
import { auth, signInWithGoogle, signInWithGitHub } from './firebase/firebase';

import Header from './components/Header';
import Footer from './components/Footer';
import JobModal from './components/JobModal';
import JobCard from './components/JobCard';
import Dashboard from './components/Dashboard';
import TimelineView from './components/TimelineView';
import EmptyState from './components/EmptyState';
import SignInModal from './components/SignInModal';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';

const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected'];

const SORT_OPTIONS = [
  { label: 'Date Applied', value: 'date' },
  { label: 'Company Name', value: 'company' },
];

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [boardId, setBoardId] = useState('default');

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [view, setView] = useState('kanban');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const fetchedJobs = await getJobs(currentUser.uid, boardId);
          setJobs(fetchedJobs);
          navigate('/dashboard');
        } catch (error) {
          console.error('Failed to fetch jobs:', error);
          setJobs([]);
        }
      } else {
        setJobs([]);
        navigate('/');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, boardId]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const filteredJobs = jobs
    .filter(({ company, role }) => {
      const searchLower = search.toLowerCase();
      return company.toLowerCase().includes(searchLower) || role.toLowerCase().includes(searchLower);
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'company') return a.company.localeCompare(b.company);
      return 0;
    });

  const handleAddJob = async (job) => {
    if (!user) return;
    try {
      const updatedJobs = await addJob(user.uid, boardId, job);
      setJobs(updatedJobs);
      setIsModalOpen(false);
      setEditingJob(null);
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleUpdateJob = async (jobId, updates) => {
    if (!user) return;
    try {
      const updatedJobs = await updateJob(user.uid, boardId, jobId, updates);
      setJobs(updatedJobs);
      setIsModalOpen(false);
      setEditingJob(null);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!user) return;
    try {
      const updatedJobs = await deleteJob(user.uid, boardId, jobId);
      setJobs(updatedJobs);
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setJobs([]);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setIsSignInModalOpen(false);
      navigate('/dashboard');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInWithGitHub();
      setIsSignInModalOpen(false);
      navigate('/dashboard');
    } catch (error) {
      console.error('GitHub Sign-In Error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        isDark={isDark}
        onThemeToggle={() => setIsDark(!isDark)}
        user={user}
        handleLogout={handleLogout}
        openSignInModal={() => setIsSignInModalOpen(true)}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute user={user} />}>
          <Route
            path="/dashboard"
            element={
              <main className="max-w-7xl mx-auto px-6 py-24">
                <Dashboard jobs={jobs} />

                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <div className="relative flex-1 min-w-[200px] max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60" size={20} />
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {SORT_OPTIONS.map(({ label, value }) => (
                      <option key={value} value={value}>
                        Sort by: {label}
                      </option>
                    ))}
                  </select>

                  <div className="flex rounded-lg border bg-card">
                    <button
                      onClick={() => setView('kanban')}
                      className={`p-2 ${view === 'kanban' ? 'bg-primary text-primary-foreground' : 'hover:bg-foreground/5'} rounded-l-lg`}
                      aria-label="Kanban View"
                    >
                      <LayoutGrid size={20} />
                    </button>
                    <button
                      onClick={() => setView('timeline')}
                      className={`p-2 ${view === 'timeline' ? 'bg-primary text-primary-foreground' : 'hover:bg-foreground/5'} rounded-r-lg`}
                      aria-label="Timeline View"
                    >
                      <Clock size={20} />
                    </button>
                  </div>

                  {user && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors whitespace-nowrap"
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
                      {STATUSES.map((status) => {
                        const jobsByStatus = filteredJobs.filter((job) => job.status === status);
                        return (
                          <div key={status} className="space-y-4">
                            <h2 className="font-medium text-lg">{status}</h2>
                            <div className="space-y-4">
                              <AnimatePresence>
                                {jobsByStatus.length === 0 ? (
                                  <EmptyState status={status} />
                                ) : (
                                  jobsByStatus.map((job) => (
                                    <JobCard
                                      key={job.id}
                                      job={job}
                                      onStatusChange={handleUpdateJob}
                                      onDelete={handleDeleteJob}
                                      onEdit={handleEditJob}
                                    />
                                  ))
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        );
                      })}
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
            }
          />
        </Route>
      </Routes>

      <Footer />

      <JobModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingJob(null);
        }}
        onSubmit={editingJob ? (updates) => handleUpdateJob(editingJob.id, updates) : handleAddJob}
        job={editingJob}
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
