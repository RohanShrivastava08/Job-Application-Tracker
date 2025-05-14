import { motion } from 'framer-motion';
import { format } from 'date-fns';
import JobCard from './JobCard';

export default function TimelineView({ jobs, onStatusChange, onDelete }) {
  const sortedJobs = [...jobs].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      {sortedJobs.map(job => (
        <div key={job.id} className="relative pl-8 before:absolute before:left-2 before:top-0 before:h-full before:w-px before:bg-border">
          <div className="absolute left-0 top-6 w-4 h-4 rounded-full bg-primary" />
          <div className="pt-4">
            <p className="text-sm text-foreground/60 mb-2">
              {format(new Date(job.date), 'MMMM d, yyyy')}
            </p>
            <JobCard
              job={job}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          </div>
        </div>
      ))}
    </motion.div>
  );
}