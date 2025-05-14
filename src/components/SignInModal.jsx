import { motion } from 'framer-motion';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const SignInModal = ({ isOpen, onClose, onGoogleSignIn, onGithubSignIn }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-card text-foreground rounded-xl p-8 max-w-md w-full shadow-2xl border border-border transition-all duration-300">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">Sign in to Get Started</h2>
          <p className="text-sm text-foreground/70 mt-2">
            Choose your preferred sign-in method:
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={onGoogleSignIn}
            className="flex items-center justify-center gap-3 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
          >
            <FaGoogle size={20} />
            Sign in with Google
          </button>

          <button
            onClick={onGithubSignIn}
            className="flex items-center justify-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-800 transition-colors"
          >
            <FaGithub size={20} />
            Sign in with GitHub
          </button>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="text-sm text-foreground/70 hover:text-foreground focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SignInModal;
