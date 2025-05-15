import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  MapPin,
  Calendar,
  ChevronDown,
  X,
  Pencil,
  Check,
  StickyNote,
} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tooltip from '@radix-ui/react-tooltip';

const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected'];

export default function JobCard({ job, onStatusChange, onDelete, onEdit }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleStatusChange = (newStatus) => {
    onStatusChange(job.id, { status: newStatus });
    if (newStatus === 'Rejected' && !job.feedback) {
      setIsFeedbackOpen(true);
    }
  };

  return (
    <>
      {/* === Job Card === */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        onClick={() => setIsDetailsOpen(true)}
      >
        <div className="space-y-3">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{job.company}</h3>
              <p className="text-sm text-foreground/60">{job.role}</p>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Edit Button */}
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(job);
                      }}
                      className="p-1.5 rounded-lg hover:bg-foreground/10"
                      aria-label="Edit Job"
                      type="button"
                    >
                      <Pencil size={16} />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="bg-card px-3 py-1.5 text-sm rounded-lg shadow-lg"
                      side="top"
                    >
                      Edit Job
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>

              {/* Delete Button */}
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(job.id);
                      }}
                      className="p-1.5 rounded-lg hover:bg-foreground/10"
                      aria-label="Delete Job"
                      type="button"
                    >
                      <X size={16} />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="bg-card px-3 py-1.5 text-sm rounded-lg shadow-lg"
                      side="top"
                    >
                      Delete Job
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-foreground/60">
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-foreground/60">
            <Calendar size={16} />
            <span>{format(new Date(job.date), 'MMM d, yyyy')}</span>
          </div>

          {/* Notes */}
          {job.notes && (
            <div className="flex items-start gap-2 text-sm text-foreground/60">
              <StickyNote size={16} />
              <span>{job.notes}</span>
            </div>
          )}

          {/* Hashtags */}
          {Array.isArray(job.hashtags) && job.hashtags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {job.hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full select-none"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Status Dropdown */}
          <div className="flex items-center gap-2 mt-3">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger
                className="flex items-center justify-between w-full px-3 py-1.5 text-sm rounded-lg hover:bg-foreground/5"
                onClick={(e) => e.stopPropagation()}
                aria-label="Change Status"
                type="button"
              >
                {job.status}
                <ChevronDown size={16} />
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[160px] bg-card rounded-lg border shadow-lg py-1"
                  sideOffset={5}
                  onClick={(e) => e.stopPropagation()}
                >
                  {STATUSES.map((status) => (
                    <DropdownMenu.Item
                      key={status}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(status);
                      }}
                      className="px-3 py-2 text-sm outline-none cursor-pointer hover:bg-foreground/5 flex items-center gap-2"
                      aria-selected={status === job.status}
                      role="menuitemradio"
                      tabIndex={-1}
                    >
                      {status === job.status && <Check size={16} />}
                      {status}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </motion.div>

      {/* === Job Details Dialog === */}
      <Dialog.Root open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
          <Dialog.Content
            className="fixed top-1/2 left-1/2 max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-card rounded-xl shadow-lg p-6 focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              {/* Title + Close */}
              <div className="flex items-start justify-between">
                <div>
                  <Dialog.Title className="text-2xl font-semibold">{job.company}</Dialog.Title>
                  <p className="text-lg text-foreground/60">{job.role}</p>
                </div>
                <Dialog.Close asChild>
                  <button
                    className="text-foreground/60 hover:text-foreground transition"
                    aria-label="Close"
                  >
                    <X size={24} />
                  </button>
                </Dialog.Close>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Details</h3>
                  <div className="space-y-2 text-foreground/60">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{format(new Date(job.date), 'MMMM d, yyyy')}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Status</h3>
                  <span
                    className={`inline-block px-3 py-1.5 rounded-full text-sm ${
                      job.status === 'Offer'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : job.status === 'Interview'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : job.status === 'Rejected'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
              </div>

              {/* Notes */}
              {job.notes && (
                <div className="space-y-2">
                  <h3 className="font-medium">Notes</h3>
                  <p className="text-sm text-foreground/60">{job.notes}</p>
                </div>
              )}

              {/* Hashtags */}
              {Array.isArray(job.hashtags) && job.hashtags.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium">Hashtags</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.hashtags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback */}
              {job.feedback && (
                <div className="space-y-2">
                  <h3 className="font-medium">Feedback</h3>
                  <div className="bg-background p-4 rounded-lg space-y-3">
                    <p className="text-sm">{job.feedback.text}</p>
                    {job.feedback.learnings && (
                      <div>
                        <p className="text-sm font-medium">Learnings:</p>
                        <p className="text-sm text-foreground/60">{job.feedback.learnings}</p>
                      </div>
                    )}
                    {job.feedback.thankYouNote && (
                      <div>
                        <p className="text-sm font-medium">Thank You Note:</p>
                        <p className="text-sm text-foreground/60">{job.feedback.thankYouNote}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
