import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected'];

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
    status: 'Applied',
    tags: [],
    notes: '',
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (job) {
      setFormData({
        company: job.company || '',
        role: job.role || '',
        location: job.location || '',
        date: job.date || new Date().toISOString().split('T')[0],
        status: job.status || 'Applied',
        tags: job.tags || [],
        notes: job.notes || '',
      });
    }
  }, [job]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTags = formData.tags.map((tag) => tag.trim()).filter(Boolean);
    onSubmit({ ...formData, tags: trimmedTags });

    // Reset form
    setFormData({
      company: '',
      role: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Applied',
      tags: [],
      notes: '',
    });
    setTagInput('');
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !formData.tags.includes(trimmed)) {
      setFormData({ ...formData, tags: [...formData.tags, trimmed] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <Dialog open={!!isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-card rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold">{title}</Dialog.Title>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-foreground/10"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 bg-background border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 bg-background border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-background border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date Applied</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 bg-background border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 bg-background border rounded-lg"
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Hashtags</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Type and press enter"
                  className="flex-1 px-3 py-2 bg-background border rounded-lg"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-2 bg-primary text-primary-foreground rounded-lg"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-xs ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="Write notes about this job..."
                className="w-full px-3 py-2 bg-background border rounded-lg"
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
                {job ? 'Modify Job' : 'Add Job'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
