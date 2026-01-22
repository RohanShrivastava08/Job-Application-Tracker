import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import SignInModal from '../components/SignInModal';
import { signInWithGoogle, signInWithGitHub } from '../firebase/firebase';

const features = [
  {
    title: 'Track Applications',
    description:
      'Stay on top of your job search journey with clean and structured application tracking.',
  },
  {
    title: 'Kanban + Timeline Views',
    description:
      'Visualize your progress and status easily using intuitive views that boost productivity.',
  },
  {
    title: 'Add Notes & Hashtags',
    description:
      'Customize each job card with personal notes and hashtags to stay organized.',
  },
];

const faqs = [
  {
    question: 'How does Job Tracker work?',
    answer:
      'You sign in, add your job applications, and move them across stages as your process progresses.',
  },
  {
    question: 'Do I need an account?',
    answer:
      'Yes. Authentication helps keep your job data scoped securely to your account.',
  },
  {
    question: 'Is my data safe?',
    answer:
      'Your data is designed to be accessible only to you. Backend persistence is being actively improved.',
  },
];

const timelineSteps = [
  'Authentication-ready setup with Google sign-in.',
  'Add your job applications with role and company details.',
  'Move applications across stages as you progress.',
  'Visualize progress using Kanban and Timeline views.',
  'Stay organized with notes, tags, and filters.',
];

export default function Home() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const handleGetStarted = () => setIsSignInModalOpen(true);

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    setIsSignInModalOpen(false);
  };

  const handleGitHubSignIn = async () => {
    await signInWithGitHub();
    setIsSignInModalOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="mt-8 pt-20 px-6 max-w-7xl mx-auto relative"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ width }}
        className="h-1 bg-primary fixed top-0 left-0 right-0 z-50"
      />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 mb-20"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Job Application Tracker
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A personal tool to organize, track, and visualize your job search
          journey in one place.
        </p>

        <p className="text-sm text-muted-foreground">
          Built as a personal project to simplify my own job search workflow.
        </p>

        <motion.button
          onClick={handleGetStarted}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
        >
          Get Started
        </motion.button>
      </motion.section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 mb-28">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-card border p-6 rounded-xl shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">
              {feature.title}
            </h3>
            <p className="text-muted-foreground">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Timeline Section */}
      <section className="mb-28">
        <h2 className="text-3xl font-bold text-center mb-10">
          How It Works
        </h2>

        <div className="relative border-l-4 border-primary pl-6 space-y-8">
          {timelineSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute left-[-36px] top-1 w-4 h-4 rounded-full bg-primary" />
              <p className="text-lg">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why I Built This */}
      <section className="mb-28 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Why I Built This
        </h2>

        <p className="text-muted-foreground">
          Managing job applications across multiple platforms quickly becomes
          overwhelming. I built this project to bring clarity, structure, and
          visual progress tracking into one simple dashboard. The project is
          actively evolving with deeper engineering and product improvements.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="mb-28">
        <h2 className="text-3xl font-bold mb-6 text-center">
          FAQs
        </h2>

        <div className="space-y-6 max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-muted p-4 rounded-lg border"
            >
              <h4 className="font-semibold">
                {faq.question}
              </h4>
              <p className="text-muted-foreground">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="text-center mb-24 bg-primary text-primary-foreground p-10 rounded-xl"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to organize your job search?
        </h2>

        <p className="mb-6">
          Track applications, interviews, and offers with clarity and focus.
        </p>

        <motion.button
          onClick={handleGetStarted}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-lg bg-white text-black hover:opacity-90 transition"
        >
          Get Started
        </motion.button>
      </motion.section>

      {/* Sign In Modal */}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onGoogleSignIn={handleGoogleSignIn}
        onGithubSignIn={handleGitHubSignIn}
      />
    </div>
  );
}
