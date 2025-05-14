import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  // Show button after scrolling down 100px
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t z-50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-muted-foreground flex items-center gap-2"
        >
          Built with
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-red-500"
          >
            <Heart size={16} />
          </motion.span>
          <span className="text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text font-medium hover:brightness-110 transition duration-300">
            Rohan Shrivastava
          </span>
        </motion.p>

        {/* Scroll to top button with fade animation */}
        <AnimatePresence>
          {showScroll && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              onClick={handleScrollToTop}
              className="p-2 rounded-full hover:bg-muted transition-colors duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} className="text-muted-foreground" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.footer>
  );
}
