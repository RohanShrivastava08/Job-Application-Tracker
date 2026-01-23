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

import { JOB_STATUSES } from '../constants/jobStatuses';

const STATUS_BADGE = {
  Wishlist: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  Applied: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Interview: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Offer: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export default function JobCard({
  job,
  onStatusChange,
  onDelete,
  onEdit,
}) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleStatusChange = (status) => {
    onStatusChange(job.id, { status });
  };

  return (
    <>
      {/* ================= CARD ================= */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer group"
        onClick={() => setIsDetailsOpen(true)}
      >
        <div className="space-y-3">
          {/* Header */}
          <div className="flex justify-between items-start">
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
              <IconButton
                label="Edit"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(job);
                }}
              >
                <Pencil size={16} />
              </IconButton>

              <IconButton
                label="Delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(job.id);
                }}
              >
                <X size={16} />
              </IconButton>
            </div>
          </div>

          {/* Meta */}
          <MetaRow icon={<MapPin size={16} />} text={job.location} />
          <MetaRow
            icon={<Calendar size={16} />}
            text={format(new Date(job.date), 'MMM d, yyyy')}
          />

          {/* Notes */}
          {job.notes && (
            <MetaRow
              icon={<StickyNote size={16} />}
              text={job.notes}
            />
          )}

          {/* Tags */}
          {Array.isArray(job.tags) && job.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {job.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Status */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger
              onClick={(e) => e.stopPropagation()}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm ${STATUS_BADGE[job.status]}`}
            >
              {job.status}
              <ChevronDown size={16} />
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              sideOffset={6}
              className="bg-card border rounded-lg shadow-lg py-1 min-w-[160px]"
            >
              {JOB_STATUSES.map((status) => (
                <DropdownMenu.Item
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className="px-3 py-2 text-sm flex items-center gap-2 cursor-pointer hover:bg-foreground/5"
                >
                  {status === job.status && <Check size={14} />}
                  {status}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </motion.div>

      {/* ================= DETAILS MODAL ================= */}
      <Dialog.Root open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

          <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 bg-card rounded-xl shadow-xl p-6">
            <div className="space-y-5">
              <div className="flex justify-between">
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

              <div className="grid grid-cols-2 gap-4">
                <Info label="Location" value={job.location} />
                <Info
                  label="Date"
                  value={format(new Date(job.date), 'MMMM d, yyyy')}
                />
                <Info label="Status" value={job.status} />
              </div>

              {job.notes && (
                <div>
                  <h4 className="font-medium mb-1">Notes</h4>
                  <p className="text-sm text-foreground/70">
                    {job.notes}
                  </p>
                </div>
              )}

              {job.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function MetaRow({ icon, text }) {
  if (!text) return null;
  return (
    <div className="flex items-center gap-2 text-sm text-foreground/60">
      {icon}
      <span>{text}</span>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-foreground/60">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}

function IconButton({ children, onClick, label }) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={onClick}
            aria-label={label}
            className="p-1.5 rounded-lg hover:bg-foreground/10"
          >
            {children}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content
          side="top"
          className="bg-card text-sm px-2 py-1 rounded shadow"
        >
          {label}
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
