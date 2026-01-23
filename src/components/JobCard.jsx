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
} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tooltip from '@radix-ui/react-tooltip';

const STATUSES = [
  'Wishlist',
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
];

export default function JobCard({
  job,
  onStatusChange,
  onDelete,
  onEdit,
}) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const statusStyles = {
    Wishlist:
      'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    Applied:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Interview:
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Offer:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Rejected:
      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const handleStatusChange = (status) => {
    onStatusChange(job.id, { status });
  };

  return (
    <>
      {/* CARD */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={() => setIsDetailsOpen(true)}
        className="bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer group"
      >
        {/* Header */}
        <div className="flex justify-between items-start gap-3">
          <div>
            <h3 className="font-medium leading-tight">
              {job.company}
            </h3>
            <p className="text-sm text-foreground/60">
              {job.role}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
            {/* Edit */}
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(job);
                    }}
                    className="p-1.5 rounded-lg hover:bg-foreground/10"
                  >
                    <Pencil size={16} />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Content
                  side="top"
                  className="bg-card px-2 py-1 text-sm rounded shadow"
                >
                  Edit
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>

            {/* Delete */}
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(job.id);
                    }}
                    className="p-1.5 rounded-lg hover:bg-foreground/10"
                  >
                    <X size={16} />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Content
                  side="top"
                  className="bg-card px-2 py-1 text-sm rounded shadow"
                >
                  Delete
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-3 space-y-1 text-sm text-foreground/60">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>{job.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{format(new Date(job.date), 'MMM d, yyyy')}</span>
          </div>
        </div>

        {/* Status */}
        <div className="mt-3">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger
              onClick={(e) => e.stopPropagation()}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm ${statusStyles[job.status]}`}
            >
              {job.status}
              <ChevronDown size={16} />
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              sideOffset={6}
              className="bg-card border rounded-lg shadow-md py-1"
              onClick={(e) => e.stopPropagation()}
            >
              {STATUSES.map((status) => (
                <DropdownMenu.Item
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-foreground/5 flex items-center gap-2"
                >
                  {status === job.status && <Check size={14} />}
                  {status}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </motion.div>

      {/* DETAILS MODAL */}
      <Dialog.Root open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          <Dialog.Content
            onClick={(e) => e.stopPropagation()}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-card rounded-xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <Dialog.Title className="text-xl font-semibold">
                  {job.company}
                </Dialog.Title>
                <p className="text-foreground/60">
                  {job.role}
                </p>
              </div>

              <Dialog.Close asChild>
                <button>
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>

            <div className="space-y-4 text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {job.location}
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {format(new Date(job.date), 'MMMM d, yyyy')}
              </div>

              {job.notes && (
                <div>
                  <h4 className="font-medium mb-1">
                    Notes
                  </h4>
                  <p>{job.notes}</p>
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
