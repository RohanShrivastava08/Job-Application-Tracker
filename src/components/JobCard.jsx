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

const STATUSES = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'];

export default function JobCard({ job, onStatusChange, onDelete, onEdit }) {
  const [open, setOpen] = useState(false);

  const statusStyle =
    job.status === 'Offer'
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : job.status === 'Interview'
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      : job.status === 'Applied'
      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      : job.status === 'Wishlist'
      ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';

  return (
    <>
      {/* ================= CARD ================= */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer group"
        onClick={() => setOpen(true)}
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold leading-tight">
              {job.company}
            </h3>
            <p className="text-sm text-foreground/60">
              {job.role}
            </p>
          </div>

          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
            {/* Edit */}
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
                <Tooltip.Content className="bg-card px-2 py-1 text-sm rounded shadow">
                  Edit
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>

            {/* Delete */}
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
                <Tooltip.Content className="bg-card px-2 py-1 text-sm rounded shadow">
                  Delete
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-3 space-y-2 text-sm text-foreground/60">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            {job.location}
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={14} />
            {format(new Date(job.date), 'MMM d, yyyy')}
          </div>
        </div>

        {/* Notes preview */}
        {job.notes && (
          <div className="mt-3 flex items-start gap-2 text-sm text-foreground/70">
            <StickyNote size={14} className="mt-0.5" />
            <p className="line-clamp-2">
              {job.notes}
            </p>
          </div>
        )}

        {/* Status dropdown */}
        <div className="mt-4">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger
              onClick={(e) => e.stopPropagation()}
              className={`w-full flex justify-between items-center px-3 py-1.5 rounded-lg text-sm ${statusStyle}`}
            >
              {job.status}
              <ChevronDown size={16} />
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              className="bg-card border rounded-lg shadow py-1"
              sideOffset={4}
            >
              {STATUSES.map((s) => (
                <DropdownMenu.Item
                  key={s}
                  onClick={() =>
                    onStatusChange(job.id, { status: s })
                  }
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-foreground/5 flex items-center gap-2"
                >
                  {s === job.status && <Check size={14} />}
                  {s}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </motion.div>

      {/* ================= DETAILS MODAL ================= */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-card rounded-xl p-6 shadow-lg">
            <div className="flex justify-between mb-4">
              <div>
                <Dialog.Title className="text-2xl font-semibold">
                  {job.company}
                </Dialog.Title>
                <p className="text-foreground/60 text-lg">
                  {job.role}
                </p>
              </div>
              <Dialog.Close>
                <X size={22} />
              </Dialog.Close>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin size={16} /> {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />{' '}
                  {format(new Date(job.date), 'MMMM d, yyyy')}
                </div>
              </div>

              <span className={`self-start px-3 py-1.5 rounded-full text-sm ${statusStyle}`}>
                {job.status}
              </span>
            </div>

            {job.notes && (
              <div>
                <h3 className="font-medium mb-2">Notes</h3>
                <p className="text-sm text-foreground/70 whitespace-pre-wrap">
                  {job.notes}
                </p>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
