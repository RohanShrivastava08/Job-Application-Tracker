import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import { addFeedback } from '../lib/store';

export default function FeedbackModal({ isOpen = false, onClose, jobId }) {
  const [feedback, setFeedback] = useState({
    text: '',
    learnings: '',
    thankYouNote: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.text.trim()) {
      addFeedback(jobId, feedback);
      onClose();
      setFeedback({ text: '', learnings: '', thankYouNote: '' });
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" aria-hidden="true" />

      {/* Centered modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-card rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold">Capture Feedback</Dialog.Title>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-foreground/10">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">What feedback did you receive?</label>
              <textarea
                value={feedback.text}
                onChange={(e) => setFeedback({ ...feedback, text: e.target.value })}
                className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px]"
                placeholder="Share the feedback you received..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">What did you learn from this experience?</label>
              <textarea
                value={feedback.learnings}
                onChange={(e) => setFeedback({ ...feedback, learnings: e.target.value })}
                className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Share your learnings..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Would you like to write a thank you note?</label>
              <textarea
                value={feedback.thankYouNote}
                onChange={(e) => setFeedback({ ...feedback, thankYouNote: e.target.value })}
                className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Optional: Write a thank you note..."
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm rounded-lg hover:bg-foreground/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90"
              >
                Save Feedback
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
