import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutGrid, Clock, X } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate, Routes, Route } from 'react-router-dom';

import {
  subscribeToJobs,
  addJob,
  updateJob,
  deleteJob,
} from './lib/store';

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

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const boardId = 'default';

  /* VIEW */
  const [view, setView] = useState('kanban');

  /* SEARCH */
  const [filterType, setFilterType] = useState('company');
  const [searchText, setSearchText] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [appliedFilter, setAppliedFilter] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  /* MODAL */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  /* UI */
  const [isDark, setIsDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [loading, setLoading] = useState(true);

  /* AUTH + REALTIME JOBS */
  useEffect(() => {
    let unsubscribeJobs = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setJobs([]);
        navigate('/');
        setLoading(false);
        return;
      }

      unsubscribeJobs = subscribeToJobs(
        currentUser.uid,
        boardId,
        (jobs) => {
          setJobs(
            jobs.map((job) => ({
              ...job,
              status: JOB_STATUSES.includes(job.status)
                ? job.status
                : 'Wishlist',
            }))
          );
        }
      );

      navigate('/dashboard');
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeJobs) unsubscribeJobs();
    };
  }, [navigate]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  /* SEARCH */
  const applySearch = () => {
    setIsSearching(true);

    setTimeout(() => {
      if (filterType === 'company' && searchText.trim()) {
        setAppliedFilter({
          type: 'company',
          value: searchText.toLowerCase(),
        });
      }

      if (filterType === 'date' && searchDate) {
        setAppliedFilter({
          type: 'date',
          value: searchDate,
        });
      }

      setIsSearching(false);
    }, 300);
  };

  const clearSearch = () => {
    setSearchText('');
    setSearchDate('');
    setFilterType('company');
    setAppliedFilter(null);
  };

  const filteredJobs = useMemo(() => {
    if (!appliedFilter) return jobs;

    return jobs.filter((job) => {
      if (appliedFilter.type === 'company') {
        return (
          job.company.toLowerCase().includes(appliedFilter.value) ||
          job.role.toLowerCase().includes(appliedFilter.value) ||
          job.location.toLowerCase().includes(appliedFilter.value)
        );
      }

      if (appliedFilter.type === 'date') {
        return job.date === appliedFilter.value;
      }

      return true;
    });
  }, [jobs, appliedFilter]);

  /* CRUD */
  const handleAddJob = async (job) => {
    await addJob(user.uid, boardId, job);
    setIsModalOpen(false);
  };

  const handleUpdateJob = async (id, updates) => {
    await updateJob(user.uid, boardId, id, updates);
    setEditingJob(null);
    setIsModalOpen(false);
  };

  const handleDeleteJob = async (id) => {
    await deleteJob(user.uid, boardId, id);
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
      <Header isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoute user={user} />}>
          <Route
            path="/dashboard"
            element={
              <main className="max-w-7xl mx-auto px-6 py-24">
                <Dashboard jobs={jobs} />

                {/* CONTROLS */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
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

                  {filterType === 'company' ? (
                    <input
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="Search jobs..."
                      className="px-4 py-2 bg-card border rounded-lg max-w-xs w-full"
                    />
                  ) : (
                    <input
                      type="date"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      className="px-4 py-2 bg-card border rounded-lg"
                    />
                  )}

                  <select
                    value={filterType}
                    onChange={(e) => {
                      setFilterType(e.target.value);
                      setSearchText('');
                      setSearchDate('');
                    }}
                    className="px-4 py-2 bg-card border rounded-lg"
                  >
                    <option value="company">Company / Role</option>
                    <option value="date">Date Applied</option>
                  </select>

                  <button
                    onClick={applySearch}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2"
                  >
                    {isSearching ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Search size={16} />
                    )}
                    Search
                  </button>

                  {appliedFilter && (
                    <button
                      onClick={clearSearch}
                      className="px-3 py-2 border rounded-lg flex items-center gap-1"
                    >
                      <X size={16} />
                      Clear
                    </button>
                  )}

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="ml-auto px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                  >
                    Add Job
                  </button>
                </div>

                {/* CONTENT */}
                <AnimatePresence mode="wait">
                  {view === 'kanban' ? (
                    <motion.div className="flex gap-6 overflow-x-auto pb-4">
                      {JOB_STATUSES.map((status) => {
                        const list = filteredJobs.filter(
                          (job) => job.status === status
                        );

                        return (
                          <div key={status} className="min-w-[280px] space-y-4">
                            <h2 className="font-semibold">
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
                                  onEdit={(job) => {
                                    setEditingJob(job);
                                    setIsModalOpen(true);
                                  }}
                                />
                              ))
                            )}
                          </div>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <TimelineView
                      jobs={filteredJobs}
                      onStatusChange={handleUpdateJob}
                      onDelete={handleDeleteJob}
                      onEdit={(job) => {
                        setEditingJob(job);
                        setIsModalOpen(true);
                      }}
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
        job={editingJob}
        onClose={() => {
          setIsModalOpen(false);
          setEditingJob(null);
        }}
        onSubmit={
          editingJob
            ? (updates) => handleUpdateJob(editingJob.id, updates)
            : handleAddJob
        }
      />

      <SignInModal
        isOpen={false}
        onGoogleSignIn={signInWithGoogle}
        onGithubSignIn={signInWithGitHub}
      />
    </div>
  );
}

export default App;
