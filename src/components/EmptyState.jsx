import { motion } from 'framer-motion';

export default function EmptyState({ status }) {
  const messages = {
    Wishlist: "No jobs in wishlist — save roles you want to apply for later.",
    Applied: "No applications yet — start your journey!",
    Interview: "No interviews yet — you're getting there!",
    Offer: "No offers yet — keep pushing!",
    Rejected: "No rejections — keep going!",
  };

  const message =
    messages[status] || "Nothing here yet — start adding your job applications.";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <p className="mt-4 text-lg text-foreground/60">
        {message}
      </p>
    </motion.div>
  );
}
