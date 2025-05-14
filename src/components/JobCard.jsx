import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { MapPin, Calendar, ChevronDown, X, MessageSquare, Check, Pencil, ChevronRight } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useState } from 'react';
import { addNote, addTag, removeTag } from '../lib/store';
import FeedbackModal from './FeedbackModal.jsx';

const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected'];
const TAG_COLORS = {
  Remote: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  Urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  Referral: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Tech: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Startup: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  Marketing: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
};

export default function JobCard({ job, onStatusChange, onDelete, onEdit }) {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      addNote(job.id, newNote);
      setNewNote('');
    }
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      addTag(job.id, newTag);
      setNewTag('');
    }
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(job.id, { status: newStatus });
    if (newStatus === 'Rejected' && !job.feedback) {
      setIsFeedbackOpen(true);
    }
  };

  const latestNote = job.notes?.[job.notes.length - 1];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group"
      onClick={() => setIsDetailsOpen(true)}
    >
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{job.company}</h3>
            <p className="text-sm text-foreground/60">{job.role}</p>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(job);
                    }}
                    className="p-1.5 rounded-lg hover:bg-foreground/10"
                  >
                    <Pencil size={16} />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content className="bg-card px-3 py-1.5 text-sm rounded-lg shadow-lg">
                    Edit job
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>

            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(job.id);
                    }}
                    className="p-1.5 rounded-lg hover:bg-foreground/10"
                  >
                    <X size={16} />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content className="bg-card px-3 py-1.5 text-sm rounded-lg shadow-lg">
                    Delete job
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-foreground/60">
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-foreground/60">
          <Calendar size={16} />
          <span>{format(new Date(job.date), 'MMM d, yyyy')}</span>
        </div>

        {job.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {job.tags.map(tag => (
              <span
                key={tag}
                className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${
                  TAG_COLORS[tag] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                }`}
              >
                {tag}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(job.id, tag);
                  }}
                  className="hover:text-foreground/80"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}

        {latestNote && (
          <div className="bg-background/50 p-3 rounded-lg">
            <p className="text-sm line-clamp-2">{latestNote.text}</p>
            <p className="text-xs text-foreground/60 mt-1">
              {format(new Date(latestNote.createdAt), 'MMM d, yyyy')}
            </p>
          </div>
        )}

        <div className="flex items-center gap-2">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="flex items-center justify-between w-full px-3 py-1.5 text-sm rounded-lg hover:bg-foreground/5">
              {job.status}
              <ChevronDown size={16} />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[160px] bg-card rounded-lg border shadow-lg py-1"
                sideOffset={5}
              >
                {STATUSES.map(status => (
                  <DropdownMenu.Item
                    key={status}
                    className="px-3 py-2 text-sm outline-none cursor-pointer hover:bg-foreground/5 flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(status);
                    }}
                  >
                    {status === job.status && <Check size={16} />}
                    {status}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsNotesOpen(true);
            }}
            className="p-2 rounded-lg hover:bg-foreground/5"
          >
            <MessageSquare size={16} />
          </button>
        </div>
      </div>

      <Dialog.Root open={isNotesOpen} onOpenChange={setIsNotesOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              <Dialog.Title className="text-xl font-semibold">Notes</Dialog.Title>
              
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {job.notes?.map(note => (
                  <div key={note.id} className="bg-background p-3 rounded-lg">
                    <p className="text-sm">{note.text}</p>
                    <p className="text-xs text-foreground/60 mt-1">
                      {format(new Date(note.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note..."
                  className="flex-1 px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                >
                  Add
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  className="flex-1 px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                >
                  Add Tag
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-card rounded-xl shadow-lg p-6">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <Dialog.Title className="text-2xl font-semibold">{job.company}</Dialog.Title>
                  <p className="text-lg text-foreground/60">{job.role}</p>
                </div>
                <Dialog.Close className="p-2 rounded-lg hover:bg-foreground/10">
                  <X size={20} />
                </Dialog.Close>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-foreground/60">
                      <MapPin size={16} />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/60">
                      <Calendar size={16} />
                      <span>{format(new Date(job.date), 'MMMM d, yyyy')}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Status</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1.5 rounded-full text-sm ${
                      job.status === 'Offer' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      job.status === 'Interview' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      job.status === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                </div>
              </div>

              {job.tags?.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map(tag => (
                      <span
                        key={tag}
                        className={`px-2 py-1 text-sm rounded-full ${
                          TAG_COLORS[tag] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {job.feedback && (
                <div className="space-y-2">
                  <h3 className="font-medium">Feedback</h3>
                  <div className="bg-background p-4 rounded-lg">
                    <p className="text-sm mb-2">{job.feedback.text}</p>
                    {job.feedback.learnings && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Learnings:</p>
                        <p className="text-sm text-foreground/60">{job.feedback.learnings}</p>
                      </div>
                    )}
                    <p className="text-xs text-foreground/60 mt-2">
                      {format(new Date(job.feedback.createdAt), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h3 className="font-medium">Notes</h3>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {job.notes?.map(note => (
                    <div key={note.id} className="bg-background p-3 rounded-lg">
                      <p className="text-sm">{note.text}</p>
                      <p className="text-xs text-foreground/60 mt-1">
                        {format(new Date(note.createdAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        jobId={job.id}
      />
    </motion.div>
  );
}