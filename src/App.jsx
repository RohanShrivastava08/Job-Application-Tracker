import { useState, useEffect, useMemo } from 'react';
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
import Dashboard from './pages/Dashboard';
import TimelineView from './components/TimelineView';
import EmptyState from './components/EmptyState';
import SignInModal from './components/SignInModal';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import { JOB_STATUSES } from './constants/jobStatuses';

const SORT_OPTIONS = [
  { label: 'Date Applied', value: 'date' },
  { label: 'Company Name', value: 'company' },
];

export default function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [boardId] = useState('default');

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [view, setView] = useState('kanban');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const fetched = await getJobs(currentUser.uid, boardId);
          setJobs(fetched);
          navigate('/dashboard');
        } catch (err) {
          console.error(err);
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

  const processedJobs = useMemo(() => {
    let result = [...jobs];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((job) =>
        [job.company, job.role, job.location]
          .join(' ')
          .toLowerCase()
          .includes(q)
      );
    }

    //  Sort
    result.sort((a, b) => {
      if (sortBy === 'company') {
        return a.company.localeCompare(b.company);
      }

      // Default: date
      return new Date(b.date) - new Date(a.date);
    });

    return result;
  }, [jobs, search, sortBy]);

  const handleAddJob = async (job) => {
    const updated = await addJob(user.uid, boardId, job);
    setJobs(updated);
    setIsModalOpen(false);
  };

  const handleUpdateJob = async (id, updates) => {
    const updated = await updateJob(user.uid, boardId, id, updates);
    setJobs(updated);
  };

  const handleDeleteJob = async (id) => {
    const updated = await deleteJob(user.uid, boardId, id);
    setJobs(updated);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        isDark={isDark}
        onThemeToggle={() => setIsDark(!isDark)}
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoute user={user} />}>
          <Route
            path="/dashboard"
            element={
              <main className="max-w-7xl mx-auto px-6 py-24">
                <Dashboard jobs={jobs} />

                {/* Controls */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  {/* Search */}
                  <div className="relative max-w-xs w-full">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60"
                    />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search company, role, location..."
                      className="w-full pl-10 pr-4 py-2 bg-card border rounded-lg"
                    />
                  </div>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-card border rounded-lg"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        Sort by: {opt.label}
                      </option>
                    ))}
                  </select>

                  {/* View toggle */}
                  <div className="flex border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setView('kanban')}
                      className={`p-2 ${
                        view === 'kanban'
                          ? 'bg-primary text-primary-foreground'
                          : ''
                      }`}
                    >
                      <LayoutGrid size={18} />
                    </button>
                    <button
                      onClick={() => setView('timeline')}
                      className={`p-2 ${
                        view === 'timeline'
                          ? 'bg-primary text-primary-foreground'
                          : ''
                      }`}
                    >
                      <Clock size={18} />
                    </button>
                  </div>

                  {/* Add Job */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="ml-auto px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                  >
                    Add Job
                  </button>
                </div>

                {/* Views */}
                <AnimatePresence mode="wait">
                  {view === 'kanban' ? (
                    <motion.div
                      key="kanban"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-6 overflow-x-auto pb-4"
                    >
                      {JOB_STATUSES.map((status) => {
                        const list = processedJobs.filter(
                          (j) => j.status === status
                        );

                        return (
                          <div
                            key={status}
                            className="min-w-[280px] space-y-4"
                          >
                            <h2 className="font-semibold text-lg">
                              {status} ({list.length})
                            </h2>

                            {list.length === 0 ? (
                              <EmptyState status={status} />
                            ) : (
                              list.map((job) => (
                                <JobCard
                                  key={job.id}
                                  job={job}
                                  onStatusChange={handleUpdateJob}
                                  onDelete={handleDeleteJob}
                                  onEdit={setEditingJob}
                                />
                              ))
                            )}
                          </div>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <TimelineView
                      jobs={processedJobs}
                      onStatusChange={handleUpdateJob}
                      onDelete={handleDeleteJob}
                      onEdit={setEditingJob}
                    />
                  )}
                </AnimatePresence>
              </main>
            }
          />
        </Route>
      </Routes>

      <Footer />

      {/* Modals */}
      <JobModal
        isOpen={isModalOpen || !!editingJob}
        job={editingJob}
        onClose={() => {
          setIsModalOpen(false);
          setEditingJob(null);
        }}
        onSubmit={
          editingJob
            ? (updates) =>
                handleUpdateJob(editingJob.id, updates)
            : handleAddJob
        }
      />

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onGoogleSignIn={signInWithGoogle}
        onGithubSignIn={signInWithGitHub}
      />
    </div>
  );
}
