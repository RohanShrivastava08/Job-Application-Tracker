
import { motion } from 'framer-motion';

export default function EmptyState({ status }) {
  const messages = {
    Applied: "No applications yet — start your journey!",
    Interview: "No interviews yet — you're getting there!",
    Offer: "No offers yet — keep pushing!",
    Rejected: "No rejections — keep going!"
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
    
      <p className="mt-4 text-lg text-foreground/60">{messages[status]}</p>
    </motion.div>
  );
}