import { motion } from 'framer-motion';
import { Sun, Moon, Github, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';
import SignInModal from './SignInModal';
import { signInWithGoogle, signInWithGitHub } from '../firebase/firebase';

export default function Header({ isDark, onThemeToggle }) {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  const handleGetStartedClick = () => setIsSignInModalOpen(true);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success('Logged out successfully', {
      icon: '👋',
      position: 'top-center',
      style: { background: '#f44336', color: 'white' }
    });
    setUser(null);
  };

  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      setIsSignInModalOpen(false);
      setUser(user);
      toast.success('Logged in successfully 🎉', {
        icon: '🎉',
        position: 'top-center',
        style: { background: '#4caf50', color: 'white' }
      });
    }
  };

  const handleGitHubSignIn = async () => {
    const user = await signInWithGitHub();
    if (user) {
      setIsSignInModalOpen(false);
      setUser(user);
      toast.success('🎉 Logged in successfully', {
        icon: '🎉',
        position: 'top-center',
        style: { background: '#24292f', color: 'white' }
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-b border-border z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
            >
              <span className="text-primary-foreground font-semibold">JAT</span>
            </motion.div>
            <h1 className="text-base sm:text-xl font-semibold text-foreground">
              Job Application Tracker
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="https://github.com/RohanShrivastava08"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-card transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} className="text-foreground" />
            </a>

            <a
              href="https://www.linkedin.com/in/rohan-shrivastava-887a15251/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-card transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} className="text-foreground" />
            </a>

            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg hover:bg-card transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun size={20} className="text-foreground" />
              ) : (
                <Moon size={20} className="text-black" />
              )}
            </button>

            {user ? (
              <button
                onClick={handleLogout}
                className="px-3 sm:px-4 py-2 bg-red-600 text-white text-sm sm:text-base rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleGetStartedClick}
                className={`px-3 sm:px-4 py-2 text-sm sm:text-base ${
                  isDark ? 'bg-white text-black' : 'bg-primary text-primary-foreground'
                } rounded-lg hover:opacity-90 transition-colors`}
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </motion.header>

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onGoogleSignIn={handleGoogleSignIn}
        onGithubSignIn={handleGitHubSignIn}
        isDark={isDark}
      />
    </>
  );
}
