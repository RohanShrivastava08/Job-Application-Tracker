import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * Centralized status list for job lifecycle
 * Wishlist is the default starting point
 */
const STATUSES = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'];

export default function JobModal({
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
  job = null,
  title = 'Add Job',
}) {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Wishlist',
    tags: [],
    notes: '',
    feedback: '',
  });

  const [tagInput, setTagInput] = useState('');

  // Load job data into form when editing
  useEffect(() => {
    if (job) {
      setFormData({
        company: job.company || '',
        role: job.role || '',
        location: job.location || '',
        date: job.date || new Date().toISOString().split('T')[0],
        status: job.status || 'Wishlist',
        tags: Array.isArray(job.tags) ? job.tags : [],
        notes: job.notes || '',
        feedback: job.feedback || '',
      });
    } else {
      setFormData({
        company: '',
        role: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Wishlist',
        tags: [],
        notes: '',
        feedback: '',
      });
      setTagInput('');
    }
  }, [job]);

  // Normalize tags (trim + remove empty)
  const normalizeTags = (tags) =>
    tags.map((tag) => tag.trim()).filter((tag) => tag.length > 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const preparedData = {
      company: formData.company.trim(),
      role: formData.role.trim(),
      location: formData.location.trim(),
      date: formData.date,
      status: formData.status,
      tags: normalizeTags(formData.tags),
      notes: formData.notes.trim(),
      feedback: formData.feedback.trim(),
    };

    onSubmit(preparedData);

    if (!job) {
      setFormData({
        company: '',
        role: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Wishlist',
        tags: [],
        notes: '',
        feedback: '',
      });
      setTagInput('');
    }
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !formData.tags.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmed],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <Dialog open={!!isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-card rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold">
              {title}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-foreground/10"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Company */}
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border rounded-lg"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border rounded-lg"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border rounded-lg"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Date Applied
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border rounded-lg"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border rounded-lg"
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border rounded-lg"
              />
            </div>

            {/* Actions */}
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
                {job ? 'Modify Job' : 'Add Job'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
