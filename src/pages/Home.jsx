import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  LayoutGrid,
  Clock,
  StickyNote,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

import SignInModal from '../components/SignInModal';
import { signInWithGoogle, signInWithGitHub } from '../firebase/firebase';

/* -------------------- CONTENT -------------------- */

const features = [
  {
    icon: LayoutGrid,
    title: 'Smart Job Tracking',
    description:
      'Track every application across Wishlist, Applied, Interview, Offer, and Rejected stages.',
  },
  {
    icon: Clock,
    title: 'Kanban & Timeline Views',
    description:
      'Switch between Kanban boards and timeline view to understand progress clearly.',
  },
  {
    icon: StickyNote,
    title: 'Notes & Context',
    description:
      'Attach notes to every job so you never forget follow-ups or interview feedback.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Private',
    description:
      'Your data is protected using Firebase Authentication and Firestore security rules.',
  },
];

const steps = [
  'Sign in securely with Google or GitHub',
  'Add job applications with role, company, and location',
  'Move jobs across stages as you progress',
  'Search, filter, and visualize your journey',
  'Stay consistent and in control of your job hunt',
];

const faqs = [
  {
    q: 'Is this free to use?',
    a: 'Yes. This tool is free and built to help job seekers stay organized.',
  },
  {
    q: 'Is my data safe?',
    a: 'Yes. Your data is scoped to your account using Firebase security rules.',
  },
  {
    q: 'Who is this built for?',
    a: 'Anyone actively applying for jobs and wanting clarity and structure.',
  },
];

/* -------------------- COMPONENT -------------------- */

export default function Home() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const openSignIn = () => setIsSignInModalOpen(true);

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    setIsSignInModalOpen(false);
  };

  const handleGitHubSignIn = async () => {
    await signInWithGitHub();
    setIsSignInModalOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Scroll Progress */}
      <motion.div
        style={{ width: progressWidth }}
        className="fixed top-0 left-0 h-1 bg-primary z-50"
      />

      {/* ================= HERO ================= */}
      <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          Take Control of Your
          <span className="block text-primary mt-2">
            Job Applications
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground"
        >
          A clean, visual job application tracker built to help you stay focused,
          consistent, and stress-free during your job hunt.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={openSignIn}
            className="group px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition"
          >
            Get Started
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="px-6 max-w-7xl mx-auto mb-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <Icon className="text-primary mb-4" size={28} />
                <h3 className="font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="px-6 max-w-4xl mx-auto mb-28">
        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                {i + 1}
              </div>
              <p className="text-lg">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="px-6 max-w-4xl mx-auto mb-28">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-muted border rounded-lg p-5"
            >
              <h4 className="font-semibold mb-2">{item.q}</h4>
              <p className="text-muted-foreground">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="px-6 max-w-5xl mx-auto mb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary text-primary-foreground rounded-2xl p-10 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Start Tracking Smarter Today
          </h2>
          <p className="mb-6 text-primary-foreground/90">
            Stop losing track of applications. Bring clarity to your job search.
          </p>
          <button
            onClick={openSignIn}
            className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:opacity-90 transition"
          >
            Get Started
          </button>
        </motion.div>
      </section>

      {/* ================= SIGN IN ================= */}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onGoogleSignIn={handleGoogleSignIn}
        onGithubSignIn={handleGitHubSignIn}
      />
    </div>
  );
}
