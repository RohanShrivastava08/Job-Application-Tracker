import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

import { JOB_STATUSES } from '../constants/jobStatuses';

/**
 * JobModal
 * - Single source of job creation & editing
 * - Always emits clean, normalized job objects
 */
export default function JobModal({
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
  job = null,
}) {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Wishlist',
    tags: [],
    notes: '',
  });

  const [tagInput, setTagInput] = useState('');

  /* -------------------------------- */
  /* Sync form when editing            */
  /* -------------------------------- */
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
      });
    } else {
      resetForm();
    }
  }, [job]);

  const resetForm = () => {
    setFormData({
      company: '',
      role: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Wishlist',
      tags: [],
      notes: '',
    });
    setTagInput('');
  };

  /* -------------------------------- */
  /* Helpers                          */
  /* -------------------------------- */
  const addTag = () => {
    const value = tagInput.trim();
    if (!value) return;
    if (formData.tags.includes(value)) return;

    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, value],
    }));
    setTagInput('');
  };

  const removeTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  /* -------------------------------- */
  /* Submit                           */
  /* -------------------------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      company: formData.company.trim(),
      role: formData.role.trim(),
      location: formData.location.trim(),
      date: formData.date,
      status: formData.status,
      tags: formData.tags.map((t) => t.trim()),
      notes: formData.notes.trim(),
    };

    onSubmit(payload);

    if (!job) resetForm();
  };

  return (
    <Dialog open={!!isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="w-full max-w-md bg-card rounded-xl shadow-xl p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold">
              {job ? 'Edit Job' : 'Add New Job'}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-foreground/10"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Company */}
            <Input
              label="Company"
              value={formData.company}
              onChange={(v) => setFormData({ ...formData, company: v })}
              required
            />

            {/* Role */}
            <Input
              label="Role"
              value={formData.role}
              onChange={(v) => setFormData({ ...formData, role: v })}
              required
            />

            {/* Location */}
            <Input
              label="Location"
              value={formData.location}
              onChange={(v) => setFormData({ ...formData, location: v })}
            />

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Date Applied
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border rounded-lg"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border rounded-lg"
              >
                {JOB_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Tags
              </label>

              <div className="flex gap-2">
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTag()}
                  placeholder="Press Enter to add"
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

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Notes
              </label>
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
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg hover:bg-foreground/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
              >
                {job ? 'Save Changes' : 'Add Job'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

/* -------------------------------- */
/* Reusable Input                    */
/* -------------------------------- */
function Input({ label, value, onChange, required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-background border rounded-lg"
      />
    </div>
  );
}
