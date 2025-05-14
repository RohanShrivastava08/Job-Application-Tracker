import { motion } from 'framer-motion';
import { Sun, Moon, Github, Linkedin } from 'lucide-react';
import { useState } from 'react';
import { signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // adjust path as needed
import SignInModal from './SignInModal';

export default function Header({ isDark, onThemeToggle }) {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const handleGetStartedClick = () => {
    setIsSignInModalOpen(true);
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setIsSignInModalOpen(false);
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      setIsSignInModalOpen(false);
    } catch (error) {
      console.error("GitHub sign-in failed:", error);
    }
  };

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-b border-border z-50"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
            >
              <span className="text-primary-foreground font-semibold">JT</span>
            </motion.div>
            <h1 className="text-xl font-semibold text-foreground">Job Tracker</h1>
          </div>

          <div className="flex items-center gap-4">
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
              {isDark ? <Sun size={20} className="text-foreground" /> : <Moon size={20} className="text-black" />}
            </button>

            <button
              onClick={handleGetStartedClick}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </motion.header>

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onGoogleSignIn={handleGoogleSignIn}
        onGithubSignIn={handleGithubSignIn}
      />
    </>
  );
}
